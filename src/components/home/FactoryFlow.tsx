"use client";

import { useId, useRef, useState } from "react";
import type { LandingCopy } from "@/content/landing";
import type { Locale } from "@/i18n/locale";
import { basePath } from "@/lib/base-path";
import styles from "./landing.module.css";

type Props = {
  copy: LandingCopy["process"];
  locale: Locale;
};

const diagrams = {
  es: { src: `${basePath}/media/fabrica-es.webp`, width: 2048, height: 768 },
  en: { src: `${basePath}/media/fabrica-en.webp`, width: 2048, height: 768 },
} as const;

export function FactoryFlow({ copy, locale }: Props) {
  const [active, setActive] = useState(copy.steps[0]?.id ?? "");
  const step = copy.steps.find((item) => item.id === active) ?? copy.steps[0];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const diagram = diagrams[locale];

  function openDiagram() {
    const dialog = dialogRef.current;
    if (!dialog) return;
    try {
      if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
      else dialog.setAttribute("open", "");
    } catch {
      dialog.setAttribute("open", "");
    }
    closeRef.current?.focus();
  }

  function closeDiagram() {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  return (
    <section className="section" id="proceso" aria-labelledby="process-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">{copy.eyebrow}</p>
          <h2 id="process-title">{copy.title}</h2>
          <p>{copy.intro}</p>
        </div>

        <figure className={styles.diagramFrame}>
          <button
            type="button"
            className={styles.diagramButton}
            onClick={openDiagram}
            aria-haspopup="dialog"
          >
            <img
              src={diagram.src}
              width={diagram.width}
              height={diagram.height}
              alt={copy.diagramAlt}
            />
            <span className={styles.zoomLabel} aria-hidden="true">
              {copy.zoom}
            </span>
          </button>
          <figcaption className={styles.zoomHint}>{copy.zoomHint}</figcaption>
        </figure>

        <dialog
          ref={dialogRef}
          className={styles.lightbox}
          aria-labelledby={titleId}
          onClick={(event) => {
            if (event.target === dialogRef.current) closeDiagram();
          }}
        >
          <div className={styles.lightboxBar}>
            <h3 id={titleId}>{copy.diagramLabel}</h3>
            <button
              ref={closeRef}
              type="button"
              className="btn btn--primary"
              onClick={closeDiagram}
            >
              {copy.close}
            </button>
          </div>
          <div className={styles.lightboxScroll}>
            <img
              src={diagram.src}
              width={diagram.width}
              height={diagram.height}
              alt=""
            />
          </div>
        </dialog>

        <div className={styles.split}>
          <article className={styles.card}>
            <h3>{copy.loopTitle}</h3>
            <p className={styles.pain}>{copy.loopBody}</p>
          </article>
          <article className={styles.card}>
            <h3>{copy.selfDocTitle}</h3>
            <p className={styles.pain}>{copy.selfDocBody}</p>
          </article>
        </div>

        <div className={styles.loop}>
          <ol className={styles.flow} aria-label={copy.diagramLabel}>
            {copy.steps.map((item, index) => {
              const selected = item.id === step?.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`${styles.step} ${selected ? styles.stepActive : ""}`}
                    aria-current={selected ? "step" : undefined}
                    aria-controls="factory-detail"
                    onClick={() => setActive(item.id)}
                  >
                    <span className={styles.num}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.stepLabel}>{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className={styles.loopNote}>{copy.loop}</p>
        </div>

        {step ? (
          <article className={styles.detail} id="factory-detail" aria-live="polite">
            <h3>{step.name}</h3>
            <p className={styles.pain}>{step.body}</p>
          </article>
        ) : null}
      </div>
    </section>
  );
}
