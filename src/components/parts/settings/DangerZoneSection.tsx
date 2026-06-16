import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DangerZoneSectionProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

const DangerZoneSection = ({
  children,
  title = "Danger Zone",
  description = "Irreversible and destructive actions.",
}: DangerZoneSectionProps) => {
  return (
    <Card className="ring-destructive/50">
      <CardHeader>
        <CardTitle className="text-destructive">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
    </Card>
  );
};

export default DangerZoneSection;
