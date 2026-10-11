# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React (TypeScript). Static build, deployed to GitHub Pages – kein eigenes Backend, kein Server.

## Users

Lars und seine Mitspieler:innen (4–8 Personen) beim gemeinsamen Spielen des Brettspiels
„Among Cultists". Jede Person nutzt ihr eigenes Smartphone während einer Spielrunde am
Tisch – zum Aufbauen der Partie und danach live während des Spiels, um sich Regeln,
Siegbedingungen und den aktuellen Spielstand ins Gedächtnis zu rufen.

## Product Purpose

Ein digitaler Begleiter für „Among Cultists": hilft beim korrekten Aufbau je nach
Spielerzahl/Variante und dient während der Partie als schnelles Nachschlagewerk und
Status-Tracker (Runde/Phase, wer lebt/tot ist, Siegpunkte, Strom, Portal). Erfolg heißt:
am Tisch keine Regel-Diskussion mehr nachschlagen zu müssen und jederzeit zu wissen, ob
eine Siegbedingung gerade erfüllt ist.

## Positioning

Anders als das gedruckte Regelheft oder die offiziellen Player-Aid-Karten bietet die App
einen Setup-Assistenten, der exakt auf die gewählte Spielerzahl und Variante (Automa,
erweiterte/Experten-Rollen) zugeschnitten ist, sowie einen live mitlaufenden
Siegbedingungs-Check, der aus manuell eingetragenem Spielstand fortlaufend prüft, ob ein
Team gerade gewonnen hat. Das leistet keine physische Karte.

## Operating Context

Gespielt wird an einem Tisch, im geselligen Rahmen, mit dem kompletten physischen
Spielmaterial (Spielplan, Karten, Marker) als Autorität – die App ersetzt nichts davon,
sie begleitet nur. Sprache durchgängig Deutsch (wie das Quellmaterial). Jede Person nutzt
ihr eigenes Gerät unabhängig; es gibt keinen Abgleich zwischen den Geräten – jede Instanz
muss für sich allein vollständig nutzbar sein.

## Capabilities and Constraints

- Regelinhalte sind **Kurzfassungen in eigenen Worten** nach dem Regelheft, mit
  Seitenangaben. Zahlen und Kartenmengen (Tabellen) stimmen exakt mit dem Heft überein.
  Wörtliche Übernahmen von Regel- und Kartentexten gibt es nicht (Stand 11.10.2026).
  Nichts wird erfunden oder ergänzt.
- Abgedeckter Umfang: Basisspiel für 4–8 Personen, Automa-Ermittler-Variante (4/6
  Personen), erweiterte/Experten-Rollen inkl. Loyalitätswert-Budgetierung.
- Reines Tracker-/Nachschlagewerkzeug: keine digitale Spielmechanik (kein Kartenziehen,
  keine digitale Raum-Deck-Verwaltung). Das physische Material bleibt im Einsatz.
- Kein Sync zwischen Geräten. Jedes Handy trägt eigenständig ein, was am Tisch laut
  gesagt/entschieden wird.
- Statische Web-App ohne Backend, Deployment über GitHub Pages.

## Brand Commitments

- Name des Spiels: „Among Cultists" – wird nicht verändert oder anders geschrieben.
- Bindende visuelle Vorgabe des Nutzers: aufgeschlagenes altes Ledertagebuch mit
  vergilbtem Papier (Referenzbild vorhanden) sowie die offiziellen Player-Aid-Cheat-Sheets
  (Pergament-Karten mit Goldrahmen auf dunklem Holz/Leder, gezeichnete Icon-Sprache).
  Konkrete Palette/Typografie/Komponenten werden in New-Work daraus abgeleitet, nicht neu
  erfunden.

## Evidence on Hand

- Regelheft "Among Cultists" (2. Auflage, © 2022 Godot Games) und die Player-Aid-Karte liegen lokal beim Autor und sind **nicht Teil dieses Repos**. Die App enthält nur eigene Kurzfassungen mit Seitenangaben.
- Visuelle Stilvorlage (Ledertagebuch): nur als Stimmung. Das Referenzbild stammt nicht von Lars und wird deshalb **nicht im Repo verwertet**; alle Texturen sind seit 11.10.2026 CC0 (siehe `src/assets/textures/QUELLEN.md`).
- Kein Logo und kein Markenmaterial im Repo – nichts darüber hinaus annehmen.

## Product Principles

1. Das Regelheft ist Wahrheit – jede Zahl und Bedingung stimmt mit dem Heft überein, die
   Formulierung ist eigen und kurz. Im Zweifel gilt das Heft, nie improvisiert.
2. Das physische Spiel bleibt das Spiel – die App ergänzt, ersetzt aber keine
   Spielmechanik.
3. Ein Handy pro Spieler, kein Abgleich – jede Instanz ist für sich allein vollständig
   nutzbar, ohne Netz oder Gegenstelle zur Laufzeit.
4. Schnell am Tisch nutzbar – mitten in der Partie muss man in Sekunden bei der richtigen
   Information landen (klare Struktur, große Tap-Ziele, keine Sackgassen).
