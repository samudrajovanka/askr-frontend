import type { UseQueryResult } from "@tanstack/react-query";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import QueryHandling from "@/components/parts/query/QueryHandling";
import { Button } from "@/components/ui/button";
import type { SuccessResponseData } from "@/types/response";
import type { Token, TokenGroup } from "@/types/token";

type TokenReferenceSelectorProps = {
  queryResult: UseQueryResult<{
    data: SuccessResponseData<{ groups: TokenGroup[] }>;
  }>;
  value?: string;
  onChange: (id: string) => void;
  isInvalid?: boolean;
  renderLeftAddon?: (token: Token) => ReactNode;
  renderRightAddon?: (token: Token) => ReactNode;
  hideValue?: boolean;
};

const TokenReferenceSelector = ({
  queryResult,
  value,
  onChange,
  isInvalid,
  renderLeftAddon,
  renderRightAddon,
  hideValue,
}: TokenReferenceSelectorProps) => {
  return (
    <QueryHandling
      queryResult={queryResult}
      checkEmpty={({
        data: {
          data: { groups },
        },
      }) => !groups.length}
      renderEmpty={
        <div className="rounded-md border border-input px-3 py-2 typography-small text-muted-foreground">
          No primitive tokens available
        </div>
      }
      render={({
        data: {
          data: { groups },
        },
      }) => {
        const primitiveTokens = groups.flatMap((g) => g.tokens);
        return (
          <div
            className={`max-h-48 overflow-y-auto rounded-md border ${
              isInvalid ? "border-destructive" : "border-input"
            }`}
          >
            {primitiveTokens.map((token) => {
              const isSelected = value === token.id;
              return (
                <Button
                  key={token.id}
                  title={token.value}
                  onClick={() => onChange(token.id)}
                  className="w-full justify-between"
                  variant={isSelected ? "ghost-primary" : "ghost"}
                >
                  <div className="flex items-center gap-2">
                    {renderLeftAddon?.(token)}
                    <span className="font-mono">{token.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderRightAddon?.(token)}
                    {!hideValue && (
                      <span className="typography-xsmall text-muted-foreground font-mono">
                        {token.value}
                      </span>
                    )}
                    {isSelected && <Check className="size-3.5" />}
                  </div>
                </Button>
              );
            })}
          </div>
        );
      }}
    />
  );
};

export default TokenReferenceSelector;
