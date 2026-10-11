import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/theme.css";
import App from "./App.tsx";
import leatherTexture from "./assets/textures/leather-tile.jpg";
import parchmentTexture from "./assets/textures/parchment-tile.jpg";
import deckleTexture from "./assets/textures/deckle-edge.jpg";

// Foto-Texturen aus CC0-Quellen (Leder + Pergament + selbst gebauter Buchrand,
// siehe assets/textures/QUELLEN.md), nicht per CSS simuliert. Als CSS-Variablen injiziert, damit Vite die Asset-URLs
// korrekt bündelt/hashed/basispfad-prefixt.
const root = document.documentElement.style;
root.setProperty("--tex-leather", `url(${leatherTexture})`);
root.setProperty("--tex-parchment", `url(${parchmentTexture})`);
root.setProperty("--tex-deckle", `url(${deckleTexture})`);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
