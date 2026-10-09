import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { caminhoAsset } from "@/lib/caminho";
import { conteudo } from "@/lib/content";
import { jsonLdProfessionalService } from "@/lib/seo";

import "./globals.css";

/* Display: grotesca institucional, acentuação PT-BR completa. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  display: "swap",
});

/* Corpo: origem em documentação técnica, alta legibilidade em parágrafo denso. */
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* Micro-rótulos: CREA, ART, eyebrows, numeração de passos. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

const { seo, empresa } = conteudo;

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: { default: seo.titulo, template: seo.tituloTemplate },
  description: seo.descricao,
  keywords: seo.palavrasChave,
  applicationName: empresa.nomeFantasia,
  authors: [{ name: empresa.nomeFantasia, url: seo.siteUrl }],
  creator: empresa.nomeFantasia,
  publisher: empresa.razaoSocial,
  alternates: { canonical: "/" },
  category: "Engenharia",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: seo.siteUrl,
    siteName: empresa.nomeFantasia,
    title: seo.titulo,
    description: seo.descricao,
    images: [
      {
        url: seo.ogImage.src,
        width: seo.ogImage.largura,
        height: seo.ogImage.altura,
        alt: seo.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.titulo,
    description: seo.descricao,
    images: [seo.ogImage.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: caminhoAsset("/brand/logo-marca.png"),
    apple: caminhoAsset("/brand/logo-marca.png"),
  },
};

export const viewport: Viewport = {
  themeColor: "#0F2A33",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
      As variáveis de fonte ficam no <html>, não no <body>: `globals.css` aplica
      `font-sans` no próprio <html>, e ali `--font-plex-sans` precisa já existir.
    */
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>

        {children}

        <script
          type="application/ld+json"
          // Dados estruturados montados a partir de content.ts — fonte única.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdProfessionalService()),
          }}
        />
      </body>
    </html>
  );
}
