"use client";

import { useRouter } from "@bprogress/next/app";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import DangerZoneSection from "@/components/parts/settings/DangerZoneSection";
import DeleteAction from "@/components/parts/settings/DeleteAction";
import { hasPermission } from "@/lib/permissions";
import { useDeleteWorkspace, useWorkspace } from "@/query/workspace";

const DangerZoneSetting = () => {
  const router = useRouter();
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const deleteMutation = useDeleteWorkspace();
  const workspaceQuery = useWorkspace(workspaceSlug);
  const canDelete = hasPermission(
    workspaceQuery.data?.data?.data?.workspace?.role,
    "workspace:delete",
  );

  if (!canDelete) return null;

  return (
    <DangerZoneSection>
      <DeleteAction
        title="Delete this workspace"
        buttonLabel="Delete Workspace"
        confirmLabel="Delete Workspace"
        isLoading={deleteMutation.isPending}
        onAction={async () => {
          await deleteMutation.mutateAsync(workspaceSlug);
          toast.success("Workspace deleted successfully");
          router.push("/workspaces");
        }}
      />
    </DangerZoneSection>
  );
};

export default DangerZoneSetting;
