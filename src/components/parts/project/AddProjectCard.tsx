import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type AddProjectCardProps = {
  onClick: () => void;
};

const AddProjectCard = ({ onClick }: AddProjectCardProps) => {
  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      <Card className="border-2 border-dashed border-border/40 bg-transparent hover:bg-primary/2 min-h-44 transition-all duration-300 hover:border-primary/30 ring-0">
        <CardContent className="flex flex-col flex-1 items-center justify-center gap-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-all duration-300 group-hover/card:bg-primary/10 group-hover/card:text-primary">
            <Plus />
          </div>
          <span className="typography-small font-medium text-muted-foreground transition-colors duration-200 group-hover/card:text-foreground">
            New Project
          </span>
        </CardContent>
      </Card>
    </button>
  );
};

export default AddProjectCard;
