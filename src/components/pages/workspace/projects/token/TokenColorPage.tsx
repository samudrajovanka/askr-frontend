"use client";

import { Palette } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import ColorTokenDrawer from "@/components/parts/token/color/ColorTokenDrawer";
import TokenColorFormatSelector from "@/components/parts/token/color/TokenColorFormatSelector";
import TokenColorRow from "@/components/parts/token/color/TokenColorRow";
import type { ColorFormat } from "@/lib/helpers/color";
import { hasPermission } from "@/lib/permissions";
import { useDeleteTokenColor, useTokenColors } from "@/query/token";
import { useWorkspace } from "@/query/workspace";
import type { Token } from "@/types/token";

const TokenColorPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");
  const deleteMutation = useDeleteTokenColor(workspaceSlug, projectSlug);
  const workspaceQuery = useWorkspace(workspaceSlug);

  const canCreate = hasPermission(
    workspaceQuery.data?.data.data.workspace.role,
    "token:create",
  );
  const canEdit = hasPermission(
    workspaceQuery.data?.data.data.workspace.role,
    "token:edit",
  );
  const canDelete = hasPermission(
    workspaceQuery.data?.data.data.workspace.role,
    "token:delete",
  );

  const primitiveQuery = useTokenColors(
    workspaceSlug,
    projectSlug,
    "primitive",
  );
  const semanticQuery = useTokenColors(workspaceSlug, projectSlug, "semantic");

  const handleCreate = () => {
    setEditToken(null);
    setDrawerOpen(true);
  };

  const handleEdit = (token: Token) => {
    setEditToken(token);
    setDrawerOpen(true);
  };

  const handleDelete = async (token: Token) => {
    await deleteMutation.mutateAsync(token.id);
    toast.success(`"${token.name}" deleted`);
  };

  const handleDrawerChange = (open: boolean) => {
    setDrawerOpen(open);
    if (!open) setEditToken(null);
  };

  return (
    <TokenPageTemplate
      title="Color Tokens"
      description="Manage your project's color design tokens"
      tokenTypeLabel="color token"
      icon={Palette}
      queries={{
        primitive: primitiveQuery,
        semantic: semanticQuery,
      }}
      handleCreate={handleCreate}
      canCreate={canCreate}
      skeletonPreviewClassName="h-8 w-8 rounded-md"
      extraControls={
        <TokenColorFormatSelector
          value={colorFormat}
          onChange={setColorFormat}
        />
      }
      emptyState={{
        title: "No color tokens yet",
        message:
          "Start building your color system by adding primitive and semantic color tokens.",
      }}
      renderRow={(token) => (
        <TokenColorRow
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
          colorFormat={colorFormat}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      )}
      renderDrawer={(activeTab) => (
        <ColorTokenDrawer
          open={drawerOpen}
          onOpenChange={handleDrawerChange}
          workspaceSlug={workspaceSlug}
          projectSlug={projectSlug}
          editToken={editToken}
          defaultLayer={activeTab}
        />
      )}
    />
  );
};

export default TokenColorPage;
