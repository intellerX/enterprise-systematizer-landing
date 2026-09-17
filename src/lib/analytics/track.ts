type AnalyticsEvent =
  | "cta_click"
  | "assessment_complete"
  | "form_submit";

export function track(event: AnalyticsEvent, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const allowed =
    localStorage.getItem("paise-cookie-consent") &&
    JSON.parse(localStorage.getItem("paise-cookie-consent") || "{}").analytics;
  if (!allowed) return;
  // CAPTCHA-ready / vendor hook — no third-party script until consent.
  window.dispatchEvent(
    new CustomEvent("paise-analytics", { detail: { event, props } }),
  );
}
