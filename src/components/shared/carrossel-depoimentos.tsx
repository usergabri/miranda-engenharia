"use client";

import { Quote } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Depoimento } from "@/lib/content";

interface CarrosselDepoimentosProps {
  itens: Depoimento[];
}

/** Iniciais para o avatar — evita foto falsa de banco de imagens. */
const iniciais = (nome: string) =>
  nome
    .replace(/\[[^\]]*\]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0] ?? "")
    .join("")
    .toUpperCase() || "—";

export function CarrosselDepoimentos({ itens }: CarrosselDepoimentosProps) {
  return (
    <Carousel
      opts={{ align: "start", loop: false }}
      className="w-full"
      aria-label="Depoimentos de clientes"
    >
      <CarouselContent className="-ml-4">
        {itens.map((item) => (
          <CarouselItem
            key={item.id}
            className="pl-4 sm:basis-1/2 lg:basis-1/3"
          >
            <figure className="flex h-full flex-col rounded-lg border border-border bg-card p-7 transition-colors duration-200 hover:border-brand/40">
              <Quote
                aria-hidden
                className="size-7 shrink-0 text-brand"
                strokeWidth={1.5}
              />

              <blockquote className="mt-5 flex-1 text-[0.975rem] leading-relaxed text-foreground/90">
                {item.texto}
              </blockquote>

              <figcaption className="mt-7 border-t border-border pt-5">
                {item.tipo === "nominal" ? (
                  <div className="flex items-center gap-3.5">
                    <span
                      aria-hidden
                      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground"
                    >
                      {iniciais(item.autor.nome)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-heading font-semibold text-foreground">
                        {item.autor.nome}
                      </span>
                      <span className="block truncate text-sm text-muted-foreground">
                        {item.autor.cargo} · {item.autor.empresa}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="rotulo-tecnico text-brand-text">
                      Cliente sob confidencialidade
                    </span>
                    <span className="mt-2 block font-heading font-semibold text-foreground">
                      {item.contexto.segmento} · {item.contexto.uf}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {item.contexto.resultado}
                    </span>
                  </div>
                )}
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-10 flex items-center gap-3">
        <CarouselPrevious
          className="static size-11 translate-y-0 border-border [&_svg]:size-5 text-foreground hover:border-brand hover:bg-brand/10"
          aria-label="Depoimento anterior"
        />
        <CarouselNext
          className="static size-11 translate-y-0 border-border [&_svg]:size-5 text-foreground hover:border-brand hover:bg-brand/10"
          aria-label="Próximo depoimento"
        />
      </div>
    </Carousel>
  );
}
