import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Fundo = "claro" | "alternado" | "escuro";

const fundos: Record<Fundo, string> = {
  claro: "bg-background",
  alternado: "bg-muted",
  escuro: "dark bg-surface-dark text-surface-dark-foreground",
};

interface SecaoProps {
  id: string;
  fundo?: Fundo;
  /** Espaçamento vertical reduzido — usado na faixa de estatísticas. */
  compacta?: boolean;
  className?: string;
  classNameContainer?: string;
  rotulada?: boolean;
  children: ReactNode;
}

/**
 * Envelope padrão de seção: landmark semântico, âncora de navegação, ritmo
 * vertical e alternância de fundo. Toda seção da página passa por aqui, então
 * o ritmo da landing é ajustável num único lugar.
 */
export function Secao({
  id,
  fundo = "claro",
  compacta = false,
  className,
  classNameContainer,
  rotulada = true,
  children,
}: SecaoProps) {
  return (
    <section
      id={id}
      aria-labelledby={rotulada ? `${id}-titulo` : undefined}
      className={cn(
        // Sem scroll-mt aqui: a compensação de âncora vive só no
        // scroll-padding-top do <html>. As duas somavam.
        compacta ? "py-12 md:py-16" : "py-20 md:py-28",
        fundos[fundo],
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", classNameContainer)}>
        {children}
      </div>
    </section>
  );
}
