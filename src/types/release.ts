import type { releaseStatuses } from "@/constants/release";

export type ReleaseStatus =
  (typeof releaseStatuses)[keyof typeof releaseStatuses];

export type SafeRelease = {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  version: string;
  status: ReleaseStatus;
  error: string | null;
  tokenCount: number | null;
  createdById: string;
};
