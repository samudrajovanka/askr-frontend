"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  );
}

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  );
}

type SimpleCollapsibleProps = CollapsiblePrimitive.Root.Props & {
  triggerProps?: CollapsiblePrimitive.Trigger.Props;
  contentProps?: CollapsiblePrimitive.Panel.Props;
  title: string;
};

function SimpleCollapsible({
  triggerProps: { className: triggerClassName, ...triggerProps } = {},
  contentProps: { className: contentClassName, ...contentProps } = {},
  children,
  className,
  title,
  ...props
}: SimpleCollapsibleProps) {
  return (
    <Collapsible
      className={cn(
        "rounded-xl border border-border overflow-hidden",
        className,
      )}
      {...props}
    >
      <CollapsibleTrigger
        className={cn(
          "cursor-pointer flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors",
          props.open ? "bg-accent hover:bg-primary/10" : "",
          triggerClassName,
        )}
        {...triggerProps}
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-200",
            props.open ? "rotate-180" : "",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className={contentClassName} {...contentProps}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  SimpleCollapsible,
};
