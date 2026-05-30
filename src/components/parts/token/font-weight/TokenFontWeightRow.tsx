"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import TokenActions from "@/components/parts/token/TokenActions";
import { Badge } from "@/components/ui/badge";
import type { Token } from "@/types/token";

type Props = {
  token: Token;
  onEdit: (token: Token) => void;
  onDelete: (token: Token) => void;
  canEdit?: boolean;
  canDelete?: boolean;
};

const TokenFontWeightRow = ({
  token,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(token.value);
    setCopied(true);
    toast.success("Copied to clipboard", {
      description: `${token.name}: ${token.value}`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`token-${token.layer}-${token.name}`}
      className="flex items-center gap-4 px-4 py-3 border-b border-border/40 last:border-b-0 hover:bg-muted/30 transition-colors"
    >
      <div className="flex flex-col gap-1 flex-1">
        <span className="typography-small font-medium font-mono truncate">
          {token.name}
        </span>

        {token.description && (
          <span className="typography-xsmall text-muted-foreground">
            {token.description}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5 items-end">
        {token.status !== "stable" && (
          <Badge
            variant={token.status === "deprecated" ? "destructive" : "outline"}
          >
            {token.status}
          </Badge>
        )}

        {token.layer === "semantic" && token.reference && (
          <span className="typography-xsmall text-muted-foreground font-mono truncate">
            → {token.reference}
          </span>
        )}

        <button
          type="button"
          onClick={handleCopy}
          className="typography-xsmall text-muted-foreground font-mono hover:text-foreground transition-colors flex items-center gap-1.5 group/copy cursor-pointer"
        >
          {copied ? (
            <Check className="size-3 text-primary animate-in fade-in zoom-in duration-200" />
          ) : (
            <Copy className="size-3 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
          )}
          {token.value}
        </button>
      </div>

      <TokenActions
        token={token}
        onEdit={onEdit}
        onDelete={onDelete}
        canEdit={canEdit}
        canDelete={canDelete}
      />
    </div>
  );
};

export default TokenFontWeightRow;
