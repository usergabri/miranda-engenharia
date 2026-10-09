import { CabecalhoSecao } from "@/components/shared/cabecalho-secao";
import { MapaBrasil } from "@/components/shared/mapa-brasil";
import { Revelar } from "@/components/shared/revelar";
import { Secao } from "@/components/shared/secao";
import { conteudo } from "@/lib/content";

export function AreaAtuacao() {
  const { cabecalho, ufSede, ufsAtendidas, regioes, observacao } = conteudo.areaAtuacao;

  const legenda = [
    { cor: "bg-map-hq", rotulo: `Sede — ${ufSede}` },
    { cor: "bg-map-served", rotulo: `Atendidos — ${ufsAtendidas.length} estados` },
    { cor: "bg-map-idle", rotulo: "Sob consulta" },
  ];

  return (
    <Secao id="area-atuacao" fundo="alternado">
      <CabecalhoSecao id="area-atuacao" cabecalho={cabecalho} />

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-20">
        {/* Mapa */}
        <Revelar>
          <div className="rounded-xl border border-border bg-background p-6 sm:p-10">
            <MapaBrasil className="mx-auto max-w-md" />

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6">
              {legenda.map((item) => (
                <li key={item.rotulo} className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className={`size-3 rounded-xs ${item.cor} ring-1 ring-inset ring-black/5`}
                  />
                  <span className="rotulo-tecnico text-muted-foreground">{item.rotulo}</span>
                </li>
              ))}
            </ul>
          </div>
        </Revelar>

        {/* Lista de regiões e capitais */}
        <Revelar indice={1}>
          <ul className="divide-y divide-border border-y border-border">
            {regioes.map((regiao) => (
              <li key={regiao.nome} className="grid gap-2 py-6 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <h3 className="rotulo-tecnico pt-1 text-brand-text">{regiao.nome}</h3>
                <div>
                  <p className="font-heading text-base font-semibold tracking-tight">
                    {regiao.ufs.join(" · ")}
                  </p>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {regiao.capitais.join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-7 text-[0.95rem] leading-relaxed text-muted-foreground">
            {observacao}
          </p>
        </Revelar>
      </div>
    </Secao>
  );
}
