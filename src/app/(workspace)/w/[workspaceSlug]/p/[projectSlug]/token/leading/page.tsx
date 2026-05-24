import TokenLeadingPage from "@/components/pages/workspace/projects/token/TokenLeadingPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Leading Tokens" },
  { withSuffix: true },
);

const TokenLeadingRoute = async () => {
  return <TokenLeadingPage />;
};

export default TokenLeadingRoute;
