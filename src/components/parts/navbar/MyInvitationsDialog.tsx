"use client";

import { useRouter } from "@bprogress/next/app";
import { Check, Mail, X } from "lucide-react";
import { toast } from "sonner";
import BadgeWorkspaceRole from "@/components/parts/badge/BadgeWorkspaceRole";
import QueryHandling from "@/components/parts/query/QueryHandling";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitialsName } from "@/lib/helpers/string";
import {
  useAcceptInvitation,
  useDeclineInvitation,
  useMyInvitations,
} from "@/query/invitation";

type MyInvitationsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MyInvitationsDialog = ({
  open,
  onOpenChange,
}: MyInvitationsDialogProps) => {
  const router = useRouter();
  const invitationsQuery = useMyInvitations();
  const acceptMutation = useAcceptInvitation();
  const declineMutation = useDeclineInvitation();

  const handleAccept = async (token: string, workspaceSlug: string) => {
    await acceptMutation.mutateAsync(token);

    toast.success("Invitation accepted");
    onOpenChange(false);

    router.push(`/w/${workspaceSlug}/projects`);
  };

  const handleDecline = async (token: string) => {
    await declineMutation.mutateAsync(token);

    toast.success("Invitation declined");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>My Invitations</DialogTitle>
          <DialogDescription>
            Pending invitations to join workspaces.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
          <QueryHandling
            queryResult={invitationsQuery}
            renderLoading={
              <div className="flex flex-col gap-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: use index
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            }
            checkEmpty={({
              data: {
                data: { invitations },
              },
            }) => !invitations.length}
            renderEmpty={
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Mail className="size-8 text-muted-foreground mb-2" />
                <p className="typography-small text-muted-foreground">
                  No pending invitations
                </p>
              </div>
            }
            render={({
              data: {
                data: { invitations },
              },
            }) => (
              <div className="flex flex-col gap-3">
                {invitations.map((invitation) => (
                  <div
                    key={invitation.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <Avatar size="sm">
                      <AvatarFallback>
                        {getInitialsName(invitation.workspaceName)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="typography-small font-medium truncate mb-1">
                        {invitation.workspaceName}
                      </p>
                      <BadgeWorkspaceRole role={invitation.role} />
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        size="icon-sm"
                        variant="default"
                        title="Accept invitation"
                        disabled={
                          acceptMutation.isPending || declineMutation.isPending
                        }
                        onClick={() =>
                          handleAccept(
                            invitation.token,
                            invitation.workspaceSlug,
                          )
                        }
                      >
                        <Check className="size-4" />
                      </Button>
                      <Button
                        size="icon-sm"
                        variant="ghost-desctructive"
                        title="Decline invitation"
                        disabled={
                          acceptMutation.isPending || declineMutation.isPending
                        }
                        onClick={() => handleDecline(invitation.token)}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyInvitationsDialog;
