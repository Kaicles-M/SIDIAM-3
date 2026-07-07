import { Link } from "react-router-dom";
import {
  BarChart2,
  Users,
  ClipboardList,
  Lightbulb,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

const TURMAS = [
  { nome: "8º A — Manhã", estudantes: 32, avaliados: 28, media: 61, tendencia: "up" },
  { nome: "8º B — Manhã", estudantes: 30, avaliados: 30, media: 54, tendencia: "down" },
  { nome: "9º A — Tarde", estudantes: 27, avaliados: 19, media: 68, tendencia: "up" },
  { nome: "7º C — Manhã", estudantes: 35, avaliados: 35, media: 47, tendencia: "down" },
];

const DIFICULDADES = [
  { habilidade: "Sistemas lineares (EF09AL03)", pct: 69, severidade: "alta" },
  { habilidade: "Inequações (EF08AL07)", pct: 56, severidade: "alta" },
  { habilidade: "Frações e razões (EF07NU04)", pct: 48, severidade: "media" },
  { habilidade: "Geometria analítica (EF09GE06)", pct: 41, severidade: "media" },
  { habilidade: "Probabilidade (EF09PR01)", pct: 35, severidade: "baixa" },
];

const AVALIACOES_RECENTES = [
  { turma: "8º A", titulo: "Diagnóstico — Álgebra I", data: "02 Jun 2025", status: "concluida" },
  { turma: "9º A", titulo: "Diagnóstico — Geometria", data: "28 Mai 2025", status: "concluida" },
  { turma: "7º C", titulo: "Diagnóstico — Números", data: "20 Mai 2025", status: "concluida" },
  { turma: "8º B", titulo: "Diagnóstico — Funções", data: "14 Mai 2025", status: "concluida" },
];

const COMPETENCIAS_HEATMAP = [
  { area: "Números", scores: [72, 58, 81, 47] },
  { area: "Álgebra", scores: [44, 31, 68, 29] },
  { area: "Geometria", scores: [61, 55, 74, 52] },
  { area: "Probabilidade", scores: [53, 48, 65, 41] },
  { area: "Raciocínio", scores: [67, 60, 79, 55] },
];

function scoreColor(v: number) {
  if (v >= 70) return "#1a8a5c";
  if (v >= 50) return "#e8a020";
  return "#c0392b";
}

function scoreBg(v: number) {
  if (v >= 70) return "rgba(26,138,92,0.12)";
  if (v >= 50) return "rgba(232,160,32,0.12)";
  return "rgba(192,57,43,0.12)";
}

function SeveridadeBadge({ s }: { s: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    alta: { label: "Alta", color: "#c0392b", bg: "rgba(192,57,43,0.10)" },
    media: { label: "Média", color: "#e8a020", bg: "rgba(232,160,32,0.10)" },
    baixa: { label: "Baixa", color: "#1a8a5c", bg: "rgba(26,138,92,0.10)" },
  };
  const { label, color, bg } = map[s];
  return (
    <span className="px-2 py-0.5 text-xs" style={{ color, backgroundColor: bg, fontFamily: "'DM Mono', monospace" }}>
      {label}
    </span>
  );
}

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="flex items-center justify-between border-b border-border bg-card px-8 py-5">
        <div>
          <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
            Dashboard
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
            Ano letivo 2025 — 2º bimestre
          </p>
        </div>
        <Link
          to="/avaliacoes"
          className="flex items-center gap-2 bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Novo diagnóstico <ChevronRight size={14} />
        </Link>
      </div>

      <div className="space-y-8 p-8">
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {[
            { label: "Estudantes avaliados", value: "112", total: "124", icon: Users, color: "#2e6fac" },
            { label: "Média geral da rede", value: "57,5", unit: "%", icon: BarChart2, color: "#e8a020" },
            { label: "Avaliações aplicadas", value: "4", unit: "este bimestre", icon: ClipboardList, color: "#1a8a5c" },
            { label: "Intervenções sugeridas", value: "18", unit: "pendentes", icon: Lightbulb, color: "#c0392b" },
          ].map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="border border-border bg-card p-5">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center" style={{ backgroundColor: `${k.color}18` }}>
                    <Icon size={18} style={{ color: k.color }} />
                  </div>
                  <ArrowUpRight size={14} className="text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
                  {k.value}
                  {k.total && <span className="text-base font-normal text-muted-foreground">/{k.total}</span>}
                </div>
                <div className="mt-1 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {k.unit ?? ""} {k.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="border border-border bg-card xl:col-span-2">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
                Turmas — Desempenho por média
              </h2>
              <Link to="/turmas" className="flex items-center gap-1 text-xs text-accent hover:underline">
                Ver todas <ChevronRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {TURMAS.map((t) => (
                <Link
                  key={t.nome}
                  to="/turmas"
                  className="flex cursor-pointer items-center gap-4 px-6 py-4 transition-colors hover:bg-secondary/40"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-foreground">{t.nome}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {t.avaliados}/{t.estudantes} avaliados
                    </div>
                  </div>
                  <div className="max-w-[140px] flex-1">
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full" style={{ width: `${t.media}%`, backgroundColor: scoreColor(t.media) }} />
                    </div>
                  </div>
                  <div className="w-10 text-right text-sm font-bold" style={{ color: scoreColor(t.media), fontFamily: "'DM Mono', monospace" }}>
                    {t.media}%
                  </div>
                  <div>
                    {t.tendencia === "up" ? (
                      <TrendingUp size={15} className="text-[#1a8a5c]" />
                    ) : (
                      <TrendingDown size={15} className="text-[#c0392b]" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
                Avaliações recentes
              </h2>
            </div>
            <div className="divide-y divide-border">
              {AVALIACOES_RECENTES.map((a) => (
                <Link
                  key={a.titulo}
                  to="/avaliacoes"
                  className="block cursor-pointer px-6 py-4 transition-colors hover:bg-secondary/40"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <CheckCircle2 size={13} className="flex-shrink-0 text-[#1a8a5c]" />
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {a.turma}
                    </span>
                  </div>
                  <div className="text-sm font-medium leading-snug text-foreground">{a.titulo}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                    <Clock size={11} /> {a.data}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
                Principais dificuldades identificadas
              </h2>
              <AlertCircle size={15} className="text-[#e8a020]" />
            </div>
            <div className="space-y-4 p-6">
              {DIFICULDADES.map((d) => (
                <div key={d.habilidade}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="max-w-[60%] text-xs leading-snug text-foreground">{d.habilidade}</span>
                    <div className="flex items-center gap-2">
                      <SeveridadeBadge s={d.severidade} />
                      <span className="text-xs font-bold" style={{ color: scoreColor(100 - d.pct), fontFamily: "'DM Mono', monospace" }}>
                        {d.pct}% c/ dif.
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: scoreColor(100 - d.pct) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
                Mapa de desempenho — Competência × Turma
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                8ºA · 8ºB · 9ºA · 7ºC
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                {COMPETENCIAS_HEATMAP.map((row) => (
                  <div key={row.area} className="flex items-center gap-3">
                    <span className="w-24 flex-shrink-0 text-xs text-muted-foreground">{row.area}</span>
                    <div className="flex flex-1 gap-1.5">
                      {row.scores.map((s, i) => (
                        <div
                          key={i}
                          className="flex h-8 flex-1 items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: scoreBg(s), color: scoreColor(s), fontFamily: "'DM Mono', monospace" }}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4">
                {[
                  { label: "≥ 70% adequado", color: "#1a8a5c" },
                  { label: "50–69% atenção", color: "#e8a020" },
                  { label: "< 50% crítico", color: "#c0392b" },
                ].map((leg) => (
                  <div key={leg.label} className="flex items-center gap-1.5">
                    <div className="h-3 w-3" style={{ backgroundColor: `${leg.color}40`, border: `1.5px solid ${leg.color}` }} />
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {leg.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
