import NavbarHomepage from "@/components/parts/navbar/NavbarHomepage";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <NavbarHomepage />
      {children}
    </>
  );
}
