import { FolderGit2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const ProjectEmptyState = ({
  onCreateClick,
}: {
  onCreateClick: () => void;
}) => (
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderGit2 className="text-primary" />
      </EmptyMedia>
      <EmptyTitle>No projects yet</EmptyTitle>
      <EmptyDescription>
        Create your first project to start managing design tokens for your team.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button
        size="lg"
        onClick={onCreateClick}
        className="gap-2 px-5 rounded-xl"
      >
        <Plus className="h-4 w-4" />
        Create your first Project
      </Button>
    </EmptyContent>
  </Empty>
);

export default ProjectEmptyState;
