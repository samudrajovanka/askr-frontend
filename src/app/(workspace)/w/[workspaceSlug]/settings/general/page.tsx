import GeneralSettingsPage from "@/components/pages/workspace/settings/GeneralSettingsPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "General Settings" },
  { withSuffix: true },
);

const GeneralRoute = async () => {
  return <GeneralSettingsPage />;
};

export default GeneralRoute;
