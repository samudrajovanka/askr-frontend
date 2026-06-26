"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AnnouncementBarProps = {
  storageKey: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

const AnnouncementBar = ({
  storageKey,
  message,
  actionLabel,
  actionHref,
  className,
}: AnnouncementBarProps) => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const dismissed = window.localStorage.getItem(storageKey);
      setVisible(dismissed !== "true");
    } catch {
      setVisible(true);
    }
  }, [storageKey]);

  const handleDismiss = () => {
    setVisible(false);
    window.localStorage.setItem(storageKey, "true");
  };

  if (!mounted || !visible) return null;

  const hasAction = Boolean(actionLabel && actionHref);

  return (
    <div
      className={cn(
        "relative flex flex-col md:flex-row w-full items-center justify-center gap-[0.5] md:gap-3 border-b border-border px-5 py-3",
        "bg-secondary text-secondary-foreground typography-regular",
        className,
      )}
    >
      <p className="text-center">{message}</p>

      {hasAction && (
        <a
          href={actionHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-secondary-foreground underline underline-offset-2 cursor-pointer"
        >
          {actionLabel}
        </a>
      )}

      <Button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2"
        variant="ghost"
        size="icon-xs"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
};

export default AnnouncementBar;
