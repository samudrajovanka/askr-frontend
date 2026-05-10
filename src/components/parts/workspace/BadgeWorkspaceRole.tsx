import { Badge } from "@/components/ui/badge";
import { roleWorkspaceLabels } from "@/constants/workspace";
import { cn } from "@/lib/utils";
import type { RoleWorkspace } from "@/types/workspace";

const roleColors: Record<
  RoleWorkspace,
  { bg: string; text: string; border: string }
> = {
  admin: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/20",
  },
  designer: {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    border: "border-sky-500/20",
  },
  engineer: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  manager: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
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
