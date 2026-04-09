import type { Metadata } from "next";

import { ServiceDetail } from "@/components/services/service-detail";
import { getEnterpriseServiceBySlug } from "@/lib/enterprise-services";

const service = getEnterpriseServiceBySlug("custom-software-development");

export const metadata: Metadata = {
  title: service.title,
  description: service.cardDescription,
};

export default function CustomSoftwareDevelopmentPage() {
  return <ServiceDetail service={service} />;
}
