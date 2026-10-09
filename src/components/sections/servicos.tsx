import { CabecalhoSecao } from "@/components/shared/cabecalho-secao";
import { Icone } from "@/components/shared/icone";
import { Revelar } from "@/components/shared/revelar";
import { Secao } from "@/components/shared/secao";
import { conteudo } from "@/lib/content";

export function Servicos() {
  const { cabecalho, itens } = conteudo.servicos;

  return (
    <Secao id="servicos">
      <CabecalhoSecao id="servicos" cabecalho={cabecalho} />

      <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {itens.map((servico, indice) => (
          <li key={servico.id}>
            <Revelar indice={indice % 3} className="h-full">
              {/*
                O card inteiro é o alvo de clique. Vai para #contato com o
                serviço já selecionado via query param — a página segue estática,
                o formulário lê o parâmetro no cliente.
              */}
              <a
                href={`/?servico=${servico.id}#contato`}
                className="group flex h-full flex-col bg-background p-7 outline-none transition-colors duration-200 hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:p-8"
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

                <h3 className="mt-6 text-lg leading-snug">{servico.titulo}</h3>

                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {servico.descricao}
                </p>
              </a>
            </Revelar>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
