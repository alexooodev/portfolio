/**
 * Configuración de Cert Copilot (lee variables de Vite).
 *
 * - VITE_CERT_API_URL: base de la API ("" = mismo origen; en `pnpm dev` Vite hace proxy de /api/cert → :8787).
 * - VITE_CERT_COPILOT=true: muestra la sección en producción. Apagado por defecto porque el CI despliega a
 *   Cloudflare en cada push a main/dev y sin API la sección se vería rota. En `pnpm dev` siempre está visible.
 *
 * Este archivo usa `import.meta`, que ts-jest no entiende: los tests lo reemplazan con jest.mock.
 */
export const CERT_API_BASE: string = (import.meta.env.VITE_CERT_API_URL as string | undefined) ?? "";

export const CERT_COPILOT_ENABLED: boolean =
  import.meta.env.DEV === true || import.meta.env.VITE_CERT_COPILOT === "true";
