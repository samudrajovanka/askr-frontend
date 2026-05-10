import Navbar from "@/components/parts/navbar/Navbar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background">
      <Navbar />

      <main className="container-layout py-10">{children}</main>
    </div>
  );
}
