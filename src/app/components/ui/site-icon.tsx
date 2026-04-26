import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Bug,
  CheckCircle,
  Cloud,
  Code2,
  CreditCard,
  Globe,
  GraduationCap,
  HeartPulse,
  Layers3,
  Package2,
  Palette,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
  Users,
  Workflow,
} from "lucide-react";
import type { IconKey } from "@/lib/site-data";

const iconMap: Record<IconKey, LucideIcon> = {
  barChart3: BarChart3,
  bot: Bot,
  briefcaseBusiness: BriefcaseBusiness,
  bug: Bug,
  checkCircle: CheckCircle,
  cloud: Cloud,
  code2: Code2,
  creditCard: CreditCard,
  globe: Globe,
  graduationCap: GraduationCap,
  heartPulse: HeartPulse,
  layers3: Layers3,
  package2: Package2,
  palette: Palette,
  shieldCheck: ShieldCheck,
  shoppingBag: ShoppingBag,
  smartphone: Smartphone,
  truck: Truck,
  users: Users,
  workflow: Workflow,
} as const;

const fallbackIcon = Code2;

type SiteIconProps = ComponentProps<"svg"> & {
  icon: IconKey;
};

export function SiteIcon({ icon, ...props }: SiteIconProps) {
  const IconComponent = iconMap[icon] || fallbackIcon;
  return <IconComponent aria-hidden="true" {...props} />;
}
