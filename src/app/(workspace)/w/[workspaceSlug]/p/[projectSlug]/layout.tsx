import ProjectLayout from "@/components/layout/ProjectLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProjectLayout>{children}</ProjectLayout>;
}
