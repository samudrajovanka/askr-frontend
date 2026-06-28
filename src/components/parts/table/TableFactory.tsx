/** biome-ignore-all lint/suspicious/noArrayIndexKey: use index for key */

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type TableHeaderItem = {
  title: string;
  className?: string;
};

export type TableFactoryProps<T> = {
  headers: TableHeaderItem[];
  data: T[];
  isLoading?: boolean;
  isError?: boolean;
  renderRow: (item: T, index: number) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: () => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  emptyText?: string;
  errorText?: string;
  className?: string;
};

const TableFactory = <T,>({
  headers,
  data,
  isLoading,
  isError,
  renderRow,
  renderLoading,
  renderError,
  renderEmpty,
  emptyText = "No data found",
  errorText = "Something went wrong. Please try again.",
  className,
}: TableFactoryProps<T>) => {
  const colSpan = headers.length;

  return (
    <div className={cn("rounded-lg border bg-card overflow-hidden", className)}>
      <Table>
        <TableHeader className="bg-secondary">
          <TableRow>
            {headers.map((header, i) => (
              <TableHead key={i} className={header.className}>
                {header.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            renderLoading ? (
              renderLoading()
            ) : (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {headers.map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )
          ) : isError ? (
            renderError ? (
              renderError()
            ) : (
              <TableRow>
                <TableCell
                  colSpan={colSpan}
                  className="py-10 text-center typography-small text-destructive"
                >
                  {errorText}
                </TableCell>
              </TableRow>
            )
          ) : data.length === 0 ? (
            renderEmpty ? (
              renderEmpty()
            ) : (
              <TableRow>
                <TableCell
                  colSpan={colSpan}
                  className="py-10 text-center typography-small text-muted-foreground"
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            )
          ) : (
            data.map((item, index) => renderRow(item, index))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableFactory;
