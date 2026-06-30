import type { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

type BackdropProps = {
  show?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
};

export const Backdrop = ({
  show = true,
  onClick,
  className,
}: BackdropProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-black/10 supports-backdrop-filter:backdrop-blur-xs transition-opacity duration-300",
        show
          ? "pointer-events-none opacity-0"
          : "pointer-events-auto opacity-100",
        className,
      )}
      onClick={onClick}
      aria-hidden="true"
    />
  );
};
