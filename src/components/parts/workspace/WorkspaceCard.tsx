"use client";

import { useRouter } from "@bprogress/next/app";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Workspace } from "@/types/workspace";
import BadgeWorkspaceRole from "./BadgeWorkspaceRole";

const WorkspaceCard = ({ workspace }: { workspace: Workspace }) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/w/${workspace.slug}/projects`)}
      className="cursor-pointer"
    >
      <Card className="relative bg-card text-left transition-all duration-300 hover:ring-primary/30 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer min-h-50">
        <CardContent className="flex flex-col items-start gap-5">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-primary/3 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

          <div className="relative flex w-full items-start justify-between">
            <div className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 text-lg font-semibold text-primary ring-1 ring-primary/10 transition-all duration-300 group-hover/card:ring-primary/25 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
              {workspace.name.charAt(0).toUpperCase()}
            </div>

            <BadgeWorkspaceRole role={workspace.me.role} />
          </div>

          <div className="relative flex flex-col gap-1.5">
            <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover/card:text-primary">
              {workspace.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {workspace.projectCount ?? 0}{" "}
              {(workspace.projectCount ?? 0) === 1 ? "project" : "projects"}
            </p>
          </div>

          <div className="relative mt-auto flex w-full items-center gap-1.5 text-xs font-medium text-muted-foreground/60 transition-colors duration-200 group-hover/card:text-primary/70">
            <span>Open Workspace</span>
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

export default WorkspaceCard;
