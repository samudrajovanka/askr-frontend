"use client";

import { type ReactNode, useRef } from "react";
import CopyButton from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

type Props = {
  children?: ReactNode;
  className?: string;
};

function extractText(node: ReactNode): string {
  if (node == null || node === false) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    // @ts-expect-error: children may be any node type
    return extractText(node.props?.children);
  }
  return "";
}

const PreShiki = ({ children, className }: Props) => {
  const preRef = useRef<HTMLPreElement>(null);
  const text = extractText(children);

  return (
    <div className="relative my-6 overflow-hidden rounded-lg border border-border">
      <div className="absolute right-2 top-2 z-10">
        <CopyButton
          value={text}
          className="text-muted-foreground hover:text-foreground"
        />
      </div>
      <pre ref={preRef} className={cn(className, "overflow-x-auto p-4 m-0")}>
        {children}
      </pre>
    </div>
  );
};

export default PreShiki;
