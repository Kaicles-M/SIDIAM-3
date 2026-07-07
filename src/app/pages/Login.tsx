import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha e-mail e senha para continuar.");
      return;
    }

    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      navigate("/dashboard");
    }, 900);
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary px-14 py-12 text-primary-foreground lg:flex">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#f4f2ed 1px, transparent 1px), linear-gradient(90deg, #f4f2ed 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative flex items-center gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-accent">
            <span className="text-base font-bold text-primary" style={{ fontFamily: "'DM Mono', monospace" }}>
              Σ
            </span>
          </div>
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>
            SIDIAM
          </span>
        </div>

        <div className="relative">
          <div className="mb-6 text-xs uppercase tracking-widest text-accent" style={{ fontFamily: "'DM Mono', monospace" }}>
            Plataforma pedagógica
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight xl:text-5xl" style={{ fontFamily: "'Roboto Slab', serif" }}>
            Diagnóstico
            <br />
            preciso.
            <br />
            <span className="text-accent">Intervenção</span>
            <br />
            eficaz.
          </h1>
          <p className="max-w-sm text-base leading-relaxed text-primary-foreground/55">
            Identifique dificuldades de aprendizagem em matemática e planeje intervenções pedagógicas com base em dados reais das suas turmas.
          </p>
        </div>

        <div className="relative border-t border-white/10 pt-6">
          <div className="grid grid-cols-3 gap-6">
            {[
              { v: "4.200+", l: "Diagnósticos" },
              { v: "98", l: "Escolas" },
              { v: "87%", l: "Taxa de melhoria" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-bold text-accent" style={{ fontFamily: "'Roboto Slab', serif" }}>
                  {s.v}
                </div>
                <div className="mt-0.5 text-xs text-primary-foreground/40" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-7 w-7 items-center justify-center bg-primary">
              <span className="text-sm font-bold text-primary-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                Σ
              </span>
            </div>
            <span className="text-sm font-semibold uppercase tracking-widest text-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
              SIDIAM
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Roboto Slab', serif" }}>
              Bem-vindo(a) de volta
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Entre com sua conta de professor(a) para acessar a plataforma.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground"
                style={{ fontFamily: "'DM Mono', monospace" }}
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="professor@escola.edu.br"
                className="w-full border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  htmlFor="senha"
                >
                  Senha
                </label>
                <button type="button" className="text-xs text-accent hover:underline" style={{ fontFamily: "'DM Mono', monospace" }}>
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  autoComplete="current-password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-border bg-card px-4 py-3 pr-11 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {erro && (
              <div className="flex items-start gap-2.5 border border-destructive/20 bg-destructive/8 px-3 py-3 text-destructive">
                <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                <span className="text-xs leading-snug">{erro}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="group mt-2 flex w-full items-center justify-center gap-2 bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {carregando ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar na plataforma
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
              ou
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button className="w-full border border-border py-3 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground">
            Acesso via rede escolar (SSO)
          </button>

          <p className="mt-8 text-center text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
            Sem conta?{" "}
            <button className="text-accent hover:underline" type="button">
              Solicitar acesso
            </button>
          </p>

          <p className="mt-6 text-center text-xs text-muted-foreground/40" style={{ fontFamily: "'DM Mono', monospace" }}>
            SIDIAM v2.4.1 · Dados protegidos por LGPD
          </p>
        </div>
      </div>
    </div>
  );
}
