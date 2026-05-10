"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import QueryHandling from "@/components/parts/query/QueryHandling";
import HeaderSection from "@/components/parts/section/HeaderSection";
import AddWorkspaceCard from "@/components/parts/workspace/AddWorkspaceCard";
import CreateWorkspaceDialog from "@/components/parts/workspace/CreateWorkspaceDialog";
import WorkspaceCard from "@/components/parts/workspace/WorkspaceCard";
import WorkspaceEmptyState from "@/components/parts/workspace/WorkspaceEmptyState";
import WorkspaceSkeletonCard from "@/components/parts/workspace/WorkspaceSkeletonCard";
import { Button } from "@/components/ui/button";
import { useWorkspaces } from "@/query/workspace";

const WorkspacesPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const workspacesQuery = useWorkspaces();

  return (
    <>
      <HeaderSection
        title="Workspaces"
        description="Manage your design system workspaces"
        rightComponent={
          <Button onClick={() => setDialogOpen(true)}>
            <Plus />
            New Workspace
          </Button>
        }
      />

      <QueryHandling
        queryResult={workspacesQuery}
        renderLoading={
          <>
            <WorkspaceSkeletonCard />
            <WorkspaceSkeletonCard />
            <WorkspaceSkeletonCard />
          </>
        }
        renderEmpty={
          <WorkspaceEmptyState onCreateClick={() => setDialogOpen(true)} />
        }
        checkEmpty={({
          data: {
            data: { workspaces },
          },
        }) => workspaces?.length === 0}
        render={({
          data: {
            data: { workspaces },
          },
        }) => (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((workspace) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}

            <AddWorkspaceCard onClick={() => setDialogOpen(true)} />
          </div>
        )}
      />

      <CreateWorkspaceDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};

export default WorkspacesPage;
