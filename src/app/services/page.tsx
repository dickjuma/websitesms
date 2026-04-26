import { DirectoryPage } from "@/app/components/kenya-seo/programmatic-pages";
import {
  buildServicesDirectoryMetadata,
  buildServicesDirectoryPage,
} from "@/lib/kenya-programmatic-seo";

export const metadata = buildServicesDirectoryMetadata();

export default function ServicesPage() {
  return <DirectoryPage page={buildServicesDirectoryPage()} />;
}
