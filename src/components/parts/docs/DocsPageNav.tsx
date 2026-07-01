"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { SIDEBAR_NAV_TYPE } from "@/constants/sidebar";
import useSidebarDocs from "@/hooks/sidebar/useSidebarDocs";
import { cn } from "@/lib/utils";
import type { SidebarNavItemLink } from "@/types/sidebar";

type NavItem = { title: string; href: string };

type NavCardProps = {
  item: NavItem;
  direction: "prev" | "next";
  className?: string;
};

const NavCard = ({ item, direction, className }: NavCardProps) => {
  const isPrev = direction === "prev";

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors",
        "hover:border-primary/50 hover:bg-primary/5",
        isPrev ? undefined : "text-right",
        className,
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary",
          !isPrev && "justify-end",
        )}
      >
        {isPrev && <ChevronLeft className="size-3.5" />}
        {isPrev ? "Previous" : "Next"}
        {!isPrev && <ChevronRight className="size-3.5" />}
      </span>
      <span className="typography-regular font-medium text-foreground transition-colors group-hover:text-primary line-clamp-1">
        {item.title}
      </span>
    </Link>
  );
};

const DocsPageNav = () => {
  const pathname = usePathname();
  const { navItems } = useSidebarDocs();

  const flatLinks = useMemo(
    () =>
      navItems
        .filter((item) => item.type === SIDEBAR_NAV_TYPE.LINK)
        .map((item) => ({
          title: item.title,
          href: (item as SidebarNavItemLink).href,
        })),
    [navItems],
  );

  const currentIndex = useMemo(
    () => flatLinks.findIndex((item) => item.href === pathname),
    [flatLinks, pathname],
  );

  const prev = currentIndex > 0 ? flatLinks[currentIndex - 1] : null;
  const next =
    currentIndex < flatLinks.length - 1 ? flatLinks[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav aria-label="Documentation page navigation" className="mt-20">
      <div className={cn("grid gap-4 grid-cols-2")}>
        {prev ? <NavCard item={prev} direction="prev" /> : <div />}

        {next && <NavCard item={next} direction="next" />}
      </div>
    </nav>
  );
};

export default DocsPageNav;
