import TokenFontWeightPage from "@/components/pages/workspace/projects/token/TokenFontWeightPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Font Weight Tokens" },
  { withSuffix: true },
);

const TokenFontWeightRoute = async () => {
  return <TokenFontWeightPage />;
};

export default TokenFontWeightRoute;
