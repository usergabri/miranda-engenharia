import { CabecalhoSecao } from "@/components/shared/cabecalho-secao";
import { Icone } from "@/components/shared/icone";
import { Revelar } from "@/components/shared/revelar";
import { Secao } from "@/components/shared/secao";
import { conteudo, type Servico } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Serviços agrupados pelas categorias já declaradas em `content.ts`.
 *
 * Antes a seção renderizava os 9 serviços numa lista plana de peso idêntico —
 * nove opções indiferenciadas no principal ponto de decisão da página. A
 * taxonomia (4 categorias) e a marcação `destaque` já existiam no conteúdo e
 * só eram usadas dentro do <select> do formulário. Agora governam a leitura:
 * 4 grupos de 2 a 3 cards, e os serviços em destaque ganham peso visível.
 */
export function Servicos() {
  const { cabecalho, categorias, itens } = conteudo.servicos;

  const porCategoria = categorias
    .map((categoria) => ({
      categoria,
      servicos: itens.filter((servico) => servico.categoria === categoria.id),
    }))
    .filter((grupo) => grupo.servicos.length > 0);

  return (
    <Secao id="servicos">
      <CabecalhoSecao id="servicos" cabecalho={cabecalho} />

      <div className="mt-14 space-y-12">
        {porCategoria.map((grupo, indiceGrupo) => (
          <section key={grupo.categoria.id} aria-labelledby={`categoria-${grupo.categoria.id}`}>
            <Revelar indice={indiceGrupo}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border pb-4">
                <h3
                  id={`categoria-${grupo.categoria.id}`}
                  className="rotulo-tecnico text-brand-text"
                >
                  {grupo.categoria.rotulo}
                </h3>
                {grupo.categoria.descricao ? (
                  <p className="text-sm text-muted-foreground">{grupo.categoria.descricao}</p>
                ) : null}
              </div>
            </Revelar>

            <ul className="mt-px grid gap-px overflow-hidden bg-border sm:grid-cols-2 lg:grid-cols-3">
              {grupo.servicos.map((servico, indice) => (
                <li key={servico.id}>
                  <Revelar indice={indice} className="h-full">
                    <CardServico servico={servico} />
                  </Revelar>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Secao>
  );
}

/**
 * O card inteiro é o alvo de clique. Vai para #contato com o serviço já
 * selecionado via query param — a página segue estática, o formulário lê o
 * parâmetro no cliente.
 */
function CardServico({ servico }: { servico: Servico }) {
  return (
    <a
      href={`/?servico=${servico.id}#contato`}
      className={cn(
        "group flex h-full flex-col p-7 outline-none transition-colors duration-200 sm:p-8",
        "hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        // O destaque é um fio na cor da marca na borda superior, não uma cor de
        // fundo: mantém o peso tipográfico igual e ainda assim diferencia.
        servico.destaque
          ? "bg-background shadow-[inset_0_2px_0_0_var(--brand)]"
          : "bg-background",
      )}
    >
      <span className="flex items-center justify-between">
        <Icone
          nome={servico.icone}
          className="size-7 text-primary transition-colors duration-200 group-hover:text-brand"
        />
        <Icone
          nome="setaDiagonal"
          className="size-5 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        />
      </span>

      <h4 className="mt-6 text-lg font-bold leading-snug tracking-tight">{servico.titulo}</h4>

      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
        {servico.descricao}
      </p>

      {servico.destaque ? (
        <span className="rotulo-tecnico mt-5 text-brand-text">Mais solicitado</span>
      ) : null}
    </a>
  );
}
