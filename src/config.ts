// Lectura de variables de entorno en un solo lugar: los tests mockean este módulo (ts-jest no soporta import.meta).
export const CONTACT_API_URL: string = import.meta.env.VITE_CONTACT_API_URL;
