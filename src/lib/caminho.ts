/**
 * Prefixa um caminho de asset com o basePath da publicação.
 *
 * O Next aplica `basePath` automaticamente ao JS, ao CSS e às rotas, mas NÃO
 * ao `src` de `next/image` quando `images.unoptimized` está ligado — e o
 * export estático exige `unoptimized`. Sem este helper, logo e fotos apontam
 * para a raiz do domínio e dão 404 no GitHub Pages.
 *
 * Em desenvolvimento NEXT_PUBLIC_BASE_PATH é vazio, então o caminho não muda.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function caminhoAsset(src: string): string {
  if (!BASE || !src.startsWith("/")) return src;
  return `${BASE}${src}`;
}
