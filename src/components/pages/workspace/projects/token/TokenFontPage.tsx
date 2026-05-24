"use client";

import { CaseSensitive } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import FontTokenDrawer from "@/components/parts/token/font/FontTokenDrawer";
import TokenFontRow from "@/components/parts/token/font/TokenFontRow";
import { useDeleteTokenFont, useTokenFonts } from "@/query/token";
import type { Token } from "@/types/token";

const TokenFontPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const deleteMutation = useDeleteTokenFont(workspaceSlug, projectSlug);

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
      emptyState={{
        title: "No font tokens yet",
        message:
          "Start building your font system by adding primitive and semantic font family tokens.",
      }}
      renderRow={(token) => (
        <TokenFontRow
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
