import ProjectDashboardPage from "@/components/pages/workspace/projects/dashboard/ProjectDashboardPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Dashboard" },
  { withSuffix: true },
);

const ProjectDashboardRoute = async () => {
  return <ProjectDashboardPage />;
};

export default ProjectDashboardRoute;
