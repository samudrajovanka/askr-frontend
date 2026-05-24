"use client";

import { Space } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import TokenTrackingRow from "@/components/parts/token/tracking/TokenTrackingRow";
import TrackingTokenDrawer from "@/components/parts/token/tracking/TrackingTokenDrawer";
import { useDeleteTokenTracking, useTokenTrackings } from "@/query/token";
import type { Token } from "@/types/token";

const TokenTrackingPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const deleteMutation = useDeleteTokenTracking(workspaceSlug, projectSlug);

  const primitiveQuery = useTokenTrackings(
    workspaceSlug,
    projectSlug,
    "primitive",
  );
  const semanticQuery = useTokenTrackings(
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
      title="Tracking Tokens"
      description="Manage your project's letter spacing design tokens"
      tokenTypeLabel="tracking token"
      icon={Space}
      queries={{
        primitive: primitiveQuery,
        semantic: semanticQuery,
      }}
      handleCreate={handleCreate}
      emptyState={{
        title: "No tracking tokens yet",
        message:
          "Start building your letter spacing system by adding primitive and semantic tracking tokens.",
      }}
      renderRow={(token) => (
        <TokenTrackingRow
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      renderDrawer={(activeTab) => (
        <TrackingTokenDrawer
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

export default TokenTrackingPage;
