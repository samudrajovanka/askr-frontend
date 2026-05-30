"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Token } from "@/types/token";

type Props = {
  token: Token;
  onEdit: (token: Token) => void;
  onDelete: (token: Token) => void;
  canEdit?: boolean;
  canDelete?: boolean;
};

const TokenActions = ({
  token,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}: Props) => {
  const showMenu = canEdit || canDelete;
  if (!showMenu) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1.5 rounded-md hover:bg-muted transition-colors">
        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {canEdit && (
          <DropdownMenuItem onClick={() => onEdit(token)}>
            <Pencil />
            Edit
          </DropdownMenuItem>
        )}
        {canEdit && canDelete && <DropdownMenuSeparator />}
        {canDelete && (
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete(token)}
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TokenActions;
