/** Solo http(s). Las URLs vienen de la base de datos / sesiones grabadas: nunca renderizar `javascript:` u otros esquemas. */
export function safeHref(url: string): string | null {
  return /^https?:\/\//i.test(url) ? url : null;
}
