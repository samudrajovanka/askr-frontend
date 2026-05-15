type ColorSwatchProps = {
  color: string | null;
  size?: "sm" | "md";
};

const ColorSwatch = ({ color, size = "md" }: ColorSwatchProps) => {
  const sizeClass =
    size === "sm" ? "size-5 rounded-[4px]" : "size-8 rounded-md";

  return (
    <div
      className={`${sizeClass} shrink-0 border border-border/50`}
      style={{ backgroundColor: color ?? "transparent" }}
      role="img"
      aria-label={color ? `Color ${color}` : "No color"}
    />
  );
};

export default ColorSwatch;
