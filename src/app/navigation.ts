import {
  BarChart2,
  BookOpen,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Lightbulb,
  Settings,
  Users,
} from "lucide-react";

export interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const NAV_ITEMS: NavItem[] = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/avaliacoes", label: "Avaliações", icon: ClipboardList, badge: 3 },
  { path: "/turmas", label: "Gestão das Turmas", icon: Users },
  { path: "/bncc", label: "BNCC", icon: BookOpen },
  { path: "/resultados", label: "Resultados", icon: BarChart2 },
  { path: "/intervencoes", label: "Intervenções", icon: Lightbulb, badge: 5 },
  { path: "/relatorios", label: "Relatórios", icon: FileText },
  { path: "/configuracoes", label: "Configurações", icon: Settings },
];
