import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import PreShiki from "@/components/ui/pre-shiki";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const components: MDXComponents = {
  h1: ({ children }) => <h1 className="typography-heading">{children}</h1>,
  h2: ({ children }) => <h2 className="typography-subheading">{children}</h2>,
  h3: ({ children }) => <h3 className="typography-subheading-2">{children}</h3>,
  p: ({ children }) => <p className="typography-regular mt-2">{children}</p>,
  ul: ({ children }) => (
    <ul className="typography-regular ml-6 list-disc space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="typography-regular ml-6 list-decimal space-y-1">
      {children}
    </ol>
  ),
  a: ({ children, href }) => (
    <Link href={href} className="link">
      {children}
    </Link>
  ),
  pre: ({ children, className }) => (
    <PreShiki className={className}>{children}</PreShiki>
  ),
  hr: () => <hr className="my-12" />,
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  table: ({ children }) => (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>{children}</Table>
    </div>
  ),
  thead: ({ children }) => (
    <TableHeader className="bg-secondary">{children}</TableHeader>
  ),
  tbody: ({ children }) => <TableBody>{children}</TableBody>,
  tr: ({ children }) => <TableRow>{children}</TableRow>,
  th: ({ children }) => <TableHead>{children}</TableHead>,
  td: ({ children }) => <TableCell>{children}</TableCell>,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
