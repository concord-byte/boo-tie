import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    LEADS_WEBHOOK_URL: process.env.LEADS_WEBHOOK_URL || "",
    DATABASE_URL: process.env.DATABASE_URL || "",
  },
};

export default nextConfig;
