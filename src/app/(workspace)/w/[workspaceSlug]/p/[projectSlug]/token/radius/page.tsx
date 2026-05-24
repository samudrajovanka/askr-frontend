import TokenRadiusPage from "@/components/pages/workspace/projects/token/TokenRadiusPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Radius Tokens" },
  { withSuffix: true },
);

const TokenRadiusRoute = async () => {
  return <TokenRadiusPage />;
};

export default TokenRadiusRoute;
