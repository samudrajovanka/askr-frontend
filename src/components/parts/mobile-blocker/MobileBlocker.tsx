"use client";

import { Monitor } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MobileBlocker = () => {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background p-8 text-center md:hidden container-layout">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Monitor className="size-10" />
        <Badge variant="destructive" className="absolute bottom-0 right-0">
          !
        </Badge>
      </div>
      <h2 className="typography-subheading mb-2 text-foreground">
        Screen Too Small
      </h2>
      <p className="typography-regular max-w-[300px] text-muted-foreground leading-relaxed">
        Askr dashboard is optimized for tablet screens and above to ensure the
        best design token management experience.
      </p>
    </div>
  );
};

export default MobileBlocker;
