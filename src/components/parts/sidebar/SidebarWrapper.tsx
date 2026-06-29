import Link from "next/link";
import { cn } from "@/lib/utils";
import type { UseSidebarReturn } from "@/types/sidebar";
import Logo from "../logo/Logo";
import SidebarHeader from "./SidebarHeader";

type SidebarWrapperProps = React.PropsWithChildren<{
  header: UseSidebarReturn["header"];
  logoLink?: string;
  className?: string;
  noLogo?: boolean;
  isUnderNav?: boolean;
}>;

const SidebarWrapper = ({
  children,
  logoLink,
  header,
  className,
  noLogo,
  isUnderNav,
}: SidebarWrapperProps) => {
  const LogoWrapper = ({ children }: { children: React.ReactNode }) => {
    if (logoLink) {
      return <Link href={logoLink}>{children}</Link>;
    }

    return <>{children}</>;
  };

  return (
    <aside
      className={cn(
        "sidebar-width border-r border-border sticky left-0 top-0 h-dvh flex flex-col gap-2",
        {
          "top-(--navbar-height) h-[calc(100dvh-var(--navbar-height))]":
            isUnderNav,
        },
        className,
      )}
    >
      {!noLogo && (
        <LogoWrapper>
          <Logo className="p-4 pb-0" />
        </LogoWrapper>
      )}

      <nav className="p-4 flex-1 bg-background overflow-auto">
        {header && <SidebarHeader header={header} className="mb-1 w-full" />}

        {children}
      </nav>
    </aside>
  );
};

export default SidebarWrapper;
