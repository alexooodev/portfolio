import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as api from "../lib/certCopilot/api";
import type { AskEvent, CitationCheck, PublicSource } from "../lib/certCopilot/types";
import CertCopilotSection from "../components/certCopilot/CertCopilotSection";
import { useCertCopilotStore } from "../store/certCopilotStore";

jest.mock("../lib/certCopilot/config", () => ({ CERT_API_BASE: "", CERT_COPILOT_ENABLED: true }));
jest.mock("../lib/certCopilot/api", () => ({
  ...jest.requireActual("../lib/certCopilot/api"),
  streamAsk: jest.fn(),
  fetchRecorded: jest.fn(),
}));

const streamAsk = jest.mocked(api.streamAsk);
const fetchRecorded = jest.mocked(api.fetchRecorded);

const source = (n: number, url = `https://docs.aws.amazon.com/${n}`): PublicSource => ({
  n,
  id: n,
  url,
  section: `Sección ${n}`,
  cert: "aws-clf-c02",
  service: "S3",
  snippet: `Fragmento ${n}`,
  score: 0.91,
});

const okCitations: CitationCheck = { used: [1, 2], invalid: [], hasAnyCitation: true };
const meta = {
  provider: "groq",
  model: "openai/gpt-oss-120b",
  latencyMs: 1200,
  retrieved: 2,
  topScore: 0.91,
  tokensInEst: 700,
  tokensOutEst: 20,
  recorded: true,
};

async function* emit(evs: AskEvent[]): AsyncGenerator<AskEvent> {
  for (const e of evs) yield e;
}

const answerEvents = (text: string, sources: PublicSource[], citations = okCitations): AskEvent[] => [
  { type: "sources", sources },
  { type: "token", text },
  { type: "done", citations, meta },
];

const CHIP = "¿Qué es S3?";

beforeEach(() => {
  useCertCopilotStore.getState().reset();
  useCertCopilotStore.setState({ sessions: [], sessionsStatus: "idle", turns: [], busy: false, inviteCode: "" });
  streamAsk.mockReset();
  fetchRecorded.mockReset();
  fetchRecorded.mockResolvedValue([{ id: "s3", question: CHIP }]);
});

const clickChip = async () => fireEvent.click(await screen.findByRole("button", { name: CHIP }));

describe("modo grabado", () => {
  it("muestra los chips, reproduce la sesión y enlaza las citas con sus fuentes", async () => {
    streamAsk.mockImplementation(() => emit(answerEvents("S3 guarda objetos [1] en buckets [2].", [source(1), source(2)])));
    render(<CertCopilotSection sectionId="lab" />);

    await clickChip();

    expect(await screen.findByText(/S3 guarda objetos/)).toBeInTheDocument();
    expect(streamAsk).toHaveBeenCalledWith({ question: CHIP, sessionId: "s3" }, expect.anything());

    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).not.toHaveAttribute("aria-current");

    fireEvent.click(screen.getByRole("button", { name: "Show source 1" }));
    expect(items[0]).toHaveAttribute("aria-current", "true");
    fireEvent.click(screen.getByRole("button", { name: "Show source 2" }));
    expect(items[0]).not.toHaveAttribute("aria-current");
    expect(items[1]).toHaveAttribute("aria-current", "true");

    expect(screen.getByText(/Recorded session/)).toBeInTheDocument();
  });

  it("avisa cuando la respuesta no trae citas", async () => {
    streamAsk.mockImplementation(() =>
      emit(answerEvents("Respuesta sin citas.", [source(1)], { used: [], invalid: [], hasAnyCitation: false })),
    );
    render(<CertCopilotSection sectionId="lab" />);
    await clickChip();
    expect(await screen.findByText(/no citations/i)).toBeInTheDocument();
  });

  it("marca una cita a una fuente inexistente y no la enlaza", async () => {
    streamAsk.mockImplementation(() =>
      emit(answerEvents("Dato [1] y dato [7].", [source(1)], { used: [1], invalid: [7], hasAnyCitation: true })),
    );
    render(<CertCopilotSection sectionId="lab" />);
    await clickChip();

    expect(await screen.findByTitle("This source doesn't exist")).toHaveTextContent("[7]");
    expect(screen.queryByRole("button", { name: "Show source 7" })).not.toBeInTheDocument();
    expect(screen.getByText(/cites sources that don't exist/i)).toBeInTheDocument();
  });

  it("renderiza **negrita** y `código` del modelo", async () => {
    streamAsk.mockImplementation(() => emit(answerEvents("Usa **S3** con `aws s3 ls` [1].", [source(1)])));
    render(<CertCopilotSection sectionId="lab" />);
    await clickChip();

    expect((await screen.findByText("S3", { selector: "strong" })).tagName).toBe("STRONG");
    expect(screen.getByText("aws s3 ls", { selector: "code" })).toBeInTheDocument();
  });

  it("solo enlaza fuentes http(s); un esquema peligroso no genera link", async () => {
    streamAsk.mockImplementation(() =>
      emit(answerEvents("Dato [1] y [2].", [source(1), source(2, "javascript:alert(1)")])),
    );
    render(<CertCopilotSection sectionId="lab" />);
    await clickChip();

    const links = await screen.findAllByRole("link", { name: /Open in the official docs/ });
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "https://docs.aws.amazon.com/1");
    expect(links[0]).toHaveAttribute("rel", "noopener noreferrer");
    expect(links[0]).toHaveAttribute("target", "_blank");
  });

  it("muestra el mensaje de 'no sé' sin fuentes ni respuesta", async () => {
    streamAsk.mockImplementation(() =>
      emit([{ type: "no_answer", reason: "low_relevance", message: "No encontré evidencia suficiente.", topScore: 0.2 }]),
    );
    render(<CertCopilotSection sectionId="lab" />);
    await clickChip();

    expect(await screen.findByText("No encontré evidencia suficiente.")).toBeInTheDocument();
    expect(screen.queryByText("Sources")).not.toBeInTheDocument();
  });

  it("Stop corta la respuesta en curso", async () => {
    streamAsk.mockImplementation((_req, opts) =>
      (async function* (): AsyncGenerator<AskEvent> {
        yield { type: "token", text: "Empiezo a respon" };
        await new Promise<never>((_, reject) => {
          opts?.signal?.addEventListener("abort", () => reject(Object.assign(new Error("aborted"), { name: "AbortError" })));
        });
      })(),
    );
    render(<CertCopilotSection sectionId="lab" />);
    await clickChip();

    fireEvent.click(await screen.findByRole("button", { name: /Stop/ }));
    expect(await screen.findByText("Stopped.")).toBeInTheDocument();
    expect(screen.getByText(/Empiezo a respon/)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("button", { name: /Stop/ })).not.toBeInTheDocument());
  });

  it("un error permite reintentar", async () => {
    streamAsk.mockImplementationOnce(() => {
      throw new TypeError("net");
    });
    streamAsk.mockImplementationOnce(() => emit(answerEvents("Ahora sí [1].", [source(1)])));
    render(<CertCopilotSection sectionId="lab" />);
    await clickChip();

    expect(await screen.findByRole("alert")).toHaveTextContent(/Couldn't reach/i);
    fireEvent.click(screen.getByRole("button", { name: /Retry/ }));
    expect(await screen.findByText(/Ahora sí/)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("Clear borra la conversación", async () => {
    streamAsk.mockImplementation(() => emit(answerEvents("Hola [1].", [source(1)])));
    render(<CertCopilotSection sectionId="lab" />);
    await clickChip();
    await screen.findByText(/Hola/);

    fireEvent.click(screen.getByRole("button", { name: /Clear/ }));
    expect(screen.queryByText(/Hola/)).not.toBeInTheDocument();
  });
});

describe("chips", () => {
  it("si falla la carga ofrece reintentar", async () => {
    fetchRecorded.mockRejectedValueOnce(new Error("down"));
    render(<CertCopilotSection sectionId="lab" />);

    expect(await screen.findByText(/Couldn't load the example questions/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByRole("button", { name: CHIP })).toBeInTheDocument();
  });

  it("sin sesiones grabadas muestra el estado vacío", async () => {
    fetchRecorded.mockResolvedValue([]);
    render(<CertCopilotSection sectionId="lab" />);
    expect(await screen.findByText("No recorded sessions yet.")).toBeInTheDocument();
  });

  it("usa el sectionId recibido", async () => {
    const { container } = render(<CertCopilotSection sectionId="lab" />);
    await screen.findByRole("button", { name: CHIP });
    expect(container.querySelector("section#lab")).not.toBeNull();
  });
});

describe("modo en vivo", () => {
  const openLive = async () => {
    render(<CertCopilotSection sectionId="lab" />);
    await screen.findByRole("button", { name: CHIP });
    fireEvent.click(screen.getByRole("button", { name: /I have an invitation code/ }));
  };

  it("el botón exige código y una pregunta de al menos 3 caracteres", async () => {
    await openLive();
    const ask = screen.getByRole("button", { name: /Ask live/ });
    expect(ask).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Your question"), { target: { value: "¿Qué es EC2?" } });
    expect(ask).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Invitation code"), { target: { value: "CODE" } });
    expect(ask).toBeEnabled();

    fireEvent.change(screen.getByLabelText("Your question"), { target: { value: "ab" } });
    expect(ask).toBeDisabled();
  });

  it("envía la pregunta con el código y limpia el campo", async () => {
    streamAsk.mockImplementation(() => emit(answerEvents("EC2 son servidores [1].", [source(1)])));
    await openLive();

    fireEvent.change(screen.getByLabelText("Invitation code"), { target: { value: "CODE" } });
    fireEvent.change(screen.getByLabelText("Your question"), { target: { value: "¿Qué es EC2?" } });
    fireEvent.click(screen.getByRole("button", { name: /Ask live/ }));

    expect(await screen.findByText(/EC2 son servidores/)).toBeInTheDocument();
    expect(streamAsk).toHaveBeenCalledWith({ question: "¿Qué es EC2?" }, expect.objectContaining({ inviteCode: "CODE" }));
    expect(screen.getByLabelText("Your question")).toHaveValue("");
    expect(screen.getByText(/^Live ·/)).toBeInTheDocument();
  });

  it("un 403 explica que el código no sirvió", async () => {
    streamAsk.mockImplementation(() => {
      throw new api.ApiError(403, "live_disabled");
    });
    await openLive();

    fireEvent.change(screen.getByLabelText("Invitation code"), { target: { value: "MAL" } });
    fireEvent.change(screen.getByLabelText("Your question"), { target: { value: "¿Qué es EC2?" } });
    fireEvent.click(screen.getByRole("button", { name: /Ask live/ }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/code didn't work/i);
  });

  it("el campo del código es de tipo password", async () => {
    await openLive();
    expect(screen.getByLabelText("Invitation code")).toHaveAttribute("type", "password");
  });
});
