import { useId } from "react";

type ColorPickerProps = React.ComponentProps<"input"> & {
  value?: string;
};

export function ColorPicker({ className, value, ...props }: ColorPickerProps) {
  const id = useId();

  return (
    <div className={className}>
      {/* * biome-ignore lint/a11y/noLabelWithoutControl: It's an intentional pattern for better accessibility and us */}
      <label
        htmlFor={props.id ?? id}
        className="size-8 inline-block rounded-md cursor-pointer border border-border/50"
        style={{
          backgroundColor: value ?? "transparent",
        }}
      />
      <input id={id} type="color" className="sr-only" {...props} />
    </div>
  );
}
