/** @jest-environment node */
import { ApiError, fetchRecorded, parseEvent, streamAsk } from "../lib/certCopilot/api";
import { safeHref } from "../lib/certCopilot/safeHref";
import { readSse } from "../lib/certCopilot/sse";
import type { AskEvent } from "../lib/certCopilot/types";

const enc = new TextEncoder();

function streamOfBytes(bytes: Uint8Array, size: number): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(c) {
      for (let i = 0; i < bytes.length; i += size) c.enqueue(bytes.slice(i, i + size));
      c.close();
    },
  });
}
const streamOf = (text: string, size = 7) => streamOfBytes(enc.encode(text), size);

async function collect<T>(it: AsyncIterable<T>): Promise<T[]> {
  const out: T[] = [];
  for await (const x of it) out.push(x);
  return out;
}

describe("readSse", () => {
  it("reensambla eventos partidos entre chunks (de 3 en 3 bytes)", async () => {
    const full = 'event: token\ndata: {"a":1}\n\nevent: done\ndata: fin\n\n';
    expect(await collect(readSse(streamOf(full, 3)))).toEqual([
      { event: "token", data: '{"a":1}' },
      { event: "done", data: "fin" },
    ]);
  });

  it("acepta CRLF, comentarios y data multilínea", async () => {
    const full = ": keep-alive\r\n\r\nevent: x\r\ndata: l1\r\ndata:l2\r\n\r\n";
    expect(await collect(readSse(streamOf(full, 5)))).toEqual([{ event: "x", data: "l1\nl2" }]);
  });

  it("emite un último bloque sin línea en blanco final", async () => {
    expect(await collect(readSse(streamOf("event: a\ndata: 1\n\nevent: b\ndata: 2")))).toEqual([
      { event: "a", data: "1" },
      { event: "b", data: "2" },
    ]);
  });

  it("no corrompe caracteres multibyte partidos entre chunks", async () => {
    const bytes = enc.encode("data: ñandú ✓\n\n");
    const msgs = await collect(readSse(streamOfBytes(bytes, 1)));
    expect(msgs).toEqual([{ event: "message", data: "ñandú ✓" }]);
  });

  it("cancela el lector si el consumidor corta antes de tiempo", async () => {
    const cancel = jest.fn();
    const body = new ReadableStream<Uint8Array>({
      pull(c) {
        c.enqueue(enc.encode("data: x\n\n"));
      },
      cancel,
    });
    for await (const _ of readSse(body)) break; // eslint-disable-line @typescript-eslint/no-unused-vars
    expect(cancel).toHaveBeenCalled();
  });
});

describe("parseEvent", () => {
  const msg = (data: unknown) => ({ event: "message", data: typeof data === "string" ? data : JSON.stringify(data) });

  it("acepta eventos bien formados", () => {
    expect(parseEvent(msg({ type: "token", text: "hola" }))).toEqual({ type: "token", text: "hola" });
    expect(parseEvent(msg({ type: "error", message: "x" }))).toEqual({ type: "error", message: "x" });
  });

  it("descarta JSON inválido, tipos desconocidos y formas inesperadas", () => {
    expect(parseEvent(msg("no-json"))).toBeNull();
    expect(parseEvent(msg({ type: "otro" }))).toBeNull();
    expect(parseEvent(msg(null))).toBeNull();
    expect(parseEvent(msg({ type: "sources", sources: "x" }))).toBeNull();
    expect(parseEvent(msg({ type: "token" }))).toBeNull();
    expect(parseEvent(msg({ type: "done", citations: null, meta: {} }))).toBeNull();
    expect(parseEvent(msg({ type: "no_answer" }))).toBeNull();
  });
});

describe("streamAsk", () => {
  const fetchMock = jest.fn();
  beforeEach(() => {
    fetchMock.mockReset();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });

  const sse = (evs: unknown[]) => evs.map((e) => `event: x\ndata: ${JSON.stringify(e)}\n\n`).join("");

  it("envía el POST y entrega los eventos tipados, ignorando los malformados", async () => {
    const body = sse([{ type: "token", text: "a" }, { type: "basura" }, { type: "token", text: "b" }]);
    fetchMock.mockResolvedValue(new Response(streamOf(body), { status: 200 }));

    const events = await collect(streamAsk({ question: "¿Qué es S3?", sessionId: "s3" }, { baseUrl: "http://api" }));

    expect(events).toEqual<AskEvent[]>([
      { type: "token", text: "a" },
      { type: "token", text: "b" },
    ]);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("http://api/api/cert/ask");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ question: "¿Qué es S3?", sessionId: "s3" });
    expect((init.headers as Record<string, string>)["x-invite-code"]).toBeUndefined();
  });

  it("manda el código de invitación solo si existe", async () => {
    fetchMock.mockResolvedValue(new Response(streamOf(""), { status: 200 }));
    await collect(streamAsk({ question: "abc" }, { inviteCode: "SECRETO" }));
    expect(((fetchMock.mock.calls[0] as [string, RequestInit])[1].headers as Record<string, string>)["x-invite-code"]).toBe(
      "SECRETO",
    );
  });

  it("convierte un error HTTP con JSON en ApiError", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ error: "live_disabled", hint: "usa un código" }), { status: 403 }),
    );
    await expect(collect(streamAsk({ question: "abc" }))).rejects.toMatchObject({
      name: "ApiError",
      status: 403,
      code: "live_disabled",
      message: "usa un código",
    });
  });

  it("un error HTTP sin JSON usa un código genérico", async () => {
    fetchMock.mockResolvedValue(new Response("<html>502</html>", { status: 502 }));
    const err = await collect(streamAsk({ question: "abc" })).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toMatchObject({ status: 502, code: "request_failed" });
  });
});

describe("fetchRecorded", () => {
  const fetchMock = jest.fn();
  beforeEach(() => {
    fetchMock.mockReset();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });

  it("devuelve solo entradas válidas", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify([{ id: "a", question: "¿A?" }, { id: 3 }, null, { id: "b", question: "¿B?" }])),
    );
    expect(await fetchRecorded({ baseUrl: "" })).toEqual([
      { id: "a", question: "¿A?" },
      { id: "b", question: "¿B?" },
    ]);
    expect(fetchMock.mock.calls[0]?.[0]).toBe("/api/cert/recorded");
  });

  it("falla si el servidor responde mal o con otra forma", async () => {
    fetchMock.mockResolvedValueOnce(new Response("x", { status: 500 }));
    await expect(fetchRecorded()).rejects.toBeInstanceOf(ApiError);
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ no: "array" })));
    await expect(fetchRecorded()).rejects.toBeInstanceOf(ApiError);
  });
});

describe("safeHref", () => {
  it("solo deja pasar http(s)", () => {
    expect(safeHref("https://docs.aws.amazon.com/s3")).toBe("https://docs.aws.amazon.com/s3");
    expect(safeHref("HTTP://example.com")).toBe("HTTP://example.com");
    expect(safeHref("javascript:alert(1)")).toBeNull();
    expect(safeHref("data:text/html,<script>")).toBeNull();
    expect(safeHref("//evil.com")).toBeNull();
    expect(safeHref("")).toBeNull();
  });
});
