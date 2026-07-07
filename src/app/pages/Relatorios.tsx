import { FileText, Download, Filter } from "lucide-react";

const RELATORIOS = [
  { id: 1, titulo: "Relatório Bimestral — 8º A", tipo: "Por turma", periodo: "2º Bimestre 2025", gerado: "05 Jun 2025", paginas: 8 },
  { id: 2, titulo: "Análise de Habilidades BNCC — 9º Ano", tipo: "Por habilidade", periodo: "1º–2º Bimestre 2025", gerado: "01 Jun 2025", paginas: 14 },
  { id: 3, titulo: "Evolução Individual — Ana Souza", tipo: "Por estudante", periodo: "Ano letivo 2025", gerado: "28 Mai 2025", paginas: 4 },
  { id: 4, titulo: "Panorama Geral — Todas as Turmas", tipo: "Geral", periodo: "2º Bimestre 2025", gerado: "20 Mai 2025", paginas: 22 },
  { id: 5, titulo: "Dificuldades em Álgebra — 7º e 8º anos", tipo: "Por conteúdo", periodo: "Ano letivo 2025", gerado: "10 Mai 2025", paginas: 11 },
];

const TIPO_CORES: Record<string, string> = {
  "Por turma": "#2e6fac",
  "Por habilidade": "#7b5ea7",
  "Por estudante": "#1a8a5c",
  Geral: "#e8a020",
  "Por conteúdo": "#c0392b",
};

export default function Relatorios() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="flex items-center justify-between border-b border-border bg-card px-8 py-5">
        <div>
          <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
            Relatórios
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
            Exporte e compartilhe dados de desempenho
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          <FileText size={14} /> Gerar relatório
        </button>
      </div>

      <div className="space-y-6 p-8">
        <div className="border border-border bg-card p-6">
          <h2 className="mb-4 text-sm font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
            Gerar novo relatório
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {["Por turma", "Por estudante", "Por habilidade BNCC"].map((tipo) => (
              <button
                key={tipo}
                className="group flex items-center gap-3 border border-border px-4 py-3 text-left transition-colors hover:border-accent/50 hover:bg-secondary/50"
                type="button"
              >
                <FileText size={16} className="text-muted-foreground transition-colors group-hover:text-accent" />
                <span className="text-sm text-foreground">{tipo}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
              Relatórios gerados
            </h2>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground" type="button">
              <Filter size={13} /> Filtrar
            </button>
          </div>
          <div className="divide-y divide-border">
            {RELATORIOS.map((r) => (
              <div key={r.id} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-secondary/30">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center" style={{ backgroundColor: `${(TIPO_CORES[r.tipo] || "#5a6475")}18` }}>
                  <FileText size={17} style={{ color: TIPO_CORES[r.tipo] || "#5a6475" }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">{r.titulo}</div>
                  <div className="mt-0.5 flex items-center gap-3">
                    <span
                      className="px-1.5 py-0.5 text-xs"
                      style={{ color: TIPO_CORES[r.tipo], backgroundColor: `${(TIPO_CORES[r.tipo] || "#5a6475")}15`, fontFamily: "'DM Mono', monospace" }}
                    >
                      {r.tipo}
                    </span>
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {r.periodo}
                    </span>
                  </div>
                </div>
                <div className="hidden flex-shrink-0 text-right sm:block">
                  <div className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {r.gerado}
                  </div>
                  <div className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {r.paginas} páginas
                  </div>
                </div>
                <button className="flex-shrink-0 p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" type="button">
                  <Download size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
