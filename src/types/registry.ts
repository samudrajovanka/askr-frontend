export type SafeRegistryConfig = {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  registryUrl: string;
  scope: string;
  packageSlug: string;
  packageName: string;
  createdById: string;
  updatedById: string | null;
};

export type GetRegistryConfig = SafeRegistryConfig & {
  isNeedResyncPackageName: boolean;
  hasRelease: boolean;
};

export type SyncPackageNameResult = {
  scope: string;
  packageSlug: string;
};
