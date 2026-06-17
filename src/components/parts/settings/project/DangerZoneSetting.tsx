"use client";

import { useRouter } from "@bprogress/next/app";
import { toast } from "sonner";
import DangerZoneSection from "@/components/parts/settings/DangerZoneSection";
import DeleteAction from "@/components/parts/settings/DeleteAction";
import { hasPermission } from "@/lib/permissions";
import { useDeleteProject } from "@/query/project";
import { useWorkspace } from "@/query/workspace";
import type { Project } from "@/types/project";

const DangerZoneSetting = ({
  project,
  workspaceSlug,
}: {
  project: Project;
  workspaceSlug: string;
}) => {
  const router = useRouter();
  const deleteMutation = useDeleteProject(workspaceSlug);
  const workspaceQuery = useWorkspace(workspaceSlug);
  const canDelete = hasPermission(
    workspaceQuery.data?.data?.data?.workspace?.role,
    "project:delete",
  );

  if (!canDelete) return null;

  return (
    <DangerZoneSection>
      <DeleteAction
        title="Delete this project"
        buttonLabel="Delete Project"
        confirmLabel="Delete Project"
        isLoading={deleteMutation.isPending}
        onAction={async () => {
          await deleteMutation.mutateAsync(project.slug);
          toast.success("Project deleted successfully");
          router.push(`/w/${workspaceSlug}/projects`);
        }}
      />
    </DangerZoneSection>
  );
};

export default DangerZoneSetting;
