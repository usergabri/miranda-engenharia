import { CabecalhoSecao } from "@/components/shared/cabecalho-secao";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { Revelar } from "@/components/shared/revelar";
import { Secao } from "@/components/shared/secao";
import { conteudo } from "@/lib/content";

export function Faq() {
  const { cabecalho, itens } = conteudo.faq;

  return (
    <Secao id="faq">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        <CabecalhoSecao id="faq" cabecalho={cabecalho} className="lg:sticky lg:top-28" />

        <Revelar indice={1}>
          <FaqAccordion itens={itens} />
        </Revelar>
      </div>
    </Secao>
  );
}
