import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "./hooks/useAuth";
import { NAV_ITEMS } from "./navigation";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    setSidebarOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background" style={{ fontFamily: "'Inter', sans-serif" }}>
      {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside
        className={`
          fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-primary text-primary-foreground
          transition-transform duration-300 ease-in-out lg:static
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="border-b border-white/10 px-5 pb-5 pt-6">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center bg-accent">
              <span className="text-sm font-bold text-primary" style={{ fontFamily: "'DM Mono', monospace" }}>
                Σ
              </span>
            </div>
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>
              SIDIAM
            </span>
          </div>
          <p className="text-xs leading-snug text-primary-foreground/45" style={{ fontFamily: "'DM Mono', monospace" }}>
            Sistema de Diagnostico
            <br />
            em Matematica
          </p>
        </div>

        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-accent/20 text-sm font-bold text-accent">
            {user?.name.slice(0, 1).toUpperCase() ?? "P"}
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold text-primary-foreground">{user?.name ?? "Professor(a)"}</div>
            <div className="truncate text-xs text-primary-foreground/45" style={{ fontFamily: "'DM Mono', monospace" }}>
              {user?.schoolName ?? "Painel pedagogico"}
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 border-l-2 px-3 py-2.5 transition-colors duration-150 ${
                    isActive
                      ? "border-accent bg-white/10 text-primary-foreground"
                      : "border-transparent text-primary-foreground/55 hover:bg-white/5 hover:text-primary-foreground"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={16} className={isActive ? "text-accent" : "text-primary-foreground/40"} />
                    <span className="flex-1 text-sm">{item.label}</span>
                    {item.badge && (
                      <span
                        className="min-w-[20px] bg-accent px-1.5 py-0.5 text-center text-xs font-bold text-primary"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-5 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="mb-4 flex w-full items-center justify-center gap-2 border border-white/10 px-3 py-2 text-xs text-primary-foreground/70 transition-colors hover:bg-white/5 hover:text-primary-foreground"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <LogOut size={14} />
            Sair da sessao
          </button>
          <p className="text-xs text-primary-foreground/25" style={{ fontFamily: "'DM Mono', monospace" }}>
            v2.4.1 - Jun 2025
          </p>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex h-12 flex-shrink-0 items-center gap-3 border-b border-white/10 bg-primary px-4 text-primary-foreground lg:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1" type="button">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>
            SIDIAM
          </span>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
