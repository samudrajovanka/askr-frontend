import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Token Color" },
  { withSuffix: true },
);

const TokenColorPage = async () => {
  return <p>Token Color Page</p>;
};

export default TokenColorPage;
