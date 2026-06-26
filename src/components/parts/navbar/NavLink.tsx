import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
};

const navLinkClassName =
  "rounded-lg px-2 typography-regular text-muted-foreground transition-colors hover:text-primary";

const NavLink = ({ href, children, className, ...props }: NavLinkProps) => {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const isAnchor = href.startsWith("#");

  if (isExternal || isAnchor) {
    return (
      <a href={href} className={cn(navLinkClassName, className)} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(navLinkClassName, className)} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
