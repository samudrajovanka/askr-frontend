import SettingsLayout from "@/components/layout/SettingsLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
