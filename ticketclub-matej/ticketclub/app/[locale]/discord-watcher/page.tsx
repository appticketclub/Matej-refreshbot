import Link from "next/link";

export default function DiscordWatcherPage() {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <Link href="/dostupne-sluzby" style={{ fontSize: 13, color: "#525252", textDecoration: "none" }}>
          ← Zpět na přehled
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff", margin: 0 }}>Chrome Launcher</h1>
        <span style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>SCALE</span>
      </div>
      <p style={{ fontSize: 14, color: "#ededed", marginBottom: "2rem" }}>
        Otevře všechny Chrome profily s Refresh Botem jedním kliknutím.
      </p>

      {/* Download */}
      <div style={{ background: "#111", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>STÁHNOUT APLIKACI</div>
        <p style={{ fontSize: 13, color: "#ededed", marginBottom: "1rem" }}>
          Stáhněte aplikaci Chrome Launcher a spusťte všechny profily najednou.
        </p>
        <a
          href="https://mega.nz/folder/eBsjBAAC#bierl0Ge8Msn3w9kcerEHw"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.75rem 1.5rem", background: "linear-gradient(135deg, #a855f7, #7c3aed)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
        >
          ⬇ Stáhnout Chrome Launcher
        </a>
      </div>

      {/* Install guide */}
      <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>NÁVOD K POUŽITÍ</div>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
          {[
            "Stáhněte soubor z odkazu výše",
            "Nainstalujte Python z python.org — při instalaci zaškrtněte 'Add Python to PATH'",
            "Spusťte soubor RefreshBot Launcher.py dvojklikem",
            "Při prvním spuštění vyberte Chrome profily s Refresh Botem a uložte výběr",
            "Klikněte ▶ Spustit vybrané — profily se otevřou automaticky",
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ minWidth: 24, height: 24, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#a855f7" }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: "#ededed", paddingTop: 3 }}>{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Video tutorial */}
      <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 16, padding: "1.5rem" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>VIDEO NÁVOD</div>
        <div style={{ fontSize: 13, color: "#525252", marginBottom: "1rem" }}>Sledujte video návod jak používat Chrome Launcher.</div>
        <a
          href="https://youtu.be/cMOqe1PVGTU"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.75rem 1.5rem", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
        >
          ▶ Sledovat video návod
        </a>
      </div>
    </div>
  );
}
