"use client";

import { Ruler } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import SpacingTokenDrawer from "@/components/parts/token/spacing/SpacingTokenDrawer";
import TokenSpacingRow from "@/components/parts/token/spacing/TokenSpacingRow";
import { useDeleteTokenSpacing, useTokenSpacings } from "@/query/token";
import type { Token } from "@/types/token";

const TokenSpacingPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const deleteMutation = useDeleteTokenSpacing(workspaceSlug, projectSlug);

  const primitiveQuery = useTokenSpacings(
    workspaceSlug,
    projectSlug,
    "primitive",
  );
  const semanticQuery = useTokenSpacings(
    workspaceSlug,
    projectSlug,
    "semantic",
  );

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
      title="Spacing Tokens"
      description="Manage your project's spacing design tokens"
      tokenTypeLabel="spacing token"
      icon={Ruler}
      queries={{
        primitive: primitiveQuery,
        semantic: semanticQuery,
      }}
      handleCreate={handleCreate}
      emptyState={{
        title: "No spacing tokens yet",
        message:
          "Start building your spacing system by adding primitive and semantic spacing tokens.",
      }}
      renderRow={(token) => (
        <TokenSpacingRow
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      renderDrawer={(activeTab) => (
        <SpacingTokenDrawer
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

export default TokenSpacingPage;
