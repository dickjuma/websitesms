import type { Metadata } from "next";

import { ServiceDetail } from "@/components/services/service-detail";
import { getEnterpriseServiceBySlug } from "@/lib/enterprise-services";

const service = getEnterpriseServiceBySlug("web-development");

export const metadata: Metadata = {
  title: service.title,
  description: service.cardDescription,
};

export default function WebDevelopmentPage() {
  return <ServiceDetail service={service} />;
}
