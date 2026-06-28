import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UseSidebarReturn } from "@/types/sidebar";

type SidebarHeaderType = {
  header: UseSidebarReturn["header"];
  className?: string;
};

const SidebarHeader = ({ header, className }: SidebarHeaderType) => {
  const isActionHeader = "action" in header;
  const wrapperClassName = cn("relative", className);
  const iconClassName = "size-4 absolute left-2";

  if (isActionHeader) {
    return (
      <Button
        onClick={header.action}
        variant="ghost"
        className={wrapperClassName}
      >
        <ArrowLeft className={iconClassName} />
        {header.title}
      </Button>
    );
  }

  return (
    <Link
      href={header.href}
      className={buttonVariants({
        variant: "ghost",
        className: wrapperClassName,
      })}
    >
      <ArrowLeft className={iconClassName} />
      {header.title}
    </Link>
  );
};

export default SidebarHeader;
