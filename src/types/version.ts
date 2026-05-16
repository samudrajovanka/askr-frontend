import type { versionBumpTypes } from "@/constants/version";

export type VersionBumpType =
  (typeof versionBumpTypes)[keyof typeof versionBumpTypes];
