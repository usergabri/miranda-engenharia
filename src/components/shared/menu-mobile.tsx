"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { conteudo } from "@/lib/content";

export function MenuMobile() {
  const [aberto, setAberto] = useState(false);

  return (
    <Sheet open={aberto} onOpenChange={setAberto}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Abrir menu de navegação"
          className="size-11 text-surface-dark-foreground hover:bg-white/10 hover:text-surface-dark-foreground lg:hidden"
        >
          <Menu className="size-6" aria-hidden />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="dark w-full border-l-white/10 bg-surface-dark text-surface-dark-foreground sm:max-w-sm"
      >
        <SheetHeader className="border-b border-white/10 pb-5">
          <SheetTitle asChild>
            <span>
              <Logo className="h-9" />
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Navegação principal do site da {conteudo.empresa.nomeFantasia}
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Navegação principal" className="flex flex-col px-4">
          {conteudo.navegacao.map((item) => (
            <SheetClose asChild key={item.href}>
              <a
                href={item.href}
                className="border-b border-white/5 py-4 font-heading text-lg font-semibold tracking-tight text-surface-dark-foreground outline-none transition-colors hover:text-brand focus-visible:text-brand"
              >
                {item.rotulo}
              </a>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto px-4 pb-6">
          <SheetClose asChild>
            <a
              href={conteudo.ctaGlobal.href}
              className="flex h-12 w-full items-center justify-center rounded-md bg-accent font-heading font-semibold text-accent-foreground outline-none transition-colors hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
            >
              {conteudo.ctaGlobal.rotulo}
            </a>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
