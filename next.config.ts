import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita que o Turbopack suba até o package-lock.json da pasta do usuário
  turbopack: { root: __dirname },
};

export default nextConfig;
