import ComingSoon from "@/components/parts/template/ComingSoon";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Members Settings" },
  { withSuffix: true },
);

const MembersRoute = () => {
  return <ComingSoon />;
};

export default MembersRoute;
