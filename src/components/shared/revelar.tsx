import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RevelarProps {
  children: ReactNode;
  className?: string;
  /** Escalona a entrada em grids e listas (0, 1, 2…). */
  indice?: number;
}

/**
 * Entrada fade + translate-y.
 *
 * Server Component: a animação é 100% CSS (`animation-timeline: view()`), sem
 * IntersectionObserver e sem biblioteca de animação. Navegador sem suporte
 * mostra o conteúdo estático, e `prefers-reduced-motion: reduce` desliga tudo
 * — as duas regras vivem em `globals.css`.
 */
export function Revelar({ children, className, indice = 0 }: RevelarProps) {
  return (
    <div
      className={cn("revelar", className)}
      style={{ "--r-shift": `${Math.min(indice, 6) * 3}%` } as CSSProperties}
    >
      {children}
    </div>
  );
}
