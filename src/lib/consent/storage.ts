export type ConsentState = {
  essential: true;
  analytics: boolean;
  decidedAt: string | null;
};

const STORAGE_KEY = "paise-cookie-consent";

export function readConsent(): ConsentState {
  if (typeof window === "undefined") {
    return { essential: true, analytics: false, decidedAt: null };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { essential: true, analytics: false, decidedAt: null };
    const parsed = JSON.parse(raw) as ConsentState;
    return {
      essential: true,
      analytics: !!parsed.analytics,
      decidedAt: parsed.decidedAt ?? null,
    };
  } catch {
    return { essential: true, analytics: false, decidedAt: null };
  }
}

export function writeConsent(analytics: boolean) {
  const state: ConsentState = {
    essential: true,
    analytics,
    decidedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("paise-consent", { detail: state }));
  return state;
}
