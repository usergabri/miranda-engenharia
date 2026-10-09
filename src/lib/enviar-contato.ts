import { conteudo, servicoPorId } from "@/lib/content";
import { esquemaContato } from "@/lib/schema-contato";

export type ResultadoEnvio =
  | { status: "sucesso"; linkWhatsApp: string }
  | { status: "erro"; mensagem: string };

/**
 * Valida a solicitação e devolve um deeplink de WhatsApp com a mensagem já
 * montada, para que a página converta sem depender de backend.
 *
 * Roda no cliente, e não como Server Action, porque o site é publicado como
 * export estático no GitHub Pages — onde não existe servidor Next para
 * executar actions. A validação usa o mesmo schema zod da UI, então o
 * contrato não muda.
 *
 * [PREENCHER: integração de envio definitiva — Resend / SMTP / CRM.
 *  Exige um endpoint fora do GitHub Pages (Route Handler em Vercel, Netlify
 *  Function, Formspree ou similar). Basta chamá-lo antes do `return` de
 *  sucesso; o contrato de retorno já está pronto e não precisa mudar.]
 */
export async function enviarContato(dados: unknown): Promise<ResultadoEnvio> {
  const analise = esquemaContato.safeParse(dados);

  if (!analise.success) {
    return { status: "erro", mensagem: conteudo.formulario.estados.erro.texto };
  }

  const { nome, whatsapp, servico, mensagem } = analise.data;
  const tituloServico = servicoPorId(servico)?.titulo ?? servico;

  const corpo = [
    `Solicitação de orçamento — ${conteudo.empresa.nomeFantasia}`,
    "",
    `Nome: ${nome}`,
    `WhatsApp: ${whatsapp}`,
    `Serviço: ${tituloServico}`,
    "",
    mensagem,
  ].join("\n");

  const linkWhatsApp = `https://wa.me/${conteudo.contato.whatsapp.e164}?text=${encodeURIComponent(corpo)}`;

  return { status: "sucesso", linkWhatsApp };
}
