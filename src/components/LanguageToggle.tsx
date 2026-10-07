import React from "react";
import { LOCALES, useLocaleStore, useMessages } from "../i18n/localeStore";

/** Selector EN | ES. Muestra el idioma activo y deja cambiarlo; la elección se recuerda entre visitas. */
const LanguageToggle: React.FC = () => {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const { nav } = useMessages();

  return (
    <div
      role="group"
      aria-label={nav.language}
      className="flex items-center rounded-lg border border-slate-700 p-0.5 text-xs font-semibold"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            aria-label={nav.languageNames[code]}
            title={nav.languageNames[code]}
            onClick={() => setLocale(code)}
            className={`rounded-md px-2.5 py-1 uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              active ? "bg-amber-500 text-slate-900" : "text-slate-400 hover:text-amber-400"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
