"use client";

import { Rocket } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import QueryHandling from "@/components/parts/query/QueryHandling";
import ReleaseEmptyState from "@/components/parts/release/ReleaseEmptyState";
import ReleaseItem from "@/components/parts/release/ReleaseItem";
import HeaderSection from "@/components/parts/section/HeaderSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateRelease, useReleases } from "@/query/release";

const ReleasePage = () => {
  const params = useParams();
  const workspaceSlug = params.workspaceSlug as string;
  const projectSlug = params.projectSlug as string;

  const releasesQuery = useReleases(workspaceSlug, projectSlug);
  const createReleaseMutation = useCreateRelease(workspaceSlug, projectSlug);

  const handlePublish = async () => {
    await createReleaseMutation.mutateAsync();
    toast.success("Release published successfully");
  };

  return (
    <div className="flex flex-col gap-6">
      <HeaderSection
        title="Release"
        description="Publish your design tokens as an npm package"
        rightComponent={
          releasesQuery.data?.data.data.releases.length ? (
            <Button
              disabled={createReleaseMutation.isPending}
              onClick={handlePublish}
            >
              <Rocket className="size-4" />
              Publish
            </Button>
          ) : null
        }
      />

      <QueryHandling
        queryResult={releasesQuery}
        renderLoading={
          <div className="flex flex-col gap-3">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        }
        checkEmpty={({
          data: {
            data: { releases },
          },
        }) => !releases.length}
        renderEmpty={<ReleaseEmptyState onCreateClick={handlePublish} />}
        render={({
          data: {
            data: { releases },
          },
        }) => (
          <div className="flex flex-col gap-2">
            {releases.map((release) => (
              <ReleaseItem key={release.id} release={release} />
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default ReleasePage;
