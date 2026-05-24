import ComingSoon from "@/components/parts/template/ComingSoon";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Activity" },
  { withSuffix: true },
);

const ProjectActivityRoute = async () => {
  return <ComingSoon />;
};

export default ProjectActivityRoute;
