import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { FactoryFlow } from "@/components/home/FactoryFlow";
import { getLanding } from "@/content/landing";
import { basePath } from "@/lib/base-path";

afterEach(() => {
  cleanup();
  document.querySelectorAll("dialog").forEach((dialog) => dialog.remove());
});

describe("FactoryFlow", () => {
  it("muestra el diagrama en español y abre el detalle al ampliarlo", async () => {
    const user = userEvent.setup();
    render(<FactoryFlow copy={getLanding("es").process} locale="es" />);
    const diagram = screen.getByRole("img", { name: /Bucle de Auto-Mejora/i });
    expect(diagram).toHaveAttribute("src", `${basePath}/media/fabrica-es.webp`);
    await user.click(diagram);
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getByRole("heading", { name: "Fábrica de Software" })).toBeVisible();
  });

  it("activa cada paso del flujo con el teclado o el puntero", async () => {
    const user = userEvent.setup();
    render(<FactoryFlow copy={getLanding("es").process} locale="es" />);
    const detail = document.getElementById("factory-detail");
    expect(detail).toHaveTextContent("Descubrimiento");
    await user.click(screen.getByRole("button", { name: /Spec \(SDD\)/i }));
    expect(detail).toHaveTextContent("Spec (SDD)");
  });
});

describe("landing copy", () => {
  it("mantiene los casos cualitativos y el mismo esqueleto en ambos idiomas", () => {
    const spanish = getLanding("es");
    const english = getLanding("en");
    expect(spanish.cases.items.map((item) => item.id)).toEqual([
      "education",
      "trading",
      "certs",
      "inventory",
      "taxes",
      "calc",
      "dashboards",
      "intl",
      "opex",
      "cloud",
      "deps",
    ]);
    expect(spanish.improve.items.map((item) => item.id)).toContain("loop");
    expect(spanish.improve.items.map((item) => item.id)).toContain("docs");
    expect(english.process.diagramAlt).toMatch(/Auto-Improve Loop/);
    expect(spanish.process.diagramAlt).toMatch(/Bucle de Auto-Mejora/);
    expect(english.cases.items.map((item) => item.id)).toEqual(
      spanish.cases.items.map((item) => item.id),
    );
    expect(spanish.process.steps.map((step) => step.id)).toEqual([
      "discover",
      "spec",
      "agents",
      "qa",
      "delivery",
      "improve",
    ]);
    expect(english.process.steps.map((step) => step.id)).toEqual(
      spanish.process.steps.map((step) => step.id),
    );
    for (const item of [...spanish.cases.items, ...english.cases.items]) {
      expect(item.title).not.toMatch(/\d/);
      expect(item.body).not.toMatch(/\d/);
    }
    expect(spanish.hero.subhead).toMatch(/automatizaciones/i);
    expect(spanish.hero.motto).toMatch(/calidad/i);
  });
});
