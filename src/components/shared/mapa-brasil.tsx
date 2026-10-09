import { conteudo, type UF } from "@/lib/content";
import { ESTADOS_MAPA, MAPA_VIEWBOX } from "@/lib/mapa-brasil-dados";
import { cn } from "@/lib/utils";

interface MapaBrasilProps {
  className?: string;
}

/**
 * Mapa do Brasil em SVG inline, um `<path id="{UF}">` por estado.
 *
 * Sem iframe e sem dependência externa: a geometria vem da malha oficial do
 * IBGE, pré-projetada em build (ver `lib/mapa-brasil-dados.ts`).
 */
export function MapaBrasil({ className }: MapaBrasilProps) {
  const { ufSede, ufsAtendidas } = conteudo.areaAtuacao;
  const atendidas = new Set<UF>(ufsAtendidas);

  const situacao = (uf: UF) =>
    uf === ufSede ? "sede" : atendidas.has(uf) ? "atendida" : "ausente";

  const preenchimento = {
    sede: "fill-map-hq",
    atendida: "fill-map-served",
    ausente: "fill-map-idle",
  } as const;

  return (
    <svg
      viewBox={MAPA_VIEWBOX}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-labelledby="mapa-titulo mapa-descricao"
    >
      <title id="mapa-titulo">Mapa do Brasil com os estados atendidos</title>
      <desc id="mapa-descricao">
        {`Sede em ${ufSede}. Estados atendidos: ${ufsAtendidas.join(", ")}.`}
      </desc>

      <g strokeLinejoin="round">
        {ESTADOS_MAPA.map((estado) => {
          const estadoSituacao = situacao(estado.uf);

          return (
            <path
              key={estado.uf}
              id={estado.uf}
              d={estado.d}
              className={cn(
                preenchimento[estadoSituacao],
                "stroke-background transition-[fill] duration-300",
                estadoSituacao === "ausente" && "opacity-70",
              )}
              strokeWidth={1.25}
            >
              <title>{estado.nome}</title>
            </path>
          );
        })}
      </g>
    </svg>
  );
}
