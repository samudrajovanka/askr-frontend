"use client";

import InvitationsSetting from "@/components/parts/settings/workspace/InvitationsSetting";
import MembersSetting from "@/components/parts/settings/workspace/MembersSetting";

const MembersSettingsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <MembersSetting />
      <InvitationsSetting />
    </div>
  );
};

export default MembersSettingsPage;
