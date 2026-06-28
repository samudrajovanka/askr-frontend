import type { Metadata } from "next";
import Releases from "@/components/pages/docs/releases.mdx";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata: Metadata = generateMetadata(
  {
    title: "Releases",
    description:
      "How Askr releases work: semver versioning rules, generated npm package artifacts (CSS, JS/DTS), package naming, the publish flow, and release states.",
  },
  { withSuffix: true },
);

export default function Page() {
  return <Releases />;
}
