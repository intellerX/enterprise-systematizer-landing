import Link from "next/link";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "36rem" }}>
        <p className="section__eyebrow">404</p>
        <h1>Page not found</h1>
        <p>
          That route does not exist on {site.brand}. Head home or request a
          consultation.
        </p>
        <p style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn--primary">
            Home
          </Link>
          <Link href="/contact" className="btn btn--ghost">
            Contact
          </Link>
        </p>
      </div>
    </section>
  );
}
