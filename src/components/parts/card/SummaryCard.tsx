import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SummaryCardProps = {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

const SummaryCard = ({ icon, label, value }: SummaryCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
        {icon}
        {label}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {typeof value === "number" || typeof value === "string" ? (
        <p className="typography-heading text-2xl">{value}</p>
      ) : (
        value
      )}
    </CardContent>
  </Card>
);

export default SummaryCard;
