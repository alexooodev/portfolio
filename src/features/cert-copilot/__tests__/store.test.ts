/** @jest-environment node */
import * as api from "../api";
import type { AskEvent, AskMeta, CitationCheck, PublicSource } from "../types";
import { useCertCopilotStore } from "../store";

jest.mock("../config", () => ({ CERT_API_BASE: "", CERT_COPILOT_ENABLED: true }));
jest.mock("../api", () => ({
  ...jest.requireActual("../api"),
  streamAsk: jest.fn(),
  fetchRecorded: jest.fn(),
}));

const streamAsk = jest.mocked(api.streamAsk);
const fetchRecorded = jest.mocked(api.fetchRecorded);

const source = (n: number): PublicSource => ({
  n,
  id: n,
  url: `https://docs.aws.amazon.com/${n}`,
  section: `Sección ${n}`,
  cert: "aws-clf-c02",
  service: "S3",
  snippet: "fragmento",
  score: 0.9,
});
const citations: CitationCheck = { used: [1], invalid: [], hasAnyCitation: true };
const meta: AskMeta = {
  provider: "groq",
  model: "openai/gpt-oss-120b",
  latencyMs: 900,
  retrieved: 1,
  topScore: 0.9,
  tokensInEst: 700,
  tokensOutEst: 12,
  recorded: true,
};

const happy: AskEvent[] = [
  { type: "sources", sources: [source(1)] },
  { type: "token", text: "S3 guarda " },
  { type: "token", text: "objetos [1]." },
  { type: "done", citations, meta },
];

async function* emit(evs: AskEvent[]): AsyncGenerator<AskEvent> {
  for (const e of evs) yield e;
}

/** Emite un token y se queda esperando hasta que lo aborten. */
async function* hang(signal?: AbortSignal): AsyncGenerator<AskEvent> {
  yield { type: "token", text: "Hol" };
  await new Promise<never>((_, reject) => {
    signal?.addEventListener("abort", () => reject(Object.assign(new Error("aborted"), { name: "AbortError" })));
  });
}

const tick = () => new Promise((r) => setTimeout(r, 0));
const store = () => useCertCopilotStore.getState();
const item = { id: "que-es-s3", question: "¿Qué es S3?" };

beforeEach(() => {
  store().reset();
  streamAsk.mockReset();
  fetchRecorded.mockReset();
  useCertCopilotStore.setState({ sessions: [], sessionsStatus: "idle", turns: [], busy: false, inviteCode: "" });
});

describe("askRecorded", () => {
  it("acumula tokens, guarda fuentes y cierra con done", async () => {
    streamAsk.mockImplementation(() => emit(happy));
    await store().askRecorded(item);

    const [turn] = store().turns;
    expect(turn).toMatchObject({
      status: "done",
      live: false,
      answer: "S3 guarda objetos [1].",
      sources: [source(1)],
      citations,
      meta,
    });
    expect(store().busy).toBe(false);
  });

  it("manda sessionId y nunca el código de invitación", async () => {
    streamAsk.mockImplementation(() => emit(happy));
    store().setInviteCode("SECRETO");
    await store().askRecorded(item);

    expect(streamAsk.mock.calls[0]?.[0]).toEqual({ question: "¿Qué es S3?", sessionId: "que-es-s3" });
    expect(streamAsk.mock.calls[0]?.[1]).not.toHaveProperty("inviteCode");
  });
});

describe("askLive", () => {
  it("recorta pregunta y código, y envía el código", async () => {
    streamAsk.mockImplementation(() => emit(happy));
    store().setInviteCode("  CODE  ");
    await store().askLive("  ¿Qué es EC2?  ");

    expect(streamAsk.mock.calls[0]?.[0]).toEqual({ question: "¿Qué es EC2?" });
    expect(streamAsk.mock.calls[0]?.[1]).toMatchObject({ inviteCode: "CODE" });
    expect(store().turns[0]?.live).toBe(true);
  });

  it("sin código no manda la cabecera", async () => {
    streamAsk.mockImplementation(() => emit(happy));
    await store().askLive("¿Qué es EC2?");
    expect(streamAsk.mock.calls[0]?.[1]).not.toHaveProperty("inviteCode");
  });
});

describe("estados terminales", () => {
  it("no_answer guarda el mensaje del backend", async () => {
    streamAsk.mockImplementation(() =>
      emit([{ type: "no_answer", reason: "low_relevance", message: "No encontré evidencia.", topScore: 0.2 }]),
    );
    await store().askLive("¿Qué es Kubernetes?");
    expect(store().turns[0]).toMatchObject({ status: "no_answer", message: "No encontré evidencia." });
    expect(store().busy).toBe(false);
  });

  it("evento error del servidor → mensaje genérico (no se muestra el detalle)", async () => {
    streamAsk.mockImplementation(() => emit([{ type: "error", message: "detalle interno" }]));
    await store().askLive("¿Qué es S3?");
    expect(store().turns[0]?.status).toBe("error");
    expect(store().turns[0]?.message).not.toContain("detalle interno");
  });

  it("stream que termina sin done → error de conexión cortada", async () => {
    streamAsk.mockImplementation(() => emit([{ type: "token", text: "parcial" }]));
    await store().askLive("¿Qué es S3?");
    expect(store().turns[0]).toMatchObject({ status: "error", answer: "parcial" });
    expect(store().turns[0]?.message).toMatch(/connection closed/i);
  });

  it.each([
    ["403 sin código", 403, "", /need an invitation code/i],
    ["403 con código", 403, "MAL", /code didn't work/i],
    ["404", 404, "", /no longer available/i],
    ["400", 400, "", /between 3 and 500/i],
    ["500", 500, "", /Couldn't reach/i],
  ])("ApiError %s", async (_name, status, code, expected) => {
    streamAsk.mockImplementation(() => {
      throw new api.ApiError(status, "x");
    });
    store().setInviteCode(code);
    await store().askLive("¿Qué es S3?");
    expect(store().turns[0]?.status).toBe("error");
    expect(store().turns[0]?.message).toMatch(expected);
  });

  it("fallo de red → mensaje genérico", async () => {
    streamAsk.mockImplementation(() => {
      throw new TypeError("Failed to fetch");
    });
    await store().askLive("¿Qué es S3?");
    expect(store().turns[0]?.message).toMatch(/Couldn't reach/i);
  });
});

describe("cancelación", () => {
  it("stop() aborta, conserva lo recibido y libera busy", async () => {
    streamAsk.mockImplementation((_req, opts) => hang(opts?.signal));
    const p = store().askLive("¿Qué es S3?");
    await tick();
    expect(store().busy).toBe(true);

    store().stop();
    await p;

    expect(store().turns[0]).toMatchObject({ status: "stopped", answer: "Hol" });
    expect(store().busy).toBe(false);
  });

  it("una pregunta nueva aborta la anterior y busy queda en false al final", async () => {
    streamAsk.mockImplementationOnce((_req, opts) => hang(opts?.signal));
    streamAsk.mockImplementationOnce(() => emit(happy));

    const first = store().askLive("primera pregunta");
    await tick();
    const second = store().askRecorded(item);
    await Promise.all([first, second]);

    expect(store().turns.map((t) => t.status)).toEqual(["stopped", "done"]);
    expect(store().busy).toBe(false);
  });
});

describe("retry / reset / límite", () => {
  it("retry repite la misma petición y reemplaza el turno fallido", async () => {
    streamAsk.mockImplementationOnce(() => {
      throw new TypeError("net");
    });
    streamAsk.mockImplementationOnce(() => emit(happy));

    await store().askRecorded(item);
    const failed = store().turns[0];
    expect(failed?.status).toBe("error");

    await store().retry(failed!.id);

    expect(store().turns).toHaveLength(1);
    expect(store().turns[0]).toMatchObject({ status: "done", req: failed!.req });
    expect(store().turns[0]?.id).not.toBe(failed!.id);
  });

  it("reset limpia los turnos", async () => {
    streamAsk.mockImplementation(() => emit(happy));
    await store().askRecorded(item);
    store().reset();
    expect(store().turns).toEqual([]);
    expect(store().busy).toBe(false);
  });

  it("conserva solo los últimos 8 turnos", async () => {
    streamAsk.mockImplementation(() => emit(happy));
    for (let i = 0; i < 10; i++) await store().askLive(`pregunta ${i}`);
    expect(store().turns).toHaveLength(8);
    expect(store().turns[0]?.req.question).toBe("pregunta 2");
  });
});

describe("loadSessions", () => {
  it("carga las sesiones grabadas", async () => {
    fetchRecorded.mockResolvedValue([item]);
    await store().loadSessions();
    expect(store()).toMatchObject({ sessions: [item], sessionsStatus: "ready" });
  });

  it("marca error si falla", async () => {
    fetchRecorded.mockRejectedValue(new Error("boom"));
    await store().loadSessions();
    expect(store().sessionsStatus).toBe("error");
  });
});
