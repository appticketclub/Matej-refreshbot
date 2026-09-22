"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    if (!email || !password) { setError("Fill in all fields."); return; }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); return; }
    router.push("/dostupne-sluzby");
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808" }}>
      <div style={{ width: 360, background: "#111", border: "1px solid #1a1a1a", borderRadius: 16, padding: "2rem" }}>
        <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Sign in</h1>
        {error && <div style={{ color: "#f87171", fontSize: 13, marginBottom: 12 }}>{error}</div>}
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: "#525252", fontSize: 11, display: "block", marginBottom: 4 }}>EMAIL</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" as const }}/>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ color: "#525252", fontSize: 11, display: "block", marginBottom: 4 }}>PASSWORD</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "8px 12px", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" as const }}/>
        </div>
        <button onClick={handleLogin} disabled={loading}
          style={{ width: "100%", padding: "10px", background: loading ? "#2a2a2a" : "#fff", border: "none", borderRadius: 10, color: "#000", fontWeight: 700, fontSize: 13, cursor: loading ? "default" : "pointer" }}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#525252" }}>
          No account? <a href="/registrace" style={{ color: "#fff" }}>Register</a>
        </div>
      </div>
    </div>
  );
}
