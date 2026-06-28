"use client";

import { type ReactNode, useRef } from "react";
import CopyButton from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./card";

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
  let language = "code";

  const child = Array.isArray(children) ? children[0] : children;
  if (child && typeof child === "object" && "props" in child) {
    const childClassName = child.props?.className;
    const match = childClassName?.match(/language-(\w+)/);

    if (match) {
      language = match[1];
    }
  }

  return (
    <Card className="my-6 pt-0">
      <CardHeader className="py-2 bg-secondary">
        <div className="flex justify-between items-center">
          <span className="font-mono">{language}</span>

          <CopyButton
            value={text}
            className="text-muted-foreground hover:text-foreground ml-auto"
          />
        </div>
      </CardHeader>
      <CardContent>
        <pre ref={preRef} className={cn(className, "overflow-x-auto")}>
          {children}
        </pre>
      </CardContent>
    </Card>
  );
};

export default PreShiki;
