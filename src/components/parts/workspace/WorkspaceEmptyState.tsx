import { Network, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const WorkspaceEmptyState = ({
  onCreateClick,
}: {
  onCreateClick: () => void;
}) => (
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Network className="text-primary" />
      </EmptyMedia>
      <EmptyTitle>No workspaces yet</EmptyTitle>
      <EmptyDescription>
        Create your first workspace to start managing design tokens across your
        team and projects.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button
        size="lg"
        onClick={onCreateClick}
        className="gap-2 px-5 rounded-xl"
      >
        <Plus className="h-4 w-4" />
        Create your first Workspace
      </Button>
    </EmptyContent>
  </Empty>
);

export default WorkspaceEmptyState;
