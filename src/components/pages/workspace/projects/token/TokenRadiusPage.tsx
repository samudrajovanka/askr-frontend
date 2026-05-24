"use client";

import { CornerUpLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import RadiusTokenDrawer from "@/components/parts/token/radius/RadiusTokenDrawer";
import TokenRadiusRow from "@/components/parts/token/radius/TokenRadiusRow";
import { useDeleteTokenRadius, useTokenRadii } from "@/query/token";
import type { Token } from "@/types/token";

const TokenRadiusPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const deleteMutation = useDeleteTokenRadius(workspaceSlug, projectSlug);

  const primitiveQuery = useTokenRadii(workspaceSlug, projectSlug, "primitive");
  const semanticQuery = useTokenRadii(workspaceSlug, projectSlug, "semantic");

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
      title="Radius Tokens"
      description="Manage your project's border radius design tokens"
      tokenTypeLabel="radius token"
      icon={CornerUpLeft}
      queries={{
        primitive: primitiveQuery,
        semantic: semanticQuery,
      }}
      handleCreate={handleCreate}
      emptyState={{
        title: "No radius tokens yet",
        message:
          "Define your border radius scale with primitive and semantic tokens.",
      }}
      renderRow={(token) => (
        <TokenRadiusRow
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      renderDrawer={(activeTab) => (
        <RadiusTokenDrawer
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

export default TokenRadiusPage;
