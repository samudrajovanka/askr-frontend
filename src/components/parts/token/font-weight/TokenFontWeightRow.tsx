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

const TokenFontWeightRow = ({
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
    />
  );
};

export default TokenFontWeightRow;
