import { useState } from "react";
import { Icon, type IconName } from "./components/Icon";
import { SetupView } from "./components/SetupView";
import { StatusView } from "./components/StatusView";
import { ReferenceView } from "./components/ReferenceView";

type Tab = "setup" | "status" | "reference";

const TABS: { id: Tab; label: string; icon: IconName }[] = [
  { id: "setup", label: "Aufbau", icon: "setup" },
  { id: "status", label: "Status", icon: "status" },
  { id: "reference", label: "Nachschlagen", icon: "buch" },
];

function App() {
  const [tab, setTab] = useState<Tab>("setup");

  return (
    <div className="app-shell">
      <div className="app-title">
        <h1 className="display">Among Cultists</h1>
        <span className="sub">Begleiter für die Partie</span>
      </div>

      <div className="tabbar" role="tablist" aria-label="Bereiche">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className="tab"
            onClick={() => setTab(t.id)}
          >
            <Icon name={t.icon} size={22} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "setup" && <SetupView onGoToStatus={() => setTab("status")} />}
      {tab === "status" && <StatusView />}
      {tab === "reference" && <ReferenceView />}

      <p className="footer-note">
        Reine Gedächtnisstütze – das physische Spiel und seine Karten entscheiden. Kein Sync zwischen Geräten.
      </p>
    </div>
  );
}

export default App;
