import { Button, type ButtonProps } from "@/components/ui/button";

type ActionSettingProps = {
  title: string;
  description?: string;
  action?: {
    label: string;
    loadingLabel?: string;
    variant?: ButtonProps["variant"];
    isLoading?: boolean;
    className?: string;
    onAction: () => Promise<void> | void;
  };
  renderAction?: React.ReactNode;
};

const ActionSetting = ({
  title,
  description,
  action,
  renderAction,
}: ActionSettingProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {renderAction ? (
        renderAction
      ) : (
        <Button
          variant={action?.variant ?? "outline-primary"}
          onClick={action?.onAction}
          disabled={action?.isLoading}
          className={action?.className}
        >
          {action?.isLoading && action?.loadingLabel
            ? action.loadingLabel
            : action?.label}
        </Button>
      )}
    </div>
  );
};

export default ActionSetting;
