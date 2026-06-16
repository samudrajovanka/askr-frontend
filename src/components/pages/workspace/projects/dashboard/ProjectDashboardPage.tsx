"use client";

import { useParams } from "next/navigation";
import DashboardLayerBreakdown from "@/components/parts/summary/DashboardLayerBreakdown";
import DashboardSummary from "@/components/parts/summary/DashboardSummary";
import DashboardTokenBreakdown from "@/components/parts/summary/DashboardTokenBreakdown";
import HeaderSection from "@/components/parts/template/HeaderSectionTemplate";

const ProjectDashboardPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  return (
    <div className="flex flex-col gap-6">
      <HeaderSection
        title="Dashboard"
        description="Overview of your design tokens"
      />

      <DashboardSummary
        workspaceSlug={workspaceSlug}
        projectSlug={projectSlug}
      />

      <DashboardTokenBreakdown
        workspaceSlug={workspaceSlug}
        projectSlug={projectSlug}
      />

      <DashboardLayerBreakdown
        workspaceSlug={workspaceSlug}
        projectSlug={projectSlug}
      />
    </div>
  );
};

export default ProjectDashboardPage;
