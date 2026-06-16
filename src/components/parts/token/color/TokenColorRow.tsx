"use client";

import { useMemo } from "react";
import TokenRowBase from "@/components/parts/token/TokenRowBase";
import ColorSwatch from "@/components/ui/color-swatch";
import {
  type ColorFormat,
  hexColorConverterPreview,
} from "@/lib/helpers/color";
import type { Token } from "@/types/token";

type Props = {
  token: Token;
  onEdit: (token: Token) => void;
  onDelete: (token: Token) => void;
  colorFormat?: ColorFormat;
  canEdit?: boolean;
  canDelete?: boolean;
};

const TokenColorRow = ({
  token,
  onEdit,
  onDelete,
  colorFormat = "hex",
  canEdit = true,
  canDelete = true,
}: Props) => {
  const displayValue = useMemo(
    () => hexColorConverterPreview(token.value, colorFormat),
    [colorFormat, token.value],
  );

  return (
    <TokenRowBase
      token={token}
      onEdit={onEdit}
      onDelete={onDelete}
      displayValue={displayValue}
      canEdit={canEdit}
      canDelete={canDelete}
      renderPreview={<ColorSwatch color={token.value} />}
    />
  );
};

export default TokenColorRow;
