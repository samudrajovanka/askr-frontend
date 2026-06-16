"use client";

import ActionSetting from "@/components/parts/settings/ActionSetting";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type DeleteActionProps = {
  title: string;
  description?: string;
  buttonLabel: string;
  buttonLoadingLabel?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  confirmLabel?: string;
  isLoading?: boolean;
  onAction: () => Promise<void> | void;
};

const DeleteAction = ({
  title,
  description = "Once deleted, it will be gone forever. Please be certain.",
  buttonLabel,
  buttonLoadingLabel = "Deleting...",
  dialogTitle = "Are you absolutely sure?",
  dialogDescription = "This action cannot be undone.",
  confirmLabel = "Delete",
  isLoading = false,
  onAction,
}: DeleteActionProps) => {
  return (
    <ActionSetting
      title={title}
      description={description}
      renderAction={
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button variant="destructive" disabled={isLoading}>
                {isLoading ? buttonLoadingLabel : buttonLabel}
              </Button>
            }
          />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {dialogDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={isLoading}
                onClick={async (e) => {
                  e.preventDefault();
                  await onAction();
                }}
              >
                {isLoading ? buttonLoadingLabel : confirmLabel}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
    />
  );
};

export default DeleteAction;
