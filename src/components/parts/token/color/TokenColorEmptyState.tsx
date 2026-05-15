import { Palette, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const TokenColorEmptyState = ({
  onCreateClick,
}: {
  onCreateClick: () => void;
}) => (
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Palette className="text-primary" />
      </EmptyMedia>
      <EmptyTitle>No color tokens yet</EmptyTitle>
      <EmptyDescription>
        Start building your color system by adding primitive and semantic color
        tokens.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button
        size="lg"
        onClick={onCreateClick}
        className="gap-2 px-5 rounded-xl"
      >
        <Plus className="h-4 w-4" />
        Add your first color token
      </Button>
    </EmptyContent>
  </Empty>
);

export default TokenColorEmptyState;
