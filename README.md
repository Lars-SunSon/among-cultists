# Among Cultists – Begleiter

Begleiter-App für das Brettspiel „Among Cultists": Aufbau-Assistent je nach
Spielerzahl/Variante, Status-Tracker während der Partie (wer lebt/tot ist,
Siegpunkte, Strom, Portal) und Nachschlagewerk (Aktionen, Begegnungen,
Ereignisse, Rollen, AUTOMA-Ermittler).

Jede Person nutzt die App unabhängig auf dem eigenen Handy – kein Sync
zwischen Geräten, kein Backend. Das physische Spielmaterial bleibt die
Autorität; die App ist reine Gedächtnisstütze.

Alle Regelinhalte sind Kurzfassungen in eigenen Worten nach dem Regelheft (2. Auflage,
© Godot Games). Wörtliche Texte, Kartentexte und die Sprüche der Nachtphase stehen nur
im Regelheft, die App verweist mit Seitenangaben darauf. Zahlen und Kartenmengen
(Tabellen S. 6) sind Fakten.

## Struktur

| Pfad | Zweck |
|---|---|
| `src/data/content.ts` | alle Regelinhalte (Tabellen, Rollen, Ereignisse, Aktionen) |
| `src/components/` | UI-Komponenten (Setup, Status, Nachschlagewerk, Icon-Set) |
| `src/styles/theme.css` | Design-Tokens und Stile (Ledertagebuch-Optik) |
| `PRODUCT.md` | Produktkontext (Impeccable-Schema) |
| `.impeccable/surfaces/app.md` | Direction Contract für die visuelle Umsetzung |

## Entwicklung

```bash
npm install
npm run dev
```

## Build & Deployment

Statischer Build, kein Backend. Deployment über GitHub Pages via GitHub
Actions (`.github/workflows/deploy.yml`) bei Push auf `main`.

```bash
npm run build
```
