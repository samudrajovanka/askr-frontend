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

const TokenSpacingRow = ({
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
          className="h-6 min-w-3 max-w-24 shrink-0 rounded-sm bg-primary/20 border border-primary/30"
          style={{ width: token.value }}
          aria-hidden
        />
      }
    />
  );
};

export default TokenSpacingRow;
