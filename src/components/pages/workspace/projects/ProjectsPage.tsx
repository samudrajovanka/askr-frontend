"use client";

import { FolderGit2, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import HeaderSection from "@/components/parts/section/HeaderSection";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const ProjectsPage = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();

  return (
    <>
      <HeaderSection
        title="Projects"
        description="Manage your workspace projects"
        rightComponent={
          <div className="flex items-center gap-3">
            <Link
              href={`/w/${workspaceSlug}/settings/general`}
              className={buttonVariants({ variant: "outline" })}
            >
              <Settings className="size-4" />
              Settings
            </Link>
            <Button>
              <Plus className="size-4" />
              New Project
            </Button>
          </div>
        }
      />

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderGit2 className="text-primary" />
          </EmptyMedia>
          <EmptyTitle>No Projects Found</EmptyTitle>
          <EmptyDescription>
            Create your first project to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">
            <Plus className="size-4" />
            Create Project
          </Button>
        </EmptyContent>
      </Empty>
    </>
  );
};

export default ProjectsPage;
