import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    LEADS_WEBHOOK_URL: process.env.LEADS_WEBHOOK_URL || "",
  },
};

export default nextConfig;
