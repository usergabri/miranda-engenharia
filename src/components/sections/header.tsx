import { Logo } from "@/components/shared/logo";
import { MenuMobile } from "@/components/shared/menu-mobile";
import { Button } from "@/components/ui/button";
import { conteudo } from "@/lib/content";

/**
 * Cabeçalho sticky, translúcido, que ganha opacidade e fio inferior ao rolar.
 *
 * A transição é uma scroll-driven animation em CSS (`cabecalho-rolagem`),
 * então o componente permanece um Server Component — sem listener de scroll.
 * O fundo é escuro por necessidade da marca: o lettering do logo original só
 * existe em branco.
 */
export function Header() {
  return (
    <header className="dark sticky top-0 z-50">
      <div className="cabecalho-rolagem border-b border-transparent bg-surface-dark/85 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-18 w-full max-w-7xl items-center gap-8 px-5 sm:px-8 lg:px-12">
          <a
            href="#inicio"
            aria-label={`${conteudo.empresa.nomeFantasia} — início`}
            className="flex shrink-0 items-center py-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-surface-dark"
          >
            <Logo priority />
          </a>

          <nav
            aria-label="Navegação principal"
            className="ml-auto hidden items-center gap-1 lg:flex"
          >
            {conteudo.navegacao.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative rounded-sm px-3 py-2 text-sm font-medium text-surface-dark-foreground/75 outline-none transition-colors hover:text-surface-dark-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.rotulo}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button asChild variant="cta" size="header" className="hidden sm:inline-flex">
              <a href={conteudo.ctaGlobal.href}>{conteudo.ctaGlobal.rotulo}</a>
            </Button>
            <MenuMobile />
          </div>
        </div>
      </div>
    </header>
  );
}
