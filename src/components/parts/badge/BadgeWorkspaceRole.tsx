import { Badge } from "@/components/ui/badge";
import { roleWorkspaceLabels } from "@/constants/workspace";
import { cn } from "@/lib/utils";
import type { RoleWorkspace } from "@/types/workspace";

const roleColors: Record<
  RoleWorkspace,
  { bg: string; text: string; border: string }
> = {
  admin: {
    bg: "bg-violet-100",
    text: "text-violet-700",
    border: "border-violet-200",
  },
  designer: {
    bg: "bg-sky-100",
    text: "text-sky-700",
    border: "border-sky-200",
  },
  engineer: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  manager: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
  },
};

type BadgeWorkspaceRole = {
  role: RoleWorkspace;
};

const BadgeWorkspaceRole = ({ role }: BadgeWorkspaceRole) => {
  const colors = roleColors[role] ?? roleColors.engineer;

  return (
    <Badge
      variant="outline"
      className={cn(colors.bg, colors.text, colors.border, "capitalize")}
    >
      {roleWorkspaceLabels[role]}
    </Badge>
  );
};

export default BadgeWorkspaceRole;
