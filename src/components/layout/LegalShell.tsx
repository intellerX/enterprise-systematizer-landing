export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "44rem" }}>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}
