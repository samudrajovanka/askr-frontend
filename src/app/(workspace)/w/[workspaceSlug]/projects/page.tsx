import ProjectsPage from "@/components/pages/workspace/projects/ProjectsPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Projects" },
  { withSuffix: true },
);

const ProjectsRoute = async () => {
  return <ProjectsPage />;
};

export default ProjectsRoute;
