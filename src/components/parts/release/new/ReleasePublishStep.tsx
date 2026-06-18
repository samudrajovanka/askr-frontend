import { AlertCircleIcon, InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReleaseDiff } from "@/types/release";
import type { VersionBumpType } from "@/types/version";

type ReleasePublishStepProps = {
  computedVersion: string;
  activeBumpType: VersionBumpType;
  isInitialRelease: boolean;
  diff?: ReleaseDiff;
  notes: string;
};

const ReleasePublishStep = ({
  computedVersion,
  activeBumpType,
  isInitialRelease,
  diff,
  notes,
}: ReleasePublishStepProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="typography-subheading font-semibold">
          Publishing v{computedVersion}
        </h2>
        <p className="typography-small text-muted-foreground">
          Review the summary before publishing.
        </p>
      </div>

      <div className="flex max-w-lg flex-col gap-4">
        <Card className="bg-muted">
          <CardHeader>
            <CardTitle>Version</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span>Estimated Version</span>
              <span className="font-mono typography-small font-semibold">
                v{computedVersion}
              </span>
              {!isInitialRelease && (
                <Badge variant="outline" className="capitalize">
                  {activeBumpType}
                </Badge>
              )}
              {isInitialRelease && (
                <Badge variant="outline">Initial release</Badge>
              )}
            </div>

            <Alert variant="info" className="mt-2">
              <InfoIcon />
              <AlertDescription>
                Final version will be determined at release time
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardHeader>
            <CardTitle>Token Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1 typography-small">
              {diff?.added.length ? (
                <p className="text-green-600">{diff.added.length} added</p>
              ) : null}
              {diff?.modified.length ? (
                <p className="text-amber-600">
                  {diff.modified.length} modified
                </p>
              ) : null}
              {diff?.deleted.length ? (
                <p className="text-destructive">
                  {diff.deleted.length} deleted
                </p>
              ) : null}
              {diff && !diff.hasChanges && (
                <p className="text-muted-foreground">No token changes</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardHeader>
            <CardTitle>Release Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="typography-small">{notes}</p>
          </CardContent>
        </Card>

        <Alert variant="warning">
          <AlertCircleIcon />
          <AlertDescription>This action cannot be undone.</AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ReleasePublishStep;
