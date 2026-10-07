import { create } from "zustand";
import { en } from "./en";
import { es } from "./es";
import type { Messages } from "./en";

export type Locale = "en" | "es";

export const LOCALES: readonly Locale[] = ["en", "es"];
export const STORAGE_KEY = "portfolio-locale";

const MESSAGES: Record<Locale, Messages> = { en, es };

const isLocale = (v: unknown): v is Locale => v === "en" || v === "es";

/** Idioma elegido antes (si lo hay) o, si no, el primero de los idiomas del navegador que soportemos. */
export function detectLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    // localStorage puede lanzar en ventanas privadas o con cookies bloqueadas.
  }
  const preferred =
    typeof navigator === "undefined" ? [] : navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const base = tag?.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return "en";
}

/** Refleja el idioma en el documento: lectores de pantalla, traductores del navegador y pestaña. */
function applyToDocument(locale: Locale): void {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.title = MESSAGES[locale].meta.title;
}

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>((set) => {
  const initial = detectLocale();
  applyToDocument(initial);
  return {
    locale: initial,
    setLocale: (locale) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, locale);
      } catch {
        // Sin almacenamiento: el cambio vale solo para esta visita.
      }
      applyToDocument(locale);
      set({ locale });
    },
  };
});

/** Textos del idioma activo. */
export function useMessages(): Messages {
  const locale = useLocaleStore((s) => s.locale);
  return MESSAGES[locale];
}
