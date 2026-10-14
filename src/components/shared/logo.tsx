import Image from "next/image";

import { caminhoAsset } from "@/lib/caminho";
import { conteudo } from "@/lib/content";
import { cn } from "@/lib/utils";

interface LogoProps {
  /**
   * `escuro` = lettering branco, para as faixas escuras.
   * `claro`  = lettering #1A1A1A, para fundo claro.
   */
  tema?: "escuro" | "claro";
  className?: string;
  priority?: boolean;
}

/**
 * Logo vetorial oficial. Substituiu os PNGs recortados do arquivo original:
 * além de nítido em qualquer tamanho, o SVG tem 22 KB contra os 52 KB do PNG,
 * que ainda era servido a 791x258 para uma caixa de 135x44 — quase 6x maior
 * que o necessário.
 *
 * O ciano do vetor é #00B8D9, levemente diferente do #00B9D5 que eu havia
 * amostrado do PNG. O vetor é a fonte autoritativa; os tokens da paleta
 * seguem derivados do mesmo matiz, então nada mais precisa mudar.
 */
export function Logo({ tema = "escuro", className, priority = false }: LogoProps) {
  return (
    <Image
      src={caminhoAsset(tema === "escuro" ? "/brand/logo.svg" : "/brand/logo-fundo-claro.svg")}
      alt={`${conteudo.empresa.nomeFantasia} — engenharia mecânica`}
      width={793}
      height={261}
      priority={priority}
      className={cn("h-10 w-auto md:h-11", className)}
    />
  );
}
