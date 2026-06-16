/** biome-ignore-all lint/suspicious/noArrayIndexKey: use index key */
import type { UseQueryResult } from "@tanstack/react-query";
import { type LucideIcon, Plus, Search } from "lucide-react";
import { type ReactNode, useState } from "react";
import QueryHandling from "@/components/parts/query/QueryHandling";
import HeaderSectionTemplate from "@/components/parts/template/HeaderSectionTemplate";
import TokenSkeletonRow from "@/components/parts/token/TokenSkeletonRow";
import { Button } from "@/components/ui/button";
import { SimpleCollapsible } from "@/components/ui/collapsible";
import { BasicEmptyState } from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TOKEN_LAYERS, tokenLayerOptions } from "@/constants/token";
import type { SuccessResponseData } from "@/types/response";
import type { Token, TokenGroup, TokenLayer } from "@/types/token";

type TokenPageTemplateProps = {
  title: string;
  description: string;
  tokenTypeLabel: string;
  icon: LucideIcon;
  queries: {
    primitive: UseQueryResult<{
      data: SuccessResponseData<{ groups: TokenGroup[] }>;
    }>;
    semantic: UseQueryResult<{
      data: SuccessResponseData<{ groups: TokenGroup[] }>;
    }>;
  };
  handleCreate: () => void;
  canCreate?: boolean;
  SkeletonRow?: React.ComponentType;
  skeletonPreviewClassName?: string;
  renderRow: (token: Token) => ReactNode;
  emptyState?: {
    title?: string;
    message?: string;
  };
  extraControls?: ReactNode;
  renderDrawer?: (activeTab: TokenLayer) => ReactNode;
};

const TokenPageTemplate = ({
  title,
  description,
  tokenTypeLabel,
  icon,
  queries,
  handleCreate,
  canCreate = true,
  SkeletonRow,
  skeletonPreviewClassName,
  renderRow,
  emptyState,
  extraControls,
  renderDrawer,
}: TokenPageTemplateProps) => {
  const [activeTab, setActiveTab] = useState<TokenLayer>(
    TOKEN_LAYERS.PRIMITIVE,
  );
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const tokensQuery = queries[activeTab];

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
      <HeaderSectionTemplate
        title={title}
        description={description}
        rightComponent={
          hasTokens && canCreate ? (
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

          {extraControls}
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
              {Array.from({ length: 4 }).map((_, idx) => {
                if (SkeletonRow) {
                  return <SkeletonRow key={idx} />;
                }
                return (
                  <TokenSkeletonRow
                    key={idx}
                    previewClassName={skeletonPreviewClassName}
                  />
                );
              })}
            </div>
          }
          renderEmpty={
            <BasicEmptyState
              Icon={icon}
              title={emptyState?.title || `No ${tokenTypeLabel}s yet`}
              message={
                emptyState?.message ||
                `Start building your system by adding primitive and semantic ${tokenTypeLabel}s.`
              }
              actionPlus={
                canCreate
                  ? {
                      title: `Add your first ${tokenTypeLabel}`,
                      onClick: handleCreate,
                    }
                  : undefined
              }
            />
          }
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
              <div className="flex flex-col gap-4">
                {filteredGroups.map((group) => {
                  if (group.tokens.length > 1) {
                    const isOpen = !collapsed.has(group.group);

                    return (
                      <SimpleCollapsible
                        key={group.group}
                        open={isOpen}
                        onOpenChange={(open) => toggleGroup(group.group, open)}
                        title={group.group}
                      >
                        {group.tokens.map((token) => renderRow(token))}
                      </SimpleCollapsible>
                    );
                  }

                  return (
                    <div
                      key={group.group}
                      className="rounded-xl border border-border overflow-hidden"
                    >
                      {renderRow(group.tokens[0])}
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
      </div>

      {renderDrawer?.(activeTab)}
    </>
  );
};

export default TokenPageTemplate;
