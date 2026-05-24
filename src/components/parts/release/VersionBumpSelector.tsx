import {
  VERSION_BUMP_TYPES,
  versionBumpTypeDescriptions,
  versionBumpTypeLabels,
} from "@/constants/version";
import { bumpVersion } from "@/lib/helpers/version";
import { cn } from "@/lib/utils";
import type { VersionBumpType } from "@/types/version";

interface VersionBumpSelectorProps {
  activeBumpType: VersionBumpType;
  onBumpTypeChange: (type: VersionBumpType) => void;
  currentVersion: string | null;
  className?: string;
}

const VersionBumpSelector = ({
  activeBumpType,
  onBumpTypeChange,
  currentVersion,
  className,
}: VersionBumpSelectorProps) => {
  return (
    <div className={cn("grid grid-cols-3 gap-3", className)}>
      {Object.values(VERSION_BUMP_TYPES).map((type) => {
        const isSelected = activeBumpType === type;
        const preview = bumpVersion(currentVersion, type);

        return (
          <button
            key={type}
            type="button"
            onClick={() => onBumpTypeChange(type)}
            className={cn(
              "flex flex-col gap-2 rounded-lg border p-4 text-left transition-colors cursor-pointer",
              isSelected
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border hover:border-primary/50 hover:bg-muted/50",
            )}
          >
            <div className="flex items-start justify-between gap-1">
              <span className="typography-small font-semibold">
                {versionBumpTypeLabels[type]}
              </span>
            </div>
            <p className="typography-small text-muted-foreground">
              {versionBumpTypeDescriptions[type]}
            </p>
            <p className="font-mono text-sm font-medium">v{preview}</p>
          </button>
        );
      })}
    </div>
  );
};

export default VersionBumpSelector;
