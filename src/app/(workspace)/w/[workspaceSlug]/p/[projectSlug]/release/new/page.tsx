import NewReleasePage from "@/components/pages/workspace/projects/release/NewReleasePage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "New Release" },
  { withSuffix: true },
);

const NewReleaseRoute = async () => {
  return <NewReleasePage />;
};

export default NewReleaseRoute;
