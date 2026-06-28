"use client";

import { Check, Copy } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{
  value: string;
  className?: string;
}>;

const CopyButton = ({ value, className, children }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "transition-colors flex items-center gap-1.5 group/copy cursor-pointer",
        className,
      )}
    >
      {copied ? (
        <Check className="size-3 text-primary animate-in fade-in zoom-in duration-200" />
      ) : (
        <Copy className="size-3" />
      )}
      {children}
    </button>
  );
};

export default CopyButton;
