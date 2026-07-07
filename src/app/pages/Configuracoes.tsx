import { useState } from "react";
import { User, Bell, Eye, Shield, ChevronRight } from "lucide-react";

const SECTIONS = [
  { id: "perfil", label: "Perfil do professor", icon: User },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "visualizacao", label: "Preferências de visualização", icon: Eye },
  { id: "privacidade", label: "Privacidade e segurança", icon: Shield },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative flex h-5 w-10 flex-shrink-0 rounded-full transition-colors ${checked ? "bg-accent" : "bg-muted"}`}
      type="button"
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function Configuracoes() {
  const [activeSection, setActiveSection] = useState("perfil");
  const [notifs, setNotifs] = useState({ avaliacoes: true, resultados: true, intervencoes: false, relatorios: true });
  const [viz, setViz] = useState({ heatmap: true, tendencias: true, mono: false });

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="border-b border-border bg-card px-8 py-5">
        <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
          Configurações
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
          Preferências da conta e da plataforma
        </p>
      </div>

      <div className="flex min-h-0 flex-col gap-6 p-8 lg:flex-row">
        <div className="flex-shrink-0 lg:w-56">
          <nav className="space-y-0.5">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full border-l-2 px-3 py-3 text-left transition-colors ${
                    activeSection === s.id
                      ? "border-accent bg-secondary text-foreground"
                      : "border-transparent text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                  type="button"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={15} />
                    <span className="text-sm">{s.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 space-y-8 border border-border bg-card p-8">
          {activeSection === "perfil" && (
            <div>
              <h2 className="mb-6 text-base font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
                Perfil do professor
              </h2>
              <div className="mb-8 flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center bg-accent/20 text-2xl font-bold text-accent">P</div>
                <div>
                  <button className="text-xs text-accent hover:underline" type="button">
                    Alterar foto
                  </button>
                  <p className="mt-1 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                    JPG ou PNG · Máx. 2MB
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { label: "Nome completo", value: "Prof. Maria Silva" },
                  { label: "E-mail", value: "maria.silva@escola.edu.br" },
                  { label: "Escola", value: "E.E. Professora Ana Lima" },
                  { label: "Disciplina", value: "Matemática" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="mb-1 block text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {f.label}
                    </label>
                    <input
                      defaultValue={f.value}
                      className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                ))}
              </div>
              <button className="mt-6 bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90" type="button">
                Salvar alterações
              </button>
            </div>
          )}

          {activeSection === "notificacoes" && (
            <>
              <h2 className="mb-6 text-base font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
                Notificações
              </h2>
              <div className="space-y-5">
                {[
                  { key: "avaliacoes" as const, label: "Novas avaliações disponíveis", desc: "Alertas quando uma avaliação for criada ou agendada." },
                  { key: "resultados" as const, label: "Resultados processados", desc: "Notificação ao concluir o processamento de respostas." },
                  { key: "intervencoes" as const, label: "Novas sugestões de intervenção", desc: "Quando o sistema identificar novas dificuldades." },
                  { key: "relatorios" as const, label: "Relatórios gerados", desc: "Confirmação quando um relatório estiver pronto." },
                ].map((n) => (
                  <div key={n.key} className="flex items-start justify-between gap-4 border-b border-border/50 py-4 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-foreground">{n.label}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{n.desc}</div>
                    </div>
                    <Toggle checked={notifs[n.key]} onChange={() => setNotifs((p) => ({ ...p, [n.key]: !p[n.key] }))} />
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection === "visualizacao" && (
            <>
              <h2 className="mb-6 text-base font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
                Preferências de visualização
              </h2>
              <div className="space-y-5">
                {[
                  { key: "heatmap" as const, label: "Exibir mapa de calor no Dashboard", desc: "Mostra a tabela de competência × turma na tela inicial." },
                  { key: "tendencias" as const, label: "Indicadores de tendência", desc: "Setas de melhora/queda no desempenho das turmas." },
                  { key: "mono" as const, label: "Modo alto contraste", desc: "Aumenta o contraste para facilitar a leitura." },
                ].map((v) => (
                  <div key={v.key} className="flex items-start justify-between gap-4 border-b border-border/50 py-4 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-foreground">{v.label}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{v.desc}</div>
                    </div>
                    <Toggle checked={viz[v.key]} onChange={() => setViz((p) => ({ ...p, [v.key]: !p[v.key] }))} />
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection === "privacidade" && (
            <>
              <h2 className="mb-6 text-base font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
                Privacidade e segurança
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Alterar senha", desc: "Atualize sua senha de acesso à plataforma." },
                  { label: "Exportar meus dados", desc: "Baixe uma cópia de todos os seus dados na plataforma." },
                  { label: "Política de Privacidade", desc: "Como tratamos seus dados e os dados dos estudantes (LGPD)." },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="group flex w-full items-center justify-between border border-border px-4 py-4 text-left transition-colors hover:bg-secondary/40"
                    type="button"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                    <ChevronRight size={15} className="text-muted-foreground transition-colors group-hover:text-foreground" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
