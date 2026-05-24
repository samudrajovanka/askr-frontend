export const VERSION_BUMP_TYPES = {
  MAJOR: "major",
  MINOR: "minor",
  PATCH: "patch",
} as const;

export const versionBumpTypeLabels = {
  [VERSION_BUMP_TYPES.MAJOR]: "Major",
  [VERSION_BUMP_TYPES.MINOR]: "Minor",
  [VERSION_BUMP_TYPES.PATCH]: "Patch",
} as const;

export const versionBumpTypeDescriptions = {
  [VERSION_BUMP_TYPES.MAJOR]: "Breaking — tokens deleted or renamed",
  [VERSION_BUMP_TYPES.MINOR]: "Additive — new tokens added",
  [VERSION_BUMP_TYPES.PATCH]: "Preserving — only values changed",
} as const;

export const DEFAULT_VERSION = "1.0.0";
