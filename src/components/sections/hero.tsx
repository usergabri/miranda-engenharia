import Image from "next/image";

import { Icone } from "@/components/shared/icone";
import { Revelar } from "@/components/shared/revelar";
import { Button } from "@/components/ui/button";
import { caminhoAsset } from "@/lib/caminho";
import { conteudo } from "@/lib/content";

export function Hero() {
  const { headline, subheadline, ctaPrimario, ctaSecundario, microtrust, imagem } =
    conteudo.hero;

  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="relative overflow-hidden">
      {/* Malha técnica de fundo — desenha o grid do papel milimetrado, discreta */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(120%_90%_at_20%_0%,black,transparent_72%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-16 sm:px-8 md:pb-28 md:pt-24 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          {/* Coluna de texto — 60% */}
          <Revelar>
            <h1
              id="hero-titulo"
              /*
                Escala contínua em vez de degraus de breakpoint. O salto para
                lg:text-6xl acontecia em 1024, onde a coluna de texto tem 509px:
                a headline quebrava em 6 linhas de ~12 caracteres e empurrava o
                CTA para y=765. O clamp acompanha a largura sem esse degrau.

                O topo trava em 3.5rem porque a coluna de texto para de crescer
                em 1280 (max-w-7xl): acima disso a fonte aumentava e a headline
                ganhava uma quinta linha dentro da mesma largura de 672px.
              */
              className="text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.05]"
            >
              {headline.inicio}{" "}
              <span className="relative text-primary">
                {headline.destaque}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-brand/70"
                />
              </span>
              {headline.fim}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {subheadline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="cta" size="xl">
                <a href={ctaPrimario.href}>
                  {ctaPrimario.rotulo}
                  <Icone nome="seta" />
                </a>
              </Button>
              <Button asChild variant="contorno" size="xl" className="text-primary">
                <a href={ctaSecundario.href}>{ctaSecundario.rotulo}</a>
              </Button>
            </div>

            {/* Microtrust */}
            {/*
              O separador fica no fim de cada item, não no começo do seguinte:
              assim, quando a linha precisa quebrar (mobile, ou enquanto o CREA
              estiver com o texto de placeholder), nenhuma linha começa com "·".
            */}
            <ul className="mt-8 flex flex-wrap items-center gap-y-2 border-t border-border pt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
              {microtrust.map((item, indice) => (
                <li key={item} className="whitespace-nowrap">
                  {item}
                  {indice < microtrust.length - 1 ? (
                    <span aria-hidden className="px-2.5 text-brand-text">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </Revelar>

          {/* Coluna de imagem — 40%, retrato 3:4 */}
          <Revelar indice={1} className="lg:pl-4">
            <figure className="relative">
              <div className="relative aspect-3/4 overflow-hidden rounded-xl border border-border bg-muted">
                {/*
                  PLACEHOLDER — substituir por foto real.
                  Briefing em content.ts › hero.imagem.briefing
                */}
                <Image
                  src={caminhoAsset(imagem.src)}
                  alt={imagem.alt}
                  width={imagem.largura}
                  height={imagem.altura}
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="size-full object-cover"
                />
              </div>

              {/* Selo de registro — ancora a credibilidade na imagem */}
              <figcaption className="absolute -bottom-5 left-5 right-5 flex items-center gap-3 rounded-lg border border-border bg-background/95 px-4 py-3.5 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:-right-4 sm:left-auto sm:w-auto">
                <Icone nome="selo" className="size-5 text-brand" />
                <span className="rotulo-tecnico text-foreground">
                  {microtrust[0]}
                </span>
              </figcaption>
            </figure>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
