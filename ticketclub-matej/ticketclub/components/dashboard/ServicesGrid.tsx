"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import UpgradeModal from "@/components/ucet/UpgradeModal";

function UpgradeButton() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)} style={{
        padding: "8px 20px", fontSize: 13, fontWeight: 700,
        background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
        border: "none", borderRadius: 10, color: "#fff",
        cursor: "pointer", whiteSpace: "nowrap" as const,
      }}>
        Upgradovat na PRO →
      </button>
      {show && <UpgradeModal onClose={() => setShow(false)} />}
    </>
  );
}

function UpgradeLink() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)} style={{
        color: "#7c3aed",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 13,
      }}>
        Upgradovat na PRO →
      </button>
      {show && <UpgradeModal onClose={() => setShow(false)} />}
    </>
  );
}

export default function ServicesGrid({
  isPro,
  isScale = false,
  isAdmin = false,
  user,
}: {
  isPro: boolean;
  isScale?: boolean;
  isAdmin?: boolean;
  user?: { id: string } | null;
}) {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    const handler = () => setShowUpgradeModal(true);
    window.addEventListener("openUpgradeModal", handler);
    return () => window.removeEventListener("openUpgradeModal", handler);
  }, []);

  const videoMap: Record<string, string> = {
    "Refresh Bot": "https://www.youtube.com/embed/dDOkeYYVEJ4",
    "Discord Watcher Bot": "https://www.youtube.com/embed/cMOqe1PVGTU",
    "Sales Tracker": "https://www.youtube.com/embed/M5XX5B0Wz30",
    "Chrome Launcher": "https://www.youtube.com/embed/Oeq1G-Qi1Bo",
    "Pre-sale Bot": "https://www.youtube.com/embed/tLOV3Jn4hzU",
    "Email Import": "https://www.youtube.com/embed/zZDGoWBib9s",
  };

  const allServices = [
    {
      id: "nakupy",
      title: "Evidence nákupů",
      description: "P&L tracker pro ticket resellery.",
      icon: "🎟️",
      href: "/nakupy",
      free: true,
    },
    {
      id: "email-import",
      title: "Email Import",
      description: "Přeposílejte potvrzovací emaily z Ticketmaster a nákupy se automaticky přidají do Evidence.",
      icon: "📧",
      href: "/ucet",
      free: false,
    },
    {
      id: "refresh-bot",
      title: "Refresh Bot",
      description: "Automatické refreshování vstupenek na Ticketmaster.",
      icon: "🔄",
      href: "/refresh-bot",
      free: false,
    },
    {
      id: "discord-watcher",
      title: "Chrome Launcher",
      description: "Otevře všechny Chrome profily s Refresh Botem jedním kliknutím.",
      badge: "SCALE",
      href: "/discord-watcher",
      icon: "🚀",
      pro: false,
      scale: true,
    },
    {
      id: "sales-tracker",
      title: "Sales Tracker",
      description: "Sledujte prodeje a ceny vstupenek na Viagogo v reálném čase.",
      icon: "📊",
      href: "/sales-tracker",
      free: true,
    },
    {
      id: "chrome-launcher",
      title: "Chrome Launcher",
      description: "Spusťte víc Chrome profilů najednou s jedním odkazem.",
      icon: "🚀",
      href: "/chrome-launcher",
      free: false,
    },
    {
      id: "presale-bot",
      title: "Pre-sale Bot",
      description: "Automatické hromadné registrace na předprodeje.",
      icon: "⚡",
      href: "/presale-bot",
      free: true,
    },
  ];

  const services = allServices.filter(s => s.id === "refresh-bot" || s.id === "discord-watcher");

  return (
    <div>
      <style>{`
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
      <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        {services.map(service => {
          const locked = (!service.free && !isPro && !isScale && !isAdmin);
          return (
            <div
              key={service.id}
              onClick={() => { if (!locked && service.href) router.push(service.href); }}
              style={{
                background: "linear-gradient(135deg, #111111, #130d1a)",
                border: `1px solid ${locked ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.4)"}`,
                borderRadius: 16, padding: "1.5rem",
                cursor: (!locked && service.href) ? "pointer" : "default",
                position: "relative", overflow: "hidden",
                transition: "border-color 0.2s, transform 0.2s",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "space-between",
                boxShadow: locked ? "none" : "0 0 20px rgba(168,85,247,0.1)",
              }}
              onMouseEnter={e => {
                if (!locked && service.href) {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#a855f7";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = locked ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.4)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {!service.free && (
                <span style={{
                  position: "absolute", top: 12, right: 12,
                  background: locked ? "rgba(168,85,247,0.08)" : "rgba(168,85,247,0.15)",
                  color: "#a855f7",
                  border: `1px solid ${locked ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.3)"}`,
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 99,
                  letterSpacing: "0.08em",
                  opacity: locked ? 0.7 : 1,
                }}>SCALE</span>
              )}

              <div style={{ flex: 1 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "linear-gradient(135deg, #2a2a2a, #1a1a1a)",
                  border: "1px solid #ededed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem", marginBottom: "1.25rem",
                  opacity: locked ? 0.6 : 1,
                }}>
                  {service.icon}
                </div>

                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: locked ? "#ededed" : "#fff", marginBottom: "0.5rem", opacity: locked ? 0.6 : 1 }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: 13,
                  color: "#525252",
                  marginBottom: "1rem",
                  minHeight: "2.5rem",
                  lineHeight: 1.5,
                  opacity: locked ? 0.6 : 1,
                }}>
                  {service.description}
                </p>
              </div>

              <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ flex: 1 }}>
                    {locked ? (
                      <div style={{ position: "relative" }}>
                        <div style={{
                          padding: "0.6rem 1rem",
                          background: "#0a0a0a",
                          border: "1px solid #1a1a1a",
                          borderRadius: 8,
                          color: "#a855f7",
                          fontSize: 13,
                          filter: "blur(4px)",
                          userSelect: "none" as const,
                          textAlign: "center" as const,
                        }}>
                          Otevřít aplikaci →
                        </div>
                        <div style={{
                          position: "absolute", inset: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.dispatchEvent(new CustomEvent("openUpgradeModal"));
                            }}
                            style={{
                              padding: "0.5rem 1.25rem",
                              background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                              border: "none",
                              borderRadius: 8,
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                          >
                            Získat přístup →
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        padding: "0.6rem 1rem",
                        background: "#1a1a1a",
                        border: "1px solid #2a2a2a",
                        borderRadius: 8,
                        color: "#fff",
                        fontSize: 13,
                        textAlign: "center" as const,
                        fontWeight: 600,
                      }}>
                        Otevřít aplikaci →
                      </div>
                    )}
                  </div>
                  {videoMap[service.title] && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setVideoUrl(videoMap[service.title]);
                      }}
                      style={{
                        background: "none",
                        border: "1px solid #2a2a2a",
                        borderRadius: 8,
                        padding: "4px 10px",
                        color: "#ffffff",
                        fontSize: 12,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        marginLeft: locked ? "8px" : "0",
                      }}
                    >
                      ℹ️ Video ukázka
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {videoUrl && (
        <>
          <div
            onClick={() => setVideoUrl(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 500, backdropFilter: "blur(4px)", cursor: "pointer" }}
          />
          <div style={{
            position: "fixed", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%", maxWidth: 800,
            zIndex: 501, borderRadius: 16, overflow: "hidden",
            boxShadow: "0 0 60px rgba(0,0,0,0.8)"
          }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src={`${videoUrl}?autoplay=1`}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => setVideoUrl(null)}
              style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.7)", border: "none", borderRadius: "50%", width: 32, height: 32, color: "#fff", cursor: "pointer", fontSize: 16, zIndex: 502 }}
            >
              ×
            </button>
          </div>
        </>
      )}
    </div>
  );
}
