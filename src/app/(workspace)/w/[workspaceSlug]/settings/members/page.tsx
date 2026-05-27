import MembersSettingsPage from "@/components/pages/workspace/settings/MembersSettingsPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Members Settings" },
  { withSuffix: true },
);

const MembersRoute = () => {
  return <MembersSettingsPage />;
};

export default MembersRoute;
