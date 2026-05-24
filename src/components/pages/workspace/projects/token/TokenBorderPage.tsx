"use client";

import { Square } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import BorderTokenDrawer from "@/components/parts/token/border/BorderTokenDrawer";
import TokenBorderRow from "@/components/parts/token/border/TokenBorderRow";
import { useDeleteTokenBorder, useTokenBorders } from "@/query/token";
import type { Token } from "@/types/token";

const TokenBorderPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const deleteMutation = useDeleteTokenBorder(workspaceSlug, projectSlug);

  const primitiveQuery = useTokenBorders(
    workspaceSlug,
    projectSlug,
    "primitive",
  );
  const semanticQuery = useTokenBorders(workspaceSlug, projectSlug, "semantic");

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
      title="Border Tokens"
      description="Manage your project's border design tokens"
      tokenTypeLabel="border token"
      icon={Square}
      queries={{
        primitive: primitiveQuery,
        semantic: semanticQuery,
      }}
      handleCreate={handleCreate}
      emptyState={{
        title: "No border tokens yet",
        message:
          "Define your border styles with primitive and semantic tokens.",
      }}
      renderRow={(token) => (
        <TokenBorderRow
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      renderDrawer={(activeTab) => (
        <BorderTokenDrawer
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

export default TokenBorderPage;
