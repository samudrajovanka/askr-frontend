"use client";

import { Plus, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import QueryHandling from "@/components/parts/query/QueryHandling";
import HeaderSection from "@/components/parts/section/HeaderSection";
import ColorTokenDrawer from "@/components/parts/token/color/ColorTokenDrawer";
import TokenColorEmptyState from "@/components/parts/token/color/TokenColorEmptyState";
import TokenColorFormatSelector from "@/components/parts/token/color/TokenColorFormatSelector";
import TokenColorRow from "@/components/parts/token/color/TokenColorRow";
import TokenColorSkeletonRow from "@/components/parts/token/color/TokenColorSkeletonRow";
import { Button } from "@/components/ui/button";
import { SimpleCollapsible } from "@/components/ui/collapsible";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tokenLayerOptions, tokenLayers } from "@/constants/token";
import type { ColorFormat } from "@/lib/helpers/color";
import { useDeleteTokenColor, useTokenColors } from "@/query/token";
import type { Token, TokenLayer } from "@/types/token";

const TokenColorPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editToken, setEditToken] = useState<Token | null>(null);
  const [activeTab, setActiveTab] = useState<TokenLayer>(tokenLayers.PRIMITIVE);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");
  const [searchQuery, setSearchQuery] = useState("");
  const tokensQuery = useTokenColors(workspaceSlug, projectSlug, activeTab);
  const deleteMutation = useDeleteTokenColor(workspaceSlug, projectSlug);

  const handleCreate = () => {
    setEditToken(null);
    setDrawerOpen(true);
  };

  const handleEdit = (token: Token) => {
    console.log("token", token);
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

  const toggleGroup = (group: string, open: boolean) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (open) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  const hasTokens = !!tokensQuery.data?.data.data.groups.length;

  return (
    <>
      <HeaderSection
        title="Color Tokens"
        description="Manage your project's color design tokens"
        rightComponent={
          hasTokens ? (
            <Button onClick={handleCreate}>
              <Plus className="size-4" />
              New Token
            </Button>
          ) : null
        }
      />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <Tabs
            value={activeTab}
            onValueChange={(v) => v && setActiveTab(v as TokenLayer)}
          >
            <TabsList>
              {tokenLayerOptions.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <TokenColorFormatSelector
            value={colorFormat}
            onChange={setColorFormat}
          />
        </div>

        {hasTokens && (
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        )}

        <QueryHandling
          queryResult={tokensQuery}
          renderLoading={
            <div className="rounded-xl border border-border/40 overflow-hidden">
              {(["s1", "s2", "s3", "s4"] as const).map((key) => (
                <TokenColorSkeletonRow key={key} />
              ))}
            </div>
          }
          renderEmpty={<TokenColorEmptyState onCreateClick={handleCreate} />}
          checkEmpty={({
            data: {
              data: { groups },
            },
          }) => groups.length === 0}
          render={({
            data: {
              data: { groups },
            },
          }) => {
            const filteredGroups = searchQuery
              ? groups
                  .map((group) => ({
                    ...group,
                    tokens: group.tokens.filter((token) =>
                      token.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                    ),
                  }))
                  .filter((group) => group.tokens.length > 0)
              : groups;

            if (filteredGroups.length === 0) {
              return (
                <div className="rounded-xl border border-dashed p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No tokens matching{" "}
                    <span className="font-mono font-medium text-foreground">
                      &quot;{searchQuery}&quot;
                    </span>
                  </p>
                </div>
              );
            }

            return (
              <div className="flex flex-col gap-2">
                {filteredGroups.map((group) => {
                  const isOpen = !collapsed.has(group.group);

                  return (
                    <SimpleCollapsible
                      key={group.group}
                      open={isOpen}
                      onOpenChange={(open) => toggleGroup(group.group, open)}
                      title={group.group}
                    >
                      {group.tokens.map((token) => (
                        <TokenColorRow
                          key={token.id}
                          token={token}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          colorFormat={colorFormat}
                        />
                      ))}
                    </SimpleCollapsible>
                  );
                })}
              </div>
            );
          }}
        />
      </div>

      <ColorTokenDrawer
        open={drawerOpen}
        onOpenChange={handleDrawerChange}
        workspaceSlug={workspaceSlug}
        projectSlug={projectSlug}
        editToken={editToken}
        defaultLayer={activeTab}
      />
    </>
  );
};

export default TokenColorPage;
