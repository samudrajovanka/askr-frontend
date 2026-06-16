import TokenPage from "@/components/pages/workspace/projects/token/TokenPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Tokens" },
  { withSuffix: true },
);

const TokenCategoryRoute = async () => {
  return <TokenPage />;
};

export default TokenCategoryRoute;
