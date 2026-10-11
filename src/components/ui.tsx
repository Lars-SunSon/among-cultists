import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function Counter({
  value,
  onChange,
  min = 0,
  max,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  label?: string;
}) {
  return (
    <div className="counter" role="group" aria-label={label}>
      <button
        type="button"
        className="counter-btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Verringern"
      >
        <Icon name="minus" size={18} />
      </button>
      <span className="counter-value">{value}</span>
      <button
        type="button"
        className="counter-btn"
        onClick={() => onChange(max !== undefined ? Math.min(max, value + 1) : value + 1)}
        disabled={max !== undefined && value >= max}
        aria-label="Erhöhen"
      >
        <Icon name="plus" size={18} />
      </button>
    </div>
  );
}

export function PillGroup<T extends string | number | boolean>({
  options,
  value,
  onChange,
  getLabel,
  small,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  getLabel?: (v: T) => string;
  small?: boolean;
}) {
  return (
    <div className="pill-group" role="radiogroup">
      {options.map((opt) => (
        <button
          key={String(opt)}
          type="button"
          className={"pill" + (small ? " small" : "")}
          role="radio"
          aria-checked={opt === value}
          aria-pressed={opt === value}
          onClick={() => onChange(opt)}
        >
          {getLabel ? getLabel(opt) : String(opt)}
        </button>
      ))}
    </div>
  );
}

export function AliveDeadSwitch({
  alive,
  onChange,
}: {
  alive: boolean;
  onChange: (alive: boolean) => void;
}) {
  return (
    <div className="switch">
      <button
        type="button"
        className={"alive" + (alive ? " active" : "")}
        aria-pressed={alive}
        onClick={() => onChange(true)}
      >
        <Icon name="lebend" size={15} /> Lebend
      </button>
      <button
        type="button"
        className={"dead" + (!alive ? " active" : "")}
        aria-pressed={!alive}
        onClick={() => onChange(false)}
      >
        <Icon name="geist" size={15} /> Geist
      </button>
    </div>
  );
}

export function Verdict({
  tone,
  children,
}: {
  tone: "neutral" | "ermittler" | "kultisten";
  children: ReactNode;
}) {
  return (
    <div className={"verdict " + tone}>
      <Icon name={tone === "kultisten" ? "kultist" : tone === "ermittler" ? "waage" : "warnung"} size={22} />
      <span>{children}</span>
    </div>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div className="progress-track" role="progressbar" aria-valuenow={value} aria-valuemax={max}>
      <div className="progress-fill" style={{ transform: `scaleX(${pct / 100})` }} />
    </div>
  );
}

export function StripeTable({ rows }: { rows: { k: string; v: string }[] }) {
  return (
    <div className="stripe">
      {rows.map((r) => (
        <div className="stripe-row" key={r.k}>
          <div className="k">{r.k}</div>
          <div className="v">{r.v}</div>
        </div>
      ))}
    </div>
  );
}

export function Badge({ tone, children }: { tone: "navy" | "red" | "gold"; children: ReactNode }) {
  return <span className={"badge " + tone}>{children}</span>;
}
