import { useId } from "react";
import { RgbaColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HEX_COLOR_REGEX } from "@/constants/regex";
import { hexToRgba, rgbaToHex } from "@/lib/helpers/color";
import { cn } from "@/lib/utils";

type ColorPickerProps = Omit<
  React.ComponentPropsWithoutRef<typeof Input>,
  "value" | "onChange"
> & {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ColorPicker({
  className,
  value,
  onChange,
  ...props
}: ColorPickerProps) {
  const id = useId();

  const isValidHex = value ? HEX_COLOR_REGEX.test(value) : false;
  const hexColor = isValidHex && value ? value : "#000000";

  const rgbaColor = hexToRgba(hexColor);

  return (
    <div className={cn("flex gap-2 items-center w-full", className)}>
      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="size-8 block rounded-md cursor-pointer border border-border/50 shadow-xs transition-transform active:scale-95 shrink-0"
              style={{
                backgroundColor: hexColor,
              }}
              aria-label="Choose color"
            />
          }
        />
        <PopoverContent className="w-auto p-3 flex flex-col gap-2.5 bg-popover rounded-lg border border-border">
          <RgbaColorPicker
            color={rgbaColor}
            onChange={(newRgba) => {
              if (onChange) {
                const newHex = rgbaToHex(newRgba);
                const event = {
                  target: {
                    name: props.name,
                    id: props.id ?? id,
                    value: newHex,
                  },
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
              }
            }}
          />
          <div className="flex items-center justify-between gap-2 mt-1 px-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Hex:
            </span>
            <span className="font-mono text-xs font-medium select-all">
              {hexColor}
            </span>
          </div>
        </PopoverContent>
      </Popover>
      <Input
        type="text"
        value={value ?? ""}
        onChange={onChange}
        placeholder="#000000"
        className="font-mono text-sm flex-1"
        {...props}
      />
    </div>
  );
}
