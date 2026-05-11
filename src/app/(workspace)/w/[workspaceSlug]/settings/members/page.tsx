import MembersSettingsPage from "@/components/pages/workspace/settings/MembersSettingsPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Members Settings" },
  { withSuffix: true },
);

type Props = {
  params: Promise<{ workspaceSlug: string }>;
};

const MembersRoute = async ({ params }: Props) => {
  const resolvedParams = await params;
  return <MembersSettingsPage workspaceSlug={resolvedParams.workspaceSlug} />;
};

export default MembersRoute;
