import type { ComponentPropsWithoutRef } from "react";

import { iconRegistry, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface IconeProps extends Omit<ComponentPropsWithoutRef<"svg">, "name"> {
  nome: IconName;
  /**
   * Ícones são decorativos por padrão (`aria-hidden`). Quando o ícone é a
   * única etiqueta de um controle, passe `rotulo` para expor um nome acessível.
   */
  rotulo?: string;
}

export function Icone({ nome, rotulo, className, ...props }: IconeProps) {
  const Glifo = iconRegistry[nome];

  return (
    <Glifo
      className={cn("size-5 shrink-0", className)}
      strokeWidth={1.75}
      aria-hidden={rotulo ? undefined : true}
      role={rotulo ? "img" : undefined}
      aria-label={rotulo}
      {...props}
    />
  );
}
