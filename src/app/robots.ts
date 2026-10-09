import type { MetadataRoute } from "next";

import { conteudo } from "@/lib/content";

// Exigido por `output: "export"`: sem isto o Next trata a rota como dinâmica
// e o build estático falha.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${conteudo.seo.siteUrl}/sitemap.xml`,
    host: conteudo.seo.siteUrl,
  };
}
