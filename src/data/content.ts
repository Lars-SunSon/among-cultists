// Kurzfassungen in eigenen Worten nach dem Regelheft "Among Cultists" (2. Auflage,
// © 2022 Godot Games) und der Player-Aid-Karte. Maßgeblich ist immer das Regelheft,
// die Seitenangaben beziehen sich darauf. Zahlen und Kartenmengen sind Fakten aus den
// Tabellen (S. 6). Keine wörtlichen Übernahmen: Regeltexte, Kartentexte und die
// Sprüche der Nachtphase stehen nur im Regelheft.

export type PlayerCount = 4 | 5 | 6 | 7 | 8;

export interface CountTable {
  count: PlayerCount;
  kultistenCount: 1 | 2;
  ermittlerZielSiegpunkte: number;
  kultistenMinToteErmittler: number;
  pulsStartdeck: string;
  raumStartkarten: string;
  nachziehkarten: string;
  raummarker: string;
  portalFristRunden: number;
  hatAutoma: boolean;
  erstpartieZusatzrolle: string;
}

// Regelheft S. 6 "Verwendetes Material und Siegbedingungen nach Personenzahl"
// (Ermittler-Deck pro Person und Kultisten-Deck pro Person sind für alle
// Personenzahlen identisch, siehe unten als eigene Konstanten.)
export const ERMITTLER_DECK_PRO_PERSON = "9x Lebend, 8x Erfolg, 1x Route";
export const KULTISTEN_DECK_PRO_PERSON =
  "6x Lebend, 3x Tot, 2x Erfolg, 4x Misserfolg, 2x Sabotage, 1x Route";
export const UNSICHERE_WEGE_DECK = "1x Erfolg, 1x Misserfolg";

export const COUNT_TABLES: CountTable[] = [
  {
    count: 4,
    kultistenCount: 1,
    ermittlerZielSiegpunkte: 10,
    kultistenMinToteErmittler: 3,
    pulsStartdeck: "5x Lebend, 1x Tot",
    raumStartkarten: "5x Erfolg, 3x Misserfolg, 1x Sabotage",
    nachziehkarten: "5x Erfolg, 3x Misserfolg, 1x Sabotage",
    raummarker: "5x Erforscht, 4x mit Unsichere-Wege-Symbol",
    portalFristRunden: 3,
    hatAutoma: true,
    erstpartieZusatzrolle:
      "Spielt mit AUTOMA-Ermittler (siehe S. 21) – für 4 Personen gibt es keine reguläre Erstpartie-Variante.",
  },
  {
    count: 5,
    kultistenCount: 1,
    ermittlerZielSiegpunkte: 10,
    kultistenMinToteErmittler: 3,
    pulsStartdeck: "5x Lebend, 1x Tot",
    raumStartkarten: "5x Erfolg, 3x Misserfolg, 1x Sabotage",
    nachziehkarten: "5x Erfolg, 3x Misserfolg, 1x Sabotage",
    raummarker: "5x Erforscht, 4x mit Unsichere-Wege-Symbol",
    portalFristRunden: 3,
    hatAutoma: false,
    erstpartieZusatzrolle: "Nur Seherin als Zusatzrolle, keine anderen.",
  },
  {
    count: 6,
    kultistenCount: 1,
    ermittlerZielSiegpunkte: 12,
    kultistenMinToteErmittler: 4,
    pulsStartdeck: "5x Lebend, 1x Tot",
    raumStartkarten: "4x Erfolg, 4x Misserfolg, 1x Sabotage",
    nachziehkarten: "4x Erfolg, 4x Misserfolg, 1x Sabotage",
    raummarker: "4x Erforscht, 5x mit Unsichere-Wege-Symbol",
    portalFristRunden: 3,
    hatAutoma: true,
    erstpartieZusatzrolle: "Nur Seherin als Zusatzrolle, keine anderen.",
  },
  {
    count: 7,
    kultistenCount: 2,
    ermittlerZielSiegpunkte: 12,
    kultistenMinToteErmittler: 4,
    pulsStartdeck: "nicht vorhanden",
    raumStartkarten: "5x Erfolg, 4x Misserfolg, 1x Sabotage",
    nachziehkarten: "5x Erfolg, 4x Misserfolg, 1x Sabotage",
    raummarker: "6x Erforscht, 4x mit Unsichere-Wege-Symbol",
    portalFristRunden: 2,
    hatAutoma: false,
    erstpartieZusatzrolle: "Spielt mit 2 Kultisten, ohne andere Rollen.",
  },
  {
    count: 8,
    kultistenCount: 2,
    ermittlerZielSiegpunkte: 13,
    kultistenMinToteErmittler: 5,
    pulsStartdeck: "7x Lebend, 1x Tot",
    raumStartkarten: "5x Erfolg, 5x Misserfolg, 1x Sabotage",
    nachziehkarten: "5x Erfolg, 5x Misserfolg, 1x Sabotage",
    raummarker: "5x Erforscht, 6x mit Unsichere-Wege-Symbol",
    portalFristRunden: 2,
    hatAutoma: false,
    erstpartieZusatzrolle: "Nur Seherin als Zusatzrolle, keine anderen.",
  },
];

export function countTableFor(count: PlayerCount): CountTable {
  const t = COUNT_TABLES.find((c) => c.count === count);
  if (!t) throw new Error("Unbekannte Personenzahl: " + count);
  return t;
}

// Regelheft S. 23 "Für fortgeschrittene Meuchelmörder" – empfohlene Rollen
export const FORTGESCHRITTEN_ROLLEN: Record<Exclude<PlayerCount, 4>, string> = {
  5: "1 Kultistin, Seherin, 1 zufällige aus Grünschnabel/Tollpatsch/Weichei",
  6: "1 Kultistin, Seherin, 1 zufällige aus Strahlende Erscheinung/Infizierter/Super-Geist, Brandstifterin",
  7: "2 Kultistinnen, 1 zufällige aus Grünschnabel/Tollpatsch/Weichei, Brandstifterin, Assassine",
  8: "2 Kultistinnen, Seherin, Mechanikerin, Brandstifterin, Assassine",
};

// Regelheft S. 20 "Für Social-Deduction-Experten" – empfohlene Erschwernis
export const EXPERTEN_ERSCHWERNIS: Record<Exclude<PlayerCount, 4>, string> = {
  5: "+1 Kultisten-Loyalität",
  6: "+1 Kultisten-Loyalität",
  7: "+3 Kultisten-Loyalität",
  8: "+1 Ermittler-Loyalität",
};

export type Team = "Ermittler" | "Kultisten";

export interface Role {
  name: string;
  team: Team;
  loyalitaet: number;
  beschreibung: string;
  empfohlenePersonenzahl?: string;
}

// Rollen (Regelheft S. 24) – Kurzfassungen in eigenen Worten.
export const ROLLEN: Role[] = [
  { name: "Ermittlerin", team: "Ermittler", loyalitaet: 0, beschreibung: "Keine Sonderfähigkeit." },
  {
    name: "Strahlende Erscheinung",
    team: "Ermittler",
    loyalitaet: 1,
    beschreibung: "Nach dem Tod Marker aufdecken: Ihr Ort hat dauerhaft Licht und Strom.",
  },
  {
    name: "Infizierte·r",
    team: "Ermittler",
    loyalitaet: 1,
    beschreibung: "Nach dem Tod Marker aufdecken: Bis zum Ende der nächsten Runde werden bei Begegnungen keine Karten getauscht.",
  },
  {
    name: "Super-Geist",
    team: "Ermittler",
    loyalitaet: 1,
    beschreibung: "Nach dem Tod Marker aufdecken: Der Geist darf alle Raum-Aktionen wie ein Lebender, nur keine Begegnungen abhandeln.",
  },
  {
    name: "Mechaniker·in",
    team: "Ermittler",
    loyalitaet: 3,
    beschreibung: "Solange der Charakter lebt, darf er seine Route ignorieren.",
  },
  {
    name: "Kultist·in",
    team: "Kultisten",
    loyalitaet: 0,
    beschreibung: "Keine Sonderfähigkeit.",
    empfohlenePersonenzahl: "5-8",
  },
  {
    name: "Grünschnabel",
    team: "Kultisten",
    loyalitaet: 1,
    beschreibung: "Stirbt (wird Geist), sobald er Kamera nutzen oder Abstimmung einleiten ausführt, und stimmt dann als Geist mit ab.",
  },
  {
    name: "Tollpatsch",
    team: "Kultisten",
    loyalitaet: 1,
    beschreibung: "Stirbt nach Portal schließen und nach jedem Einsatz des Messers, auch wenn ein Ereignis es erzwingt.",
  },
  {
    name: "Weichei",
    team: "Kultisten",
    loyalitaet: 1,
    beschreibung: "Stirbt, wenn er bei Zustand prüfen einen toten Charakter enthüllen musste, auch über das Ereignis „Falsche Augen im Portrait“.",
  },
  {
    name: "Brandstifter·in",
    team: "Kultisten",
    loyalitaet: 2,
    beschreibung:
      "Aufbau-Änderung im Ermittler-Deck (2× Erfolg weg, dafür 1× Sabotage und 1× Misserfolg). Hat er bis Ende von Runde 5 seine 2 roten Karten nicht gespielt, stirbt er. Der genaue Ablauf am Rundenende steht im Regelheft.",
  },
  {
    name: "Assassine",
    team: "Ermittler",
    loyalitaet: 0,
    beschreibung:
      "Darf einmal im Spiel am selben Ort ein Ziel mit Assassinen-Angriff ermorden (Marker aufdecken, keine Abstimmung). Traf es den letzten Kultisten, endet die Partie sofort. Das Ziel muss seine Rolle nur preisgeben, wenn sie es verlangt.",
    empfohlenePersonenzahl: "7-8",
  },
  {
    name: "Seher·in",
    team: "Ermittler",
    loyalitaet: 0,
    beschreibung: "Erfährt in der Nachtphase, wer die Kultisten sind. Wird sie am Ende von den Kultisten erkannt, gewinnen diese, egal wie es sonst stand.",
    empfohlenePersonenzahl: "5, 6, 8",
  },
];

export interface EventCard {
  name: string;
  anzahl: number;
  effekt: string;
}

// Ereignisse (Regelheft S. 23) – 12 Marker, für alle Personenzahlen gleich. Kurzfassungen in eigenen Worten.
export const EREIGNISSE: EventCard[] = [
  {
    name: "Blitzeinschlag",
    anzahl: 2,
    effekt:
      "Strommarker umdrehen: Strom an oder aus. Wieder ändern lässt er sich nur durch einen weiteren Blitzeinschlag oder die Aktion Strom neustarten. Ohne Strom: keine Kamera, und Begegnungen schon ab 3 Charakteren.",
  },
  {
    name: "Offene Geheimtüren",
    anzahl: 2,
    effekt: "Alle Räume (keine Gänge) gleicher Farbe gelten als verbunden, bis ein neues Ereignis aufgedeckt wird. Das kann sofort Begegnungen auslösen.",
  },
  {
    name: "Walkie-Talkie-Ausfall",
    anzahl: 1,
    effekt: "Bis zum nächsten Ereignis nicht mehr akustisch kommunizieren. Spielansagen wie „Du bist dran“ sind erlaubt, Abstimmungen laufen schweigend.",
  },
  {
    name: "Falsche Augen im Portrait",
    anzahl: 1,
    effekt:
      "Der lebende Charakter mit dem Startmarker prüft das Puls-Deck eines anderen lebenden Charakters (nicht sein eigenes), ggf. mit Mord und Abstimmung. Ist er selbst tot, passiert nichts.",
  },
  {
    name: "Gestärkte Moral",
    anzahl: 1,
    effekt: "Alle haben in der nächsten Bewegungsphase +1 Bewegungspunkt, bis ein neues Ereignis aufgedeckt wird.",
  },
  {
    name: "Verlorene Moral",
    anzahl: 1,
    effekt: "Alle haben in der nächsten Bewegungsphase −1 Bewegungspunkt, bis ein neues Ereignis aufgedeckt wird. Gilt nicht für Geister.",
  },
  {
    name: "Herr der Lage",
    anzahl: 1,
    effekt:
      "Die lebende Person mit dem Startmarker zieht heimlich einen Ereignismarker: entweder ungesehen aus dem Spiel nehmen oder zurück in den Beutel. Das Wissen darf geteilt werden, Kultisten dürfen lügen.",
  },
  {
    name: "Das Portal öffnet sich",
    anzahl: 1,
    effekt:
      "Portal im grünen Raum platzieren und einen Erinnerungsmarker 2 (7-8 Personen) bzw. 3 Runden (4-6 Personen) voraus legen. Schaffen es 2 lebende Charaktere in derselben Runde, dort Portal schließen auszuführen, sinkt der Zielwert um 1, sonst steigt er um 1. Danach den Marker zurücklegen.",
  },
  {
    name: "Brüchige Scheiben",
    anzahl: 1,
    effekt:
      "Die 2 obersten Karten des Nachziehstapels ungesehen ins Unsichere-Wege-Deck mischen, 1 Karte daraus ziehen und abhandeln, dann zurückmischen.",
  },
  {
    name: "Spiegel",
    anzahl: 1,
    effekt: "Das Ereignis der Vorrunde wiederholen (in Runde 1 passiert nichts). War es „Das Portal öffnet sich“, bleibt das Portal 1 Runde länger offen.",
  },
];

export interface ActionCard {
  name: string;
  kategorie: "Charakter-Aktion" | "Raum-Aktion";
  bedingung: string;
  effekt: string;
}

// Aktionen (Regelheft S. 15-19) – Kurzfassungen in eigenen Worten.
export const AKTIONEN: ActionCard[] = [
  {
    name: "Zustand prüfen",
    kategorie: "Charakter-Aktion",
    bedingung: "Mindestens ein lebendes Ziel am selben Ort, oder du bist in einem Raum mit Kamera.",
    effekt:
      "Puls-Deck des Ziels mischen und heimlich ansehen. Nur Lebend-Karten: verdeckt zurück. Mit Tot-Karte: Ermittler müssen es melden (Tot-Karte offen, es kommt zur Abstimmung), Kultisten dürfen lügen und verdeckt zurücklegen.",
  },
  {
    name: "Gang sichern",
    kategorie: "Charakter-Aktion",
    bedingung: "Du stehst in einem Gang.",
    effekt: "1 Karte Erfolg, Misserfolg oder Sabotage verdeckt ins Unsichere-Wege-Deck mischen.",
  },
  {
    name: "Kultisten bekämpfen",
    kategorie: "Charakter-Aktion",
    bedingung: "Du bist mit einem Kultisten-Marker im selben Raum.",
    effekt: "Den Marker aus dem Spiel nehmen.",
  },
  {
    name: "Fischmensch verscheuchen",
    kategorie: "Charakter-Aktion",
    bedingung: "Du hast das Messer (Startmarker) und betrittst den Gang mit dem Fischmensch.",
    effekt: "Der Fischmensch geht zurück an den See, der Gang ist wieder begehbar.",
  },
  {
    name: "Assassinen-Angriff ausführen",
    kategorie: "Charakter-Aktion",
    bedingung: "Du bist die Assassine, und ein lebendes Ziel, das du für einen Kultisten hältst, ist am selben Ort.",
    effekt: "Rolle aufdecken und das Ziel ermorden, ohne Abstimmung. War es der letzte Kultist, endet die Partie sofort.",
  },
  {
    name: "Raum-Deck füllen",
    kategorie: "Raum-Aktion",
    bedingung: "Du bist in einem Raum.",
    effekt: "1 Karte Erfolg, Misserfolg oder Sabotage aufs Raum-Deck legen. Bei der ersten dritten Karte: Raummarker auf „erforscht“ drehen, ggf. Unsichere-Wege-Karte abhandeln.",
  },
  {
    name: "Raum prüfen",
    kategorie: "Raum-Aktion",
    bedingung: "Du bist in einem erforschten Raum.",
    effekt: "Raum-Deck mischen und die oberste Karte ziehen: Erfolg legt ein Buch ins Regal, Misserfolg bewirkt nichts, Sabotage bringt das Buch zurück in den Raum. Die Karte scheidet aus dem Spiel aus.",
  },
  {
    name: "Abstimmung einleiten",
    kategorie: "Raum-Aktion",
    bedingung: "1× pro Runde im hellblauen Raum (Cafeteria), wenn der Abstimmungsmarker aktiv ist. Pflicht, wenn ein Mord enthüllt wird.",
    effekt: "Offen diskutieren, dann blind abstimmen. Einfache Mehrheit (ohne gleich viele Enthaltungen) eliminiert den Charakter, er wird zum Geist.",
  },
  {
    name: "Kamera nutzen",
    kategorie: "Raum-Aktion",
    bedingung: "Du bist im roten Raum (Überwachung) und der Strom ist an.",
    effekt: "Unabhängig von der Route: 1 erforschten Raum prüfen oder den Zustand eines lebenden Ziels (nicht deinen eigenen).",
  },
  {
    name: "Strom neustarten",
    kategorie: "Raum-Aktion",
    bedingung: "Du bist im roten Raum (Überwachung) und der Strom ist aus.",
    effekt: "Strom wieder an (Strommarker umdrehen).",
  },
  {
    name: "Portal schließen",
    kategorie: "Raum-Aktion",
    bedingung: "Du und ein weiterer lebender Charakter seid im grünen Raum, solange das Portal offen ist. Beide Aktionen werden verbraucht.",
    effekt: "In der Frist geschafft: Portal weg, Zielwert −1. Frist verpasst: Portal bleibt, Zielwert +1.",
  },
];

// Begegnungen (Regelheft S. 13)
export const BEGEGNUNGS_TABELLE = [
  { strom: "An", anzahl: "genau 2", begegnung: true },
  { strom: "An", anzahl: "3 oder mehr", begegnung: false },
  { strom: "Aus", anzahl: "2 oder mehr", begegnung: true },
];

export const BEGEGNUNG_TEXT =
  "Alle Beteiligten legen je 1 Karte Lebend oder Tot aus der Hand verdeckt auf das Puls-Deck genau einer anderen beteiligten Person. Die erhaltene Karte bleibt ungesehen. Begegnungen entstehen nur beim Betreten eines Ortes, Geister nehmen nie teil.";

export interface Privileg {
  gruppe: string;
  eintraege: string[];
}

// Privilegien der Lebenden und der Toten (Regelheft S. 19)
export const PRIVILEGIEN: Privileg[] = [
  {
    gruppe: "Lebende Charaktere",
    eintraege: [
      "Bewegung: bis zu 3 Bewegungspunkte",
      "Handeln Begegnungen ab",
      "Alle Charakter- und Raum-Aktionen",
      "Der Startcharakter darf das Messer (Startmarker) nutzen",
    ],
  },
  {
    gruppe: "Geister (tote Charaktere)",
    eintraege: [
      "Bewegung: Teleport in jeden Raum oder Gang",
      "Nie Teil einer Begegnung",
      "Alle Charakter-Aktionen",
      "Von den Raum-Aktionen nur Raum-Deck füllen und Raum prüfen",
    ],
  },
  { gruppe: "Ermittler (lebend oder Geist)", eintraege: ["Müssen bei Raum-Aktionen ihre Route befolgen."] },
  { gruppe: "Kultisten (lebend oder Geist)", eintraege: ["Dürfen bei Raum-Aktionen ihre Route ignorieren."] },
];

// Ziel des Spiels und Siegbedingungen (Regelheft S. 3); die Zahlen kommen aus COUNT_TABLES.
export const SIEGBEDINGUNGEN_TEXT = {
  ermittlerAllgemein:
    "Ermittler gewinnen innerhalb von 10 Runden mit den nötigen Siegpunkten oder wenn alle Kultisten identifiziert und eliminiert sind.",
  kultistenAllgemein:
    "Kultisten gewinnen, wenn genug Ermittler ermordet sind (siehe Tabelle), wenn die Ermittler ihre Siegpunkte verfehlen oder wenn am Ende die Seherin erkannt wird. Letzteres sticht alles.",
  soloKultistRegel:
    "Nur bei 4-6 Personen mit 1 Kultist: Er darf am Rundenende behaupten, genug tote Ermittler zu haben, und die Partie beenden. Stimmt es, gewinnt er sofort, irrt er sich, verliert er sofort. Wird er vorher enttarnt, verliert er ebenfalls.",
  timingRegel78:
    "Bei 7/8 Personen (2 Kultisten): Waren die nötigen toten Ermittler schon in der Vorrunde erreicht, als der letzte Kultist fiel, gewinnen die Kultisten. Fällt der letzte nötige Ermittler in derselben Runde wie der letzte Kultist, gewinnen die Ermittler.",
  seherinRegel:
    "Mit Seherin: Fällt der letzte Kultist, haben die Kultisten einen Versuch, die Seherin zu erraten. Trifft er, gewinnen die Kultisten sofort, sonst die Ermittler.",
};

export const RUNDEN_PHASEN = [
  {
    name: "1. Bewegungsphase",
    text: "Alle bewegen sich (max. 3 Punkte) und handeln Begegnungen ab, bis jeder einmal dran war. Die Bewegung darf nicht am Startort enden.",
  },
  { name: "2. Ereignisphase", text: "1 Ereignismarker aus dem Beutel ziehen, sofort abhandeln und auf die Uhr legen." },
  { name: "3. Aktionsphase", text: "Im Uhrzeigersinn führt jede Person genau 1 Charakter- oder Raum-Aktion aus oder passt." },
  {
    name: "4. Aufräumphase",
    text: "Bei 4-6 Personen darf der Solo-Kultist die Partie beenden. Dann Abstimmungsmarker aktivieren, Startmarker und Phasenanzeiger weitergeben, Uhr um eine Stunde vorstellen.",
  },
];

export const GOLDENE_REGELN = [
  "Reden ist erlaubt, nur nicht über die eigene Gesinnung/Rolle und die Zahl der ermordeten Ermittler.",
  "Nichts zeigen: weder Routen noch Handkarten.",
  "Eine Bewegung darf nie am Ausgangsort enden.",
  "Karten immer vor dem Ausspielen ansehen, nie blind von der Rückseite spielen.",
];

export type SymbolSlug =
  | "lebend"
  | "geist"
  | "kultist"
  | "abstimmung"
  | "strom"
  | "kamera"
  | "pruefen"
  | "geheimtuer"
  | "bewegen"
  | "runde";

export interface SetupSchritt {
  n: number;
  text: string;
  entfaelltErstpartie?: boolean;
  entfaelltBeiCount?: PlayerCount[];
}

// Vorbereitung (Regelheft S. 7-8), Kurzfassung in eigenen Worten. Schritte 11, 13 und 14 entfallen
// laut Regelheft in der Erstpartie, Schritt 3 bei 7 Personen.
export const SETUP_SCHRITTE: SetupSchritt[] = [
  { n: 1, text: "Karten passend zur Personenzahl nehmen. Routen mischen und einzeln verdeckt auslegen, Ermittler- und Kultisten-Decks getrennt mischen und je 1 Stapel auf jede Route legen." },
  { n: 2, text: "Auf jedes Deck 1 offenen Gesinnungsmarker: Tentakel für Kultisten, „M“ für Ermittler." },
  {
    n: 3,
    text: "Pulskarten-Startdeck nach Tabelle: 1 Lebend-Karte unter jedes Kultisten-Deck, die übrigen gemischt je 1 unter jedes Ermittler-Deck.",
    entfaelltBeiCount: [7],
  },
  { n: 4, text: "Alle Gesinnungsmarker verdecken." },
  { n: 5, text: "Jedes Deck samt Marker in einen Briefumschlag stecken." },
  { n: 6, text: "Umschläge mischen und zufällig verteilen, noch geschlossen lassen." },
  { n: 7, text: "Jede Person sucht sich eine Charakterkarte aus und legt sie mit der Lebend-Seite nach oben vor sich." },
  { n: 8, text: "Spielplan für die Personenzahl aufbauen." },
  { n: 9, text: "Raum-Startkarten nach Tabelle mischen, 1 Karte verdeckt an jeden Raum legen." },
  { n: 10, text: "Nachziehkarten nach Tabelle mischen, Stapel verdeckt neben den Plan legen." },
  {
    n: 11,
    text: "Unsichere-Wege-Deck (1× Erfolg, 1× Misserfolg) mischen und verdeckt auf das Zerbrochene Fenster legen.",
    entfaelltErstpartie: true,
  },
  { n: 12, text: "Alle Charakterscheiben mit der Lebend-Seite nach oben in den Zentralkorridor stellen." },
  {
    n: 13,
    text: "3 Kultisten-Marker mit der Rückseite nach oben mischen und auf ihre Felder außerhalb der Universität legen.",
    entfaelltErstpartie: true,
  },
  { n: 14, text: "Fischmensch-Marker an den See legen.", entfaelltErstpartie: true },
  { n: 15, text: "Abstimmungsmarker offen in den hellblauen Raum (Cafeteria), Strommarker (leuchtend) in den roten Raum (Überwachung)." },
  { n: 16, text: "Die 12 Ereignismarker (Liste unten) in den schwarzen Beutel legen." },
  { n: 17, text: "Rundenzeiger auf „I“ stellen." },
  { n: 18, text: "Punkteanzeiger auf 0, Zielmarker neben den Siegpunktwert aus der Tabelle." },
  { n: 19, text: "In jeden Raum so viele Buchmarker legen, wie er Buchfelder hat." },
  { n: 20, text: "Raummarker mit der Kreuz-Seite nach oben nach Tabelle mischen, 1 an jeden Raum legen." },
  { n: 21, text: "Der Startcharakter bekommt das Messer (Startmarker) und den Phasenanzeiger (Bewegen-Seite oben)." },
  { n: 22, text: "Portalmarker neben den Nachziehstapel legen, restliches Material zurück in die Schachtel." },
  { n: 23, text: "Zum Schluss die Nachtphase durchführen (siehe unten)." },
];

export interface NachtphaseVariante {
  id: string;
  titel: string;
  ritus: string[];
}

// Nachtphase (Regelheft S. 9-10): Ablauf in eigenen Worten. Die Sprüche dazu stehen im Regelheft.
export const NACHTPHASE_INTRO =
  "Einmalig nach dem Aufbau: Jede Person öffnet ihren Briefumschlag und legt das Deck so vor sich, dass die unterste Karte unbekannt bleibt. Bei 5, 6 und 8 Personen hält man es verdeckt in der Hand. Der Ablauf samt Sprüchen steht im Regelheft (S. 9-10).";

export const NACHTPHASE_VARIANTEN: NachtphaseVariante[] = [
  {
    id: "5-6-8-mit-seherin",
    titel: "5, 6 und 8 Personen – mit Seherin",
    ritus: [
      "Alle schließen die Augen und drehen ihr Deck so, dass die unterste Karte sichtbar ist.",
      "Kultisten öffnen die Augen und sehen einander, ebenso, wer von Beginn an tot ist.",
      "Alle schließen die Augen und verdecken ihr Deck. Alle strecken eine Faust aus, Kultisten mit Daumen nach oben.",
      "Die Seherin öffnet die Augen und sieht die Kultisten. Alle nehmen den Daumen runter und öffnen die Augen. Das Spiel beginnt.",
    ],
  },
  {
    id: "5-6-8-ohne-seherin",
    titel: "5, 6 und 8 Personen – ohne Seherin",
    ritus: [
      "Alle schließen die Augen und drehen ihr Deck so, dass die unterste Karte sichtbar ist.",
      "Kultisten öffnen die Augen und sehen einander, ebenso, wer von Beginn an tot ist.",
      "Alle schließen die Augen, verdecken ihr Deck und öffnen die Augen wieder. Das Spiel beginnt.",
    ],
  },
  {
    id: "7",
    titel: "7 Personen",
    ritus: [
      "Alle schließen die Augen.",
      "Kultisten öffnen die Augen und sehen einander.",
      "Alle schließen die Augen und öffnen sie wieder. Das Spiel beginnt. Alle Karten sind Handkarten, es gibt kein eigenes Puls-Deck.",
    ],
  },
];

export const NACHTPHASE_ABSCHLUSS_MIT_PULSDECK =
  "Die unterste Karte des Decks verdeckt neben das Charakterportrait legen: Das ist das Puls-Deck. Der Rest sind Handkarten, deren Reihenfolge danach nicht mehr geändert werden darf.";

// Variante mit AUTOMA-Ermittler für 4 und 6 Personen (Regelheft S. 21), Kurzfassung in eigenen Worten.
export const AUTOMA_VORBEREITUNG = [
  "Aufbau wie bei 5 bzw. 7 Personen, mit den folgenden Anpassungen.",
  "Bei 6 Personen ist mit AUTOMA auch ein 7-Personen-Spiel mit 2 Kultisten möglich: Findet der Kultist in der Nachtphase keinen Mitkultisten, ist AUTOMA der zweite.",
  "Charakterkarte für AUTOMA rechts neben den Startcharakter legen (empfohlen: an die letzte Stelle).",
  "Nachtphase wie üblich. Die Person links von AUTOMA nimmt zusätzlich dessen Deck verdeckt in die freie Hand.",
  "Danach die unterste Karte seines Decks als Puls-Deck neben seine Charakterkarte legen (nur wenn für die Personenzahl Puls-Startkarten vorgesehen sind).",
  "Die restlichen Karten ungesehen nach Kartenrückseite in 2 Stapel teilen: Raumkarten und Begegnungskarten.",
  "Seine Route offen auslegen.",
];

export const AUTOMA_REGELN = {
  bewegung:
    "Folgt seiner Route zum ersten noch nicht erforschten Raum von links, bei 2 gleich langen Wegen im Uhrzeigersinn. Ist keiner verfügbar, geht er so weit wie möglich Richtung Zielraum. Bei einer Begegnung legt er die oberste Karte seines Begegnungsstapels auf das Puls-Deck des anderen. Sind mehrere Begegnungen möglich (Stromausfall), bekommt sie, wer die wenigsten Puls-Karten hat, bei Gleichstand wer von links am nächsten sitzt.",
  aktion:
    "Im unerforschten Raum mit Kultisten-Marker bekämpft er den Kultisten, ohne Marker legt er seine oberste Raumkarte verdeckt ins Raum-Deck. Im erforschten Raum zieht er offen eine Karte und handelt sie ab. In einem Gang legt er eine Raumkarte verdeckt ins Unsichere-Wege-Deck. Mehr tut er nicht, auch das Messer bleibt ungenutzt.",
  sonstiges:
    "Bei Abstimmungen enthält er sich (mit Messer: 2 Enthaltungen). Bei AUTOMA und 1 Kultist gibt es keine Seherin, und von allen Rollen zählen für ihn nur Kultist und Seherin (ab 2 Kultisten). Gibt es nur 1 Kultisten und AUTOMA wird per Abstimmung eliminiert, wird sein Gesinnungsmarker aufgedeckt: Kein Kultist, die Partie geht weiter. Einziger Kultist: Die Partie endet sofort, gezählt werden die toten Ermittler über die Puls-Decks. Er kann die Partie nie als einziger Kultist vorzeitig per Behauptung beenden.",
};

export const SYMBOLE: { slug: SymbolSlug; bedeutung: string }[] = [
  { slug: "lebend", bedeutung: "lebend" },
  { slug: "geist", bedeutung: "ermordet (Geist)" },
  { slug: "kultist", bedeutung: "Kultist" },
  { slug: "abstimmung", bedeutung: "Abstimmung einleiten" },
  { slug: "strom", bedeutung: "Strom verfügbar / Blitzeinschlag" },
  { slug: "kamera", bedeutung: "Kamera nutzen" },
  { slug: "pruefen", bedeutung: "prüfen / Zustand prüfen" },
  { slug: "geheimtuer", bedeutung: "Geheimtüren öffnen" },
  { slug: "bewegen", bedeutung: "Bewegen (Bewegungsphase)" },
  { slug: "runde", bedeutung: "Spielrunde" },
];
