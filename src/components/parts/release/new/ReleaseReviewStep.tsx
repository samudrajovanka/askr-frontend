import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { ReleaseDiff, ReleaseDiffToken } from "@/types/release";
import DiffBadge from "../../badge/DiffBadge";
import TableFactory, { type TableHeaderItem } from "../../table/TableFactory";

const TokenValueCell = ({ token }: { token: ReleaseDiffToken }) => (
  <div className="flex flex-col gap-1">
    <span className="font-mono typography-small">
      {token.value ?? token.reference ?? "—"}
    </span>
    <div className="flex gap-1">
      <Badge variant="secondary" className="text-xs">
        {token.category}
      </Badge>
      <Badge variant="outline" className="text-xs">
        {token.layer}
      </Badge>
    </div>
  </div>
);

type ReleaseReviewStepProps = {
  diff?: ReleaseDiff;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

const HEADERS: TableHeaderItem[] = [
  { title: "Token", className: "w-[30%]" },
  { title: "Before", className: "w-[28%]" },
  { title: "After", className: "w-[28%]" },
  { title: "Change", className: "w-[14%]" },
];

const ReleaseReviewStep = ({
  diff,
  isLoading,
  isError,
  onRetry,
}: ReleaseReviewStepProps) => {
  const tableData = diff
    ? [
        ...diff.added.map((token) => ({ type: "added" as const, token })),
        ...diff.modified.map((item) => ({
          type: "modified" as const,
          ...item,
        })),
        ...diff.deleted.map((token) => ({ type: "deleted" as const, token })),
      ]
    : [];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h2 className="typography-subheading">Review Changes</h2>
        <p className="typography-small text-muted-foreground">
          Review the token changes that will be included in this release.
        </p>
      </div>

      {!isLoading && !isError && diff && !diff.hasChanges && (
        <Alert variant="info">
          <InfoIcon />
          <AlertDescription>
            No token changes since the last release. You can still publish to
            bump the version.
          </AlertDescription>
        </Alert>
      )}

      <TableFactory
        headers={HEADERS}
        data={tableData}
        isLoading={isLoading}
        isError={isError}
        emptyText="No token changes to display."
        renderError={() => (
          <TableRow>
            <TableCell
              colSpan={4}
              className="py-8 text-center typography-small"
            >
              <div className="flex flex-col items-center gap-3">
                <span className="text-destructive">
                  Failed to load diff. Please try again.
                </span>
                <Button variant="outline" size="sm" onClick={onRetry}>
                  Retry
                </Button>
              </div>
            </TableCell>
          </TableRow>
        )}
        renderRow={(item, index) => {
          if (item.type === "added") {
            return (
              <TableRow key={`added-${item.token.name}-${index}`}>
                <TableCell className="font-mono typography-small font-medium">
                  {item.token.name}
                </TableCell>
                <TableCell className="text-muted-foreground">—</TableCell>
                <TableCell>
                  <TokenValueCell token={item.token} />
                </TableCell>
                <TableCell>
                  <DiffBadge type="added" />
                </TableCell>
              </TableRow>
            );
          }
          if (item.type === "modified") {
            return (
              <TableRow key={`modified-${item.after.name}-${index}`}>
                <TableCell className="font-mono typography-small font-medium">
                  {item.after.name}
                </TableCell>
                <TableCell>
                  <TokenValueCell token={item.before} />
                </TableCell>
                <TableCell>
                  <TokenValueCell token={item.after} />
                </TableCell>
                <TableCell>
                  <DiffBadge type="modified" />
                </TableCell>
              </TableRow>
            );
          }
          return (
            <TableRow key={`deleted-${item.token.name}-${index}`}>
              <TableCell className="font-mono typography-small font-medium">
                {item.token.name}
              </TableCell>
              <TableCell>
                <TokenValueCell token={item.token} />
              </TableCell>
              <TableCell className="text-muted-foreground">—</TableCell>
              <TableCell>
                <DiffBadge type="deleted" />
              </TableCell>
            </TableRow>
          );
        }}
      />
    </div>
  );
};

export default ReleaseReviewStep;
