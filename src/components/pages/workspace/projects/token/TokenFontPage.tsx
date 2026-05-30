"use client";

import { CaseSensitive } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import FontTokenDrawer from "@/components/parts/token/font/FontTokenDrawer";
import TokenFontRow from "@/components/parts/token/font/TokenFontRow";
import { hasPermission } from "@/lib/permissions";
import { useDeleteTokenFont, useTokenFonts } from "@/query/token";
import { useWorkspace } from "@/query/workspace";
import type { Token } from "@/types/token";

const TokenFontPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const deleteMutation = useDeleteTokenFont(workspaceSlug, projectSlug);
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

  const primitiveQuery = useTokenFonts(workspaceSlug, projectSlug, "primitive");
  const semanticQuery = useTokenFonts(workspaceSlug, projectSlug, "semantic");

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
      title="Font Tokens"
      description="Manage your project's font family design tokens"
      tokenTypeLabel="font token"
      icon={CaseSensitive}
      queries={{
        primitive: primitiveQuery,
        semantic: semanticQuery,
      }}
      handleCreate={handleCreate}
      canCreate={canCreate}
      emptyState={{
        title: "No font tokens yet",
        message:
          "Start building your font system by adding primitive and semantic font tokens.",
      }}
      renderRow={(token) => (
        <TokenFontRow
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      )}
      renderDrawer={(activeTab) => (
        <FontTokenDrawer
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

export default TokenFontPage;
