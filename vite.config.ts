import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages Project-Site: https://<user>.github.io/among-cultists/
export default defineConfig({
  base: "/among-cultists/",
  plugins: [react()],
});
