import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let phones on the local network load dev assets (http://<LAN-IP>:3000).
  allowedDevOrigins: ["192.168.*.*", "172.20.10.*"],
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
