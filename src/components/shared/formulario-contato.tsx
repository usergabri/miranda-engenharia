"use client";

import { useEffect, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";

import { GlifoWhatsApp } from "@/components/shared/glifos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { enviarContato } from "@/lib/enviar-contato";
import { conteudo } from "@/lib/content";
import {
  aplicarMascaraWhatsApp,
  esquemaContato,
  type DadosContato,
} from "@/lib/schema-contato";
import { cn } from "@/lib/utils";

type Estado =
  | { fase: "editando" }
  | { fase: "enviando" }
  | { fase: "sucesso"; linkWhatsApp: string }
  | { fase: "erro" };

const { campos, botao, estados, consentimento } = conteudo.formulario;
const { categorias, itens: servicos } = conteudo.servicos;

export function FormularioContato() {
  const idBase = useId();
  const [estado, setEstado] = useState<Estado>({ fase: "editando" });
  const [servicoInicial, setServicoInicial] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<DadosContato>({
    resolver: zodResolver(esquemaContato),
    mode: "onBlur",
    defaultValues: { nome: "", whatsapp: "", mensagem: "" },
  });

  /**
   * Os cards de serviço apontam para `/?servico=<id>#contato`. Lemos o
   * parâmetro no cliente em vez de `useSearchParams` para que a página
   * permaneça 100% estática, sem fronteira de Suspense.
   */
  useEffect(() => {
    const solicitado = new URLSearchParams(window.location.search).get("servico");
    if (!solicitado || !servicos.some((servico) => servico.id === solicitado)) return;

    // `reset` e não `setValue`: o Controller do Select não reagia ao setValue
    // disparado no mount — o campo continuava exibindo o placeholder mesmo com
    // o valor gravado no estado do formulário.
    reset({ ...getValues(), servico: solicitado });
    setServicoInicial(solicitado);
  }, [reset, getValues]);

  const aoEnviar = handleSubmit(async (dados) => {
    setEstado({ fase: "enviando" });
    try {
      const resultado = await enviarContato(dados);
      setEstado(
        resultado.status === "sucesso"
          ? { fase: "sucesso", linkWhatsApp: resultado.linkWhatsApp }
          : { fase: "erro" },
      );
    } catch {
      setEstado({ fase: "erro" });
    }
  });

  if (estado.fase === "sucesso") {
    return (
      <div
        role="status"
        className="flex h-full min-h-[28rem] flex-col items-start justify-center rounded-lg border border-brand/30 bg-brand/5 p-8 sm:p-10"
      >
        <CircleCheck aria-hidden className="size-11 text-brand" strokeWidth={1.5} />
        <h3 className="mt-6 text-2xl">{estados.sucesso.titulo}</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">
          {estados.sucesso.texto}
        </p>
        <a
          href={estado.linkWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-12 items-center gap-2.5 rounded-md bg-accent px-6 font-heading font-semibold text-accent-foreground outline-none transition-colors hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <GlifoWhatsApp />
          Adiantar pelo WhatsApp
        </a>
        <button
          type="button"
          onClick={() => setEstado({ fase: "editando" })}
          className="mt-5 text-sm text-muted-foreground underline underline-offset-4 outline-none hover:text-foreground focus-visible:text-foreground"
        >
          Enviar outra solicitação
        </button>
      </div>
    );
  }

  const enviando = estado.fase === "enviando";

  return (
    <form onSubmit={aoEnviar} noValidate className="space-y-6">
      {/* Nome */}
      <div className="space-y-2">
        <Label htmlFor={`${idBase}-nome`}>{campos.nome.rotulo}</Label>
        <Input
          id={`${idBase}-nome`}
          autoComplete="name"
          placeholder={campos.nome.placeholder}
          aria-invalid={Boolean(errors.nome)}
          aria-describedby={errors.nome ? `${idBase}-nome-erro` : undefined}
          className="h-12"
          {...register("nome")}
        />
        <MensagemErro id={`${idBase}-nome-erro`} texto={errors.nome?.message} />
      </div>

      {/* WhatsApp */}
      <div className="space-y-2">
        <Label htmlFor={`${idBase}-whatsapp`}>{campos.whatsapp.rotulo}</Label>
        {/*
          Controller em vez de `register`: com o `onChange` do register o RHF
          grava o valor cru ANTES do handler rodar, e a máscara ficava só no
          DOM — o zod então reprovava um número que a tela mostrava correto.
          Aqui o valor mascarado é o único que existe no estado do formulário.
        */}
        <Controller
          control={control}
          name="whatsapp"
          render={({ field }) => (
            <Input
              {...field}
              value={field.value ?? ""}
              onChange={(evento) =>
                field.onChange(aplicarMascaraWhatsApp(evento.target.value))
              }
              id={`${idBase}-whatsapp`}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={campos.whatsapp.placeholder}
              aria-invalid={Boolean(errors.whatsapp)}
              aria-describedby={
                errors.whatsapp ? `${idBase}-whatsapp-erro` : `${idBase}-whatsapp-ajuda`
              }
              className="h-12"
            />
          )}
        />
        {errors.whatsapp ? (
          <MensagemErro id={`${idBase}-whatsapp-erro`} texto={errors.whatsapp.message} />
        ) : (
          <p id={`${idBase}-whatsapp-ajuda`} className="text-sm text-muted-foreground">
            {campos.whatsapp.ajuda}
          </p>
        )}
      </div>

      {/* Tipo de serviço */}
      <div className="space-y-2">
        <Label htmlFor={`${idBase}-servico`}>{campos.servico.rotulo}</Label>
        {/*
          `value={field.value ?? ""}` é obrigatório: com `undefined` o Radix
          entra em modo não-controlado no primeiro render e passa a ignorar o
          valor que chega depois — era o que quebrava a pré-seleção via query
          param. O Radix trata "" como estado de placeholder.
        */}
        <Controller
          control={control}
          name="servico"
          render={({ field }) => (
            <Select
              // O Radix v1.6 congela o valor controlado na montagem: sem esta
              // chave o Select ignoraria a pré-seleção que chega no efeito.
              // A chave muda no máximo uma vez, ao aplicar o query param.
              key={servicoInicial || "sem-preselecao"}
              value={field.value ?? ""}
              // O Radix emite um `onValueChange("")` espúrio ao trocar o valor
              // controlado, o que apagava a pré-seleção logo após aplicá-la.
              // Nenhum item tem value vazio, então descartar "" é seguro.
              onValueChange={(valor) => valor && field.onChange(valor)}
            >
              <SelectTrigger
                id={`${idBase}-servico`}
                aria-invalid={Boolean(errors.servico)}
                aria-describedby={errors.servico ? `${idBase}-servico-erro` : undefined}
                className="!h-12 w-full"
              >
                <SelectValue placeholder={campos.servico.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectGroup key={categoria.id}>
                    <SelectLabel className="rotulo-tecnico text-muted-foreground">
                      {categoria.rotulo}
                    </SelectLabel>
                    {servicos
                      .filter((servico) => servico.categoria === categoria.id)
                      .map((servico) => (
                        <SelectItem key={servico.id} value={servico.id}>
                          {servico.titulo}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <MensagemErro id={`${idBase}-servico-erro`} texto={errors.servico?.message} />
      </div>

      {/* Mensagem */}
      <div className="space-y-2">
        <Label htmlFor={`${idBase}-mensagem`}>{campos.mensagem.rotulo}</Label>
        <Textarea
          id={`${idBase}-mensagem`}
          rows={5}
          placeholder={campos.mensagem.placeholder}
          aria-invalid={Boolean(errors.mensagem)}
          aria-describedby={
            errors.mensagem ? `${idBase}-mensagem-erro` : `${idBase}-mensagem-ajuda`
          }
          className="resize-y"
          {...register("mensagem")}
        />
        {errors.mensagem ? (
          <MensagemErro id={`${idBase}-mensagem-erro`} texto={errors.mensagem.message} />
        ) : (
          <p id={`${idBase}-mensagem-ajuda`} className="text-sm text-muted-foreground">
            {campos.mensagem.ajuda}
          </p>
        )}
      </div>

      {estado.fase === "erro" ? (
        <p
          role="alert"
          className="flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          <span>
            <strong className="block font-heading font-semibold">
              {estados.erro.titulo}
            </strong>
            {estados.erro.texto}
          </span>
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={enviando}
        className={cn(
          "h-13 w-full gap-2.5 bg-accent font-heading text-base font-semibold text-accent-foreground",
          "hover:bg-accent-hover disabled:opacity-70",
        )}
      >
        {enviando ? (
          <LoaderCircle aria-hidden className="size-5 animate-spin" />
        ) : (
          <Send aria-hidden className="size-5" />
        )}
        {enviando ? botao.enviando : botao.padrao}
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">{consentimento}</p>
    </form>
  );
}

function MensagemErro({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null;

  return (
    <p id={id} className="flex items-center gap-2 text-sm text-destructive">
      <CircleAlert aria-hidden className="size-4 shrink-0" />
      {texto}
    </p>
  );
}
