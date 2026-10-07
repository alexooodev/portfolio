import { fireEvent, render, screen } from "@testing-library/react";
import { detectLocale, STORAGE_KEY, useLocaleStore } from "../i18n/localeStore";
import { en } from "../i18n/en";
import { es } from "../i18n/es";
import LanguageToggle from "../components/LanguageToggle";
import Hero from "../components/Hero";
import ContactModal from "../components/ContactModal";

jest.mock("../config", () => ({ CONTACT_API_URL: "" }));

function setBrowserLanguages(languages: string[]) {
  Object.defineProperty(window.navigator, "languages", { value: languages, configurable: true });
  Object.defineProperty(window.navigator, "language", { value: languages[0], configurable: true });
}

beforeEach(() => {
  window.localStorage.clear();
  setBrowserLanguages(["en-US"]);
  useLocaleStore.setState({ locale: "en" });
});

describe("detectLocale", () => {
  it("usa el primer idioma del navegador que soportamos", () => {
    setBrowserLanguages(["fr-FR", "es-CL", "en-US"]);
    expect(detectLocale()).toBe("es");
  });

  it("cae a inglés si ninguno está soportado", () => {
    setBrowserLanguages(["fr-FR", "de"]);
    expect(detectLocale()).toBe("en");
  });

  it("la elección guardada manda sobre el idioma del navegador", () => {
    setBrowserLanguages(["es-CL"]);
    window.localStorage.setItem(STORAGE_KEY, "en");
    expect(detectLocale()).toBe("en");
  });

  it("ignora un valor guardado inválido", () => {
    setBrowserLanguages(["es"]);
    window.localStorage.setItem(STORAGE_KEY, "klingon");
    expect(detectLocale()).toBe("es");
  });

  it("no revienta si localStorage lanza", () => {
    setBrowserLanguages(["es"]);
    const spy = jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(detectLocale()).toBe("es");
    spy.mockRestore();
  });
});

describe("setLocale", () => {
  it("guarda la elección y actualiza <html lang> y el título", () => {
    useLocaleStore.getState().setLocale("es");
    expect(useLocaleStore.getState().locale).toBe("es");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("es");
    expect(document.documentElement.lang).toBe("es");
    expect(document.title).toBe(es.meta.title);
  });
});

describe("diccionarios", () => {
  const leaves = (o: unknown, path = ""): string[] =>
    typeof o === "string"
      ? [path]
      : Array.isArray(o)
        ? o.flatMap((v, i) => leaves(v, `${path}[${i}]`))
        : Object.entries(o as object).flatMap(([k, v]) => leaves(v, path ? `${path}.${k}` : k));

  it("es y en tienen las mismas claves y ningún texto vacío", () => {
    expect(leaves(es)).toEqual(leaves(en));
    const empty = (o: unknown): boolean =>
      typeof o === "string" ? o.trim() === "" : Object.values(o as object).some(empty);
    expect(empty(es)).toBe(false);
  });
});

describe("LanguageToggle", () => {
  it("marca el idioma activo y cambia el contenido al instante", () => {
    render(
      <>
        <LanguageToggle />
        <Hero sectionId="home" />
      </>,
    );
    expect(screen.getByText(en.hero.getInTouch)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "Español" }));

    expect(screen.getByText(es.hero.getInTouch)).toBeInTheDocument();
    expect(screen.queryByText(en.hero.getInTouch)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Español" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("group", { name: "Idioma" })).toBeInTheDocument();
  });
});

describe("ContactModal", () => {
  const fill = (name: string) => {
    fireEvent.change(screen.getByLabelText(/Tu nombre|Your Name/), { target: { name: "name", value: name } });
  };

  it("acepta nombres con tildes y eñes", () => {
    render(<ContactModal isOpen onClose={() => {}} />);
    fill("José Muñoz");
    expect(screen.queryByText(en.modal.errors.nameLetters)).not.toBeInTheDocument();
  });

  it("rechaza números y muestra el error en el idioma activo", () => {
    useLocaleStore.setState({ locale: "es" });
    render(<ContactModal isOpen onClose={() => {}} />);
    fill("Alex123");
    expect(screen.getByText(es.modal.errors.nameLetters)).toBeInTheDocument();
  });
});
