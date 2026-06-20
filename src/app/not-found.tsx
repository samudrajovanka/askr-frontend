import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import NotFoundLayout from "@/components/layout/NotFoundLayout";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata({
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
});

export default async function NotFound() {
  const { userId } = await auth();
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? undefined;

  return (
    <NotFoundLayout
      title="Page not found"
      pathname={pathname}
      backHref={userId ? "/workspaces" : "/"}
      backLabel={userId ? "Back to Workspace" : "Back to Home"}
    />
  );
}
