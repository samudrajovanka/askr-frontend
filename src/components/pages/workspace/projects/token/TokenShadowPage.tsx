"use client";

import { Layers } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import ShadowTokenDrawer from "@/components/parts/token/shadow/ShadowTokenDrawer";
import TokenShadowRow from "@/components/parts/token/shadow/TokenShadowRow";
import { hasPermission } from "@/lib/permissions";
import { useDeleteTokenShadow, useTokenShadows } from "@/query/token";
import { useWorkspace } from "@/query/workspace";
import type { Token } from "@/types/token";

const TokenShadowPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const deleteMutation = useDeleteTokenShadow(workspaceSlug, projectSlug);
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

  const primitiveQuery = useTokenShadows(
    workspaceSlug,
    projectSlug,
    "primitive",
  );
  const semanticQuery = useTokenShadows(workspaceSlug, projectSlug, "semantic");

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
      title="Shadow Tokens"
      description="Manage your project's shadow design tokens"
      tokenTypeLabel="shadow token"
      icon={Layers}
      queries={{
        primitive: primitiveQuery,
        semantic: semanticQuery,
      }}
      handleCreate={handleCreate}
      canCreate={canCreate}
      emptyState={{
        title: "No shadow tokens yet",
        message:
          "Start building your shadow system by adding primitive and semantic shadow tokens.",
      }}
      renderRow={(token) => (
        <TokenShadowRow
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      )}
      renderDrawer={(activeTab) => (
        <ShadowTokenDrawer
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

export default TokenShadowPage;
