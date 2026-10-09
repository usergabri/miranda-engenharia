import Image from "next/image";

import { GlifoLinkedIn } from "@/components/shared/glifos";
import { Icone } from "@/components/shared/icone";
import { Revelar } from "@/components/shared/revelar";
import { Secao } from "@/components/shared/secao";
import { caminhoAsset } from "@/lib/caminho";
import { conteudo } from "@/lib/content";

export function Sobre() {
  const { cabecalho, credenciais } = conteudo.sobre;
  const { engenheiro, empresa } = conteudo;

  return (
    <Secao id="sobre" fundo="alternado">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start lg:gap-20">
        {/* Foto */}
        <Revelar className="lg:sticky lg:top-28">
          <figure className="relative aspect-4/5 overflow-hidden rounded-xl border border-border bg-background">
            {/*
              PLACEHOLDER — retrato real do engenheiro.
              Briefing em content.ts › engenheiro.foto.briefing
            */}
            <Image
              src={caminhoAsset(engenheiro.foto.src)}
              alt={engenheiro.foto.alt}
              width={engenheiro.foto.largura}
              height={engenheiro.foto.altura}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="size-full object-cover"
            />
          </figure>
        </Revelar>

        {/* Conteúdo */}
        <div>
          <Revelar>
            <p className="rotulo-tecnico flex items-center gap-3 text-brand-text">
              <span aria-hidden className="h-px w-8 bg-brand/60" />
              {cabecalho.eyebrow}
            </p>
            <h2
              id="sobre-titulo"
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

          {/* Bloco de credenciais — o argumento central da seção */}
          <Revelar indice={1}>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {credenciais.map((credencial) => (
                <div key={credencial.rotulo} className="bg-background p-6">
                  <dt className="rotulo-tecnico flex items-center gap-2.5 text-muted-foreground">
                    <Icone nome={credencial.icone} className="size-4 text-brand" />
                    {credencial.rotulo}
                  </dt>
                  <dd className="mt-3 font-heading text-base font-semibold leading-snug tracking-tight text-foreground">
                    {credencial.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </Revelar>

          {/* Especializações */}
          <Revelar indice={2}>
            <div className="mt-8">
              <h3 className="rotulo-tecnico text-muted-foreground">Especializações</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {engenheiro.especializacoes.map((especializacao) => (
                  <li
                    key={especializacao}
                    className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground/80"
                  >
                    {especializacao}
                  </li>
                ))}
              </ul>
            </div>
          </Revelar>

          {/* Parágrafo sobre a empresa */}
          <Revelar indice={3}>
            <div className="mt-10 border-l-2 border-brand pl-6">
              {engenheiro.bio.map((paragrafo) => (
                <p
                  key={paragrafo.slice(0, 24)}
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {paragrafo}
                </p>
              ))}
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {empresa.descricaoCurta}
              </p>
            </div>

            <a
              href={engenheiro.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 -mx-2 inline-flex min-h-11 items-center gap-2.5 rounded-sm px-2 font-heading text-sm font-semibold text-primary outline-none transition-colors hover:text-brand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <GlifoLinkedIn className="size-[18px]" />
              Ver perfil no LinkedIn
              <Icone nome="setaDiagonal" className="size-4" />
            </a>
          </Revelar>
        </div>
      </div>
    </Secao>
  );
}
