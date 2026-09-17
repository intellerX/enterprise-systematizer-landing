import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN preview (phones / other machines hit 192.168.x.x)
  allowedDevOrigins: ["192.168.1.202", "127.0.0.1", "localhost"],
};

export default nextConfig;
