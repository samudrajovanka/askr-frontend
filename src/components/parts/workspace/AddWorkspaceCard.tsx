import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type AddWorkspaceCardProps = {
  onClick: () => void;
};

const AddWorkspaceCard = ({ onClick }: AddWorkspaceCardProps) => {
  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      <Card className="border-2 border-dashed border-border/40 bg-transparent hover:bg-primary/2 min-h-50 transition-all duration-300 hover:border-primary/30 ring-0">
        <CardContent className="flex flex-col flex-1 items-center justify-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-all duration-300 group-hover/card:bg-primary/10 group-hover/card:text-primary">
            <Plus />
          </div>
          <span className="typography-small font-medium text-muted-foreground transition-colors duration-200 group-hover/card:text-foreground">
            New Workspace
          </span>
        </CardContent>
      </Card>
    </button>
  );
};

export default AddWorkspaceCard;
