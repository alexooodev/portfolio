export interface SseMessage {
  event: string;
  data: string;
}

/** Un bloque SSE → mensaje. Ignora comentarios (":") y bloques sin `data`. */
function parseBlock(block: string): SseMessage | null {
  let event = "message";
  const data: string[] = [];
  for (const line of block.split(/\r?\n/)) {
    if (!line || line.startsWith(":")) continue;
    const i = line.indexOf(":");
    const field = i === -1 ? line : line.slice(0, i);
    let value = i === -1 ? "" : line.slice(i + 1);
    if (value.startsWith(" ")) value = value.slice(1);
    if (field === "event") event = value;
    else if (field === "data") data.push(value);
  }
  return data.length > 0 ? { event, data: data.join("\n") } : null;
}

/**
 * Lee un stream SSE (también de un POST, donde EventSource no sirve).
 * Tolera eventos partidos entre chunks, CRLF y un último bloque sin línea en blanco.
 * Al terminar o cancelarse, cancela el lector para liberar la conexión.
 */
export async function* readSse(body: ReadableStream<Uint8Array>): AsyncGenerator<SseMessage> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      let m: RegExpExecArray | null;
      while ((m = /\r?\n\r?\n/.exec(buf)) !== null) {
        const msg = parseBlock(buf.slice(0, m.index));
        buf = buf.slice(m.index + m[0].length);
        if (msg) yield msg;
      }
    }
    buf += decoder.decode();
    const tail = parseBlock(buf);
    if (tail) yield tail;
  } finally {
    await reader.cancel().catch(() => undefined);
  }
}
