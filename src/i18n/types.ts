import type { Interest } from "@/content/site";

export type Messages = {
  skip: string;
  nav: {
    openMenu: string;
    closeMenu: string;
    contact: string;
    primary: string;
    language: string;
  };
  cookie: {
    title: string;
    body: string;
    accept: string;
    reject: string;
    manage: string;
  };
  assessment: {
    eyebrow: string;
    title: string;
    intro: string;
    next: string;
    back: string;
    seeResults: string;
    print: string;
    prefillConsent: string;
    goContact: string;
  };
  form: {
    submit: string;
    sending: string;
    success: string;
    successDetail: string;
    backHome: string;
    error: string;
    fullName: string;
    businessEmail: string;
    phone: string;
    company: string;
    role: string;
    interest: string;
    interestPlaceholder: string;
    message: string;
    files: string;
    consentBefore: string;
    terms: string;
    consentAnd: string;
    privacy: string;
    note: string;
    staticHint: string;
    errors: {
      fullName: string;
      businessEmail: string;
      interest: string;
      message: string;
      consent: string;
      files: string;
      fileCount: string;
      fileSize: string;
      rate: string;
    };
    interestLabels: Record<Interest, string>;
  };
  footer: {
    legal: string;
    sitemap: string;
    rights: string;
    tagline: string;
    legalLinks: readonly { href: string; label: string }[];
  };
  emptyInsights: string;
  insightsPage: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    body: string;
    home: string;
    contact: string;
  };
  servicePage: {
    eyebrow: string;
    cta: string;
  };
};
