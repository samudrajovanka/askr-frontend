"use client";

import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Code from "@/components/ui/code";
import { useSyncPackageName } from "@/query/registry";
import type { SafeRegistryConfig } from "@/types/registry";

type RegistryResyncAlertProps = {
  workspaceSlug: string;
  projectSlug: string;
  config: SafeRegistryConfig;
  canManage: boolean;
  className?: string;
};

const RegistryResyncAlert = ({
  workspaceSlug,
  projectSlug,
  config,
  canManage,
  className,
}: RegistryResyncAlertProps) => {
  const syncMutation = useSyncPackageName(workspaceSlug, projectSlug);

  const getLastSavedProjectSlug = config.packageName.split("/")[1];

  const handleSync = async () => {
    try {
      await syncMutation.mutateAsync();
      toast.success("Package name synced with current project slug");
    } catch {
      toast.error("Failed to sync package name");
    }
  };

  return (
    <Alert variant="warning" className={className}>
      <AlertTitle>Package name is locked</AlertTitle>
      <AlertDescription>
        This project has published a release. The package name is currently{" "}
        <Code>{config.packageName}-&lt;type&gt;</Code> based on last saved slug{" "}
        <Code>{getLastSavedProjectSlug}</Code>. The project has been renamed to{" "}
        <Code>{projectSlug}</Code>, syncing will update the package name to{" "}
        <Code>
          @{config?.scope}/{projectSlug}-&lt;type&gt;
        </Code>
        . This will change the library name on the next release.
      </AlertDescription>

      {canManage && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleSync}
          disabled={syncMutation.isPending}
          className="mt-2"
        >
          {syncMutation.isPending ? "Syncing..." : "Sync to current slug"}
        </Button>
      )}
    </Alert>
  );
};

export default RegistryResyncAlert;
