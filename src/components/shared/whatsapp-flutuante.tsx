import { GlifoWhatsApp } from "@/components/shared/glifos";
import { conteudo, linkWhatsApp } from "@/lib/content";

/**
 * Atalho fixo de WhatsApp — só no mobile. No desktop os canais diretos já
 * ficam visíveis na seção de contato, e um botão flutuante ali só cobriria
 * conteúdo.
 *
 * #25D366 é a única cor fora do design system na página inteira: é o verde do
 * WhatsApp. Vale a exceção porque o reconhecimento imediato do botão é o que
 * faz ele converter — em âmbar ele viraria só mais um CTA.
 */
export function WhatsAppFlutuante() {
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar no WhatsApp com ${conteudo.empresa.nomeFantasia}`}
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_-6px_rgba(0,0,0,0.45)] outline-none transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 md:hidden"
    >
      <GlifoWhatsApp className="size-7" />
    </a>
  );
}
