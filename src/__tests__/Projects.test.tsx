import { render, screen } from "@testing-library/react";
import * as api from "../features/cert-copilot/api";
import { useCertCopilotStore } from "../features/cert-copilot/store";
import Projects from "../components/Projects";

let mockEnabled = true;
jest.mock("../features/cert-copilot/config", () => ({
  CERT_API_BASE: "",
  get CERT_COPILOT_ENABLED() {
    return mockEnabled;
  },
}));
jest.mock("../features/cert-copilot/api", () => ({
  ...jest.requireActual("../features/cert-copilot/api"),
  streamAsk: jest.fn(),
  fetchRecorded: jest.fn(),
}));

const fetchRecorded = jest.mocked(api.fetchRecorded);

beforeEach(() => {
  useCertCopilotStore.getState().reset();
  useCertCopilotStore.setState({ sessions: [], sessionsStatus: "idle", turns: [], busy: false, inviteCode: "" });
  fetchRecorded.mockReset();
  fetchRecorded.mockResolvedValue([{ id: "s3", question: "¿Qué es S3?" }]);
});

describe("Projects (proyecto destacado)", () => {
  it("presenta el proyecto y usa el sectionId recibido", () => {
    mockEnabled = false;
    const { container } = render(<Projects sectionId="projects" />);

    expect(screen.getByRole("heading", { name: /Featured Project/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cert Copilot" })).toBeInTheDocument();
    expect(screen.getByText(/AWS Cloud Practitioner exam/)).toBeInTheDocument();
    expect(screen.getByText("Retrieval pipeline")).toBeInTheDocument();
    expect(screen.getByText("Postgres + pgvector")).toBeInTheDocument();
    expect(container.querySelector("section#projects")).not.toBeNull();
  });

  it("con el flag apagado muestra 'coming soon' y no toca la API", () => {
    mockEnabled = false;
    render(<Projects sectionId="projects" />);

    expect(screen.getByText("Live demo coming soon")).toBeInTheDocument();
    expect(fetchRecorded).not.toHaveBeenCalled();
  });

  it("con el flag encendido carga el demo y sus preguntas grabadas", async () => {
    mockEnabled = true;
    render(<Projects sectionId="projects" />);

    expect(await screen.findByRole("button", { name: "¿Qué es S3?" })).toBeInTheDocument();
    expect(screen.queryByText("Live demo coming soon")).not.toBeInTheDocument();
    expect(fetchRecorded).toHaveBeenCalledTimes(1);
  });
});
