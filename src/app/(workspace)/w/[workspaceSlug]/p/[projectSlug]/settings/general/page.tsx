import GeneralSettingsPage from "@/components/pages/workspace/projects/settings/GeneralSettingsPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "General Settings" },
  { withSuffix: true },
);

const GeneralSettingsRoute = () => {
  return <GeneralSettingsPage />;
};

export default GeneralSettingsRoute;
