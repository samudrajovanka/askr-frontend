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

const TokenShadowRow = ({
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
          className="size-8 shrink-0 rounded-md bg-background"
          style={{ boxShadow: token.value }}
        />
      }
    />
  );
};

export default TokenShadowRow;
