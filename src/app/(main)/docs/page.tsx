import type { Metadata } from "next";
import Overview from "@/components/pages/docs/overview.mdx";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata: Metadata = generateMetadata(
  {
    title: "Documentation",
  },
  { withSuffix: true },
);

export default function Page() {
  return <Overview />;
}
