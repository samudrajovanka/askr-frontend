const cssValues = [
  { name: "--color-primary", value: "#2563eb" },
  { name: "--spacing-md", value: "1rem" },
  { name: "--radius-lg", value: "0.6rem" },
  { name: "--shadow-sm", value: "0 1px 2px rgba(0,0,0,0.05)" },
];

const TokenPreview = () => {
  return (
    <div className="mt-16 w-full max-w-3xl rounded-xl border border-border bg-card p-1 shadow-lg z-2">
      <div className="rounded-lg bg-muted/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="size-3 rounded-full bg-destructive/60" />
          <div className="size-3 rounded-full bg-chart-4/60" />
          <div className="size-3 rounded-full bg-chart-3/60" />
        </div>
        <div className="space-y-3 font-mono typography-small text-left">
          {cssValues.map((css) => (
            <div key={css.name} className="flex items-center flex-wrap">
              <span className="text-muted-foreground">{css.name}:</span>
              <span className="text-primary ml-2">{css.value}</span>
              <span className="text-muted-foreground">;</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenPreview;
