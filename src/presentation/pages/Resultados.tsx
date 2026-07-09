import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const TURMA_OPTIONS = ["Todas as turmas", "8º A", "8º B", "9º A", "7º C"];

const DATA_POR_AREA = [
  { area: "Números", media: 64 },
  { area: "Álgebra", media: 43 },
  { area: "Geometria", media: 60 },
  { area: "Probabilidade", media: 51 },
  { area: "Raciocínio", media: 65 },
];

const DATA_EVOLUCAO = [
  { bimestre: "1º Bim", media: 48 },
  { bimestre: "2º Bim", media: 57 },
  { bimestre: "3º Bim", media: 61 },
  { bimestre: "4º Bim", media: 0 },
];

function scoreColor(v: number) {
  if (v >= 70) return "#1a8a5c";
  if (v >= 50) return "#e8a020";
  if (v === 0) return "#dedad3";
  return "#c0392b";
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="border border-border bg-card px-3 py-2 text-xs shadow-lg">
        <p className="font-bold text-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
          {label}
        </p>
        <p style={{ color: scoreColor(payload[0].value), fontFamily: "'DM Mono', monospace" }}>
          {payload[0].value > 0 ? `${payload[0].value}%` : "—"}
        </p>
      </div>
    );
  }
  return null;
}

export default function Resultados() {
  const [turma, setTurma] = useState("Todas as turmas");

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="flex items-center justify-between border-b border-border bg-card px-8 py-5">
        <div>
          <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
            Resultados
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
            Desempenho geral · Ano letivo 2025
          </p>
        </div>
        <select
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
          className="border border-border bg-card px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {TURMA_OPTIONS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="space-y-6 p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <h2 className="mb-1 text-sm font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
              Desempenho por área do conhecimento
            </h2>
            <p className="mb-6 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
              Média dos estudantes avaliados
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={DATA_POR_AREA} barCategoryGap="35%">
                <XAxis dataKey="area" tick={{ fontSize: 11, fontFamily: "'DM Mono', monospace", fill: "#5a6475" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fontFamily: "'DM Mono', monospace", fill: "#5a6475" }} axisLine={false} tickLine={false} width={32} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                <Bar dataKey="media" radius={0}>
                  {DATA_POR_AREA.map((entry, i) => (
                    <Cell key={i} fill={scoreColor(entry.media)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="mb-1 text-sm font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
              Evolução da média ao longo do ano
            </h2>
            <p className="mb-6 text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
              Por bimestre · dados até o 3º bimestre
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={DATA_EVOLUCAO} barCategoryGap="35%">
                <XAxis dataKey="bimestre" tick={{ fontSize: 11, fontFamily: "'DM Mono', monospace", fill: "#5a6475" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fontFamily: "'DM Mono', monospace", fill: "#5a6475" }} axisLine={false} tickLine={false} width={32} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                <Bar dataKey="media" radius={0}>
                  {DATA_EVOLUCAO.map((entry, i) => (
                    <Cell key={i} fill={scoreColor(entry.media)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
              Habilidades com menor desempenho
            </h2>
          </div>
          <div className="divide-y divide-border">
            {[
              { cod: "EF09AL03", desc: "Sistemas lineares", media: 31 },
              { cod: "EF08AL07", desc: "Inequações", media: 44 },
              { cod: "EF07NU04", desc: "Frações e razões", media: 52 },
              { cod: "EF09GE06", desc: "Geometria analítica", media: 55 },
              { cod: "EF07PR01", desc: "Probabilidade simples", media: 58 },
            ].map((h) => (
              <div key={h.cod} className="flex items-center gap-4 px-6 py-4">
                <span className="w-24 flex-shrink-0 text-xs font-bold" style={{ color: scoreColor(h.media), fontFamily: "'DM Mono', monospace" }}>
                  {h.cod}
                </span>
                <div className="flex-1">
                  <div className="mb-1 text-sm text-foreground">{h.desc}</div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${h.media}%`, backgroundColor: scoreColor(h.media) }} />
                  </div>
                </div>
                <span className="w-12 text-right text-sm font-bold" style={{ color: scoreColor(h.media), fontFamily: "'DM Mono', monospace" }}>
                  {h.media}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
