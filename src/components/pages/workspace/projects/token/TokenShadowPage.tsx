"use client";

import { Layers } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import ShadowTokenDrawer from "@/components/parts/token/shadow/ShadowTokenDrawer";
import TokenShadowRow from "@/components/parts/token/shadow/TokenShadowRow";
import { useDeleteTokenShadow, useTokenShadows } from "@/query/token";
import type { Token } from "@/types/token";

const TokenShadowPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const deleteMutation = useDeleteTokenShadow(workspaceSlug, projectSlug);

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
      emptyState={{
        title: "No shadow tokens yet",
        message: "Build your elevation system by adding shadow tokens.",
      }}
      renderRow={(token) => (
        <TokenShadowRow
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
