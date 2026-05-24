"use client";

import { Bold } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import FontWeightTokenDrawer from "@/components/parts/token/font-weight/FontWeightTokenDrawer";
import TokenFontWeightRow from "@/components/parts/token/font-weight/TokenFontWeightRow";
import { useDeleteTokenFontWeight, useTokenFontWeights } from "@/query/token";
import type { Token } from "@/types/token";

const TokenFontWeightPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const deleteMutation = useDeleteTokenFontWeight(workspaceSlug, projectSlug);

  const primitiveQuery = useTokenFontWeights(
    workspaceSlug,
    projectSlug,
    "primitive",
  );
  const semanticQuery = useTokenFontWeights(
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
      title="Font Weight Tokens"
      description="Manage your project's font weight design tokens"
      tokenTypeLabel="font weight token"
      icon={Bold}
      queries={{
        primitive: primitiveQuery,
        semantic: semanticQuery,
      }}
      handleCreate={handleCreate}
      emptyState={{
        title: "No font weight tokens yet",
        message:
          "Start building your weight scale by adding primitive and semantic font weight tokens.",
      }}
      renderRow={(token) => (
        <TokenFontWeightRow
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      renderDrawer={(activeTab) => (
        <FontWeightTokenDrawer
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

export default TokenFontWeightPage;
