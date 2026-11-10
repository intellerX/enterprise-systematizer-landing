import type { NextConfig } from "next";
import { resolveBasePath } from "./src/lib/base-path";

const basePath = resolveBasePath();

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // Allow LAN preview (phones / other machines hit 192.168.x.x)
  allowedDevOrigins: ["192.168.1.202", "127.0.0.1", "localhost"],
};

export default nextConfig;
