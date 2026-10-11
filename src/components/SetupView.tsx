import { useMemo } from "react";
import {
  AUTOMA_VORBEREITUNG,
  COUNT_TABLES,
  EREIGNISSE,
  ERMITTLER_DECK_PRO_PERSON,
  FORTGESCHRITTEN_ROLLEN,
  KULTISTEN_DECK_PRO_PERSON,
  NACHTPHASE_ABSCHLUSS_MIT_PULSDECK,
  NACHTPHASE_INTRO,
  NACHTPHASE_VARIANTEN,
  SETUP_SCHRITTE,
  UNSICHERE_WEGE_DECK,
  countTableFor,
  type PlayerCount,
} from "../data/content";
import { Icon } from "./Icon";
import { PillGroup, StripeTable } from "./ui";
import { LoyalitaetsRechner } from "./LoyalitaetsRechner";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Level = "erstpartie" | "fortgeschritten" | "experte";

const LEVEL_LABEL: Record<Level, string> = {
  erstpartie: "Erstpartie",
  fortgeschritten: "Fortgeschritten",
  experte: "Experte",
};

export function SetupView({ onGoToStatus }: { onGoToStatus: () => void }) {
  const [count, setCount] = useLocalStorage<PlayerCount>("ac.setup.count", 5);
  const [level, setLevel] = useLocalStorage<Level>("ac.setup.level", "erstpartie");
  const [automa, setAutoma] = useLocalStorage<boolean>("ac.setup.automa", false);
  const [checkedSteps, setCheckedSteps] = useLocalStorage<Record<number, boolean>>(
    "ac.setup.checked",
    {},
  );

  const table = countTableFor(count);
  const automaAvailable = count === 4 || count === 6;
  const automaForced = count === 4;
  const automaActive = automaForced || (automaAvailable && automa);

  const ereignisSumme = useMemo(() => EREIGNISSE.reduce((s, e) => s + e.anzahl, 0), []);

  const seherinPresent = useMemo(() => {
    if (count === 4 || count === 7) return false;
    if (level === "erstpartie") return true; // Erstpartie: „nutzt nur Seherin als Zusatzrolle“
    if (level === "fortgeschritten") return FORTGESCHRITTEN_ROLLEN[count].includes("Seher");
    return null; // Experte: hängt vom eigenen Rollen-Mix ab, nicht vorhersagbar
  }, [count, level]);

  const nachtphaseOptionen =
    count === 7
      ? [NACHTPHASE_VARIANTEN[2]]
      : seherinPresent === null
        ? [NACHTPHASE_VARIANTEN[0], NACHTPHASE_VARIANTEN[1]]
        : [seherinPresent ? NACHTPHASE_VARIANTEN[0] : NACHTPHASE_VARIANTEN[1]];

  const toggleStep = (n: number) =>
    setCheckedSteps((prev) => ({ ...prev, [n]: !prev[n] }));

  const visibleSteps = SETUP_SCHRITTE.filter((s) => {
    if (s.entfaelltBeiCount?.includes(count)) return false;
    if (level === "erstpartie" && s.entfaelltErstpartie) return false;
    return true;
  });

  return (
    <div>
      <div className="page">
        <h1 className="page-title display">Aufbau</h1>
        <p className="page-subtitle">Schritt für Schritt zur nächsten Partie – passend zu eurer Runde.</p>

        <div className="section-title">Wer spielt mit?</div>
        <PillGroup
          options={COUNT_TABLES.map((c) => c.count)}
          value={count}
          onChange={setCount}
          getLabel={(c) => `${c} Personen`}
        />

        {automaAvailable && (
          <label className="row" style={{ marginTop: 12, cursor: automaForced ? "default" : "pointer" }}>
            <input
              type="checkbox"
              checked={automaActive}
              disabled={automaForced}
              onChange={(e) => setAutoma(e.target.checked)}
            />
            <span>
              Mit AUTOMA-Ermittler spielen{automaForced ? " (bei 4 Personen Pflicht, siehe S. 21)" : ""}
            </span>
          </label>
        )}

        {count !== 4 && (
          <>
            <div className="section-title">Wie viel Tiefe?</div>
            <PillGroup
              options={["erstpartie", "fortgeschritten", "experte"] as Level[]}
              value={level}
              onChange={setLevel}
              getLabel={(l) => LEVEL_LABEL[l]}
            />
          </>
        )}
      </div>

      <div className="page">
        <div className="section-title">
          <span className="row">
            <Icon name="kultist" size={18} /> Kultisten &amp; Rollen
          </span>
        </div>
        <div className="card">
          <div className="card-title">
            {table.kultistenCount} Kultist{table.kultistenCount > 1 ? "en" : ""} in dieser Runde
          </div>
          {count === 4 && <p className="card-body">{table.erstpartieZusatzrolle}</p>}
          {count !== 4 && level === "erstpartie" && <p className="card-body">{table.erstpartieZusatzrolle}</p>}
          {count !== 4 && level === "fortgeschritten" && (
            <p className="card-body">Empfohlene Rollen: {FORTGESCHRITTEN_ROLLEN[count]}</p>
          )}
        </div>
        {count !== 4 && level === "experte" && (
          <div className="card">
            <LoyalitaetsRechner count={count} />
          </div>
        )}
      </div>

      <div className="page">
        <div className="section-title">Material bereitlegen</div>
        <StripeTable
          rows={[
            { k: "Ermittler-Deck (pro Person)", v: ERMITTLER_DECK_PRO_PERSON },
            { k: "Kultisten-Deck (pro Person)", v: KULTISTEN_DECK_PRO_PERSON },
            { k: "Pulskarten-Startdecks", v: table.pulsStartdeck },
            { k: "Raum-Startkarten", v: table.raumStartkarten },
            { k: "Nachziehkarten-Stapel", v: table.nachziehkarten },
            { k: "Unsichere-Wege-Deck", v: UNSICHERE_WEGE_DECK },
            { k: "Raummarker", v: table.raummarker },
            { k: "Ereignismarker im Beutel", v: `${ereignisSumme} Marker (siehe Nachschlagewerk)` },
            { k: "Siegbedingung Ermittler", v: `${table.ermittlerZielSiegpunkte} Siegpunkte` },
            { k: "Siegbedingung Kultisten", v: `min. ${table.kultistenMinToteErmittler} tote Ermittler` },
          ]}
        />
      </div>

      <div className="page">
        <div className="section-title">Spielfläche aufbauen</div>
        <div className="stack">
          {visibleSteps.map((s) => (
            <label key={s.n} className="row" style={{ alignItems: "flex-start", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={!!checkedSteps[s.n]}
                onChange={() => toggleStep(s.n)}
                style={{ marginTop: 3 }}
              />
              <span style={{ textDecoration: checkedSteps[s.n] ? "line-through" : "none", opacity: checkedSteps[s.n] ? 0.6 : 1 }}>
                <strong>{s.n}.</strong> {s.text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {automaActive && (
        <div className="page">
          <div className="section-title">Vorbereitung mit AUTOMA-Ermittler</div>
          <div className="stack">
            {AUTOMA_VORBEREITUNG.map((t, i) => (
              <p className="card-body" key={i}>
                {t}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="page">
        <div className="section-title">Nachtphase</div>
        <p className="card-body">{NACHTPHASE_INTRO}</p>
        {count === 4 ? (
          <p className="card-body" style={{ marginTop: 10 }}>
            Bei 4 Personen gilt die Nachtphase der AUTOMA-Ermittler-Variante (siehe Vorbereitung oben, S. 21).
          </p>
        ) : (
          <>
            {seherinPresent === null && (
              <p className="card-body" style={{ marginTop: 10 }}>
                Ob Seherin dabei ist, hängt von eurer Rollenauswahl ab – hier beide Varianten, sucht euch die
                passende:
              </p>
            )}
            {nachtphaseOptionen.map((variante) => (
              <div className="card" style={{ marginTop: 10 }} key={variante.id}>
                <div className="card-title">{variante.titel}</div>
                <div className="stack" style={{ marginTop: 8 }}>
                  {variante.ritus.map((line, i) => (
                    <p className="card-body" key={i}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {count !== 7 && (
              <p className="card-body" style={{ marginTop: 10 }}>
                {NACHTPHASE_ABSCHLUSS_MIT_PULSDECK}
              </p>
            )}
          </>
        )}
      </div>

      <div className="page">
        <p className="card-body" style={{ marginBottom: 12, textAlign: "center" }}>
          Aufbau erledigt? Dann geht's mit der Bewegungsphase der 1. Runde los.
        </p>
        <button className="btn block" onClick={onGoToStatus}>
          Weiter zum Status-Tracker <Icon name="chevronRight" size={18} />
        </button>
      </div>
    </div>
  );
}
