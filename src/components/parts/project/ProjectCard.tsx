"use client";

import { useRouter } from "@bprogress/next/app";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

type Props = {
  project: Project;
  workspaceSlug: string;
};

const ProjectCard = ({ project, workspaceSlug }: Props) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() =>
        router.push(`/w/${workspaceSlug}/p/${project.slug}/dashboard`)
      }
      className="cursor-pointer"
    >
      <Card className="relative bg-card text-left transition-all duration-300 hover:ring-primary/30 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer min-h-44">
        <CardContent className="flex flex-col items-start gap-5">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-primary/3 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

          <div className="relative flex size-10 items-center justify-center rounded-lg bg-linear-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/10 transition-all duration-300 group-hover/card:ring-primary/25">
            <FolderGit2 className="size-5" />
          </div>

          <div className="relative flex flex-col gap-1">
            <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover/card:text-primary">
              {project.name}
            </h3>
            {project.description && (
              <p className="typography-small text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            )}
          </div>

          <div className="relative mt-auto flex w-full items-center gap-1.5 text-xs font-medium text-muted-foreground/60 transition-colors duration-200 group-hover/card:text-primary/70">
            <span>Open Project</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover/card:translate-x-0.5"
            />
          </div>
        </CardContent>
      </Card>
    </button>
  );
};

export default ProjectCard;
