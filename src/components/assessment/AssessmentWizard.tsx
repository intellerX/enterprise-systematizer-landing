"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { assessmentQuestions, pillars } from "@/content/assessment";
import { methodology } from "@/content/methodology";
import { useI18n } from "@/i18n/I18nProvider";
import { track } from "@/lib/analytics/track";
import {
  scoreAssessment,
  type Answers,
  type AssessmentResult,
} from "@/lib/assessment/scoring";
import styles from "./AssessmentWizard.module.css";

const STORAGE_KEY = "paise-assessment-answers";

function readStoredAnswers(): Answers {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("a");
    if (encoded) return JSON.parse(atob(encoded)) as Answers;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Answers;
  } catch {
    /* ignore */
  }
  return {};
}

export function AssessmentWizard() {
  const { m } = useI18n();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [hydrated, setHydrated] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [prefill, setPrefill] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setAnswers(readStoredAnswers());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers, hydrated]);

  const question = assessmentQuestions[step];
  const total = assessmentQuestions.length;
  const progress = Math.round(((step + (result ? 1 : 0)) / total) * 100);

  const phaseName = useMemo(() => {
    if (!result) return "";
    return (
      methodology.phases.find((p) => p.id === result.recommendedPhaseId)?.name ??
      result.recommendedPhaseId
    );
  }, [result]);

  function selectChoice(choiceId: string) {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: choiceId }));
  }

  function finish() {
    const scored = scoreAssessment(answers);
    setResult(scored);
    track("assessment_complete", { level: scored.levelId });
  }

  if (result) {
    const summary = [
      `Maturity: ${result.levelLabel} (${result.overall}/100)`,
      result.summary,
      `Recommended phase: ${phaseName}`,
      ...result.pillarScores.map((p) => `${p.label}: ${p.score}`),
    ].join("\n");

    const contactHref = prefill
      ? `/contact?message=${encodeURIComponent(
          `AI Maturity Assessment results:\n${summary}`,
        )}&assessment=1`
      : "/contact";

    return (
      <div className={styles.results}>
        <h2>Your maturity: {result.levelLabel}</h2>
        <p className={styles.overall}>Overall score {result.overall}/100</p>
        <p>{result.summary}</p>
        <p>
          Recommended next phase: <strong>{phaseName}</strong>
        </p>

        <Radar scores={result.pillarScores.map((p) => p.score)} labels={pillars.map((p) => p.label)} />

        <ul className={styles.pillarList}>
          {result.pillarScores.map((p) => (
            <li key={p.pillarId}>
              <span>{p.label}</span>
              <strong>{p.score}</strong>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => window.print()}
          >
            {m.assessment.print}
          </button>
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={prefill}
              onChange={(e) => setPrefill(e.target.checked)}
            />
            {m.assessment.prefillConsent}
          </label>
          <Link href={contactHref} className="btn btn--primary">
            {m.assessment.goContact}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wizard}>
      <div className={styles.progress} aria-hidden>
        <div style={{ width: `${progress}%` }} />
      </div>
      <p className={styles.meta}>
        Question {step + 1} of {total} ·{" "}
        {pillars.find((p) => p.id === question.pillarId)?.label}
      </p>
      <h2 className={styles.prompt}>{question.prompt}</h2>
      <div className={styles.choices} role="radiogroup" aria-label={question.prompt}>
        {question.choices.map((c) => {
          const selected = answers[question.id] === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`${styles.choice} ${selected ? styles.choiceOn : ""}`}
              onClick={() => selectChoice(c.id)}
            >
              {c.label}
            </button>
          );
        })}
      </div>
      <div className={styles.nav}>
        <button
          type="button"
          className="btn btn--ghost"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          {m.assessment.back}
        </button>
        {step < total - 1 ? (
          <button
            type="button"
            className="btn btn--primary"
            disabled={!answers[question.id]}
            onClick={() => setStep((s) => s + 1)}
          >
            {m.assessment.next}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--primary"
            disabled={!answers[question.id]}
            onClick={finish}
          >
            {m.assessment.seeResults}
          </button>
        )}
      </div>
    </div>
  );
}

function Radar({ scores, labels }: { scores: number[]; labels: string[] }) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 80;
  const n = scores.length;
  const pts = scores
    .map((score, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const rr = (score / 100) * r;
      return `${cx + rr * Math.cos(angle)},${cy + rr * Math.sin(angle)}`;
    })
    .join(" ");
  const axes = labels.map((_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return {
      x2: cx + r * Math.cos(angle),
      y2: cy + r * Math.sin(angle),
      lx: cx + (r + 18) * Math.cos(angle),
      ly: cy + (r + 18) * Math.sin(angle),
      label: labels[i],
    };
  });

  return (
    <svg
      className={styles.radar}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Pillar scores radar chart"
    >
      <circle cx={cx} cy={cy} r={r} className={styles.radarRing} />
      <circle cx={cx} cy={cy} r={r * 0.66} className={styles.radarRing} />
      <circle cx={cx} cy={cy} r={r * 0.33} className={styles.radarRing} />
      {axes.map((a) => (
        <g key={a.label}>
          <line x1={cx} y1={cy} x2={a.x2} y2={a.y2} className={styles.radarAxis} />
          <text x={a.lx} y={a.ly} textAnchor="middle" className={styles.radarLabel}>
            {a.label.split(" ")[0]}
          </text>
        </g>
      ))}
      <polygon points={pts} className={styles.radarPoly} />
    </svg>
  );
}
