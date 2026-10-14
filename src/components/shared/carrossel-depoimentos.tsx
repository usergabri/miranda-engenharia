"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { caminhoAsset } from "@/lib/caminho";
import type { Depoimento } from "@/lib/content";

interface CarrosselDepoimentosProps {
  itens: Depoimento[];
}

/** Iniciais — só usadas quando o cliente não tem logo disponível. */
const iniciais = (nome: string) =>
  nome
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
          <CarouselItem key={item.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
            <figure className="flex h-full flex-col rounded-lg border border-border bg-card p-7 transition-colors duration-200 hover:border-brand/40">
              {/* O escopo vem antes da citação: é o fato que dá peso ao elogio. */}
              <span className="rotulo-tecnico text-brand-text">
                {item.tipo === "nominal" ? item.escopo : "Cliente sob confidencialidade"}
              </span>

              <Quote aria-hidden className="mt-5 size-6 shrink-0 text-brand" strokeWidth={1.5} />

              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground/90">
                {item.texto}
              </blockquote>

              <figcaption className="mt-7 border-t border-border pt-6">
                {item.tipo === "nominal" ? (
                  <div className="flex flex-col gap-4">
                    {item.autor.logo ? (
                      <Image
                        src={caminhoAsset(item.autor.logo.src)}
                        alt={item.autor.logo.alt}
                        width={item.autor.logo.largura}
                        height={item.autor.logo.altura}
                        /*
                          eager, não lazy: o track do carrossel é overflow:hidden,
                          e dentro dele o lazy loading nunca dispara — os logos
                          simplesmente não apareciam. São 3 arquivos pequenos e
                          são a prova de credibilidade da seção.
                        */
                        loading="eager"
                        /* self-start impede que o flex-col estique a caixa para
                           a largura total e force 150px em todos os logos. */
                        className="h-11 w-auto max-w-[150px] self-start object-contain object-left"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex size-11 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground"
                      >
                        {iniciais(item.autor.nome)}
                      </span>
                    )}

                    <span>
                      <span className="block font-heading font-semibold text-foreground">
                        {item.autor.nome}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                        {item.autor.cargo} · {item.autor.empresa}
                        <br />
                        {item.autor.cidade}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="block font-heading font-semibold text-foreground">
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
          className="static size-11 translate-y-0 border-border text-foreground [&_svg]:size-5 hover:border-brand hover:bg-brand/10"
          aria-label="Depoimento anterior"
        />
        <CarouselNext
          className="static size-11 translate-y-0 border-border text-foreground [&_svg]:size-5 hover:border-brand hover:bg-brand/10"
          aria-label="Próximo depoimento"
        />
      </div>
    </Carousel>
  );
}
