import RegistrySettingsPage from "@/components/pages/workspace/projects/settings/RegistrySettingsPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Registry Settings" },
  { withSuffix: true },
);

const RegistrySettingsRoute = async () => {
  return <RegistrySettingsPage />;
};

export default RegistrySettingsRoute;
