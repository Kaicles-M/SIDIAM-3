import { useState } from "react";
import { Lightbulb, BookOpen, Users, Clock, ChevronRight } from "lucide-react";

const INTERVENCOES = [
  {
    id: 1,
    habilidade: "EF09AL03",
    titulo: "Sistemas lineares — Reforço visual",
    tipo: "Atividade em grupo",
    duracao: "2 aulas",
    turmas: ["8º B", "7º C"],
    desc: "Sequência didática com representação gráfica e algébrica de sistemas 2×2. Inclui material imprimível e guia do professor.",
    tags: ["Álgebra", "Visual", "Colaborativo"],
    prioridade: "alta",
  },
  {
    id: 2,
    habilidade: "EF08AL07",
    titulo: "Inequações no cotidiano",
    tipo: "Resolução de problemas",
    duracao: "1 aula",
    turmas: ["8º A", "8º B"],
    desc: "Problemas contextualizados com situações do dia a dia para compreensão intuitiva das inequações antes da formalização.",
    tags: ["Álgebra", "Contextualizado"],
    prioridade: "alta",
  },
  {
    id: 3,
    habilidade: "EF07NU04",
    titulo: "Porcentagem com calculadora",
    tipo: "Atividade individual",
    duracao: "1 aula",
    turmas: ["7º C"],
    desc: "Uso guiado da calculadora para consolidar o raciocínio percentual antes de avançar para cálculo mental.",
    tags: ["Números", "Tecnologia"],
    prioridade: "media",
  },
  {
    id: 4,
    habilidade: "EF09GE06",
    titulo: "Pitágoras — Construção e prova",
    tipo: "Atividade em grupo",
    duracao: "3 aulas",
    turmas: ["9º A"],
    desc: "Verificação experimental do Teorema de Pitágoras com materiais concretos, seguida de demonstração formal.",
    tags: ["Geometria", "Manipulativo"],
    prioridade: "media",
  },
  {
    id: 5,
    habilidade: "EF09PR01",
    titulo: "Experimentos de probabilidade",
    tipo: "Atividade em grupo",
    duracao: "2 aulas",
    turmas: ["9º A", "8º A"],
    desc: "Simulações com dados e moedas para construção do conceito de espaço amostral a partir da experimentação.",
    tags: ["Probabilidade", "Experimental"],
    prioridade: "baixa",
  },
];

const PRIORIDADE_MAP: Record<string, { label: string; color: string; bg: string }> = {
  alta: { label: "Prioridade alta", color: "#c0392b", bg: "rgba(192,57,43,0.10)" },
  media: { label: "Prioridade média", color: "#e8a020", bg: "rgba(232,160,32,0.10)" },
  baixa: { label: "Prioridade baixa", color: "#1a8a5c", bg: "rgba(26,138,92,0.10)" },
};

export default function Intervencoes() {
  const [filtro, setFiltro] = useState<"todas" | "alta" | "media" | "baixa">("todas");

  const filtradas = INTERVENCOES.filter((i) => filtro === "todas" || i.prioridade === filtro);

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="border-b border-border bg-card px-8 py-5">
        <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
          Intervenções Pedagógicas
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
          Sugestões geradas a partir das dificuldades identificadas
        </p>
      </div>

      <div className="space-y-6 p-8">
        <div className="flex flex-wrap gap-2">
          {(["todas", "alta", "media", "baixa"] as const).map((f) => {
            const labels = { todas: "Todas", alta: "Alta prioridade", media: "Média prioridade", baixa: "Baixa prioridade" };
            return (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`border px-3 py-2 text-xs transition-colors ${
                  filtro === f ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {labels[f]}
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {filtradas.map((item) => {
            const p = PRIORIDADE_MAP[item.prioridade];
            return (
              <div key={item.id} className="group cursor-pointer border border-border bg-card transition-colors hover:border-accent/40">
                <div className="p-6">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-accent/10">
                        <Lightbulb size={17} className="text-accent" />
                      </div>
                      <div>
                        <div className="mb-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                          {item.habilidade}
                        </div>
                        <div className="text-sm font-bold text-foreground">{item.titulo}</div>
                      </div>
                    </div>
                    <span className="flex-shrink-0 px-2 py-1 text-xs" style={{ color: p.color, backgroundColor: p.bg, fontFamily: "'DM Mono', monospace" }}>
                      {p.label}
                    </span>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={12} />
                      <span style={{ fontFamily: "'DM Mono', monospace" }}>{item.tipo}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} />
                      <span style={{ fontFamily: "'DM Mono', monospace" }}>{item.duracao}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={12} />
                      <span style={{ fontFamily: "'DM Mono', monospace" }}>{item.turmas.join(", ")}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end border-t border-border px-6 py-3">
                  <button className="flex items-center gap-1 text-xs text-accent transition-all hover:gap-2" style={{ fontFamily: "'DM Mono', monospace" }} type="button">
                    Ver material completo <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
