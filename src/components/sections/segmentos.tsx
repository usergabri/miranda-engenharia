import { Icone } from "@/components/shared/icone";
import { Revelar } from "@/components/shared/revelar";
import { Secao } from "@/components/shared/secao";
import { conteudo } from "@/lib/content";

/**
 * Faixa leve — ícone + label + nota curta, separados por fio vertical.
 * Sem cards: aqui a função é reconhecimento ("esse sou eu"), não leitura.
 */
export function Segmentos() {
  const { cabecalho, itens } = conteudo.segmentos;

  return (
    <Secao id="segmentos" fundo="alternado">
      <Revelar className="max-w-3xl">
        <p className="rotulo-tecnico flex items-center gap-3 text-brand-text">
          <span aria-hidden className="h-px w-8 bg-brand/60" />
          {cabecalho.eyebrow}
        </p>
        <h2 id="segmentos-titulo" className="mt-4 text-2xl leading-snug sm:text-3xl">
          {cabecalho.titulo}
        </h2>
      </Revelar>

      <ul className="mt-12 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0">
        {itens.map((segmento, indice) => (
          <li key={segmento.id}>
            <Revelar
              indice={indice}
              className="flex h-full flex-col gap-3 lg:border-l lg:border-border lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <Icone nome={segmento.icone} className="size-8 text-primary" strokeWidth={1.4} />
              <span className="font-heading text-base font-semibold leading-snug tracking-tight">
                {segmento.rotulo}
              </span>
              <span className="rotulo-tecnico text-muted-foreground">{segmento.nota}</span>
            </Revelar>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
