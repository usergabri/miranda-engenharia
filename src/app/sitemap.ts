import type { MetadataRoute } from "next";

import { conteudo } from "@/lib/content";

// Exigido por `output: "export"`: sem isto o Next trata a rota como dinâmica
// e o build estático falha.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: conteudo.seo.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
