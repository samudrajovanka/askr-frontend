import TokenShadowPage from "@/components/pages/workspace/projects/token/TokenShadowPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Shadow Tokens" },
  { withSuffix: true },
);

const TokenShadowRoute = async () => {
  return <TokenShadowPage />;
};

export default TokenShadowRoute;
