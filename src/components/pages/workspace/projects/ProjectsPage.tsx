"use client";

import { FolderGit2, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import AddProjectCard from "@/components/parts/project/AddProjectCard";
import CreateProjectDialog from "@/components/parts/project/CreateProjectDialog";
import ProjectCard from "@/components/parts/project/ProjectCard";
import ProjectSkeletonCard from "@/components/parts/project/ProjectSkeletonCard";
import QueryHandling from "@/components/parts/query/QueryHandling";
import HeaderSection from "@/components/parts/template/HeaderSectionTemplate";
import { Button, buttonVariants } from "@/components/ui/button";
import { BasicEmptyState } from "@/components/ui/empty";
import { usePermission } from "@/hooks/usePermission";
import { useProjects } from "@/query/project";

const ProjectsPage = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const projectsQuery = useProjects(workspaceSlug);
  const { hasPermission } = usePermission(workspaceSlug);

  const canCreate = hasPermission("project:create");

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
            {projectsQuery.data?.data.data.projects.length && canCreate ? (
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="size-4" />
                New Project
              </Button>
            ) : null}
          </div>
        }
      />

      <QueryHandling
        queryResult={projectsQuery}
        renderLoading={
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectSkeletonCard />
            <ProjectSkeletonCard />
            <ProjectSkeletonCard />
          </div>
        }
        renderEmpty={
          <BasicEmptyState
            Icon={FolderGit2}
            title="No projects yet"
            message="Create your first project to start managing design design systems for your team."
            actionPlus={
              canCreate
                ? {
                    title: "Create your first Project",
                    onClick: () => setDialogOpen(true),
                  }
                : undefined
            }
          />
        }
        checkEmpty={({
          data: {
            data: { projects },
          },
        }) => projects?.length === 0}
        render={({
          data: {
            data: { projects },
          },
        }) => (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                workspaceSlug={workspaceSlug}
              />
            ))}
            {canCreate && (
              <AddProjectCard onClick={() => setDialogOpen(true)} />
            )}
          </div>
        )}
      />

      {canCreate && (
        <CreateProjectDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          workspaceSlug={workspaceSlug}
        />
      )}
    </>
  );
};

export default ProjectsPage;
