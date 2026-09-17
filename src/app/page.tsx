import { AgentsSection } from "@/components/home/Agents";
import { Hero } from "@/components/home/Hero";
import { IndustriesPanel } from "@/components/home/Industries";
import { InsightsTeaser } from "@/components/home/Insights";
import { Metrics } from "@/components/home/Metrics";
import { MethodologyStepper } from "@/components/home/Methodology";
import { Practices } from "@/components/home/Practices";
import { Problem } from "@/components/home/Problem";
import { ServicesTeaser } from "@/components/home/Services";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <MethodologyStepper />
      <Metrics />
      <AgentsSection />
      <ServicesTeaser />
      <IndustriesPanel />
      <Practices />
      <InsightsTeaser />
      <section className="section" id="contact" aria-labelledby="home-contact">
        <div className="container">
          <div className="section__head">
            <p className="section__eyebrow">Contact</p>
            <h2 id="home-contact">{site.contact.title}</h2>
            <p>{site.contact.intro}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
