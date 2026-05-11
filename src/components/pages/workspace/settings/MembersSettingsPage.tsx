"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MembersSettingsPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>
          Manage who has access to this workspace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Members management will be available in the next iteration.
        </p>
      </CardContent>
    </Card>
  );
};

export default MembersSettingsPage;
