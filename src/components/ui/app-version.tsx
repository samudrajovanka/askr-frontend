import { cn } from "@/lib/utils";
import packageJson from "../../../package.json";
import { Badge } from "./badge";

type AppVersionProps = {
  className?: string;
};

const versionBadge = process.env.NEXT_PUBLIC_VERSION_BADGE;

const AppVersion = ({ className }: AppVersionProps) => {
  return (
    <span
      className={cn(
        "typography-small text-muted-foreground font-mono flex gap-2 justify-center",
        className,
      )}
    >
      v{packageJson.version}
      {versionBadge && <Badge variant="outline">{versionBadge}</Badge>}
    </span>
  );
};

export default AppVersion;
