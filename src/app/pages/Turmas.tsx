import { useState } from "react";
import { Plus, ChevronDown, ChevronUp, Users, TrendingUp, TrendingDown } from "lucide-react";

const TURMAS_DATA = [
  {
    id: 1,
    nome: "8º A — Manhã",
    ano: "8º ano",
    turno: "Manhã",
    estudantes: 32,
    avaliados: 28,
    media: 61,
    tendencia: "up",
    alunos: [
      { nome: "Ana Souza", avaliada: true, media: 72 },
      { nome: "Bruno Lima", avaliada: true, media: 55 },
      { nome: "Carla Mendes", avaliada: true, media: 48 },
      { nome: "Diego Ferreira", avaliada: true, media: 81 },
      { nome: "Eduarda Costa", avaliada: false, media: null },
    ],
  },
  {
    id: 2,
    nome: "8º B — Manhã",
    ano: "8º ano",
    turno: "Manhã",
    estudantes: 30,
    avaliados: 30,
    media: 54,
    tendencia: "down",
    alunos: [
      { nome: "Felipe Rocha", avaliada: true, media: 43 },
      { nome: "Gabriela Nunes", avaliada: true, media: 67 },
      { nome: "Henrique Pinto", avaliada: true, media: 52 },
      { nome: "Isabela Teixeira", avaliada: true, media: 38 },
    ],
  },
  {
    id: 3,
    nome: "9º A — Tarde",
    ano: "9º ano",
    turno: "Tarde",
    estudantes: 27,
    avaliados: 19,
    media: 68,
    tendencia: "up",
    alunos: [
      { nome: "João Alves", avaliada: true, media: 79 },
      { nome: "Karina Bastos", avaliada: true, media: 61 },
      { nome: "Lucas Cardoso", avaliada: false, media: null },
      { nome: "Mariana Dias", avaliada: true, media: 74 },
    ],
  },
  {
    id: 4,
    nome: "7º C — Manhã",
    ano: "7º ano",
    turno: "Manhã",
    estudantes: 35,
    avaliados: 35,
    media: 47,
    tendencia: "down",
    alunos: [
      { nome: "Nicolas Esteves", avaliada: true, media: 41 },
      { nome: "Olivia Farias", avaliada: true, media: 56 },
      { nome: "Pedro Gomes", avaliada: true, media: 33 },
      { nome: "Rebeca Henrique", avaliada: true, media: 49 },
    ],
  },
];

function scoreColor(v: number) {
  if (v >= 70) return "#1a8a5c";
  if (v >= 50) return "#e8a020";
  return "#c0392b";
}

export default function Turmas() {
  const [expandida, setExpandida] = useState<number | null>(null);

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="flex items-center justify-between border-b border-border bg-card px-8 py-5">
        <div>
          <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
            Gestão das Turmas
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
            4 turmas cadastradas · Ano letivo 2025
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus size={14} /> Nova turma
        </button>
      </div>

      <div className="space-y-4 p-8">
        <div className="mb-6 grid grid-cols-3 gap-4">
          {[
            { label: "Total de estudantes", value: "124", icon: Users },
            { label: "Avaliados no bimestre", value: "112", icon: Users },
            { label: "Turmas com atenção", value: "2", icon: TrendingDown },
          ].map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="flex items-center gap-4 border border-border bg-card px-5 py-4">
                <Icon size={20} className="flex-shrink-0 text-muted-foreground" />
                <div>
                  <div className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
                    {k.value}
                  </div>
                  <div className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {k.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {TURMAS_DATA.map((t) => {
          const aberta = expandida === t.id;
          return (
            <div key={t.id} className="overflow-hidden border border-border bg-card">
              <button
                className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-secondary/30"
                onClick={() => setExpandida(aberta ? null : t.id)}
                type="button"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">{t.nome}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {t.avaliados}/{t.estudantes} avaliados
                  </div>
                </div>
                <div className="hidden items-center gap-6 sm:flex">
                  <div className="text-right">
                    <div className="mb-1 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                      Média
                    </div>
                    <div className="text-lg font-bold" style={{ color: scoreColor(t.media), fontFamily: "'Roboto Slab', serif" }}>
                      {t.media}%
                    </div>
                  </div>
                  <div>
                    {t.tendencia === "up" ? (
                      <TrendingUp size={18} className="text-[#1a8a5c]" />
                    ) : (
                      <TrendingDown size={18} className="text-[#c0392b]" />
                    )}
                  </div>
                </div>
                <div className="text-muted-foreground">{aberta ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
              </button>

              {aberta && (
                <div className="border-t border-border">
                  <div
                    className="grid grid-cols-[1fr_auto_auto] border-b border-border px-6 py-2 text-xs uppercase tracking-widest text-muted-foreground"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    <span>Estudante</span>
                    <span className="w-24 text-center">Situação</span>
                    <span className="w-20 text-right">Média</span>
                  </div>
                  {t.alunos.map((a) => (
                    <div
                      key={a.nome}
                      className="grid grid-cols-[1fr_auto_auto] items-center border-b border-border/50 px-6 py-3 transition-colors hover:bg-secondary/20"
                    >
                      <span className="text-sm text-foreground">{a.nome}</span>
                      <span className="w-24 text-center">
                        <span
                          className="px-2 py-0.5 text-xs"
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            color: a.avaliada ? "#1a8a5c" : "#5a6475",
                            backgroundColor: a.avaliada ? "rgba(26,138,92,0.10)" : "rgba(90,100,117,0.10)",
                          }}
                        >
                          {a.avaliada ? "Avaliado" : "Pendente"}
                        </span>
                      </span>
                      <span
                        className="w-20 text-right text-sm font-bold"
                        style={{ color: a.media !== null ? scoreColor(a.media) : "#5a6475", fontFamily: "'DM Mono', monospace" }}
                      >
                        {a.media !== null ? `${a.media}%` : "—"}
                      </span>
                    </div>
                  ))}
                  <div className="px-6 py-3 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                    Exibindo {t.alunos.length} de {t.estudantes} estudantes
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
