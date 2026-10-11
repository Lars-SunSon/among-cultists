import { useMemo, useState } from "react";
import { EXPERTEN_ERSCHWERNIS, ROLLEN, type PlayerCount } from "../data/content";
import { Icon } from "./Icon";
import { Badge } from "./ui";

function parseErschwernis(text: string): { team: "Kultisten" | "Ermittler"; amount: number } {
  const amount = parseInt(text.replace(/[^\d]/g, ""), 10) || 0;
  const team = text.includes("Kultisten") ? "Kultisten" : "Ermittler";
  return { team, amount };
}

export function LoyalitaetsRechner({ count }: { count: Exclude<PlayerCount, 4> }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const target = parseErschwernis(EXPERTEN_ERSCHWERNIS[count]);

  const toggle = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const sums = useMemo(() => {
    let ermittler = 0;
    let kultisten = 0;
    for (const r of ROLLEN) {
      if (!selected.has(r.name)) continue;
      if (r.team === "Ermittler") ermittler += r.loyalitaet;
      else kultisten += r.loyalitaet;
    }
    return { ermittler, kultisten };
  }, [selected]);

  const diff = sums.kultisten - sums.ermittler; // positiv = Kultisten-Loyalität
  const targetDiff = target.team === "Kultisten" ? target.amount : -target.amount;
  const matches = diff === targetDiff;
  const overCap = sums.ermittler > 5 || sums.kultisten > 5;

  const ermittlerRollen = ROLLEN.filter((r) => r.team === "Ermittler");
  const kultistenRollen = ROLLEN.filter((r) => r.team === "Kultisten");

  return (
    <div className="stack">
      <p className="card-body">
        Empfohlene Erschwernis bei {count} Personen: <strong>{EXPERTEN_ERSCHWERNIS[count]}</strong>. Maximale
        Loyalität pro Team: 5. Wählt Rollen, tauscht dafür Standard-Gesinnungsmarker der Ermittler entsprechend
        aus.
      </p>

      <div className="row wrap" style={{ gap: 18 }}>
        <div className="stack" style={{ flex: "1 1 200px" }}>
          <div className="badge navy" style={{ alignSelf: "flex-start" }}>
            Ermittler
          </div>
          {ermittlerRollen.map((r) => (
            <RolleCheckbox key={r.name} rolle={r} checked={selected.has(r.name)} onToggle={() => toggle(r.name)} />
          ))}
        </div>
        <div className="stack" style={{ flex: "1 1 200px" }}>
          <div className="badge red" style={{ alignSelf: "flex-start" }}>
            Kultisten
          </div>
          {kultistenRollen.map((r) => (
            <RolleCheckbox key={r.name} rolle={r} checked={selected.has(r.name)} onToggle={() => toggle(r.name)} />
          ))}
        </div>
      </div>

      <div className={"verdict " + (overCap ? "kultisten" : matches ? "ermittler" : "neutral")}>
        <Icon name={matches && !overCap ? "haken" : "warnung"} size={20} />
        <span>
          Ermittler-Loyalität {sums.ermittler} · Kultisten-Loyalität {sums.kultisten}
          {overCap
            ? " – über dem Maximalwert 5 pro Team!"
            : matches
              ? " – passt zur empfohlenen Erschwernis."
              : ` – Ziel ist ${EXPERTEN_ERSCHWERNIS[count]}.`}
        </span>
      </div>
    </div>
  );
}

function RolleCheckbox({
  rolle,
  checked,
  onToggle,
}: {
  rolle: (typeof ROLLEN)[number];
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="row" style={{ cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={onToggle} />
      <span style={{ flex: 1 }}>{rolle.name}</span>
      <Badge tone="gold">{rolle.loyalitaet >= 0 ? `+${rolle.loyalitaet}` : rolle.loyalitaet}</Badge>
    </label>
  );
}
