import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  ClipboardCheck,
  Clock,
  Cog,
  Cylinder,
  Factory,
  FileCheck2,
  FileText,
  Flame,
  Gauge,
  Gavel,
  GraduationCap,
  IdCard,
  Landmark,
  LoaderCircle,
  Mail,
  MapPin,
  MapPinned,
  MessageCircle,
  MessageSquareText,
  Menu,
  PencilRuler,
  Phone,
  Quote,
  Scale,
  SearchCheck,
  Send,
  ShieldCheck,
  Stamp,
  TriangleAlert,
  Umbrella,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Registry único de ícones.
 *
 * Existe para que `content.ts` permaneça 100% livre de JSX: o conteúdo declara
 * o ícone como string (`"laudo"`), e este mapa resolve para o componente. O tipo
 * `IconName` é inferido daqui, então um nome inválido quebra na compilação.
 */
export const iconRegistry = {
  // serviços
  laudo: FileCheck2,
  art: Stamp,
  estanqueidade: Flame,
  periciaJudicial: Gavel,
  periciaSinistro: SearchCheck,
  projetoMecanico: PencilRuler,
  projetoGas: Cylinder,
  vasoPressao: Gauge,
  maquinas: Cog,

  // segmentos
  industria: Factory,
  condominio: Building2,
  seguradora: Umbrella,
  advocacia: Scale,
  orgaoPublico: Landmark,

  // estatísticas
  documentos: FileText,
  clientes: Users,
  estados: MapPinned,

  // processo
  contato: MessageSquareText,
  proposta: FileText,
  vistoria: ClipboardCheck,
  emissao: BadgeCheck,

  // credenciais
  registro: IdCard,
  formacao: GraduationCap,
  experiencia: Award,
  especializacao: Wrench,

  // canais e interface
  whatsapp: MessageCircle,
  email: Mail,
  telefone: Phone,
  endereco: MapPin,
  horario: Clock,
  aspas: Quote,
  selo: ShieldCheck,
  menu: Menu,
  seta: ArrowRight,
  setaDiagonal: ArrowUpRight,
  chevron: ChevronRight,
  check: Check,
  sucesso: CircleCheck,
  erro: CircleAlert,
  alerta: TriangleAlert,
  carregando: LoaderCircle,
  enviar: Send,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;
