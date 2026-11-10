"use client";

import { Cases } from "@/components/home/Cases";
import { Benefits } from "@/components/home/Benefits";
import { FactoryFlow } from "@/components/home/FactoryFlow";
import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { SelfImprove } from "@/components/home/SelfImprove";
import { Team } from "@/components/home/Team";
import { ContactForm } from "@/components/contact/ContactForm";
import { getLanding } from "@/content/landing";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "@/components/home/landing.module.css";

export default function HomePage() {
  const { locale } = useI18n();
  const copy = getLanding(locale);

  return (
    <>
      <Hero copy={copy.hero} />
      <Problem copy={copy.problem} />
      <Benefits copy={copy.benefits} />
      <FactoryFlow copy={copy.process} locale={locale} />
      <SelfImprove copy={copy.improve} />
      <Team copy={copy.team} />
      <Cases copy={copy.cases} />
      <div className={`container ${styles.band}`}>
        <div className={styles.bandInner}>
          <h2>{copy.closing.title}</h2>
          <p>{copy.closing.body}</p>
          <a className="btn btn--primary" href="#contacto">
            {copy.closing.cta}
          </a>
        </div>
      </div>
      <section className="section" id="contacto" aria-labelledby="home-contact">
        <div className="container">
          <div className="section__head">
            <p className="section__eyebrow">{copy.contact.eyebrow}</p>
            <h2 id="home-contact">{copy.contact.title}</h2>
            <p>{copy.contact.intro}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
