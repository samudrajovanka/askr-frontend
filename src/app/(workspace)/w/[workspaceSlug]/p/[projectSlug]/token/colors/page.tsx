import TokenColorPage from "@/components/pages/token/TokenColorPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Color Tokens" },
  { withSuffix: true },
);

const TokenColorRoute = async () => {
  return <TokenColorPage />;
};

export default TokenColorRoute;
