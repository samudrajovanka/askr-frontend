import type { VERSION_BUMP_TYPES } from "@/constants/version";

export type VersionBumpType =
  (typeof VERSION_BUMP_TYPES)[keyof typeof VERSION_BUMP_TYPES];
