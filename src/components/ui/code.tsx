import { cn } from "@/lib/utils";

type CodeProps = React.HTMLAttributes<HTMLSpanElement>;

const Code = ({ className, ...props }: CodeProps) => {
  return (
    <code
      className={cn(
        "rounded bg-muted px-1 py-0.5 font-mono self-start",
        className,
      )}
      {...props}
    />
  );
};

export default Code;
