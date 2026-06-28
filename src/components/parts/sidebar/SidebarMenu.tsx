import type { UseSidebarReturn } from "@/types/sidebar";
import SidebarNavItem from "./SidebarNavItem";

type SidebarMenuProps = {
  navItems: UseSidebarReturn["navItems"];
};

const SidebarMenu = ({ navItems }: SidebarMenuProps) => {
  return (
    <div className="flex flex-col gap-1">
      {navItems.map((item, idx) => (
        <SidebarNavItem key={`${item.title}-${idx}`} item={item} />
      ))}
    </div>
  );
};

export default SidebarMenu;
