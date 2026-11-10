/** GitHub Pages project path. Set NEXT_PUBLIC_BASE_PATH empty for a custom domain. */
export function resolveBasePath(raw = process.env.NEXT_PUBLIC_BASE_PATH): string {
  if (raw === undefined) return "/enterprise-systematizer-landing";
  const trimmed = raw.trim();
  if (trimmed === "" || trimmed === "/") return "";
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withSlash.replace(/\/$/, "");
}

export const basePath = resolveBasePath();
