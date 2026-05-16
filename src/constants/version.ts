export const versionBumpTypes = {
  MAJOR: "major",
  MINOR: "minor",
  PATCH: "patch",
} as const;

export const versionBumpTypeLabels = {
  [versionBumpTypes.MAJOR]: "Major",
  [versionBumpTypes.MINOR]: "Minor",
  [versionBumpTypes.PATCH]: "Patch",
} as const;

export const versionBumpTypeDescriptions = {
  [versionBumpTypes.MAJOR]: "Breaking — tokens deleted or renamed",
  [versionBumpTypes.MINOR]: "Additive — new tokens added",
  [versionBumpTypes.PATCH]: "Preserving — only values changed",
} as const;

export const defaultVersion = "1.0.0";
