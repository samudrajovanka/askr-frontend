"use client";

import { Rocket } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import QueryHandling from "@/components/parts/query/QueryHandling";
import ReleaseEmptyState from "@/components/parts/release/ReleaseEmptyState";
import ReleaseItem from "@/components/parts/release/ReleaseItem";
import HeaderSection from "@/components/parts/section/HeaderSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useReleases } from "@/query/release";

const ReleasePage = () => {
  const params = useParams();
  const router = useRouter();
  const workspaceSlug = params.workspaceSlug as string;
  const projectSlug = params.projectSlug as string;

  const releasesQuery = useReleases(workspaceSlug, projectSlug);

  const openWizard = () => {
    router.push(`/w/${workspaceSlug}/p/${projectSlug}/release/new`);
  };

  return (
    <div className="flex flex-col gap-6">
      <HeaderSection
        title="Release"
        description="Publish your design tokens as an npm package"
        rightComponent={
          releasesQuery.data?.data.data.releases.length ? (
            <Button onClick={openWizard}>
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
        renderEmpty={<ReleaseEmptyState onCreateClick={openWizard} />}
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
