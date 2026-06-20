import { headers } from "next/headers";
import NotFoundLayout from "@/components/layout/NotFoundLayout";
import Navbar from "@/components/parts/navbar/Navbar";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata({
  title: "Workspace Not Found",
  description: "The workspace you're looking for doesn't exist.",
});

export default async function NotFound() {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? undefined;

  return (
    <NotFoundLayout
      title="Workspace not found"
      pathname={pathname}
      backHref="/workspaces"
      backLabel="Back to Workspaces"
      renderNavbar={<Navbar />}
    />
  );
}
