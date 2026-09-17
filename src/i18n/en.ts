export const en = {
  nav: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    contact: "Contact",
  },
  cookie: {
    title: "Cookies & analytics",
    body: "We use essential cookies to run this site. Analytics load only if you accept non-essential cookies.",
    accept: "Accept non-essential",
    reject: "Reject non-essential",
    manage: "Cookie preferences",
  },
  assessment: {
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
    success: "Thank you. Your request was received.",
    error: "Something went wrong. Please check the form and try again.",
  },
  footer: {
    legal: "Legal",
    sitemap: "Sitemap",
  },
  emptyInsights: "Insights will appear here as we publish reports and articles.",
} as const;

export type Messages = typeof en;
