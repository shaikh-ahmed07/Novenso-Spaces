import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root so a lockfile elsewhere on the machine is never picked up.
  turbopack: { root: __dirname },
  poweredByHeader: false,
};

export default nextConfig;
