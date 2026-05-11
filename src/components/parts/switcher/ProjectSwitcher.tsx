"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

import QueryHandling from "@/components/parts/query/QueryHandling";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/query/project";
import type { Project } from "@/types/project";
import Switcher, { type SwitcherItem } from "./Switcher";

export default function ProjectSwitcher() {
  const params = useParams<{ workspaceSlug?: string; projectSlug?: string }>();
  const router = useRouter();

  const projectsQuery = useProjects(params?.workspaceSlug ?? "");

  const generateRedirectPath = useCallback(
    (slug: string) => {
      const restPath = window.location.pathname.replace(
        `/w/${params?.workspaceSlug}/p/${params?.projectSlug}`,
        "",
      );
      return `/w/${params?.workspaceSlug}/p/${slug}${restPath}`;
    },
    [params?.workspaceSlug, params?.projectSlug],
  );

  const getCurrentProject = useCallback(
    (projects: Project[]): Project | null => {
      if (!projects) return null;
      return (
        projects.find((p) => p.slug === params?.projectSlug) || projects[0]
      );
    },
    [params?.projectSlug],
  );

  const generateSwitcherItems = useCallback(
    (projects: Project[]): SwitcherItem[] => {
      if (!projects) return [];
      return projects.map((project) => ({
        id: project.id,
        name: project.name,
        onClick: () => router.push(generateRedirectPath(project.slug)),
      }));
    },
    [router, generateRedirectPath],
  );

  return (
    <QueryHandling
      queryResult={projectsQuery}
      renderLoading={<Skeleton className="h-4 w-20" />}
      render={({
        data: {
          data: { projects },
        },
      }) => (
        <Switcher
          items={generateSwitcherItems(projects)}
          selectedId={getCurrentProject(projects)?.id}
          searchPlaceholder="Find Project..."
          emptyText="No project found."
          defaultPlaceholder="Select project..."
          footerRender={() => (
            <Button
              variant="ghost"
              className="w-full justify-start px-2"
              onClick={() =>
                router.push(`/w/${params?.workspaceSlug}/projects`)
              }
            >
              Go to Workspaces
            </Button>
          )}
        />
      )}
    />
  );
}
