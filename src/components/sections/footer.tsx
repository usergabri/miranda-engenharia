import { GlifoLinkedIn } from "@/components/shared/glifos";
import { Icone } from "@/components/shared/icone";
import { Logo } from "@/components/shared/logo";
import { conteudo } from "@/lib/content";

export function Footer() {
  const { empresa, engenheiro, contato, footer, canaisDiretos } = conteudo;
  const { endereco } = empresa;
  const ano = new Date().getFullYear();

  const identificacao = [
    { rotulo: "Razão social", valor: empresa.razaoSocial },
    { rotulo: "CNPJ", valor: empresa.cnpj },
    { rotulo: "CREA", valor: `CREA-${engenheiro.crea.uf} ${engenheiro.crea.numero}` },
  ];

  return (
    <footer className="dark border-t border-white/10 bg-surface-dark text-surface-dark-foreground">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          {/* Identificação */}
          <div>
            <Logo />

            <dl className="mt-8 space-y-4">
              {identificacao.map((item) => (
                <div key={item.rotulo}>
                  <dt className="rotulo-tecnico text-surface-dark-foreground/70">
                    {item.rotulo}
                  </dt>
                  <dd className="mt-1 text-sm text-surface-dark-foreground/85">
                    {item.valor}
                  </dd>
                </div>
              ))}

              <div>
                <dt className="rotulo-tecnico text-surface-dark-foreground/70">Endereço</dt>
                <dd className="mt-1 text-sm leading-relaxed text-surface-dark-foreground/85">
                  {endereco.logradouro}, {endereco.numero}
                  {endereco.complemento ? ` — ${endereco.complemento}` : null}
                  <br />
                  {endereco.bairro} · {endereco.cidade}/{endereco.uf} · CEP {endereco.cep}
                </dd>
              </div>
            </dl>
          </div>

          {/* Colunas de navegação */}
          {footer.colunas.map((coluna) => (
            <nav key={coluna.titulo} aria-label={coluna.titulo}>
              <h2 className="rotulo-tecnico text-surface-dark-foreground/70">
                {coluna.titulo}
              </h2>
              <ul className="mt-5 space-y-3">
                {coluna.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="rounded-sm text-sm text-surface-dark-foreground/80 outline-none transition-colors hover:text-brand focus-visible:text-brand focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.rotulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Contatos */}
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8">
          {canaisDiretos.itens.map((canal) => (
            <a
              key={canal.id}
              href={canal.href}
              aria-label={canal.ariaLabel}
              target={canal.id === "whatsapp" ? "_blank" : undefined}
              rel={canal.id === "whatsapp" ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2.5 rounded-sm text-sm text-surface-dark-foreground/80 outline-none transition-colors hover:text-brand focus-visible:text-brand focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icone nome={canal.icone} className="size-4 text-brand" />
              {canal.valor}
            </a>
          ))}

          <a
            href={engenheiro.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Perfil de ${engenheiro.nomeCompleto} no LinkedIn`}
            className="rounded-sm text-surface-dark-foreground/60 outline-none transition-colors hover:text-brand focus-visible:text-brand focus-visible:ring-2 focus-visible:ring-ring"
          >
            <GlifoLinkedIn className="size-[18px]" />
          </a>

          <span className="flex items-center gap-2.5 text-sm text-surface-dark-foreground/60 lg:ml-auto">
            <Icone nome="horario" className="size-4" />
            {contato.horarioAtendimento}
          </span>
        </div>

        {/* Rodapé legal */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs leading-relaxed text-surface-dark-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {footer.assinatura}. Todos os direitos reservados.
          </p>
          {footer.legal.map((linha) => (
            <p key={linha}>{linha}</p>
          ))}
        </div>
      </div>
    </footer>
  );
}
