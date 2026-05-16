import { Plus, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const ReleaseEmptyState = ({
  onCreateClick,
}: {
  onCreateClick: () => void;
}) => (
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Rocket className="text-primary" />
      </EmptyMedia>
      <EmptyTitle>No releases yet</EmptyTitle>
      <EmptyDescription>
        Publish your first release to start versioning your design tokens.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button
        size="lg"
        onClick={onCreateClick}
        className="gap-2 px-5 rounded-xl"
      >
        <Plus className="h-4 w-4" />
        Create your first release
      </Button>
    </EmptyContent>
  </Empty>
);

export default ReleaseEmptyState;
