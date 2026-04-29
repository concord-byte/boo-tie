import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    DATABASE_URL: process.env.DATABASE_URL || "",
    ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET || "",
  },
};

export default nextConfig;
