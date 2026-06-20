import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BasicEmptyState } from "@/components/ui/empty";
import NavbarHomepage from "../parts/navbar/NavbarHomepage";
import Code from "../ui/code";

type NotFoundLayoutProps = {
  title?: string;
  description?: string;
  pathname?: string;
  renderNavbar?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
};

const NotFoundLayout = ({
  title = "Not found",
  description,
  pathname,
  renderNavbar,
  backHref = "/workspaces",
  backLabel = "Back to Dashboard",
}: NotFoundLayoutProps) => {
  return (
    <div className="min-h-dvh">
      {renderNavbar ? renderNavbar : <NavbarHomepage />}

      <div className="flex flex-1 items-center justify-center p-6 pt-20">
        <BasicEmptyState
          Icon={FileQuestion}
          title={title}
          message={
            description ?? (
              <div className="flex flex-col gap-0.5 items-center justify-center">
                <span className="text-center">
                  The resource you're looking for doesn't exist or <br /> has
                  been removed
                </span>
                <Code className="self-auto">{pathname}</Code>
              </div>
            )
          }
          renderContent={
            <Link href={backHref} className={buttonVariants()}>
              {backLabel}
            </Link>
          }
        />
      </div>
    </div>
  );
};

export default NotFoundLayout;
