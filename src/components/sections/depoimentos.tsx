import { CabecalhoSecao } from "@/components/shared/cabecalho-secao";
import { CarrosselDepoimentos } from "@/components/shared/carrossel-depoimentos";
import { Revelar } from "@/components/shared/revelar";
import { Secao } from "@/components/shared/secao";
import { conteudo } from "@/lib/content";

export function Depoimentos() {
  const { cabecalho, itens } = conteudo.depoimentos;

  return (
    <Secao id="depoimentos">
      <CabecalhoSecao id="depoimentos" cabecalho={cabecalho} />

      <Revelar className="mt-14">
        <CarrosselDepoimentos itens={itens} />
      </Revelar>
    </Secao>
  );
}
