import { DirectoryPage } from "@/app/components/kenya-seo/programmatic-pages";
import { buildLocationsDirectoryMetadata, buildLocationsDirectoryPage } from "@/lib/kenya-programmatic-seo";

export const metadata = buildLocationsDirectoryMetadata();

export default function LocationsPage() {
  return <DirectoryPage page={buildLocationsDirectoryPage()} />;
}