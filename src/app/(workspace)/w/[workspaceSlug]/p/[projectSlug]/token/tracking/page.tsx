import TokenTrackingPage from "@/components/pages/workspace/projects/token/TokenTrackingPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Tracking Tokens" },
  { withSuffix: true },
);

const TokenTrackingRoute = async () => {
  return <TokenTrackingPage />;
};

export default TokenTrackingRoute;
