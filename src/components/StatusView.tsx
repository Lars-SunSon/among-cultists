import { useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  RUNDEN_PHASEN,
  SIEGBEDINGUNGEN_TEXT,
  countTableFor,
  type PlayerCount,
} from "../data/content";
import { Icon } from "./Icon";
import { AliveDeadSwitch, Counter, PillGroup, ProgressBar, Verdict } from "./ui";

interface Character {
  id: string;
  name: string;
  alive: boolean;
}

type PortalState = "none" | "open" | "closed-in-time" | "closed-late";

const PORTAL_LABEL: Record<PortalState, string> = {
  none: "Nicht geöffnet",
  open: "Geöffnet – Frist läuft",
  "closed-in-time": "Geschlossen (rechtzeitig)",
  "closed-late": "Nicht rechtzeitig geschlossen",
};

let idCounter = 0;
function newId() {
  idCounter += 1;
  return `c${Date.now()}-${idCounter}`;
}

export function StatusView() {
  const [count] = useLocalStorage<PlayerCount>("ac.setup.count", 5);
  const table = countTableFor(count);

  const [runde, setRunde] = useLocalStorage("ac.status.runde", 1);
  const [phaseIdx, setPhaseIdx] = useLocalStorage("ac.status.phase", 0);
  const [strom, setStrom] = useLocalStorage("ac.status.strom", true);
  const [portal, setPortal] = useLocalStorage<PortalState>("ac.status.portal", "none");
  const [siegpunkte, setSiegpunkte] = useLocalStorage("ac.status.siegpunkte", 0);
  const [toteErmittler, setToteErmittler] = useLocalStorage("ac.status.toteErmittler", 0);
  const [kultistenEliminiert, setKultistenEliminiert] = useLocalStorage(
    "ac.status.kultistenEliminiert",
    0,
  );
  const [seherinDabei, setSeherinDabei] = useLocalStorage("ac.status.seherinDabei", false);
  const [seherinEnttarnt, setSeherinEnttarnt] = useLocalStorage("ac.status.seherinEnttarnt", false);
  const [characters, setCharacters] = useLocalStorage<Character[]>("ac.status.characters", []);
  const [confirmReset, setConfirmReset] = useState(false);

  const zielAktuell = useMemo(() => {
    let z = table.ermittlerZielSiegpunkte;
    if (portal === "closed-in-time") z -= 1;
    if (portal === "closed-late") z += 1;
    return z;
  }, [table, portal]);

  const soloKultistRegel = (count === 4 || count === 5 || count === 6) && table.kultistenCount === 1;

  const ermittlerSiegPunkte = siegpunkte >= zielAktuell;
  const ermittlerSiegAlleKultisten = kultistenEliminiert >= table.kultistenCount;
  const kultistenSiegMorde = toteErmittler >= table.kultistenMinToteErmittler;
  const kultistenSiegZeitablauf = runde >= 10 && !ermittlerSiegPunkte && !ermittlerSiegAlleKultisten;
  const kultistenSiegSeherin = seherinDabei && ermittlerSiegAlleKultisten && seherinEnttarnt;

  const verdict = useMemo(() => {
    if (kultistenSiegSeherin)
      return { tone: "kultisten" as const, text: "Kultisten gewinnen – Seherin wurde identifiziert. Das übertrumpft alles." };
    if (kultistenSiegMorde)
      return { tone: "kultisten" as const, text: `Kultisten gewinnen – ${toteErmittler} tote Ermittler bestätigt (Ziel: ${table.kultistenMinToteErmittler}).` };
    if (ermittlerSiegAlleKultisten)
      return { tone: "ermittler" as const, text: "Ermittler gewinnen – alle Kultisten identifiziert & eliminiert." };
    if (ermittlerSiegPunkte)
      return { tone: "ermittler" as const, text: `Ermittler gewinnen – ${siegpunkte}/${zielAktuell} Siegpunkte erreicht.` };
    if (kultistenSiegZeitablauf)
      return { tone: "kultisten" as const, text: "Kultisten gewinnen – Runde 10 vorbei, Siegpunkte nicht erreicht." };
    return { tone: "neutral" as const, text: "Noch keine Siegbedingung erfüllt." };
  }, [kultistenSiegSeherin, kultistenSiegMorde, ermittlerSiegAlleKultisten, ermittlerSiegPunkte, kultistenSiegZeitablauf, siegpunkte, zielAktuell, toteErmittler, table]);

  const addCharacter = () =>
    setCharacters((prev) => [...prev, { id: newId(), name: `Charakter ${prev.length + 1}`, alive: true }]);
  const updateName = (id: string, name: string) =>
    setCharacters((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  const updateAlive = (id: string, alive: boolean) =>
    setCharacters((prev) => prev.map((c) => (c.id === id ? { ...c, alive } : c)));
  const removeCharacter = (id: string) => setCharacters((prev) => prev.filter((c) => c.id !== id));

  const resetPartie = () => {
    setRunde(1);
    setPhaseIdx(0);
    setStrom(true);
    setPortal("none");
    setSiegpunkte(0);
    setToteErmittler(0);
    setKultistenEliminiert(0);
    setSeherinDabei(false);
    setSeherinEnttarnt(false);
    setCharacters([]);
    setConfirmReset(false);
  };

  return (
    <div>
      <div className="page">
        <h1 className="page-title display">Status</h1>
        <p className="page-subtitle">
          {count} Personen · {table.kultistenCount} Kultist{table.kultistenCount > 1 ? "en" : ""} · Ziel:{" "}
          {table.ermittlerZielSiegpunkte} SP / min. {table.kultistenMinToteErmittler} tote Ermittler
        </p>

        <div className="section-title">Runde &amp; Phase</div>
        <div className="row between">
          <Counter value={runde} onChange={setRunde} min={1} max={10} label="Runde" />
          <span className="muted">von 10</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <PillGroup
            options={RUNDEN_PHASEN.map((_, i) => i)}
            value={phaseIdx}
            onChange={setPhaseIdx}
            getLabel={(i) => RUNDEN_PHASEN[i].name.replace(/^\d\.\s*/, "")}
            small
          />
        </div>
        <p className="card-body" style={{ marginTop: 8 }}>
          {RUNDEN_PHASEN[phaseIdx].text}
        </p>
      </div>

      <div className="page">
        <div className="section-title">Strom &amp; Portal</div>
        <div className="row between" style={{ marginBottom: 14 }}>
          <span className="row">
            <Icon name="strom" size={18} /> Stromversorgung
          </span>
          <PillGroup options={[true, false]} value={strom} onChange={setStrom} getLabel={(v) => (v ? "An" : "Aus")} small />
        </div>
        <div className="row between wrap">
          <span className="row">
            <Icon name="portal" size={18} /> Portal (grüner Raum)
          </span>
        </div>
        <div style={{ marginTop: 8 }}>
          <PillGroup
            options={["none", "open", "closed-in-time", "closed-late"] as PortalState[]}
            value={portal}
            onChange={setPortal}
            getLabel={(p) => PORTAL_LABEL[p]}
            small
          />
        </div>
        {portal === "open" && (
          <p className="card-body" style={{ marginTop: 8 }}>
            Frist: {table.portalFristRunden} Runden ab Öffnung, mit 2 lebenden Charakteren gleichzeitig im
            grünen Raum die Raum-Aktion „Portal schließen“ ausführen.
          </p>
        )}
        {(portal === "closed-in-time" || portal === "closed-late") && (
          <p className="card-body" style={{ marginTop: 8 }}>
            Ermittler-Zielwert dadurch angepasst: {table.ermittlerZielSiegpunkte} → {zielAktuell} Siegpunkte.
          </p>
        )}
      </div>

      <div className="page">
        <div className="section-title">Siegpunkte</div>
        <div className="row between">
          <Counter value={siegpunkte} onChange={setSiegpunkte} min={0} label="Siegpunkte" />
          <span className="muted">Ziel: {zielAktuell}</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <ProgressBar value={siegpunkte} max={zielAktuell} />
        </div>
      </div>

      <div className="page">
        <div className="section-title">Kultisten &amp; tote Ermittler</div>
        <p className="card-body">
          Teamzugehörigkeit ist geheim – trage hier ein, was am Tisch öffentlich bestätigt wurde (Abstimmung,
          Assassinen-Angriff, Enthüllung).
        </p>
        <div className="row between" style={{ marginTop: 10 }}>
          <span>Eliminierte Kultisten</span>
          <Counter value={kultistenEliminiert} onChange={setKultistenEliminiert} min={0} max={table.kultistenCount} />
        </div>
        <div className="row between" style={{ marginTop: 10 }}>
          <span>Bestätigte tote Ermittler</span>
          <Counter value={toteErmittler} onChange={setToteErmittler} min={0} />
        </div>
        {soloKultistRegel && (
          <p className="card-body" style={{ marginTop: 10 }}>
            {SIEGBEDINGUNGEN_TEXT.soloKultistRegel}
          </p>
        )}
        {table.kultistenCount === 2 && (
          <p className="card-body" style={{ marginTop: 10 }}>
            {SIEGBEDINGUNGEN_TEXT.timingRegel78}
          </p>
        )}
      </div>

      <div className="page">
        <div className="section-title">Seherin</div>
        <label className="row" style={{ cursor: "pointer" }}>
          <input type="checkbox" checked={seherinDabei} onChange={(e) => setSeherinDabei(e.target.checked)} />
          <span>Seherin ist in dieser Partie im Spiel</span>
        </label>
        {seherinDabei && (
          <label className="row" style={{ cursor: "pointer", marginTop: 8 }}>
            <input type="checkbox" checked={seherinEnttarnt} onChange={(e) => setSeherinEnttarnt(e.target.checked)} />
            <span>Kultisten haben die Seherin nach Elimination des letzten Kultisten richtig erraten</span>
          </label>
        )}
        {seherinDabei && <p className="card-body" style={{ marginTop: 8 }}>{SIEGBEDINGUNGEN_TEXT.seherinRegel}</p>}
      </div>

      <div className="page">
        <div className="section-title">Siegbedingung</div>
        <Verdict tone={verdict.tone}>{verdict.text}</Verdict>
      </div>

      <div className="page">
        <div className="section-title">Charaktere – wer ist tot?</div>
        <div className="stack">
          {characters.map((c) => (
            <div className="row between" key={c.id}>
              <input
                className="name-input"
                value={c.name}
                onChange={(e) => updateName(c.id, e.target.value)}
                style={{ maxWidth: 160 }}
              />
              <AliveDeadSwitch alive={c.alive} onChange={(a) => updateAlive(c.id, a)} />
              <button className="icon-btn" onClick={() => removeCharacter(c.id)} aria-label="Entfernen">
                <Icon name="close" size={18} />
              </button>
            </div>
          ))}
        </div>
        <button className="btn ghost block" style={{ marginTop: 12 }} onClick={addCharacter}>
          <Icon name="plus" size={18} /> Charakter hinzufügen
        </button>
      </div>

      <div className="page">
        {!confirmReset ? (
          <button className="btn danger block" onClick={() => setConfirmReset(true)}>
            Neue Partie – Status zurücksetzen
          </button>
        ) : (
          <div className="stack">
            <p className="card-body">Wirklich zurücksetzen? Runde, Punkte und Charakterliste werden gelöscht.</p>
            <div className="row">
              <button className="btn danger" onClick={resetPartie}>
                Ja, zurücksetzen
              </button>
              <button className="btn ghost" onClick={() => setConfirmReset(false)}>
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
