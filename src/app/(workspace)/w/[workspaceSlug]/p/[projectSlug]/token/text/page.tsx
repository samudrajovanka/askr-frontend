import TokenTextPage from "@/components/pages/workspace/projects/token/TokenTextPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Text Tokens" },
  { withSuffix: true },
);

const TokenTextRoute = async () => {
  return <TokenTextPage />;
};

export default TokenTextRoute;
