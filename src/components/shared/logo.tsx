import Image from "next/image";

import { caminhoAsset } from "@/lib/caminho";
import { conteudo } from "@/lib/content";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** `completo` = marca + lettering; `marca` = apenas o "M". */
  variante?: "completo" | "marca";
  className?: string;
  priority?: boolean;
}

/**
 * O lettering do logo original existe apenas em branco — por isso a marca só
 * aparece sobre as faixas escuras (cabeçalho e rodapé). Os PNGs em
 * /public/brand foram recortados do arquivo original preservando o ciano
 * #00B9D5 exato.
 */
export function Logo({ variante = "completo", className, priority = false }: LogoProps) {
  const completo = variante === "completo";

  return (
    <Image
      src={caminhoAsset(completo ? "/brand/logo-horizontal.png" : "/brand/logo-marca.png")}
      alt={`${conteudo.empresa.nomeFantasia} — engenharia mecânica`}
      width={completo ? 791 : 424}
      height={completo ? 258 : 257}
      priority={priority}
      className={cn("w-auto", completo ? "h-10 md:h-11" : "h-8", className)}
    />
  );
}
