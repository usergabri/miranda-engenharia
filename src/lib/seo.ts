import { conteudo } from "@/lib/content";

/**
 * JSON-LD ProfessionalService — identifica o prestador, o registro profissional
 * e o catálogo de serviços para buscadores e assistentes.
 */
export function jsonLdProfessionalService() {
  const { empresa, engenheiro, contato, seo, servicos } = conteudo;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${seo.siteUrl}/#organizacao`,
    name: empresa.nomeFantasia,
    legalName: empresa.razaoSocial,
    description: seo.descricao,
    url: seo.siteUrl,
    image: `${seo.siteUrl}${seo.ogImage.src}`,
    logo: `${seo.siteUrl}/brand/logo-horizontal.png`,
    telephone: contato.telefone.e164,
    email: contato.email,
    taxID: empresa.cnpj,
    areaServed: "BR",
    availableLanguage: "pt-BR",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${empresa.endereco.logradouro}, ${empresa.endereco.numero}`,
      addressLocality: empresa.endereco.cidade,
      addressRegion: empresa.endereco.uf,
      postalCode: empresa.endereco.cep,
      addressCountry: "BR",
    },
    openingHours: "Mo-Fr 08:00-18:00",
    founder: {
      "@type": "Person",
      name: engenheiro.nomeCompleto,
      jobTitle: engenheiro.titulo,
      sameAs: engenheiro.linkedin,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Registro profissional",
        recognizedBy: { "@type": "Organization", name: `CREA-${engenheiro.crea.uf}` },
        identifier: engenheiro.crea.numero,
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de engenharia mecânica",
      itemListElement: servicos.itens.map((servico) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: servico.titulo,
          description: servico.descricao,
          areaServed: "BR",
        },
      })),
    },
  };
}

/** JSON-LD FAQPage — espelha exatamente o accordion renderizado na seção FAQ. */
export function jsonLdFaqPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${conteudo.seo.siteUrl}/#faq`,
    mainEntity: conteudo.faq.itens.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };
}
