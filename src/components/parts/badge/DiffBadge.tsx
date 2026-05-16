import { Badge } from "@/components/ui/badge";

export type DiffBadgeType = "added" | "modified" | "deleted";

const DiffBadge = ({ type }: { type: DiffBadgeType }) => {
  if (type === "added") {
    return (
      <Badge
        variant="outline"
        className="shrink-0 border-green-200 bg-green-50 text-green-600"
      >
        Added
      </Badge>
    );
  }
  if (type === "modified") {
    return (
      <Badge
        variant="outline"
        className="shrink-0 border-amber-200 bg-amber-50 text-amber-600"
      >
        Modified
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="shrink-0">
      Deleted
    </Badge>
  );
};

export default DiffBadge;
