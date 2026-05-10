import { Button } from "@/components/ui/button";

const WorkspaceEmptyState = ({
  onCreateClick,
}: {
  onCreateClick: () => void;
}) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
    <div className="relative mb-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
        <svg
          className="h-10 w-10 text-primary/60"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
          />
        </svg>
      </div>
      <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </div>

    <h3 className="mb-2 text-xl font-semibold text-foreground">
      No workspaces yet
    </h3>
    <p className="mb-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
      Create your first workspace to start managing design tokens across your
      team and projects.
    </p>

    <Button size="lg" onClick={onCreateClick} className="rounded-xl gap-2 px-5">
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      Create your first Workspace
    </Button>
  </div>
);

export default WorkspaceEmptyState;
