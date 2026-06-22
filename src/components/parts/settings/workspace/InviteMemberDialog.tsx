"use client";

import { useForm } from "@tanstack/react-form";
import { UserPlus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE_WORKSPACE, roleWorkspaceLabels } from "@/constants/workspace";
import { createInvitationSchema } from "@/endpoints/workspace/validator";
import { usePermission } from "@/hooks/usePermission";
import { isInvalidField } from "@/lib/helpers/field";
import { useCreateInvitation } from "@/query/workspace";
import type { RoleWorkspace } from "@/types/workspace";

const InviteMemberDialog = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const [open, setOpen] = useState(false);
  const { hasPermission, role } = usePermission(workspaceSlug);

  const canInvite = hasPermission("member:create");
  const isAdmin = role === ROLE_WORKSPACE.ADMIN;
  const createInvitation = useCreateInvitation(workspaceSlug);

  const availableRoles = Object.entries(roleWorkspaceLabels).filter(
    ([value]) => isAdmin || value !== ROLE_WORKSPACE.ADMIN,
  );

  const form = useForm({
    defaultValues: {
      email: "",
      role: (isAdmin
        ? ROLE_WORKSPACE.ADMIN
        : ROLE_WORKSPACE.DESIGNER) as RoleWorkspace,
    },
    validators: {
      onChange: createInvitationSchema,
      onSubmit: createInvitationSchema,
    },
    onSubmit: async ({ value }) => {
      await createInvitation.mutateAsync({
        email: value.email.trim(),
        role: value.role,
      });

      toast.success("Invitation sent successfully");
      setOpen(false);
      form.reset();
    },
  });

  if (!canInvite) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="default" />}>
        <UserPlus className="size-4" />
        Invite Member
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Send an invitation to join this workspace.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-5"
        >
          <form.Field name="email">
            {(field) => {
              const isInvalid = isInvalidField(field);
              return (
                <Field data-invalid={isInvalid} data-required>
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="colleague@company.com"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="role">
            {(field) => (
              <Field data-required>
                <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as RoleWorkspace)
                  }
                >
                  <SelectTrigger id={field.name} className="w-full">
                    <SelectValue>
                      {roleWorkspaceLabels[field.state.value]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>

          <DialogFooter>
            <Button type="submit" disabled={createInvitation.isPending}>
              {createInvitation.isPending ? "Sending..." : "Send Invitation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberDialog;
