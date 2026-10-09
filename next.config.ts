import path from "node:path";
import type { NextConfig } from "next";

/**
 * O site é publicado como export estático no GitHub Pages, sob
 * https://<usuario>.github.io/<repo>/ — por isso o basePath.
 *
 * Em desenvolvimento o basePath fica vazio, para que localhost:3000 continue
 * servindo na raiz. A variável GITHUB_ACTIONS só existe dentro do workflow.
 */
const repositorio = "miranda-engenharia";
const basePath = process.env.GITHUB_ACTIONS ? `/${repositorio}` : "";

const nextConfig: NextConfig = {
  // Gera HTML estático em /out. Não há servidor Node no GitHub Pages.
  output: "export",

  // O otimizador de imagens do Next exige servidor; no export ele é desligado.
  images: { unoptimized: true },

  basePath,
  assetPrefix: basePath || undefined,

  // Exposto ao cliente para que lib/caminho.ts prefixe os src de next/image,
  // que o Next não prefixa sozinho quando images.unoptimized está ligado.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  // Páginas viram /caminho/index.html, que é o que o Pages sabe servir.
  trailingSlash: true,

  // O projeto vive dentro de uma pasta do OneDrive que contém outros
  // lockfiles; sem isto o Next infere a raiz do workspace no lugar errado.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
