import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import NotFoundLayout from "@/components/layout/NotFoundLayout";
import Navbar from "@/components/parts/navbar/Navbar";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata({
  title: "Project Not Found",
  description: "The project you're looking for doesn't exist.",
});

export default async function NotFound() {
  const { userId } = await auth();
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? undefined;

  const [, , workspaceSlug] = pathname?.split("/") ?? [];

  return (
    <NotFoundLayout
      title="Project not found"
      pathname={pathname}
      backHref={`/w/${workspaceSlug}/projects`}
      backLabel="Back to Projects"
      renderNavbar={
        <Navbar
          showWorkspaceSwitcher={!!userId}
          workspaceSlug={workspaceSlug}
        />
      }
    />
  );
}
