import type { Metadata } from "next";
import GettingStarted from "@/components/pages/docs/getting-started.mdx";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata: Metadata = generateMetadata(
  {
    title: "Getting Started",
  },
  { withSuffix: true },
);

export default function Page() {
  return <GettingStarted />;
}
