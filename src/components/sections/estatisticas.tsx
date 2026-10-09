import { ContadorAnimado } from "@/components/shared/contador-animado";
import { Icone } from "@/components/shared/icone";
import { Secao } from "@/components/shared/secao";
import { conteudo } from "@/lib/content";

/**
 * Faixa de números. Grid estático 4 colunas (2x2 no mobile) — nada de
 * carrossel: são quatro dados que devem ser lidos de uma vez, comparados
 * entre si e não perdidos por rolagem automática.
 */
export function Estatisticas() {
  return (
    <Secao id="estatisticas" fundo="escuro" compacta rotulada={false}>
      <h2 className="sr-only">Números da Miranda Engenharia</h2>

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/10 lg:grid-cols-4">
        {conteudo.estatisticas.map((estatistica) => (
          <div
            key={estatistica.id}
            className="flex flex-col gap-3 bg-surface-dark px-6 py-9 sm:px-8 sm:py-10"
          >
            <Icone nome={estatistica.icone} className="size-6 text-brand" />
            <dd className="font-heading text-4xl font-bold tracking-tight text-surface-dark-foreground sm:text-5xl">
              <ContadorAnimado
                valor={estatistica.valor}
                prefixo={estatistica.prefixo}
                sufixo={estatistica.sufixo}
              />
            </dd>
            <dt className="rotulo-tecnico text-surface-dark-foreground/60">
              {estatistica.rotulo}
            </dt>
          </div>
        ))}
      </dl>
    </Secao>
  );
}
