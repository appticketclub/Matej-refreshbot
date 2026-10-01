"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/lib/supabase/client";

export default function UpgradeModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState<"monthly" | "yearly" | "scale_monthly" | "scale_yearly" | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoValid, setPromoValid] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [currentPlan, setCurrentPlan] = useState<string>("free");
  const [currentBilling, setCurrentBilling] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    async function loadSub() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("plan, plan_interval")
        .eq("user_id", user.id)
        .single();
      if (sub) {
        setCurrentPlan(sub.plan ?? "free");
        setCurrentBilling(sub.plan_interval === "yearly" ? "yearly" : "monthly");
        if (sub.plan === "pro" && sub.plan_interval === "yearly") {
          setBilling("yearly");
        }
      }
    }
    loadSub();
  }, []);

  async function handleCheckout(plan: string) {
    setLoading(plan as any);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, promoCode }),
      });
      const d = await res.json();
      if (d.error) {
        alert(d.error);
        setLoading(null);
        return;
      }
      if (d.upgraded) {
        alert("✓ Předplatné bylo aktualizováno!");
        window.location.reload();
        return;
      }
      if (d.url) window.location.href = d.url;
    } catch {
      alert("Chyba pripojenia");
    }
    setLoading(null);
  }

  return createPortal(
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 999 }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "calc(100vw - 2rem)",
        maxWidth: 640,
        maxHeight: "90vh",
        overflowY: "auto" as const,
        background: "#0d0d0d",
        border: "1px solid #1a1a1a",
        borderRadius: 20,
        padding: "1.5rem",
        zIndex: 1001,
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
              Upgrade plán
            </h2>
            <p style={{ fontSize: 13, color: "#525252", marginTop: 4 }}>
              Vyberte si plán, který vám nejvíce vyhovuje
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#525252", cursor: "pointer", fontSize: 22 }}>×</button>
        </div>

          {/* Promo Code Input */}
          <div style={{ padding: "0 0 1rem" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                placeholder="Promo kód (volitelné)"
                value={promoCode}
                onChange={e => {
                  const code = e.target.value.toUpperCase();
                  setPromoCode(code);
                  setPromoValid(code === "SKOUSKA" || code === "TRIAL2" || code === "MENTORING1V1");
                }}
                style={{ flex: 1, padding: "0.6rem 1rem", background: "#111", border: `1px solid ${promoValid ? "#4ade80" : "#1a1a1a"}`, borderRadius: 10, color: "#fff", fontSize: 13, outline: "none" }}
              />
            </div>
            {promoValid && promoCode === "SKOUSKA" && <div style={{ fontSize: 12, color: "#4ade80", marginTop: 4 }}>✓ Kód platný — 12 dní zdarma!</div>}
            {promoValid && promoCode === "TRIAL2" && <div style={{ fontSize: 12, color: "#4ade80", marginTop: 4 }}>✓ Kód platný — 14 dní zdarma!</div>}
            {promoValid && promoCode === "MENTORING1V1" && <div style={{ fontSize: 12, color: "#4ade80", marginTop: 4 }}>✓ Kód platný — 180 dní zdarma!</div>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: "2rem" }}>
            {/* Monthly */}
            <div style={{ background: "#130f24", border: "0.5px solid #2a1f4a", borderRadius: 16, padding: "1.5rem" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Neomezený</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>€45.95</div>
              <div style={{ fontSize: 12, color: "#6d5a9e", marginBottom: 16 }}>fakturováno měsíčně</div>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 20 }}>
                {["Refresh Bot", "Neomezený počet profilů"].map(f => (
                  <li key={f} style={{ fontSize: 13, color: "#e2d9f3", marginBottom: 6 }}>✓ {f}</li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout("scale_monthly")}
                disabled={loading === "scale_monthly"}
                style={{ width: "100%", padding: "10px", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 13, cursor: loading === "scale_monthly" ? "default" : "pointer", opacity: loading === "scale_monthly" ? 0.7 : 1 }}
              >
                {loading === "scale_monthly" ? "Načítám..." : "Získat Neomezený →"}
              </button>
            </div>

            {/* Yearly */}
            <div style={{ background: "#130f24", border: "0.5px solid #7c3aed", borderRadius: 16, padding: "1.5rem", position: "relative" as const }}>
              <div style={{ position: "absolute" as const, top: -12, left: "50%", transform: "translateX(-50%)", background: "#7c3aed", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 99 }}>
                NEJOBLÍBENĚJŠÍ
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Neomezený</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>€399.95</div>
              <div style={{ fontSize: 12, color: "#6d5a9e", marginBottom: 4 }}>fakturováno ročně</div>
              <div style={{ fontSize: 11, color: "#a78bfa", marginBottom: 16 }}>3 měsíce zdarma</div>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 20 }}>
                {["Refresh Bot", "Neomezený počet profilů"].map(f => (
                  <li key={f} style={{ fontSize: 13, color: "#e2d9f3", marginBottom: 6 }}>✓ {f}</li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout("scale_yearly")}
                disabled={loading === "scale_yearly"}
                style={{ width: "100%", padding: "10px", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 13, cursor: loading === "scale_yearly" ? "default" : "pointer", opacity: loading === "scale_yearly" ? 0.7 : 1 }}
              >
                {loading === "scale_yearly" ? "Načítám..." : "Získat Neomezený →"}
              </button>
            </div>
          </div>

          {/* Proration note */}
          <div style={{ fontSize: 12, color: "#525252", textAlign: "center" as const, marginBottom: "1rem", padding: "0 1rem" }}>
            💡 Pokud již máte aktivní předplatné, Stripe automaticky vypočítá rozdíl a doplatíte pouze zbývající částku.
          </div>

          {/* Feature table */}
          <div style={{ fontSize: "clamp(11px, 3vw, 13px)" }}>
            <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 12, overflow: "hidden" as const }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", borderBottom: "1px solid #1a1a1a" }}>
                <div style={{ padding: "10px 16px", fontWeight: 600, color: "#525252" }}>Funkce</div>
                <div style={{ padding: "10px 0", fontWeight: 600, color: "#525252", textAlign: "center" as const }}>1 Profil</div>
                <div style={{ padding: "10px 0", fontWeight: 600, color: "#3b82f6", textAlign: "center" as const }}>Neomezený</div>
              </div>
              {[
                ["Refresh Bot (1 Chrome profil)", true, true],
                ["Neomezený počet profilů", false, true],
              ].map(([label, pro, scale], i, arr) => (
                <div key={label as string} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", borderBottom: i < arr.length - 1 ? "1px solid #0d0d0d" : "none" }}>
                  <div style={{ padding: "10px 16px", color: "#ededed" }}>{label as string}</div>
                  <div style={{ padding: "10px 0", textAlign: "center" as const, fontSize: "clamp(12px, 3.5vw, 14px)" }}>{pro ? <span style={{ color: "#4ade80" }}>✓</span> : <span style={{ color: "#333" }}>—</span>}</div>
                  <div style={{ padding: "10px 0", textAlign: "center" as const, fontSize: "clamp(12px, 3.5vw, 14px)" }}>{scale ? <span style={{ color: "#3b82f6" }}>✓</span> : <span style={{ color: "#333" }}>—</span>}</div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 11, color: "#525252", textAlign: "center" as const, marginTop: "1rem" }}>
            Zrušit lze kdykoliv · Bezpečná platba přes Stripe
          </p>
        </div>
    </>,
    document.body
  );
}
