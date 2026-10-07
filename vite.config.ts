import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    // Cert Copilot: en desarrollo, /api/cert/* va al servidor del PoC (cert-copilot-poc, `pnpm dev`).
    proxy: {
      "/api/cert": { target: "http://localhost:8787", changeOrigin: true },
    },
  },
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
