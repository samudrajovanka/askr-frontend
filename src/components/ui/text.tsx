import { Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TextHyperlinkProps = React.PropsWithChildren<{
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  id: string;
}> &
  React.HTMLAttributes<HTMLParagraphElement>;

const TYPOGRAPHY_CLASSNAME: Record<string, string> = {
  h1: "typography-heading",
  h2: "typography-subheading",
  h3: "typography-subheading-2",
  p: "typography-regular",
} as const;

export const TextHyperlink = ({
  as: Text = "p",
  className,
  id,
  children,
}: TextHyperlinkProps) => {
  return (
    <Text
      id={id}
      className={cn(
        "scroll-m-20 flex items-center gap-1 relative w-fit group/text-hyperlink hover:underline",
        TYPOGRAPHY_CLASSNAME[Text],
        className,
      )}
    >
      {children}
      <LinkIcon className="size-3.5 hidden group-hover/text-hyperlink:block" />
      <a
        href={`#${id}`}
        className="absolute inset-0"
        aria-label="Copy link to section"
      >
        <span className="sr-only">Copy link to section</span>
      </a>
    </Text>
  );
};
