import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Project" },
  { withSuffix: true },
);

const ProjectDashboardPage = async () => {
  return <p>Project Page</p>;
};

export default ProjectDashboardPage;
