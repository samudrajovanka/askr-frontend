import ReleasePage from "@/components/pages/workspace/projects/release/ReleasePage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Release" },
  { withSuffix: true },
);

const ReleaseRoute = async () => {
  return <ReleasePage />;
};

export default ReleaseRoute;
