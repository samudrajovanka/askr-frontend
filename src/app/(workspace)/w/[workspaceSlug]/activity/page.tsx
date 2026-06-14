import WorkspaceActivityPage from "@/components/pages/workspace/activity/WorkspaceActivityPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Activity" },
  { withSuffix: true },
);

const ActivityRoute = async () => {
  return <WorkspaceActivityPage />;
};

export default ActivityRoute;
