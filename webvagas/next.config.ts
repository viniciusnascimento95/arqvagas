import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    domains: ["images.unsplash.com"], // Permite imagens desse domínio
  },
};

export default nextConfig;
