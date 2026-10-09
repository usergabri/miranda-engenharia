# Miranda Engenharia — Landing Page

Landing page de captação para uma consultoria de engenharia mecânica que presta
serviços técnicos regulamentados: laudos, ART, perícias, projetos e inspeções
NR-12 / NR-13.

**Publicado em:** https://usergabri.github.io/miranda-engenharia/

> ⚠️ O site está no ar com **dados de exemplo**. Tudo que precisa de informação
> real está marcado com `[PREENCHER:` — veja [Preenchendo os dados reais](#preenchendo-os-dados-reais).

## Stack

- **Next.js 15** (App Router, TypeScript, `src/`) em modo `output: "export"`
- **Tailwind CSS 4** com tokens em `@theme` + **shadcn/ui**
- **lucide-react** para ícones
- **react-hook-form + zod** no formulário de contato

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Em desenvolvimento o `basePath` fica vazio; só o
build do GitHub Actions o aplica.

Para conferir o build estático exatamente como o GitHub Pages serve:

```bash
GITHUB_ACTIONS=true npm run build
```

O resultado sai em `out/`, já com o prefixo `/miranda-engenharia`.

> Não rode `npm run build` com o `npm run dev` ligado: os dois escrevem em
> `.next/` e o servidor de desenvolvimento passa a responder 500. Se acontecer,
> pare o dev, apague `.next` e suba de novo.

## Arquitetura

**Todo o conteúdo textual vive em [`src/lib/content.ts`](src/lib/content.ts)**, com
tipagem explícita. Nenhum componente tem texto fixo no JSX. O mesmo arquivo
alimenta a UI, o JSON-LD `ProfessionalService` e o `FAQPage` — a página visível
e os dados estruturados não conseguem divergir.

```
src/
├── app/            layout (fontes, metadata, JSON-LD), page, globals.css, sitemap, robots
├── components/
│   ├── sections/   uma seção da página = um arquivo (12 no total)
│   ├── shared/     wrappers, mapa, formulário, carrossel, contador
│   └── ui/         shadcn
└── lib/
    ├── content.ts          ⭐ todo o conteúdo + tipos
    ├── icons.ts            registry nome → ícone lucide (mantém content.ts livre de JSX)
    ├── schema-contato.ts   zod + máscara de WhatsApp
    ├── enviar-contato.ts   validação + montagem do link wa.me
    ├── mapa-brasil-dados.ts  geometria dos 27 estados (gerada, não editar à mão)
    ├── caminho.ts          prefixa assets com o basePath
    └── seo.ts              builders de JSON-LD
```

Tudo é Server Component por padrão. Há exatamente **cinco** client components:
menu mobile, contador animado, carrossel de depoimentos, accordion do FAQ e
formulário de contato.

### Decisões que não são óbvias no código

**As animações de entrada são 100% CSS**, via `animation-timeline: view()`, atrás
de `@supports` e `prefers-reduced-motion`. Foi isso que permitiu manter o
cabeçalho como Server Component, sem nenhum listener de scroll. Navegadores sem
suporte (hoje Safari e Firefox) mostram o conteúdo estático, sem quebra.

**O mapa do Brasil** usa a malha territorial oficial do IBGE, pré-projetada em
Mercator e simplificada por Douglas-Peucker. Não é iframe nem SVG de terceiros.
Cada estado é um `<path id="UF">`; as cores saem de `areaAtuacao.ufsAtendidas`
em `content.ts`.

**A paleta vem do logo real do cliente**, amostrado pixel a pixel: ciano
`#00B9D5` e preto `#151515`. O petróleo e o âmbar foram derivados do mesmo
matiz do ciano. Como o ciano rende 2,36:1 sobre branco e reprovaria AA como
texto, o sistema deriva `--brand-deep` (`#007689`, 5,31:1) e expõe
`--brand-text`, que se resolve conforme a superfície.

**O tipo `Depoimento` é uma união discriminada** `nominal | anonimo`, porque
cliente de perícia costuma estar sob sigilo. A UI não consegue inventar um
depoimento nominal por acidente.

## Preenchendo os dados reais

Busque por `[PREENCHER` no projeto. São ~41 marcadores, quase todos em
`src/lib/content.ts`:

| O que | Onde |
|---|---|
| Nome, CREA, formação, experiência, LinkedIn | `conteudo.engenheiro` |
| Razão social, CNPJ, endereço | `conteudo.empresa` |
| WhatsApp, e-mail, telefone | constantes no topo de `content.ts` |
| Estados atendidos (alimenta o mapa) | `conteudo.areaAtuacao.ufsAtendidas` |
| Depoimentos e mini-cases | `conteudo.depoimentos.itens` |
| Prazos e preços no FAQ | `conteudo.faq.itens` |
| Domínio de produção | `SITE_URL` |

As três imagens em `public/images/` são placeholders gerados, com o briefing da
foto real impresso dentro delas. O briefing também está em
`content.ts` (campo `briefing` de cada `Imagem`).

### O formulário ainda não envia nada

`src/lib/enviar-contato.ts` valida com zod e monta um deeplink de WhatsApp com
nome, telefone, serviço e mensagem — o que faz a página converter sem backend.
**Nenhum e-mail é disparado.**

O GitHub Pages não executa código de servidor, então a integração definitiva
(Resend, SMTP, CRM) exige um endpoint externo: Route Handler na Vercel, Netlify
Function, Formspree ou similar. O ponto de inserção está marcado no arquivo e o
contrato de retorno não precisa mudar.

## Deploy

Push na branch `main` dispara [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
que roda o build estático e publica em GitHub Pages.

O `basePath` é ligado pela variável `GITHUB_ACTIONS`, que só existe dentro do
workflow — por isso o desenvolvimento local continua servindo na raiz.
