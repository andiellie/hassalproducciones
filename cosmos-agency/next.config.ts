import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El repo tiene otro package-lock.json en la carpeta padre; fijamos la raíz a esta app.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
