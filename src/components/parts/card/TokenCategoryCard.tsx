import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { tokenCategoryColors } from "@/constants/token";
import type { TokenCategory } from "@/types/token";

type TokenCategoryCardProps = {
  category: TokenCategory;
  label: string;
  count: number;
  icon: React.ReactNode;
};

const TokenCategoryCard = ({
  category,
  label,
  count,
  icon,
}: TokenCategoryCardProps) => (
  <Card size="sm">
    <CardContent className="flex items-center gap-3">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg text-xs font-medium ${tokenCategoryColors[category]}`}
      >
        {icon}
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-xs text-muted-foreground">{label}</span>
        <span className="font-medium">{count}</span>
      </div>
    </CardContent>
  </Card>
);

export default TokenCategoryCard;
