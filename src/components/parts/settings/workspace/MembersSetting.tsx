"use client";

import { format } from "date-fns";
import { Trash2, UserMinus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import QueryHandling from "@/components/parts/query/QueryHandling";
import InviteMemberDialog from "@/components/parts/settings/workspace/InviteMemberDialog";
import TableFactory, {
  type TableHeaderItem,
} from "@/components/parts/table/TableFactory";
import { BasicAlertDialog } from "@/components/ui/alert-dialog";
import { BasicAvatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BasicEmptyState } from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { roleWorkspaceLabels } from "@/constants/workspace";
import { usePermission } from "@/hooks/usePermission";
import { useMe } from "@/query/auth";
import {
  useRemoveMember,
  useUpdateWorkspaceMember,
  useWorkspaceMembers,
} from "@/query/workspace";
import type { RoleWorkspace } from "@/types/workspace";

const HEADERS: TableHeaderItem[] = [
  { title: "Member" },
  { title: "Role" },
  { title: "Joined" },
  { title: "", className: "w-12" },
];

const MembersSetting = () => {
  const { data } = useMe();
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const { hasPermission } = usePermission(workspaceSlug);
  const membersQuery = useWorkspaceMembers(workspaceSlug);
  const updateRoleMutation = useUpdateWorkspaceMember(workspaceSlug);
  const removeMemberMutation = useRemoveMember(workspaceSlug);

  const canUpdateRole = hasPermission("member:update_role");
  const canRemove = hasPermission("member:delete");

  const [pendingRoleChange, setPendingRoleChange] = useState<{
    memberId: string;
    memberName: string;
    role: RoleWorkspace;
  } | null>(null);

  const handleRemoveMember = async (memberId: string) => {
    await removeMemberMutation.mutateAsync(memberId);
    toast.success("Member removed");
  };

  const handleUpdateRole = async (memberId: string, role: RoleWorkspace) => {
    await updateRoleMutation.mutateAsync({ memberId, payload: { role } });
    toast.success("Role updated successfully");
    setPendingRoleChange(null);
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Members</CardTitle>
          <CardDescription>
            Manage who has access to this workspace.
          </CardDescription>
        </div>
        <InviteMemberDialog />
      </CardHeader>

      <CardContent>
        <QueryHandling
          queryResult={membersQuery}
          renderLoading={
            <div className="flex flex-col gap-3">
              {Array.from({ length: 2 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: use index
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          }
          renderEmpty={
            <BasicEmptyState
              Icon={UserMinus}
              title="No members yet"
              message="Invite members to collaborate on this workspace."
              className="border-0"
            />
          }
          render={({
            data: {
              data: { members },
            },
          }) => (
            <>
              <TableFactory
                headers={HEADERS}
                data={members}
                renderRow={(member) => {
                  const isSelf = member.userId === data?.data.data.user.id;

                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <BasicAvatar
                            avatarUrl={member.avatarUrl}
                            name={member.name}
                          />
                          <div>
                            <p className="typography-small font-medium">
                              {member.name}
                            </p>
                            <p className="typography-xsmall text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          disabled={isSelf || !canUpdateRole}
                          value={member.role}
                          onValueChange={(value) => {
                            const newRole = value as RoleWorkspace;
                            if (newRole !== member.role) {
                              setPendingRoleChange({
                                memberId: member.id,
                                memberName: member.name,
                                role: newRole,
                              });
                            }
                          }}
                        >
                          <SelectTrigger className="w-fit min-w-28">
                            <SelectValue>
                              {roleWorkspaceLabels[member.role]}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(roleWorkspaceLabels).map(
                              ([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {format(new Date(member.createdAt), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell>
                        <BasicAlertDialog
                          trigger={{
                            variant: "ghost-desctructive",
                            size: "icon-sm",
                            disabled: isSelf || !canRemove,
                            children: <Trash2 className="size-4" />,
                          }}
                          title={`Remove ${member.name}?`}
                          description="This will remove them from the workspace and all its projects."
                          actionButton={{
                            variant: "destructive",
                            onClick: () => handleRemoveMember(member.id),
                            disabled: removeMemberMutation.isPending,
                            children: removeMemberMutation.isPending
                              ? "Removing..."
                              : "Remove",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }}
              />

              <BasicAlertDialog
                open={!!pendingRoleChange}
                onOpenChange={(open) => {
                  if (!open && !updateRoleMutation.isPending) {
                    setPendingRoleChange(null);
                  }
                }}
                title="Change member role?"
                description={
                  pendingRoleChange ? (
                    <span>
                      Are you sure you want to change{" "}
                      <strong>{pendingRoleChange.memberName}</strong>&apos;s
                      role to{" "}
                      <strong>
                        {roleWorkspaceLabels[pendingRoleChange.role]}
                      </strong>
                      ?
                    </span>
                  ) : (
                    ""
                  )
                }
                actionButton={{
                  onClick: () => {
                    if (pendingRoleChange) {
                      handleUpdateRole(
                        pendingRoleChange.memberId,
                        pendingRoleChange.role,
                      );
                    }
                  },
                  disabled: updateRoleMutation.isPending,
                  children: updateRoleMutation.isPending
                    ? "Updating..."
                    : "Change Role",
                }}
              />
            </>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default MembersSetting;
