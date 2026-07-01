import DocsToc from "../parts/docs/DocsToc";
import DocsSidebar from "../parts/sidebar/SidebarDocs";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh">
      <DocsSidebar />

      <main className="flex-1 container-layout py-10 min-w-0">{children}</main>

      <DocsToc />
    </div>
  );
};

export default DocsLayout;
