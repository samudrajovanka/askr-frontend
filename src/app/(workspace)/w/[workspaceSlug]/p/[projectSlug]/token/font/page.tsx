import TokenFontPage from "@/components/pages/workspace/projects/token/TokenFontPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Font Tokens" },
  { withSuffix: true },
);

const TokenFontRoute = async () => {
  return <TokenFontPage />;
};

export default TokenFontRoute;
