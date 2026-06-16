"use client";

import { Rocket } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import QueryHandling from "@/components/parts/query/QueryHandling";
import ReleaseSetupGuide from "@/components/parts/release/new/ReleaseSetupGuide";
import ReleaseItem from "@/components/parts/release/ReleaseItem";
import HeaderSection from "@/components/parts/template/HeaderSectionTemplate";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { hasPermission } from "@/lib/permissions";
import { useReleases } from "@/query/release";
import { useWorkspace } from "@/query/workspace";

const ReleasePage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();
  const router = useRouter();

  const releasesQuery = useReleases(workspaceSlug, projectSlug);
  const workspaceQuery = useWorkspace(workspaceSlug);
  const canPublish = hasPermission(
    workspaceQuery.data?.data.data.workspace.role,
    "release:publish",
  );

  const redirectToCreate = () => {
    router.push(`/w/${workspaceSlug}/p/${projectSlug}/release/new`);
  };

  return (
    <div className="flex flex-col gap-6">
      <HeaderSection
        title="Release"
        description="Publish your design tokens as an npm package"
        rightComponent={
          releasesQuery.data?.data.data.releases.length && canPublish ? (
            <Button onClick={redirectToCreate}>
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
        renderEmpty={
          <ReleaseSetupGuide
            workspaceSlug={workspaceSlug}
            projectSlug={projectSlug}
            onCreateRelease={redirectToCreate}
          />
        }
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
