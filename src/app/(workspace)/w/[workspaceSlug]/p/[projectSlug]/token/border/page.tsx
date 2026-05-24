import TokenBorderPage from "@/components/pages/workspace/projects/token/TokenBorderPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Border Tokens" },
  { withSuffix: true },
);

const TokenBorderRoute = async () => {
  return <TokenBorderPage />;
};

export default TokenBorderRoute;
