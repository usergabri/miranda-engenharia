import { Revelar } from "@/components/shared/revelar";
import type { Cabecalho } from "@/lib/content";
import { cn } from "@/lib/utils";

interface CabecalhoSecaoProps {
  id: string;
  cabecalho: Cabecalho;
  alinhamento?: "esquerda" | "centro";
  className?: string;
}

export function CabecalhoSecao({
  id,
  cabecalho,
  alinhamento = "esquerda",
  className,
}: CabecalhoSecaoProps) {
  const centralizado = alinhamento === "centro";

  return (
    <Revelar
      className={cn(
        "max-w-3xl",
        centralizado && "mx-auto text-center",
        className,
      )}
    >
      {cabecalho.eyebrow ? (
        <p
          className={cn(
            "rotulo-tecnico flex items-center gap-3 text-brand-text",
            centralizado && "justify-center",
          )}
        >
          <span aria-hidden className="h-px w-8 bg-brand/60" />
          {cabecalho.eyebrow}
        </p>
      ) : null}

      <h2
        id={`${id}-titulo`}
        className="mt-4 text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]"
      >
        {cabecalho.titulo}
      </h2>

      {cabecalho.subtitulo ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {cabecalho.subtitulo}
        </p>
      ) : null}
    </Revelar>
  );
}
