"use client";

import { useParams } from "next/navigation";
import InvitationsSetting from "@/components/parts/settings/workspace/InvitationsSetting";
import MembersSetting from "@/components/parts/settings/workspace/MembersSetting";
import AccessRestrictedState from "@/components/parts/template/AccessRestrictedState";
import { usePermission } from "@/hooks/usePermission";

const MembersSettingsPage = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const { hasPermission, isFetched } = usePermission(workspaceSlug);
  const canRead = hasPermission("member:read");

  if (isFetched && !canRead) {
    return (
      <AccessRestrictedState description="You don't have permission to view workspace members." />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <MembersSetting />
      <InvitationsSetting />
    </div>
  );
};

export default MembersSettingsPage;
