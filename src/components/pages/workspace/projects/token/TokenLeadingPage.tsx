"use client";

import { AlignJustify } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import LeadingTokenDrawer from "@/components/parts/token/leading/LeadingTokenDrawer";
import TokenLeadingRow from "@/components/parts/token/leading/TokenLeadingRow";
import { hasPermission } from "@/lib/permissions";
import { useDeleteTokenLeading, useTokenLeadings } from "@/query/token";
import { useWorkspace } from "@/query/workspace";
import type { Token } from "@/types/token";

const TokenLeadingPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const deleteMutation = useDeleteTokenLeading(workspaceSlug, projectSlug);
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

  const primitiveQuery = useTokenLeadings(
    workspaceSlug,
    projectSlug,
    "primitive",
  );
  const semanticQuery = useTokenLeadings(
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
      title="Leading Tokens"
      description="Manage your project's line height design tokens"
      tokenTypeLabel="leading token"
      icon={AlignJustify}
      queries={{
        primitive: primitiveQuery,
        semantic: semanticQuery,
      }}
      handleCreate={handleCreate}
      canCreate={canCreate}
      emptyState={{
        title: "No leading tokens yet",
        message:
          "Start building your leading system by adding primitive and semantic leading tokens.",
      }}
      renderRow={(token) => (
        <TokenLeadingRow
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      )}
      renderDrawer={(activeTab) => (
        <LeadingTokenDrawer
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

export default TokenLeadingPage;
