import Navbar from "@/components/parts/navbar/Navbar";

export default function WorkspaceLayout({
  children,
  showWorkspaceSwitcher,
}: {
  children: React.ReactNode;
  showWorkspaceSwitcher?: boolean;
}) {
  return (
    <div className="min-h-dvh bg-background">
      <Navbar showWorkspaceSwitcher={showWorkspaceSwitcher} />

      <main className="container-layout py-10">{children}</main>
    </div>
  );
}
