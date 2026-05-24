"use client";

import { Type } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import TextTokenDrawer from "@/components/parts/token/text/TextTokenDrawer";
import TokenTextRow from "@/components/parts/token/text/TokenTextRow";
import { useDeleteTokenText, useTokenTexts } from "@/query/token";
import type { Token } from "@/types/token";

const TokenTextPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const deleteMutation = useDeleteTokenText(workspaceSlug, projectSlug);

  const primitiveQuery = useTokenTexts(workspaceSlug, projectSlug, "primitive");
  const semanticQuery = useTokenTexts(workspaceSlug, projectSlug, "semantic");

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
      title="Text Tokens"
      description="Manage your project's text size design tokens"
      tokenTypeLabel="text token"
      icon={Type}
      queries={{
        primitive: primitiveQuery,
        semantic: semanticQuery,
      }}
      handleCreate={handleCreate}
      emptyState={{
        title: "No text tokens yet",
        message:
          "Start building your type scale by adding primitive and semantic text size tokens.",
      }}
      renderRow={(token) => (
        <TokenTextRow
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      renderDrawer={(activeTab) => (
        <TextTokenDrawer
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

export default TokenTextPage;
