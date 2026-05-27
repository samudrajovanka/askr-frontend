"use client";

import { format } from "date-fns";
import { Mail, XCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import QueryHandling from "@/components/parts/query/QueryHandling";
import TableFactory, {
  type TableHeaderItem,
} from "@/components/parts/table/TableFactory";
import BadgeWorkspaceRole from "@/components/parts/workspace/BadgeWorkspaceRole";
import { BasicAlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  INVITATION_STATUS,
  invitationStatusLabels,
} from "@/constants/invitation";
import {
  useCancelInvitation,
  useWorkspaceInvitations,
} from "@/query/workspace";

const HEADERS: TableHeaderItem[] = [
  { title: "Email" },
  { title: "Role" },
  { title: "Invited By" },
  { title: "Sent" },
  { title: "Expires" },
  { title: "", className: "w-12" },
];

const InvitationsSetting = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    INVITATION_STATUS.PENDING,
  ]);

  const invitationsQuery = useWorkspaceInvitations(workspaceSlug, {
    status: selectedStatuses.join(","),
  });
  const cancelInvitation = useCancelInvitation(workspaceSlug);

  const handleCancelInvitation = async (invitationId: string) => {
    await cancelInvitation.mutateAsync(invitationId);
    toast.success("Invitation cancelled");
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Invitations</CardTitle>
          <CardDescription>
            Manage the invitations sent for this workspace.
          </CardDescription>
        </div>
        <ButtonGroup>
          {[
            INVITATION_STATUS.PENDING,
            INVITATION_STATUS.EXPIRED,
            INVITATION_STATUS.CANCELLED,
          ].map((status) => {
            const isSelected = selectedStatuses.includes(status);
            return (
              <Button
                key={status}
                variant={isSelected ? "ghost-primary" : "outline"}
                size="sm"
                onClick={() => {
                  if (isSelected) {
                    if (selectedStatuses.length > 1) {
                      setSelectedStatuses(
                        selectedStatuses.filter((s) => s !== status),
                      );
                    }
                  } else {
                    setSelectedStatuses([...selectedStatuses, status]);
                  }
                }}
              >
                {invitationStatusLabels[status]}
              </Button>
            );
          })}
        </ButtonGroup>
      </CardHeader>
      <CardContent>
        <QueryHandling
          queryResult={invitationsQuery}
          renderLoading={
            <div className="flex flex-col gap-3">
              {Array.from({ length: 2 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: use index
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          }
          render={({
            data: {
              data: { invitations },
            },
          }) => (
            <TableFactory
              headers={HEADERS}
              data={invitations}
              renderRow={(invitation) => (
                <TableRow key={invitation.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="size-4 text-muted-foreground" />
                      <span className="typography-small">
                        {invitation.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <BadgeWorkspaceRole role={invitation.role} />
                  </TableCell>
                  <TableCell className="typography-small text-muted-foreground">
                    {invitation.invitedByName}
                  </TableCell>
                  <TableCell className="text-muted-foreground typography-xsmall">
                    {format(new Date(invitation.createdAt), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-muted-foreground typography-xsmall">
                    {format(new Date(invitation.expiresAt), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    <BasicAlertDialog
                      trigger={{
                        variant: "ghost-desctructive",
                        size: "icon-sm",
                        children: <XCircle className="size-4" />,
                      }}
                      title="Cancel invitation?"
                      description={
                        <>
                          This will cancel the invitation for{" "}
                          <strong>{invitation.email}</strong>.
                        </>
                      }
                      cancelButton={{
                        children: "Back",
                      }}
                      actionButton={{
                        variant: "destructive",
                        onClick: () => handleCancelInvitation(invitation.id),
                        disabled: cancelInvitation.isPending,
                        children: cancelInvitation.isPending
                          ? "Cancelling..."
                          : "Sure",
                      }}
                    />
                  </TableCell>
                </TableRow>
              )}
            />
          )}
        />
      </CardContent>
    </Card>
  );
};

export default InvitationsSetting;
