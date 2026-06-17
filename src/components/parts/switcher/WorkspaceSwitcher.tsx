"use client";

import { useRouter } from "@bprogress/next/app";
import { useParams } from "next/navigation";
import { useCallback } from "react";

import QueryHandling from "@/components/parts/query/QueryHandling";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkspaces } from "@/query/workspace";
import type { Workspace } from "@/types/workspace";
import Switcher, { type SwitcherItem } from "./Switcher";

export default function WorkspaceSwitcher() {
  const params = useParams<{ workspaceSlug?: string }>();
  const router = useRouter();

  const workspaceQuery = useWorkspaces();

  const generateRedirectPath = useCallback(
    (slug: string) => {
      const restPath = window.location.pathname.replace(
        `/w/${params?.workspaceSlug}`,
        "",
      );

      if (restPath.startsWith("/p")) {
        return `/w/${slug}/projects`;
      }

      return `/w/${slug}${restPath}`;
    },
    [params?.workspaceSlug],
  );

  const getCurrentWorkspace = useCallback(
    (workspaces: Workspace[]): Workspace | null => {
      if (!workspaces) return null;
      return (
        workspaces.find((w) => w.slug === params?.workspaceSlug) ||
        workspaces[0]
      );
    },
    [params?.workspaceSlug],
  );

  const generateSwitcherItems = useCallback(
    (workspaces: Workspace[]): SwitcherItem[] => {
      if (!workspaces) return [];
      return workspaces.map((workspace) => ({
        id: workspace.id,
        name: workspace.name,
        onClick: () => router.push(generateRedirectPath(workspace.slug)),
      }));
    },
    [router, generateRedirectPath],
  );

  return (
    <QueryHandling
      queryResult={workspaceQuery}
      renderLoading={<Skeleton className="h-4 w-20" />}
      render={({
        data: {
          data: { workspaces },
        },
      }) => (
        <Switcher
          items={generateSwitcherItems(workspaces)}
          selectedId={getCurrentWorkspace(workspaces)?.id}
          searchPlaceholder="Find Workspace..."
          emptyText="No workspace found."
          defaultPlaceholder="Select workspace..."
          footerRender={() => (
            <Button
              variant="ghost"
              className="w-full justify-start px-2"
              onClick={() => router.push("/workspaces")}
            >
              Go to Workspaces
            </Button>
          )}
        />
      )}
    />
  );
}
