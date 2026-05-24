import TokenSpacingPage from "@/components/pages/workspace/projects/token/TokenSpacingPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Spacing Tokens" },
  { withSuffix: true },
);

const TokenSpacingRoute = async () => {
  return <TokenSpacingPage />;
};

export default TokenSpacingRoute;
