import { useState } from "react";
import { Plus, Search, CheckCircle2, Clock, AlertCircle, Eye } from "lucide-react";

const AVALIACOES = [
  { id: 1, titulo: "Diagnóstico — Álgebra I", turma: "8º A", data: "02 Jun 2025", status: "concluida", respondentes: 28, total: 32 },
  { id: 2, titulo: "Diagnóstico — Geometria Plana", turma: "9º A", data: "28 Mai 2025", status: "concluida", respondentes: 19, total: 27 },
  { id: 3, titulo: "Diagnóstico — Números e Operações", turma: "7º C", data: "20 Mai 2025", status: "concluida", respondentes: 35, total: 35 },
  { id: 4, titulo: "Diagnóstico — Funções Afins", turma: "8º B", data: "14 Mai 2025", status: "concluida", respondentes: 30, total: 30 },
  { id: 5, titulo: "Diagnóstico — Probabilidade", turma: "9º A", data: "10 Jun 2025", status: "em_andamento", respondentes: 11, total: 27 },
  { id: 6, titulo: "Diagnóstico — Estatística Básica", turma: "8º A", data: "15 Jun 2025", status: "agendada", respondentes: 0, total: 32 },
];

const STATUS_MAP: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  concluida: { label: "Concluída", icon: CheckCircle2, color: "#1a8a5c", bg: "rgba(26,138,92,0.10)" },
  em_andamento: { label: "Em andamento", icon: Clock, color: "#e8a020", bg: "rgba(232,160,32,0.10)" },
  agendada: { label: "Agendada", icon: AlertCircle, color: "#2e6fac", bg: "rgba(46,111,172,0.10)" },
};

type FilterStatus = "todas" | "concluida" | "em_andamento" | "agendada";

export default function Avaliacoes() {
  const [filtro, setFiltro] = useState<FilterStatus>("todas");
  const [busca, setBusca] = useState("");

  const filtradas = AVALIACOES.filter((a) => {
    const matchStatus = filtro === "todas" || a.status === filtro;
    const matchBusca = a.titulo.toLowerCase().includes(busca.toLowerCase()) || a.turma.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="flex items-center justify-between border-b border-border bg-card px-8 py-5">
        <div>
          <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
            Avaliações
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
            {AVALIACOES.length} avaliações cadastradas
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus size={14} /> Nova avaliação
        </button>
      </div>

      <div className="space-y-6 p-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative max-w-sm flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar avaliação ou turma..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div className="flex gap-2">
            {(["todas", "concluida", "em_andamento", "agendada"] as FilterStatus[]).map((f) => {
              const labels: Record<FilterStatus, string> = {
                todas: "Todas",
                concluida: "Concluídas",
                em_andamento: "Em andamento",
                agendada: "Agendadas",
              };
              return (
                <button
                  key={f}
                  onClick={() => setFiltro(f)}
                  className={`border px-3 py-2 text-xs transition-colors ${
                    filtro === f
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {labels[f]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden border border-border bg-card">
          <div
            className="grid grid-cols-[1fr_auto_auto_auto_auto] border-b border-border px-6 py-3 text-xs uppercase tracking-widest text-muted-foreground"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span>Avaliação</span>
            <span className="w-28 text-center">Turma</span>
            <span className="w-28 text-center">Respondentes</span>
            <span className="w-32 text-center">Status</span>
            <span className="w-16" />
          </div>
          <div className="divide-y divide-border">
            {filtradas.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-muted-foreground">Nenhuma avaliação encontrada.</div>
            ) : (
              filtradas.map((a) => {
                const s = STATUS_MAP[a.status];
                const Icon = s.icon;
                return (
                  <div
                    key={a.id}
                    className="grid cursor-pointer grid-cols-[1fr_auto_auto_auto_auto] items-center px-6 py-4 transition-colors hover:bg-secondary/30"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">{a.titulo}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                        {a.data}
                      </div>
                    </div>
                    <div className="w-28 text-center text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {a.turma}
                    </div>
                    <div className="w-28 text-center">
                      <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>
                        {a.respondentes}/{a.total}
                      </span>
                      <div className="mx-4 mt-1 h-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${(a.respondentes / a.total) * 100}%` }} />
                      </div>
                    </div>
                    <div className="flex w-32 justify-center">
                      <span
                        className="flex items-center gap-1.5 px-2 py-1 text-xs"
                        style={{ color: s.color, backgroundColor: s.bg, fontFamily: "'DM Mono', monospace" }}
                      >
                        <Icon size={12} /> {s.label}
                      </span>
                    </div>
                    <div className="flex w-16 justify-end">
                      <button className="p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" type="button">
                        <Eye size={15} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
