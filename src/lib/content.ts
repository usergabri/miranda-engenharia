import type { IconName } from "@/lib/icons";

/* ==========================================================================
   1. PRIMITIVOS
   ========================================================================== */

export type UF =
  | "AC" | "AL" | "AM" | "AP" | "BA" | "CE" | "DF" | "ES" | "GO"
  | "MA" | "MG" | "MS" | "MT" | "PA" | "PB" | "PE" | "PI" | "PR"
  | "RJ" | "RN" | "RO" | "RR" | "RS" | "SC" | "SE" | "SP" | "TO";

export interface Imagem {
  src: string;
  alt: string;
  largura: number;
  altura: number;
  /** Briefing da foto real que deve substituir o placeholder. */
  briefing: string;
}

export interface Link {
  rotulo: string;
  href: string;
  externo?: boolean;
}

export interface CTA extends Link {
  variante: "primario" | "secundario";
}

export interface Cabecalho {
  eyebrow?: string;
  titulo: string;
  subtitulo?: string;
}

/* ==========================================================================
   2. IDENTIDADE
   ========================================================================== */

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: UF;
  cep: string;
}

export interface Empresa {
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  creaEmpresa: string;
  endereco: Endereco;
  descricaoCurta: string;
}

export interface Engenheiro {
  nomeCompleto: string;
  titulo: string;
  crea: { uf: UF; numero: string };
  formacao: string;
  anosExperiencia: number;
  especializacoes: string[];
  /** 2–3 frases. Nada de texto institucional genérico. */
  bio: string[];
  foto: Imagem;
  linkedin: string;
}

export interface Contato {
  whatsapp: { e164: string; exibicao: string; mensagemPadrao: string };
  email: string;
  telefone: { e164: string; exibicao: string };
  horarioAtendimento: string;
}

/* ==========================================================================
   3. SEÇÕES
   ========================================================================== */

export interface Hero {
  headline: { inicio: string; destaque: string; fim?: string };
  subheadline: string;
  ctaPrimario: CTA;
  ctaSecundario: CTA;
  /** Renderizado em linha única com separador "·". */
  microtrust: string[];
  imagem: Imagem;
}

export interface Estatistica {
  id: string;
  /** Único valor animado pelo contador. */
  valor: number;
  prefixo?: string;
  sufixo?: string;
  rotulo: string;
  icone: IconName;
}

export type CategoriaServicoId = "laudos" | "pericias" | "projetos" | "inspecoes";

/** Já preparado para agrupamento visual por categoria numa versão futura. */
export interface CategoriaServico {
  id: CategoriaServicoId;
  rotulo: string;
  descricao?: string;
}

export interface Servico {
  /** Slug — vira o query param `?servico=<id>` na âncora #contato. */
  id: string;
  categoria: CategoriaServicoId;
  titulo: string;
  descricao: string;
  icone: IconName;
  destaque?: boolean;
}

export interface Segmento {
  id: string;
  rotulo: string;
  nota: string;
  icone: IconName;
}

export interface PassoProcesso {
  numero: 1 | 2 | 3 | 4;
  titulo: string;
  descricao: string;
  icone: IconName;
}

export interface Credencial {
  rotulo: string;
  valor: string;
  icone: IconName;
}

/** União discriminada: cobre o cliente sob NDA sem quebrar a tipagem. */
export type Depoimento = DepoimentoNominal | MiniCaseAnonimo;

export interface DepoimentoNominal {
  tipo: "nominal";
  id: string;
  texto: string;
  /** O dado concreto do serviço — é o que dá peso ao depoimento. */
  escopo: string;
  autor: {
    nome: string;
    cargo: string;
    empresa: string;
    cidade: string;
    /** Logo do cliente. Substitui o avatar de iniciais quando existe. */
    logo?: Imagem;
  };
}

export interface MiniCaseAnonimo {
  tipo: "anonimo";
  id: string;
  texto: string;
  contexto: { segmento: string; uf: UF; resultado: string };
}

export interface Regiao {
  nome: string;
  ufs: UF[];
  capitais: string[];
}

export interface AreaAtuacao {
  /** Cor diferenciada no mapa. */
  ufSede: UF;
  /** Preenchidos com a cor de destaque; o restante fica em cinza claro. */
  ufsAtendidas: UF[];
  regioes: Regiao[];
  observacao: string;
}

export interface PerguntaFrequente {
  id: string;
  pergunta: string;
  resposta: string;
}

export interface CopyFormulario {
  cabecalho: Cabecalho;
  campos: Record<
    "nome" | "whatsapp" | "servico" | "mensagem",
    { rotulo: string; placeholder: string; ajuda?: string }
  >;
  botao: { padrao: string; enviando: string };
  estados: {
    sucesso: { titulo: string; texto: string };
    erro: { titulo: string; texto: string };
  };
  consentimento: string;
}

export interface CanalDireto {
  id: string;
  rotulo: string;
  valor: string;
  href: string;
  icone: IconName;
  ariaLabel: string;
}

export interface ColunaFooter {
  titulo: string;
  links: Link[];
}

export interface Seo {
  siteUrl: string;
  titulo: string;
  tituloTemplate: string;
  descricao: string;
  palavrasChave: string[];
  ogImage: Imagem;
}

/* ==========================================================================
   4. RAIZ
   ========================================================================== */

export interface Conteudo {
  seo: Seo;
  empresa: Empresa;
  engenheiro: Engenheiro;
  contato: Contato;
  navegacao: Link[];
  ctaGlobal: CTA;
  hero: Hero;
  estatisticas: Estatistica[];
  servicos: { cabecalho: Cabecalho; categorias: CategoriaServico[]; itens: Servico[] };
  segmentos: { cabecalho: Cabecalho; itens: Segmento[] };
  processo: { cabecalho: Cabecalho; passos: PassoProcesso[] };
  sobre: { cabecalho: Cabecalho; credenciais: Credencial[] };
  depoimentos: { cabecalho: Cabecalho; itens: Depoimento[] };
  areaAtuacao: { cabecalho: Cabecalho } & AreaAtuacao;
  faq: { cabecalho: Cabecalho; itens: PerguntaFrequente[] };
  formulario: CopyFormulario;
  canaisDiretos: { cabecalho: Cabecalho; itens: CanalDireto[] };
  footer: { colunas: ColunaFooter[]; legal: string[]; assinatura: string };
}

/* ==========================================================================
   5. CONTEÚDO
   Busque por "[PREENCHER" para localizar tudo que precisa de dado real.
   ========================================================================== */

// [PREENCHER: domínio de produção definitivo. Precisa ser uma URL válida — o
//  Next faz `new URL()` sobre ela em `metadataBase`, então não use colchetes.
//  Hoje aponta para o GitHub Pages, onde o site está publicado.]
const SITE_URL = "https://usergabri.github.io/miranda-engenharia";
const WHATSAPP_E164 = "5500000000000"; // [PREENCHER: WhatsApp em formato E.164, ex. 5511987654321]
const WHATSAPP_EXIBICAO = "[PREENCHER: (00) 00000-0000]";
const EMAIL = "[PREENCHER: contato@dominio.com.br]";
const TELEFONE_E164 = "+5500000000000"; // [PREENCHER: telefone fixo/comercial]
const TELEFONE_EXIBICAO = "[PREENCHER: (00) 0000-0000]";
const CREA_UF: UF = "SP"; // [PREENCHER: UF do registro no CREA]
const CREA_NUMERO = "[PREENCHER: 0000000000]";
const NOME_ENGENHEIRO = "[PREENCHER: nome completo do engenheiro]";

const MENSAGEM_WHATSAPP =
  "Olá! Vim pelo site da Miranda Engenharia e gostaria de solicitar um orçamento.";

export const conteudo: Conteudo = {
  /* ---------------------------------------------------------------- SEO */
  seo: {
    siteUrl: SITE_URL,
    titulo: "Miranda Engenharia — Laudos, ART, Perícias e Inspeções",
    tituloTemplate: "%s | Miranda Engenharia",
    descricao:
      "Laudos técnicos, ART, perícias judiciais, projetos mecânicos e inspeções NR-12 e NR-13 com responsabilidade técnica registrada no CREA. Atendimento em todo o Brasil.",
    palavrasChave: [
      "laudo técnico engenharia mecânica",
      "emissão de ART",
      "perícia judicial engenharia",
      "inspeção NR-13 vaso de pressão",
      "inspeção NR-12 máquinas",
      "laudo de estanqueidade de gás",
      "engenheiro mecânico CREA",
    ],
    ogImage: {
      src: "/images/og-image.png",
      alt: "Miranda Engenharia — laudos, ART, perícias e inspeções",
      largura: 1200,
      altura: 630,
      briefing:
        "[PREENCHER: arte de compartilhamento 1200x630 — logo Miranda sobre fundo petróleo + linha 'Laudos · ART · Perícias · Inspeções'.]",
    },
  },

  /* ------------------------------------------------------------ EMPRESA */
  empresa: {
    nomeFantasia: "Miranda Engenharia",
    razaoSocial: "[PREENCHER: razão social completa]",
    cnpj: "[PREENCHER: 00.000.000/0001-00]",
    creaEmpresa: "[PREENCHER: registro da pessoa jurídica no CREA]",
    endereco: {
      logradouro: "[PREENCHER: logradouro]",
      numero: "[PREENCHER: nº]",
      complemento: "[PREENCHER: sala/conjunto]",
      bairro: "[PREENCHER: bairro]",
      cidade: "[PREENCHER: cidade]",
      uf: CREA_UF,
      cep: "[PREENCHER: 00000-000]",
    },
    descricaoCurta:
      "Consultoria em engenharia mecânica dedicada a documentação técnica com responsabilidade legal registrada.",
  },

  /* --------------------------------------------------------- ENGENHEIRO */
  engenheiro: {
    nomeCompleto: NOME_ENGENHEIRO,
    titulo: "Engenheiro Mecânico",
    crea: { uf: CREA_UF, numero: CREA_NUMERO },
    formacao: "[PREENCHER: Engenharia Mecânica — Instituição, ano de formação]",
    anosExperiencia: 0, // [PREENCHER: anos de experiência]
    especializacoes: [
      "[PREENCHER: especialização 1 — ex. Inspeção de Equipamentos (NR-13)]",
      "[PREENCHER: especialização 2 — ex. Perícia e Avaliação de Engenharia]",
      "[PREENCHER: especialização 3 — ex. Engenharia de Segurança do Trabalho]",
    ],
    bio: [
      "[PREENCHER: 2 a 3 frases concretas sobre a origem da atuação. Ex.: 'Passei os primeiros anos em manutenção de caldeiras em usina sucroalcooleira e migrei para inspeção depois de conduzir a adequação NR-13 de uma planta inteira. Hoje o escritório concentra laudos de equipamentos sob pressão e perícias de sinistro industrial.' Evite frases como 'somos comprometidos com a excelência'.]",
    ],
    foto: {
      src: "/images/engenheiro.jpg",
      alt: "Aferição de válvula de segurança em campo, com manômetro padrão",
      largura: 900,
      altura: 1125,
      briefing: "Foto real fornecida pelo cliente, recortada em 4:5.",
    },
    linkedin: "https://www.linkedin.com/in/[PREENCHER: perfil-linkedin]",
  },

  /* ------------------------------------------------------------ CONTATO */
  contato: {
    whatsapp: {
      e164: WHATSAPP_E164,
      exibicao: WHATSAPP_EXIBICAO,
      mensagemPadrao: MENSAGEM_WHATSAPP,
    },
    email: EMAIL,
    telefone: { e164: TELEFONE_E164, exibicao: TELEFONE_EXIBICAO },
    horarioAtendimento: "Segunda a sexta, 8h às 18h",
  },

  /* --------------------------------------------------------- NAVEGAÇÃO */
  navegacao: [
    { rotulo: "Serviços", href: "#servicos" },
    { rotulo: "Como Funciona", href: "#como-funciona" },
    { rotulo: "Sobre", href: "#sobre" },
    { rotulo: "Área de Atuação", href: "#area-atuacao" },
    { rotulo: "FAQ", href: "#faq" },
    { rotulo: "Contato", href: "#contato" },
  ],
  ctaGlobal: { rotulo: "Solicitar Orçamento", href: "#contato", variante: "primario" },

  /* --------------------------------------------------------------- HERO */
  hero: {
    headline: {
      inicio: "Documentação técnica que",
      destaque: "resiste à fiscalização, à seguradora e ao processo",
      fim: ".",
    },
    subheadline:
      "Laudos, perícias, projetos e inspeções em engenharia mecânica — cada documento assinado por engenheiro habilitado e vinculado a uma ART registrada no CREA. Escopo, prazo e valor fechados na proposta, antes do primeiro deslocamento.",
    ctaPrimario: { rotulo: "Solicitar Orçamento", href: "#contato", variante: "primario" },
    ctaSecundario: { rotulo: "Ver Serviços", href: "#servicos", variante: "secundario" },
    microtrust: [
      `CREA-${CREA_UF} ${CREA_NUMERO}`,
      "Atendimento em todo o Brasil",
      "Resposta em até 2h",
    ],
    imagem: {
      src: "/images/hero.jpg",
      alt: "Medição de espessura por ultrassom em vaso de pressão de nitrogênio, em planta industrial",
      largura: 900,
      altura: 1200,
      briefing: "Foto real fornecida pelo cliente, recortada em 3:4.",
    },
  },

  /* ------------------------------------------------------- ESTATÍSTICAS */
  estatisticas: [
    { id: "arts", valor: 300, prefixo: "+", rotulo: "ARTs Emitidas", icone: "art" },
    { id: "clientes", valor: 400, prefixo: "+", rotulo: "Clientes Satisfeitos", icone: "clientes" },
    { id: "laudos", valor: 500, prefixo: "+", rotulo: "Laudos Emitidos", icone: "documentos" },
    { id: "estados", valor: 10, prefixo: "+", rotulo: "Estados Atendidos", icone: "estados" },
  ],

  /* ----------------------------------------------------------- SERVIÇOS */
  servicos: {
    cabecalho: {
      eyebrow: "Serviços",
      titulo: "O que emitimos e com que respaldo",
      subtitulo:
        "Todo serviço abaixo sai com ART registrada e responsável técnico identificável no sistema do CREA.",
    },
    categorias: [
      { id: "laudos", rotulo: "Laudos e ART", descricao: "Documentos de constatação e responsabilidade" },
      { id: "pericias", rotulo: "Perícias", descricao: "Apuração de causa e prova técnica" },
      { id: "projetos", rotulo: "Projetos", descricao: "Dimensionamento e memorial de cálculo" },
      { id: "inspecoes", rotulo: "Inspeções", descricao: "Conformidade com normas regulamentadoras" },
    ],
    itens: [
      {
        id: "laudo-tecnico",
        categoria: "laudos",
        titulo: "Laudo Técnico",
        descricao:
          "Parecer sobre condição, causa ou conformidade de equipamentos e instalações mecânicas, com fundamentação normativa e ART vinculada.",
        icone: "laudo",
        destaque: true,
      },
      {
        id: "emissao-art",
        categoria: "laudos",
        titulo: "Emissão de ART",
        descricao:
          "Anotação de Responsabilidade Técnica para projeto, execução, manutenção ou laudo, com acervo registrado no CREA.",
        icone: "art",
      },
      {
        id: "laudo-estanqueidade",
        categoria: "laudos",
        titulo: "Laudo de Estanqueidade de Gás",
        descricao:
          "Ensaio e laudo da instalação de gás combustível conforme ABNT NBR 15526, exigido por concessionária, seguradora e AVCB.",
        icone: "estanqueidade",
      },
      {
        id: "pericia-judicial",
        categoria: "pericias",
        titulo: "Perícia Judicial e Assistência Técnica",
        descricao:
          "Atuação como perito ou assistente técnico em processos cíveis: quesitos, vistoria, laudo e esclarecimentos em audiência.",
        icone: "periciaJudicial",
        destaque: true,
      },
      {
        id: "pericia-sinistro",
        categoria: "pericias",
        titulo: "Perícia de Sinistro",
        descricao:
          "Determinação de causa raiz em falhas, incêndios e quebras de equipamento, com nexo causal fundamentado para regulação do sinistro.",
        icone: "periciaSinistro",
      },
      {
        id: "projeto-mecanico",
        categoria: "projetos",
        titulo: "Projeto Mecânico",
        descricao:
          "Dimensionamento de sistemas, estruturas e equipamentos, com memorial de cálculo, desenhos executivos e ART de projeto.",
        icone: "projetoMecanico",
      },
      {
        id: "projeto-gas",
        categoria: "projetos",
        titulo: "Projeto de Instalação de Gás",
        descricao:
          "Rede de GLP ou gás natural para edificações, com memorial, isométricos e acompanhamento da aprovação na concessionária.",
        icone: "projetoGas",
      },
      {
        id: "inspecao-nr13",
        categoria: "inspecoes",
        titulo: "Inspeção NR-13",
        descricao:
          "Vasos de pressão, caldeiras e tubulações: inspeção, prontuário, registro de segurança e periodicidade conforme a norma.",
        icone: "vasoPressao",
        destaque: true,
      },
      {
        id: "inspecao-nr12",
        categoria: "inspecoes",
        titulo: "Inspeção NR-12",
        descricao:
          "Avaliação de conformidade de máquinas e equipamentos, apreciação de risco e plano de adequação com prioridades definidas.",
        icone: "maquinas",
      },
    ],
  },

  /* ---------------------------------------------------------- SEGMENTOS */
  segmentos: {
    cabecalho: {
      eyebrow: "Para quem atendemos",
      titulo: "Quem precisa de documento com responsável técnico identificado",
    },
    itens: [
      { id: "industrias", rotulo: "Indústrias", nota: "NR-12 e NR-13", icone: "industria" },
      { id: "condominios", rotulo: "Condomínios", nota: "Gás, AVCB e vistoria", icone: "condominio" },
      { id: "seguradoras", rotulo: "Seguradoras", nota: "Regulação de sinistro", icone: "seguradora" },
      { id: "advocacia", rotulo: "Escritórios de Advocacia", nota: "Perícia e assistência técnica", icone: "advocacia" },
      { id: "orgaos-publicos", rotulo: "Órgãos Públicos", nota: "Laudo para licitação", icone: "orgaoPublico" },
    ],
  },

  /* ----------------------------------------------------------- PROCESSO */
  processo: {
    cabecalho: {
      eyebrow: "Como funciona",
      titulo: "Do primeiro contato ao documento assinado",
      subtitulo: "Quatro etapas, sem etapa surpresa e sem cobrança fora da proposta.",
    },
    passos: [
      {
        numero: 1,
        titulo: "Contato",
        descricao:
          "Você descreve o problema pelo WhatsApp ou pelo formulário. Retorno em até 2 horas úteis.",
        icone: "contato",
      },
      {
        numero: 2,
        titulo: "Análise e Proposta",
        descricao:
          "Avalio escopo, norma aplicável e prazo. Você recebe proposta fechada, com deslocamento destacado à parte.",
        icone: "proposta",
      },
      {
        numero: 3,
        titulo: "Vistoria Técnica",
        descricao:
          "Inspeção no local com registro fotográfico, medições e coleta de evidências datadas.",
        icone: "vistoria",
      },
      {
        numero: 4,
        titulo: "Emissão do Laudo / ART",
        descricao:
          "Documento assinado, ART registrada no CREA e entrega em PDF com o comprovante de registro.",
        icone: "emissao",
      },
    ],
  },

  /* -------------------------------------------------------------- SOBRE */
  sobre: {
    cabecalho: {
      eyebrow: "Sobre",
      titulo: "Quem assina o documento",
      subtitulo:
        "Responsabilidade técnica é pessoal e rastreável. Estes são os dados que você pode conferir no CREA antes de contratar.",
    },
    credenciais: [
      { rotulo: "Responsável técnico", valor: NOME_ENGENHEIRO, icone: "registro" },
      { rotulo: "Registro", valor: `CREA-${CREA_UF} ${CREA_NUMERO}`, icone: "selo" },
      { rotulo: "Formação", valor: "[PREENCHER: Engenharia Mecânica — Instituição, ano]", icone: "formacao" },
      { rotulo: "Experiência", valor: "[PREENCHER: 00 anos de atuação]", icone: "experiencia" },
    ],
  },

  /* -------------------------------------------------------- DEPOIMENTOS */
  depoimentos: {
    cabecalho: {
      eyebrow: "Depoimentos",
      titulo: "O que dizem quem já precisou do documento",
      subtitulo:
        "Nome, empresa, cidade e escopo de cada serviço — tudo conferível. Clientes sob acordo de confidencialidade aparecem como mini-case, sem identificação.",
    },
    /*
      Depoimentos reais, fornecidos pelo cliente. O texto original de cada um é
      mais longo; aqui está condensado para caber no card, preservando as frases
      que carregam fato (escopo, prazo, documentação) e descartando as de
      cortesia. O arquivo original está em assets/depoimentos.txt.

      Observação de vocabulário: os três depoentes dizem "RT" (Responsável
      Técnico), não "ART". Mantido como eles escreveram.
    */
    itens: [
      {
        tipo: "nominal",
        id: "protein-meal",
        escopo: "Digestores, válvulas e manômetros",
        texto:
          "Contratamos a Miranda Engenharia para os serviços nos nossos digestores, incluindo as válvulas, a aferição dos manômetros e a emissão das respectivas RTs. A equipe não se limitou à execução: acompanhou as pendências encontradas durante o processo e trabalhou para que todas fossem solucionadas. Recebemos a documentação e os laudos de forma completa, dentro do cronograma estabelecido.",
        autor: {
          nome: "Augusto Bernardes",
          cargo: "Gerente Industrial",
          empresa: "Protein Meal",
          cidade: "Nova Esperança, PR",
          logo: {
            src: "/clientes/protein-meal.png",
            alt: "Protein Meal",
            largura: 560,
            altura: 161,
            briefing: "Logo fornecido pelo cliente.",
          },
        },
      },
      {
        tipo: "nominal",
        id: "art-mecanica",
        escopo: "≈450 vasos de pressão",
        texto:
          "Prestamos serviços para a Nemak e contratamos a Miranda Engenharia para integrar nossa equipe em aproximadamente 450 vasos de pressão — medição de espessura, aferição das válvulas e dos manômetros. Mesmo diante da quantidade de equipamentos, a execução foi organizada e os horários e serviços previamente combinados foram respeitados. A documentação gerada foi conduzida de forma estruturada, o que nos permitiu acompanhar e atender aos prazos do projeto.",
        autor: {
          nome: "Leonardo Campos",
          cargo: "Sócio-proprietário",
          empresa: "ART Mecânica e Automação",
          cidade: "Sete Lagoas, MG",
          logo: {
            src: "/clientes/art-mecanica.png",
            alt: "ART Mecânica e Automação",
            largura: 400,
            altura: 173,
            briefing: "Logo fornecido pelo cliente.",
          },
        },
      },
      {
        tipo: "nominal",
        id: "biobras",
        escopo: "5 compressores e 1 vaso de pressão",
        texto:
          "Contratamos a Miranda Engenharia para cinco compressores e um vaso de pressão, incluindo a elaboração da documentação necessária e a emissão da RT. Sempre que surgia alguma dúvida relacionada aos equipamentos ou à documentação, recebíamos as orientações para dar continuidade de forma adequada. Os laudos e documentos foram entregues completos dentro do prazo determinado.",
        autor: {
          nome: "Larissa Sisti Brasinha",
          cargo: "Sócia-proprietária",
          empresa: "Biobras Biodiesel",
          cidade: "Nova Esperança, PR",
          logo: {
            src: "/clientes/biobras.png",
            alt: "Biobras Biodiesel",
            largura: 240,
            altura: 240,
            briefing: "Logo fornecido pelo cliente.",
          },
        },
      },
    ],
  },

  /* ------------------------------------------------------ ÁREA DE ATUAÇÃO */
  areaAtuacao: {
    cabecalho: {
      eyebrow: "Área de atuação",
      titulo: "Onde atendemos",
      subtitulo:
        "Registro no CREA de origem, com visto no conselho local quando a atuação exige — providenciado antes da vistoria.",
    },
    ufSede: CREA_UF,
    // [PREENCHER: substitua pela lista real de UFs atendidas. A cor de destaque do mapa acompanha este array.]
    ufsAtendidas: ["SP", "MG", "RJ", "PR", "SC", "RS", "GO", "MS", "MT", "BA", "ES"],
    regioes: [
      {
        nome: "Sudeste",
        ufs: ["SP", "MG", "RJ", "ES"],
        capitais: ["São Paulo", "Belo Horizonte", "Rio de Janeiro", "Vitória"],
      },
      {
        nome: "Sul",
        ufs: ["PR", "SC", "RS"],
        capitais: ["Curitiba", "Florianópolis", "Porto Alegre"],
      },
      {
        nome: "Centro-Oeste",
        ufs: ["GO", "MS", "MT"],
        capitais: ["Goiânia", "Campo Grande", "Cuiabá"],
      },
      {
        nome: "Nordeste",
        ufs: ["BA"],
        capitais: ["Salvador"],
      },
    ],
    observacao:
      "Fora dos estados destacados, o atendimento é avaliado caso a caso — envie o escopo e retorno com viabilidade e custo de deslocamento.",
  },

  /* ----------------------------------------------------------------- FAQ */
  faq: {
    cabecalho: {
      eyebrow: "Dúvidas frequentes",
      titulo: "As perguntas que aparecem antes de fechar",
    },
    itens: [
      {
        id: "prazo",
        pergunta: "Qual é o prazo de entrega de um laudo?",
        resposta:
          "Depende da complexidade e da necessidade de ensaios. Como referência, laudos de vistoria simples ficam prontos em [PREENCHER: ex. 3 a 5 dias úteis] após a inspeção; perícias e projetos seguem prazo definido em proposta. O prazo entra por escrito no contrato — não fica como estimativa verbal.",
      },
      {
        id: "preco",
        pergunta: "Como é formado o preço?",
        resposta:
          "O valor considera o tipo de documento, a norma aplicável, o porte e a localização do objeto vistoriado e a eventual necessidade de ensaios ou terceiros. A proposta é fechada e enviada antes de qualquer deslocamento; custo de viagem e hospedagem, quando existir, aparece destacado do honorário técnico.",
      },
      {
        id: "validade-juridica",
        pergunta: "O laudo tem validade jurídica?",
        resposta:
          "Sim. É um documento técnico assinado por engenheiro registrado no CREA e vinculado a uma ART, o que atribui responsabilidade legal ao profissional pelo conteúdo. É exatamente isso que o torna aceito por seguradoras, órgãos fiscalizadores e pelo Judiciário — e a ART pode ser conferida por qualquer parte diretamente no sistema do CREA.",
      },
      {
        id: "vistoria-presencial",
        pergunta: "É sempre necessária vistoria presencial?",
        resposta:
          "Na maioria dos casos, sim. Laudo sobre condição de equipamento ou instalação exige constatação no local, e um parecer sem vistoria tem valor probatório muito menor. Análise documental, revisão de projeto de terceiros e parecer crítico sobre laudo já existente podem ser feitos remotamente.",
      },
      {
        id: "o-que-e-art",
        pergunta: "O que é ART e quem precisa dela?",
        resposta:
          "A Anotação de Responsabilidade Técnica registra no CREA qual profissional responde por determinada atividade. É exigida pela Lei 6.496/1977 em qualquer serviço técnico de engenharia — projeto, execução, manutenção, laudo ou perícia. Quem contrata deve exigi-la: sem ART, não há responsável técnico formalmente identificado, e o documento perde força perante fiscalização e seguradora.",
      },
      {
        id: "fora-do-estado",
        pergunta: "Vocês atendem fora do estado-sede?",
        resposta:
          "Sim. O registro no CREA de origem permite atuação em outras unidades da federação mediante visto do conselho local, providenciado por mim antes da vistoria quando necessário. O custo de deslocamento entra na proposta de forma separada, para você distinguir honorário técnico de despesa de viagem.",
      },
      {
        id: "quem-responde",
        pergunta: "Quem responde tecnicamente pelo documento?",
        resposta:
          "[PREENCHER: nome do engenheiro], pessoalmente. Todo documento sai com assinatura, número de registro e ART vinculada ao meu CREA. Não há emissão por terceiros nem assinatura de complacência.",
      },
      {
        id: "entrega-validade",
        pergunta: "Como recebo o documento e por quanto tempo ele vale?",
        resposta:
          "A entrega é em PDF assinado digitalmente, acompanhado do comprovante da ART. A validade varia com o tipo: laudo de condição reflete o estado na data da vistoria; inspeção de NR-13 segue a periodicidade da norma e do tipo de equipamento; perícia não expira, mas se refere ao que foi observado naquela data.",
      },
    ],
  },

  /* ---------------------------------------------------------- FORMULÁRIO */
  formulario: {
    cabecalho: {
      eyebrow: "Contato",
      titulo: "Descreva o que você precisa",
      subtitulo:
        "Quanto mais específico o escopo, mais preciso o retorno. Resposta em até 2 horas úteis.",
    },
    campos: {
      nome: { rotulo: "Nome", placeholder: "Como devo chamar você" },
      whatsapp: {
        rotulo: "WhatsApp",
        placeholder: "(00) 00000-0000",
        ajuda: "É por aqui que retorno o contato.",
      },
      servico: { rotulo: "Tipo de Serviço", placeholder: "Selecione o serviço" },
      mensagem: {
        rotulo: "Mensagem",
        placeholder:
          "Ex.: 2 vasos de pressão em planta de alimentos, sem prontuário, fiscalização marcada para o mês que vem.",
        ajuda: "Equipamento, local, prazo e o que motivou a demanda.",
      },
    },
    botao: { padrao: "Enviar solicitação", enviando: "Enviando…" },
    estados: {
      sucesso: {
        titulo: "Solicitação recebida",
        texto: "Retorno pelo WhatsApp informado em até 2 horas úteis.",
      },
      erro: {
        titulo: "Não foi possível enviar",
        texto: "Tente novamente em instantes ou fale direto pelo WhatsApp.",
      },
    },
    consentimento:
      "Ao enviar, você concorda em ser contatado sobre esta solicitação. Seus dados não são compartilhados com terceiros.",
  },

  /* ------------------------------------------------------ CANAIS DIRETOS */
  canaisDiretos: {
    cabecalho: {
      titulo: "Ou fale direto",
      subtitulo: "Se preferir pular o formulário, qualquer um destes chega em mim.",
    },
    itens: [
      {
        id: "whatsapp",
        rotulo: "WhatsApp",
        valor: WHATSAPP_EXIBICAO,
        href: `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(MENSAGEM_WHATSAPP)}`,
        icone: "whatsapp",
        ariaLabel: "Abrir conversa no WhatsApp",
      },
      {
        id: "email",
        rotulo: "E-mail",
        valor: EMAIL,
        href: `mailto:${EMAIL}`,
        icone: "email",
        ariaLabel: "Enviar e-mail",
      },
      {
        id: "telefone",
        rotulo: "Telefone",
        valor: TELEFONE_EXIBICAO,
        href: `tel:${TELEFONE_E164}`,
        icone: "telefone",
        ariaLabel: "Ligar para o telefone comercial",
      },
    ],
  },

  /* ------------------------------------------------------------- RODAPÉ */
  footer: {
    colunas: [
      {
        titulo: "Serviços",
        links: [
          { rotulo: "Laudo Técnico", href: "/?servico=laudo-tecnico#contato" },
          { rotulo: "Emissão de ART", href: "/?servico=emissao-art#contato" },
          { rotulo: "Perícia Judicial", href: "/?servico=pericia-judicial#contato" },
          { rotulo: "Inspeção NR-13", href: "/?servico=inspecao-nr13#contato" },
          { rotulo: "Inspeção NR-12", href: "/?servico=inspecao-nr12#contato" },
        ],
      },
      {
        titulo: "Navegação",
        links: [
          { rotulo: "Como Funciona", href: "#como-funciona" },
          { rotulo: "Sobre", href: "#sobre" },
          { rotulo: "Área de Atuação", href: "#area-atuacao" },
          { rotulo: "FAQ", href: "#faq" },
          { rotulo: "Contato", href: "#contato" },
        ],
      },
    ],
    legal: [
      "Consulte a validade de qualquer ART emitida diretamente no portal do CREA.",
    ],
    assinatura: "Miranda Engenharia",
  },
};

/* ==========================================================================
   6. DERIVADOS
   ========================================================================== */

export const linkWhatsApp = (mensagem: string = MENSAGEM_WHATSAPP): string =>
  `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(mensagem)}`;

export const servicoPorId = (id: string): Servico | undefined =>
  conteudo.servicos.itens.find((servico) => servico.id === id);
