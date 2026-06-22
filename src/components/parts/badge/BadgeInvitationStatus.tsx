import { Badge } from "@/components/ui/badge";
import { invitationStatusLabels } from "@/constants/invitation";
import { cn } from "@/lib/utils";
import type { InvitationStatus } from "@/types/invitation";

const statusColors: Record<
  InvitationStatus,
  { bg: string; text: string; border: string }
> = {
  pending: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  accepted: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  expired: {
    bg: "bg-zinc-100",
    text: "text-zinc-700",
    border: "border-zinc-200",
  },
  cancelled: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
  },
};

type BadgeInvitationStatusProps = {
  status: InvitationStatus;
};

const BadgeInvitationStatus = ({ status }: BadgeInvitationStatusProps) => {
  const colors = statusColors[status] ?? statusColors.pending;

  return (
    <Badge
      variant="outline"
      className={cn(colors.bg, colors.text, colors.border, "capitalize")}
    >
      {invitationStatusLabels[status]}
    </Badge>
  );
};

export default BadgeInvitationStatus;
