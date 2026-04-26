"use client";

import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Bug,
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
  CheckCircle
} from "lucide-react";
import { IconKey } from "@/lib/site-data";

const ICONS = {
  barChart3: BarChart3,
  bot: Bot,
  briefcaseBusiness: BriefcaseBusiness,
  bug: Bug,
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
  checkCircle: CheckCircle,
};

export function DynamicIcon({ name, className }: { name: IconKey; className?: string }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
