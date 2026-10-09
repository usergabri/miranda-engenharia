import { CabecalhoSecao } from "@/components/shared/cabecalho-secao";
import { Icone } from "@/components/shared/icone";
import { Revelar } from "@/components/shared/revelar";
import { Secao } from "@/components/shared/secao";
import { conteudo } from "@/lib/content";

/**
 * Quatro passos. Horizontal no desktop, com o conector correndo atrás dos
 * marcadores; vertical no mobile, com a linha à esquerda.
 */
export function ComoFunciona() {
  const { cabecalho, passos } = conteudo.processo;

  return (
    <Secao id="como-funciona">
      <CabecalhoSecao id="como-funciona" cabecalho={cabecalho} />

      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
        {/* Conector: linha vertical no mobile, horizontal no desktop */}
        <span
          aria-hidden
          className="absolute left-[1.4375rem] top-2 h-[calc(100%-3rem)] w-px bg-border md:left-0 md:top-[1.4375rem] md:h-px md:w-full"
        />

        {passos.map((passo, indice) => (
          <li key={passo.numero} className="relative">
            <Revelar indice={indice} className="flex gap-5 md:block">
              <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-sm font-semibold text-primary">
                {String(passo.numero).padStart(2, "0")}
              </span>

              <div className="md:mt-6">
                <span className="flex items-center gap-2.5">
                  <Icone nome={passo.icone} className="size-5 text-brand" />
                  <h3 className="text-lg leading-snug">{passo.titulo}</h3>
                </span>
                <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-muted-foreground">
                  {passo.descricao}
                </p>
              </div>
            </Revelar>
          </li>
        ))}
      </ol>
    </Secao>
  );
}
