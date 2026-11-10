import Link from "next/link";
import { getLocale } from "@/i18n/get-locale";
import { getMessages } from "@/i18n/get-messages";

export default async function NotFound() {
  const m = getMessages(await getLocale());
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "36rem" }}>
        <p className="section__eyebrow">{m.notFound.eyebrow}</p>
        <h1>{m.notFound.title}</h1>
        <p>{m.notFound.body}</p>
        <p style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn--primary">
            {m.notFound.home}
          </Link>
          <Link href="/#contacto" className="btn btn--ghost">
            {m.notFound.contact}
          </Link>
        </p>
      </div>
    </section>
  );
}
