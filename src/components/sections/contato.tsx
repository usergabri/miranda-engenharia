import { FormularioContato } from "@/components/shared/formulario-contato";
import { Icone } from "@/components/shared/icone";
import { Revelar } from "@/components/shared/revelar";
import { Secao } from "@/components/shared/secao";
import { conteudo } from "@/lib/content";

export function Contato() {
  const { cabecalho } = conteudo.formulario;
  const canais = conteudo.canaisDiretos;

  return (
    <Secao id="contato" fundo="escuro">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-20">
        {/* Formulário */}
        <div className="min-w-0">
          <Revelar>
            <p className="rotulo-tecnico flex items-center gap-3 text-brand-text">
              <span aria-hidden className="h-px w-8 bg-brand/60" />
              {cabecalho.eyebrow}
            </p>
            <h2
              id="contato-titulo"
              className="mt-4 text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]"
            >
              {cabecalho.titulo}
            </h2>
            {cabecalho.subtitulo ? (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-surface-dark-foreground/70 sm:text-lg">
                {cabecalho.subtitulo}
              </p>
            ) : null}
          </Revelar>

          <Revelar indice={1} className="mt-10">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-9">
              <FormularioContato />
            </div>
          </Revelar>
        </div>

        {/* Canais diretos */}
        <Revelar indice={2} className="min-w-0 lg:pt-4">
          <h3 className="font-heading text-xl font-bold tracking-tight">
            {canais.cabecalho.titulo}
          </h3>
          {canais.cabecalho.subtitulo ? (
            <p className="mt-3 text-[0.95rem] leading-relaxed text-surface-dark-foreground/70">
              {canais.cabecalho.subtitulo}
            </p>
          ) : null}

          <ul className="mt-8 space-y-3">
            {canais.itens.map((canal) => (
              <li key={canal.id}>
                <a
                  href={canal.href}
                  aria-label={canal.ariaLabel}
                  target={canal.id === "whatsapp" ? "_blank" : undefined}
                  rel={canal.id === "whatsapp" ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4 outline-none transition-colors duration-200 hover:border-brand/50 hover:bg-white/[0.06] focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icone
                    nome={canal.icone}
                    className="size-5 text-brand"
                    strokeWidth={1.6}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="rotulo-tecnico block text-surface-dark-foreground/55">
                      {canal.rotulo}
                    </span>
                    {/*
                      Quebra em vez de truncar: um e-mail cortado com reticências
                      é inútil, e o `nowrap` do truncate empurrava a coluna do
                      grid para 405px em telas de 375px.
                    */}
                    <span className="mt-1 block font-heading font-semibold tracking-tight [overflow-wrap:anywhere]">
                      {canal.valor}
                    </span>
                  </span>
                  <Icone
                    nome="setaDiagonal"
                    className="size-4 shrink-0 text-surface-dark-foreground/40 transition-colors group-hover:text-brand"
                  />
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 flex items-center gap-2.5 rotulo-tecnico text-surface-dark-foreground/55">
            <Icone nome="horario" className="size-4 text-brand" />
            {conteudo.contato.horarioAtendimento}
          </p>
        </Revelar>
      </div>
    </Secao>
  );
}
