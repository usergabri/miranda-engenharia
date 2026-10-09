import { AreaAtuacao } from "@/components/sections/area-atuacao";
import { ComoFunciona } from "@/components/sections/como-funciona";
import { Contato } from "@/components/sections/contato";
import { Depoimentos } from "@/components/sections/depoimentos";
import { Estatisticas } from "@/components/sections/estatisticas";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Segmentos } from "@/components/sections/segmentos";
import { Servicos } from "@/components/sections/servicos";
import { Sobre } from "@/components/sections/sobre";
import { WhatsAppFlutuante } from "@/components/shared/whatsapp-flutuante";
import { jsonLdFaqPage } from "@/lib/seo";

export default function PaginaInicial() {
  return (
    <>
      <Header />

      <main id="conteudo">
        <Hero />
        <Estatisticas />
        <Servicos />
        <Segmentos />
        <ComoFunciona />
        <Sobre />
        <Depoimentos />
        <AreaAtuacao />
        <Faq />
        <Contato />
      </main>

      <Footer />
      <WhatsAppFlutuante />

      <script
        type="application/ld+json"
        // Espelha exatamente as perguntas renderizadas na seção FAQ.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqPage()) }}
      />
    </>
  );
}
