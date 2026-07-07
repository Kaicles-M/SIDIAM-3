import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const UNIDADES = [
  {
    id: "numeros",
    label: "Números",
    cor: "#2e6fac",
    habilidades: [
      { codigo: "EF07NU01", desc: "Calcular o resultado de potências com expoente inteiro positivo.", ano: "7º" },
      { codigo: "EF07NU02", desc: "Resolver e elaborar problemas com números racionais positivos.", ano: "7º" },
      { codigo: "EF07NU04", desc: "Resolver problemas que envolvam porcentagens.", ano: "7º" },
      { codigo: "EF08NU01", desc: "Resolver e elaborar problemas com números inteiros.", ano: "8º" },
    ],
  },
  {
    id: "algebra",
    label: "Álgebra",
    cor: "#e8a020",
    habilidades: [
      { codigo: "EF08AL07", desc: "Resolver e elaborar problemas que possam ser representados por inequações.", ano: "8º" },
      { codigo: "EF09AL03", desc: "Resolver e elaborar problemas que possam ser representados por sistemas de equações lineares.", ano: "9º" },
      { codigo: "EF09AL06", desc: "Compreender a ideia de função como relação de dependência entre duas variáveis.", ano: "9º" },
    ],
  },
  {
    id: "geometria",
    label: "Geometria",
    cor: "#1a8a5c",
    habilidades: [
      { codigo: "EF07GE01", desc: "Realizar transformações de figuras geométricas planas no plano cartesiano.", ano: "7º" },
      { codigo: "EF09GE06", desc: "Demonstrar relações métricas do triângulo retângulo (Teorema de Pitágoras).", ano: "9º" },
      { codigo: "EF09GE07", desc: "Resolver e elaborar problemas que envolvam medidas de volume de sólidos.", ano: "9º" },
    ],
  },
  {
    id: "probabilidade",
    label: "Probabilidade e Estatística",
    cor: "#7b5ea7",
    habilidades: [
      { codigo: "EF07PR01", desc: "Calcular a probabilidade de eventos simples e complementares.", ano: "7º" },
      { codigo: "EF09PR01", desc: "Compreender e usar o conceito de espaço amostral em experimentos aleatórios.", ano: "9º" },
      { codigo: "EF09PR02", desc: "Calcular a probabilidade de eventos independentes.", ano: "9º" },
    ],
  },
];

export default function BNCC() {
  const [busca, setBusca] = useState("");
  const [aberta, setAberta] = useState<string | null>("numeros");

  const filtradas = UNIDADES.map((u) => ({
    ...u,
    habilidades: u.habilidades.filter(
      (h) => h.codigo.toLowerCase().includes(busca.toLowerCase()) || h.desc.toLowerCase().includes(busca.toLowerCase()),
    ),
  })).filter((u) => u.habilidades.length > 0);

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="border-b border-border bg-card px-8 py-5">
        <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
          BNCC
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
          Habilidades de Matemática — Ensino Fundamental II
        </p>
      </div>

      <div className="space-y-6 p-8">
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por código ou descrição..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="space-y-3">
          {filtradas.map((u) => {
            const exp = aberta === u.id;
            return (
              <div key={u.id} className="overflow-hidden border border-border bg-card">
                <button
                  className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-secondary/30"
                  onClick={() => setAberta(exp ? null : u.id)}
                  type="button"
                >
                  <div className="h-8 w-2 flex-shrink-0" style={{ backgroundColor: u.cor }} />
                  <div className="flex-1">
                    <span className="text-sm font-bold text-foreground">{u.label}</span>
                    <span className="ml-3 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {u.habilidades.length} habilidades
                    </span>
                  </div>
                  {exp ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                </button>
                {exp && (
                  <div className="divide-y divide-border/50 border-t border-border">
                    {u.habilidades.map((h) => (
                      <div key={h.codigo} className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-secondary/20">
                        <span
                          className="mt-0.5 flex-shrink-0 px-2 py-1 text-xs font-bold"
                          style={{ color: u.cor, backgroundColor: `${u.cor}15`, fontFamily: "'DM Mono', monospace" }}
                        >
                          {h.codigo}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed text-foreground">{h.desc}</p>
                        </div>
                        <span className="flex-shrink-0 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                          {h.ano}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
