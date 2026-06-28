import type { Metadata } from "next";
import Tokens from "@/components/pages/docs/tokens.mdx";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata: Metadata = generateMetadata(
  {
    title: "Tokens",
    description:
      "Understand Askr's token system: primitive vs semantic layers, naming conventions, the 10 token categories, status lifecycle, and soft delete behavior.",
  },
  { withSuffix: true },
);

export default function Page() {
  return <Tokens />;
}
