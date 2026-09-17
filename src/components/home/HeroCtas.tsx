"use client";

import Link from "next/link";
import { track } from "@/lib/analytics/track";
import styles from "./Hero.module.css";

type Cta = { label: string; href: string };

export function HeroCtas({
  primary,
  secondary,
}: {
  primary: Cta;
  secondary: Cta;
}) {
  return (
    <div className={`${styles.ctas} rise`}>
      <Link
        href={primary.href}
        className="btn btn--primary"
        onClick={() => track("cta_click", { id: "hero_primary" })}
      >
        {primary.label}
      </Link>
      <Link
        href={secondary.href}
        className="btn btn--ghost"
        onClick={() => track("cta_click", { id: "hero_secondary" })}
      >
        {secondary.label}
      </Link>
    </div>
  );
}
