"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { PerguntaFrequente } from "@/lib/content";

interface FaqAccordionProps {
  itens: PerguntaFrequente[];
}

export function FaqAccordion({ itens }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {itens.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border-b border-border last:border-b-0"
        >
          <AccordionTrigger className="gap-6 py-6 text-left font-heading text-lg font-semibold tracking-tight hover:no-underline data-[state=open]:text-primary">
            {item.pergunta}
          </AccordionTrigger>
          <AccordionContent className="max-w-3xl pb-7 text-base leading-relaxed text-muted-foreground">
            {item.resposta}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
