import type { Messages } from "./types";

export const en = {
  skip: "Skip to content",
  nav: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    contact: "Contact",
    primary: "Primary",
    language: "Language",
  },
  cookie: {
    title: "Cookies & analytics",
    body: "We use essential cookies to run this site. Analytics load only if you accept non-essential cookies.",
    accept: "Accept non-essential",
    reject: "Reject non-essential",
    manage: "Cookie preferences",
  },
  assessment: {
    eyebrow: "Self-serve",
    title: "AI Maturity Assessment",
    intro:
      "Fifteen questions across five pillars. No account required. Results stay in your browser unless you choose to share them.",
    next: "Next",
    back: "Back",
    seeResults: "See results",
    print: "Print / download",
    prefillConsent: "Pre-fill the contact form with my results",
    goContact: "Continue to contact",
  },
  form: {
    submit: "Send request",
    sending: "Sending…",
    success: "Done. Your message is ready.",
    successDetail:
      "Your mail app or the configured channel opened with the text filled in. This static site does not store it on a server.",
    backHome: "Back to home",
    error: "Something went wrong. Please check the form and try again.",
    fullName: "Full name",
    businessEmail: "Business email",
    phone: "Phone",
    company: "Company",
    role: "Role",
    interest: "Interest",
    interestPlaceholder: "Select…",
    message: "Message",
    files: "Attachments (up to 3, ≤ 5 MB total)",
    consentBefore: "I agree to the",
    terms: "Terms",
    consentAnd: "and",
    privacy: "Privacy",
    note: "Tell us what you want to change. We reply within two business days. Your data is handled according to our privacy notice.",
    staticHint:
      "Sending opens your mail app with the message filled in. Attachments are not included. If an external form or WhatsApp is configured for the build, that channel is used instead.",
    errors: {
      fullName: "Enter your full name.",
      businessEmail: "Enter a valid business email.",
      interest: "Choose an interest.",
      message: "Tell us a bit more — at least a sentence.",
      consent: "Consent is required.",
      files: "Check the attachments.",
      fileCount: "At most 3 files.",
      fileSize: "Attachments must stay within 5 MB total.",
      rate: "Too many attempts. Wait a moment and try again.",
    },
    interestLabels: {
      "General consultation": "General consultation",
      "Paid assessment": "Paid assessment",
      "Fixed-scope pilot": "Fixed-scope pilot",
      "Team extension": "Team extension",
      "Managed service": "Managed service",
    },
  },
  footer: {
    legal: "Legal",
    sitemap: "Sitemap",
    rights: "All rights reserved.",
    tagline:
      "An AI-powered software factory. Quality always comes before everything else.",
    legalLinks: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/cookies", label: "Cookies" },
      { href: "/legal/impressum", label: "Impressum" },
    ],
  },
  emptyInsights: "Insights will appear here as we publish reports and articles.",
  insightsPage: {
    eyebrow: "Content",
    title: "Insights",
    intro: "Notes on how the work gets done. No client logos or vanity case studies.",
  },
  notFound: {
    eyebrow: "404",
    title: "Page not found",
    body: "That route does not exist on intellerX. Head home or write to us.",
    home: "Home",
    contact: "Contact",
  },
  servicePage: {
    eyebrow: "Service",
    cta: "Talk with the team",
  },
} satisfies Messages;

export type { Messages };
