"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import TokenPageTemplate from "@/components/parts/template/TokenPageTemplate";
import { usePermission } from "@/hooks/usePermission";
import type { Token } from "@/types/token";
import { tokenConfigMap } from "./token-config";

const TokenPage = () => {
  const { workspaceSlug, projectSlug, category } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
    category: string;
  }>();

  const config = tokenConfigMap[category];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const [extraValue, setExtraValue] = useState("hex");

  const deleteMutation = config.useDeleteToken(workspaceSlug, projectSlug);
  const { hasPermission } = usePermission(workspaceSlug);

  const primitiveQuery = config.useTokens(
    workspaceSlug,
    projectSlug,
    "primitive",
  );
  const semanticQuery = config.useTokens(
    workspaceSlug,
    projectSlug,
    "semantic",
  );

  if (!config) {
    return (
      <p className="p-10 text-center text-muted-foreground">
        Unknown token category: {category}
      </p>
    );
  }

  const canCreate = hasPermission("token:create");
  const canEdit = hasPermission("token:update");
  const canDelete = hasPermission("token:delete");

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

  const {
    Row,
    Drawer,
    ExtraControl,
    skeletonPreviewClassName,
    getRowExtraProps,
    ...meta
  } = config;

  return (
    <TokenPageTemplate
      title={meta.title}
      description={meta.description}
      tokenTypeLabel={meta.tokenTypeLabel}
      icon={meta.icon}
      queries={{
        primitive: primitiveQuery,
        semantic: semanticQuery,
      }}
      handleCreate={handleCreate}
      canCreate={canCreate}
      skeletonPreviewClassName={skeletonPreviewClassName}
      extraControls={
        ExtraControl ? (
          <ExtraControl value={extraValue} onChange={setExtraValue} />
        ) : undefined
      }
      emptyState={{
        title: meta.emptyTitle,
        message: meta.emptyMessage,
      }}
      renderRow={(token) => (
        <Row
          key={token.id}
          token={token}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canEdit={canEdit}
          canDelete={canDelete}
          {...getRowExtraProps?.(extraValue)}
        />
      )}
      renderDrawer={(activeTab) => (
        <Drawer
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

export default TokenPage;
