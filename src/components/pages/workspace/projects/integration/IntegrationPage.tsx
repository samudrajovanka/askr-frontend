"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRegistryConfig } from "@/query/registry";

type Props = {
  workspaceSlug: string;
  projectSlug: string;
};

const IntegrationPage = ({ workspaceSlug, projectSlug }: Props) => {
  const { data, isLoading } = useRegistryConfig(workspaceSlug, projectSlug);
  const config = data?.data.data.config ?? null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!config) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Integration</CardTitle>
          <CardDescription>No registry configured yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href={`/w/${workspaceSlug}/p/${projectSlug}/settings/registry`}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Go to Settings → Registry to configure
          </Link>
        </CardContent>
      </Card>
    );
  }

  const registryHost = config.registryUrl.replace(/^https?:\/\//, "");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration</CardTitle>
        <CardDescription>
          Connect your project to the configured token package registry.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <div>
            <h2 className="text-base font-semibold">
              Step 1 — Configure .npmrc
            </h2>
          </div>
          <pre className="bg-muted overflow-x-auto rounded-md p-4 text-sm">
            <code>{`//${registryHost}:_authToken="YOUR_AUTH_TOKEN"\n@${config.scope}:registry=${config.registryUrl}`}</code>
          </pre>
        </section>

        <section className="flex flex-col gap-3">
          <div>
            <h2 className="text-base font-semibold">
              Step 2 — Install package
            </h2>
          </div>
          <pre className="bg-muted overflow-x-auto rounded-md p-4 text-sm">
            <code>{`npm install @${config.scope}/tokens`}</code>
          </pre>
        </section>

        <section className="flex flex-col gap-3">
          <div>
            <h2 className="text-base font-semibold">Step 3 — Import tokens</h2>
          </div>
          <pre className="bg-muted overflow-x-auto rounded-md p-4 text-sm">
            <code>{`import tokens from "@${config.scope}/tokens";`}</code>
          </pre>
        </section>
      </CardContent>
    </Card>
  );
};

export default IntegrationPage;
