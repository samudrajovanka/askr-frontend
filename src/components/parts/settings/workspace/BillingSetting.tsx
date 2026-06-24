"use client";

import { Folder, History, Users } from "lucide-react";

import MetricProgres from "@/components/parts/metric/Progress";
import MetricStatic from "@/components/parts/metric/Static";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { WorkspaceUsage } from "@/types/workspace";

type BillingSettingProps = {
  usage: WorkspaceUsage;
};

const BillingSetting = ({ usage }: BillingSettingProps) => {
  const projectEntries = Object.entries(usage.projectsUsage ?? {});

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Workspace Usage</CardTitle>
          <CardDescription>
            Track your workspace resource consumption against the free tier
            limits.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <MetricProgres
            icon={Folder}
            label="Projects"
            metric={usage.projects}
          />
          <MetricProgres icon={Users} label="Members" metric={usage.members} />
          <MetricStatic
            icon={History}
            label="Audit Log Retention"
            metric={usage.auditLogRetention}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Per-Project Token Usage</CardTitle>
          <CardDescription>
            Token consumption breakdown across projects in this workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {projectEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No projects yet.</p>
          ) : (
            projectEntries.map(([slug, { token }]) => (
              <MetricProgres key={slug} label={slug} metric={token} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSetting;
