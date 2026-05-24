import type { RELEASE_STATUSES } from "@/constants/release";
import type { Token } from "./token";
import type { VersionBumpType } from "./version";

export type ReleaseStatus =
  (typeof RELEASE_STATUSES)[keyof typeof RELEASE_STATUSES];

export type SafeRelease = {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  version: string;
  status: ReleaseStatus;
  error: string | null;
  notes: string | null;
  tokenCount: number | null;
  createdById: string;
};

export type ReleaseDiffToken = Pick<
  Token,
  | "name"
  | "category"
  | "layer"
  | "value"
  | "reference"
  | "referenceTokenId"
  | "status"
>;

export type ReleaseDiffItem = {
  before: ReleaseDiffToken;
  after: ReleaseDiffToken;
};

export type ReleaseDiff = {
  added: ReleaseDiffToken[];
  modified: ReleaseDiffItem[];
  deleted: ReleaseDiffToken[];
  currentVersion: string | null;
  suggestedBumpType: VersionBumpType;
  hasChanges: boolean;
};
