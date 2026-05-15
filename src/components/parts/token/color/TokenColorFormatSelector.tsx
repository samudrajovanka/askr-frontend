"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import type { ColorFormat } from "@/lib/helpers/color";

interface TokenColorFormatSelectorProps {
  value: ColorFormat;
  onChange: (value: ColorFormat) => void;
}

const FORMATS: ColorFormat[] = ["hex", "rgba", "hsl"];

const TokenColorFormatSelector = ({
  value,
  onChange,
}: TokenColorFormatSelectorProps) => {
  return (
    <ButtonGroup>
      {FORMATS.map((fmt) => (
        <Button
          key={fmt}
          variant={value === fmt ? "ghost-primary" : "outline"}
          size="xs"
          onClick={() => onChange(fmt)}
          className="h-7 px-2.5 text-[10px] font-bold uppercase tracking-wider transition-all"
        >
          {fmt}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TokenColorFormatSelector;
