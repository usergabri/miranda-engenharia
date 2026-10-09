import { z } from "zod";

import { conteudo } from "@/lib/content";

const idsDeServico = conteudo.servicos.itens.map((servico) => servico.id) as [
  string,
  ...string[],
];

export const esquemaContato = z.object({
  nome: z
    .string()
    .trim()
    .min(2, { message: "Informe seu nome." })
    .max(80, { message: "Nome muito longo." }),

  whatsapp: z
    .string()
    .trim()
    .regex(/^\(\d{2}\)\s\d{5}-\d{4}$/, {
      message: "Informe um WhatsApp válido, com DDD.",
    }),

  servico: z.enum(idsDeServico, {
    message: "Selecione o tipo de serviço.",
  }),

  mensagem: z
    .string()
    .trim()
    .min(20, { message: "Descreva o escopo em pelo menos 20 caracteres." })
    .max(1200, { message: "Mensagem muito longa — resuma o essencial." }),
});

export type DadosContato = z.infer<typeof esquemaContato>;

/** Aplica a máscara (00) 00000-0000 conforme o usuário digita. */
export function aplicarMascaraWhatsApp(valor: string): string {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);

  if (digitos.length <= 2) return digitos.replace(/^(\d{0,2})/, "($1");
  if (digitos.length <= 7) return digitos.replace(/^(\d{2})(\d{0,5})/, "($1) $2");

  return digitos.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

/** Extrai apenas os dígitos, para montar o link wa.me. */
export const somenteDigitos = (valor: string): string => valor.replace(/\D/g, "");
