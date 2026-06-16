"use client";

import TokenRowBase from "@/components/parts/token/TokenRowBase";
import type { Token } from "@/types/token";

type Props = {
  token: Token;
  onEdit: (token: Token) => void;
  onDelete: (token: Token) => void;
  canEdit?: boolean;
  canDelete?: boolean;
};

const TokenBorderRow = ({
  token,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}: Props) => {
  return (
    <TokenRowBase
      token={token}
      onEdit={onEdit}
      onDelete={onDelete}
      displayValue={token.value}
      canEdit={canEdit}
      canDelete={canDelete}
      renderPreview={
        <div
          className="h-6 w-8 shrink-0 rounded-sm"
          style={{
            borderWidth: token.value,
            borderStyle: "solid",
            borderColor: "oklch(var(--primary) / 0.6)",
          }}
        />
      }
    />
  );
};

export default TokenBorderRow;
