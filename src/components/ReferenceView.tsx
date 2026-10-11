import { useState } from "react";
import {
  AKTIONEN,
  AUTOMA_REGELN,
  BEGEGNUNGS_TABELLE,
  BEGEGNUNG_TEXT,
  EREIGNISSE,
  GOLDENE_REGELN,
  PRIVILEGIEN,
  ROLLEN,
  SYMBOLE,
} from "../data/content";
import { Icon, type IconName } from "./Icon";
import { Badge, PillGroup } from "./ui";

type Section = "aktionen" | "begegnungen" | "ereignisse" | "rollen" | "automa" | "symbole" | "regeln";

const SECTION_LABEL: Record<Section, string> = {
  aktionen: "Aktionen",
  begegnungen: "Begegnungen",
  ereignisse: "Ereignisse",
  rollen: "Rollen",
  automa: "AUTOMA",
  symbole: "Symbole",
  regeln: "Goldene Regeln",
};

const SECTION_SEITE: Partial<Record<Section, string>> = {
  aktionen: "S. 15–19",
  begegnungen: "S. 13 und S. 19",
  ereignisse: "S. 23",
  rollen: "S. 24",
  automa: "S. 21",
};

const SYMBOL_ICON: Record<string, IconName> = {
  lebend: "lebend",
  geist: "geist",
  kultist: "kultist",
  abstimmung: "abstimmung",
  strom: "strom",
  kamera: "kamera",
  pruefen: "pruefen",
  geheimtuer: "geheimtuer",
  bewegen: "bewegen",
  runde: "runde",
};

export function ReferenceView() {
  const [section, setSection] = useState<Section>("aktionen");

  return (
    <div>
      <div className="page">
        <h1 className="page-title display">Nachschlagen</h1>
        <p className="page-subtitle">Kurzfassungen in eigenen Worten, griffbereit während der Partie. Der genaue Wortlaut steht im Regelheft.</p>
        {SECTION_SEITE[section] && (
          <p className="page-subtitle" style={{ fontSize: 13, marginTop: -4 }}>Regelheft: {SECTION_SEITE[section]}</p>
        )}
        <PillGroup
          options={["aktionen", "begegnungen", "ereignisse", "rollen", "automa", "symbole", "regeln"] as Section[]}
          value={section}
          onChange={setSection}
          getLabel={(s) => SECTION_LABEL[s]}
          small
        />
      </div>

      {section === "aktionen" && (
        <div className="page">
          <div className="section-title">Charakter-Aktionen</div>
          <div className="card-list">
            {AKTIONEN.filter((a) => a.kategorie === "Charakter-Aktion").map((a) => (
              <div className="card" key={a.name}>
                <div className="card-title">{a.name}</div>
                <div className="card-condition">{a.bedingung}</div>
                <div className="card-body">{a.effekt}</div>
              </div>
            ))}
          </div>
          <div className="section-title">Raum-Aktionen</div>
          <div className="card-list">
            {AKTIONEN.filter((a) => a.kategorie === "Raum-Aktion").map((a) => (
              <div className="card" key={a.name}>
                <div className="card-title">{a.name}</div>
                <div className="card-condition">{a.bedingung}</div>
                <div className="card-body">{a.effekt}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === "begegnungen" && (
        <div className="page">
          <div className="section-title">Wann kommt es zu einer Begegnung?</div>
          <div className="stripe">
            {BEGEGNUNGS_TABELLE.map((r, i) => (
              <div className="stripe-row row between" key={i}>
                <span className="v">
                  Strom {r.strom} · {r.anzahl} Charaktere
                </span>
                <Badge tone={r.begegnung ? "red" : "navy"}>{r.begegnung ? "Begegnung" : "keine"}</Badge>
              </div>
            ))}
          </div>
          <div className="section-title">Was passiert bei einer Begegnung?</div>
          <p className="card-body">{BEGEGNUNG_TEXT}</p>
          <div className="section-title">Privilegien</div>
          <div className="card-list">
            {PRIVILEGIEN.map((p) => (
              <div className="card" key={p.gruppe}>
                <div className="card-title">{p.gruppe}</div>
                <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
                  {p.eintraege.map((e, i) => (
                    <li className="card-body" key={i}>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === "ereignisse" && (
        <div className="page">
          <div className="section-title">Ereignisse (12 Marker im Beutel)</div>
          <div className="card-list">
            {EREIGNISSE.map((e) => (
              <div className="card" key={e.name}>
                <div className="card-title row between">
                  <span>{e.name}</span>
                  <Badge tone="gold">{e.anzahl}x</Badge>
                </div>
                <div className="card-body">{e.effekt}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === "rollen" && (
        <div className="page">
          <div className="section-title">Rollen-Übersicht</div>
          <p className="page-subtitle">
            Loyalitätswerte für den Experten-Rechner im Aufbau. Standardrollen Ermittlerin/Kultistin haben
            Loyalität 0.
          </p>
          <div className="card-list">
            {ROLLEN.map((r) => (
              <div className="card" key={r.name}>
                <div className="card-title row between">
                  <span>{r.name}</span>
                  <span className="row" style={{ gap: 6 }}>
                    <Badge tone={r.team === "Ermittler" ? "navy" : "red"}>{r.team}</Badge>
                    <Badge tone="gold">{r.loyalitaet >= 0 ? `+${r.loyalitaet}` : r.loyalitaet}</Badge>
                  </span>
                </div>
                <div className="card-body">{r.beschreibung}</div>
                {r.empfohlenePersonenzahl && (
                  <div className="card-condition">Empfohlene Personenzahl: {r.empfohlenePersonenzahl}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {section === "automa" && (
        <div className="page">
          <div className="section-title">AUTOMA-Ermittler (4 &amp; 6 Personen)</div>
          <div className="card-list">
            <div className="card">
              <div className="card-title">Bewegungsphase</div>
              <div className="card-body">{AUTOMA_REGELN.bewegung}</div>
            </div>
            <div className="card">
              <div className="card-title">Aktionsphase</div>
              <div className="card-body">{AUTOMA_REGELN.aktion}</div>
            </div>
            <div className="card">
              <div className="card-title">Sonstiges</div>
              <div className="card-body">{AUTOMA_REGELN.sonstiges}</div>
            </div>
          </div>
        </div>
      )}

      {section === "symbole" && (
        <div className="page">
          <div className="section-title">Symbole</div>
          <p className="page-subtitle">Die Icon-Sprache aus Spielplan, Karten und Markern.</p>
          <div className="stripe">
            {SYMBOLE.map((s) => (
              <div className="stripe-row row" key={s.slug} style={{ alignItems: "center", gap: 10 }}>
                <Icon name={SYMBOL_ICON[s.slug]} size={20} />
                <span className="v">{s.bedeutung}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === "regeln" && (
        <div className="page">
          <div className="section-title">Die Goldenen Regeln</div>
          <div className="card-list">
            {GOLDENE_REGELN.map((r, i) => (
              <div className="card" key={i}>
                <div className="card-body">{r}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="fan-hinweis">Inoffizielles Fan-Hilfsmittel – nicht vom Verlag und nicht mit ihm verbunden. Alle Namen und Spielinhalte gehören ihren Inhabern.</p>
    </div>
  );
}
