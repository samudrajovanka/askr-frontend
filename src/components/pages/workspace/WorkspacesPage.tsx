"use client";

import { Network, Plus } from "lucide-react";
import { useState } from "react";
import QueryHandling from "@/components/parts/query/QueryHandling";
import HeaderSection from "@/components/parts/template/HeaderSectionTemplate";
import AddWorkspaceCard from "@/components/parts/workspace/AddWorkspaceCard";
import CreateWorkspaceDialog from "@/components/parts/workspace/CreateWorkspaceDialog";
import WorkspaceCard from "@/components/parts/workspace/WorkspaceCard";
import WorkspaceSkeletonCard from "@/components/parts/workspace/WorkspaceSkeletonCard";
import { Button } from "@/components/ui/button";
import { BasicEmptyState } from "@/components/ui/empty";
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
          workspacesQuery.data?.data.data.workspaces.length ? (
            <Button onClick={() => setDialogOpen(true)}>
              <Plus />
              New Workspace
            </Button>
          ) : null
        }
      />

      <QueryHandling
        queryResult={workspacesQuery}
        renderLoading={
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <WorkspaceSkeletonCard />
            <WorkspaceSkeletonCard />
            <WorkspaceSkeletonCard />
          </div>
        }
        renderEmpty={
          <BasicEmptyState
            Icon={Network}
            title="No workspaces yet"
            message="Create your first workspace to start managing design design systems across your team and projects."
            actionPlus={{
              title: "Create your first Workspace",
              onClick: () => setDialogOpen(true),
            }}
          />
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
