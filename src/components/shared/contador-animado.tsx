"use client";

import { useEffect, useRef, useState } from "react";

interface ContadorAnimadoProps {
  valor: number;
  prefixo?: string;
  sufixo?: string;
  duracao?: number;
}

const suavizar = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic

/**
 * Contador que dispara ao entrar na viewport.
 *
 * Renderiza o valor final no servidor — sem JS o número aparece correto — e só
 * então reinicia para animar. Sob `prefers-reduced-motion: reduce` o valor fica
 * parado no final.
 */
export function ContadorAnimado({
  valor,
  prefixo = "",
  sufixo = "",
  duracao = 1600,
}: ContadorAnimadoProps) {
  const referencia = useRef<HTMLSpanElement>(null);
  const [exibido, setExibido] = useState(valor);

  useEffect(() => {
    const elemento = referencia.current;
    if (!elemento) return;

    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semMovimento) return;

    setExibido(0);
    let quadro = 0;
    let inicio: number | null = null;

    const animar = (instante: number) => {
      inicio ??= instante;
      const progresso = Math.min((instante - inicio) / duracao, 1);
      setExibido(Math.round(suavizar(progresso) * valor));
      if (progresso < 1) quadro = requestAnimationFrame(animar);
    };

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        quadro = requestAnimationFrame(animar);
      },
      { threshold: 0.4 },
    );

    observador.observe(elemento);

    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [valor, duracao]);

  return (
    <span ref={referencia}>
      <span aria-hidden className="tabular-nums">
        {prefixo}
        {exibido.toLocaleString("pt-BR")}
        {sufixo}
      </span>
      <span className="sr-only">{`${prefixo}${valor.toLocaleString("pt-BR")}${sufixo}`}</span>
    </span>
  );
}
