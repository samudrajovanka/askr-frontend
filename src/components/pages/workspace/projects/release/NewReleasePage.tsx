"use client";

import { useRouter } from "@bprogress/next/app";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import StepperLayout from "@/components/layout/StepperLayout";
import ReleaseConfigureStep from "@/components/parts/release/new/ReleaseConfigureStep";
import ReleasePublishStep from "@/components/parts/release/new/ReleasePublishStep";
import ReleaseReviewStep from "@/components/parts/release/new/ReleaseReviewStep";
import AccessRestrictedState from "@/components/parts/template/AccessRestrictedState";
import { Button } from "@/components/ui/button";
import { DEFAULT_VERSION, VERSION_BUMP_TYPES } from "@/constants/version";
import { usePermission } from "@/hooks/usePermission";
import { bumpVersion } from "@/lib/helpers/version";
import { useCreateRelease, useReleaseDiff } from "@/query/release";
import type { VersionBumpType } from "@/types/version";

const NOTES_MAX_LENGTH = 200;

const STEPS: { label: string }[] = [
  { label: "Review Changes" },
  { label: "Configure" },
  { label: "Publish" },
];

const NewReleasePage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [bumpType, setBumpType] = useState<VersionBumpType | null>(null);
  const [notes, setNotes] = useState("");
  const [notesError, setNotesError] = useState("");

  const {
    data: diffData,
    isLoading: diffLoading,
    isError: diffError,
    refetch: refetchDiff,
  } = useReleaseDiff(workspaceSlug, projectSlug, true);
  const diff = diffData?.data.data.diff;

  const { hasPermission, isFetched: workspaceFetched } =
    usePermission(workspaceSlug);
  const canPublish = hasPermission("release:publish");
  const createReleaseMutation = useCreateRelease(workspaceSlug, projectSlug);

  useEffect(() => {
    if (diff?.suggestedBumpType && bumpType === null) {
      setBumpType(diff.suggestedBumpType);
    }
  }, [diff?.suggestedBumpType, bumpType]);

  const activeBumpType: VersionBumpType =
    bumpType ?? diff?.suggestedBumpType ?? VERSION_BUMP_TYPES.PATCH;
  const computedVersion = diff
    ? bumpVersion(diff.currentVersion, activeBumpType)
    : DEFAULT_VERSION;

  const isInitialRelease = diff?.currentVersion === null;

  const goToReleases = useCallback(() => {
    router.push(`/w/${workspaceSlug}/p/${projectSlug}/release`);
  }, [router, workspaceSlug, projectSlug]);

  if (workspaceFetched && !canPublish) {
    return (
      <AccessRestrictedState
        title="Cannot publish release"
        description="You don't have permission to publish releases. Ask an admin or manager to publish for you."
      />
    );
  }

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!notes.trim()) {
        setNotesError("Release notes are required");
        return;
      }
      setNotesError("");
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      goToReleases();
    } else if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handlePublish = async () => {
    const {
      data: {
        data: { release },
      },
    } = await createReleaseMutation.mutateAsync({
      bumpType: activeBumpType,
      notes: notes.trim(),
    });
    toast.success(`Release v${release.version} published successfully`);
    router.push(`/w/${workspaceSlug}/p/${projectSlug}/release`);
  };

  return (
    <StepperLayout
      stepper={{ steps: STEPS }}
      step={step}
      onStepChange={setStep}
      leftHeaderComponent={
        <Button variant="ghost" size="sm" onClick={goToReleases}>
          <ChevronLeft className="size-4" />
          Back to Releases
        </Button>
      }
      onNext={handleNext}
      onBack={handleBack}
      nextText={step === 3 ? "Publish" : "Next"}
      loadingText="Publishing..."
      isLoadingNext={createReleaseMutation.isPending}
      disableNext={step === 1 && (!diff || diffLoading || diffError)}
      withLastStepAction
      handleLastAction={handlePublish}
    >
      {(currentStep) => (
        <div className="w-xl mx-auto">
          {currentStep === 1 && (
            <ReleaseReviewStep
              diff={diff}
              isLoading={diffLoading}
              isError={diffError}
              onRetry={() => refetchDiff()}
            />
          )}
          {currentStep === 2 && (
            <ReleaseConfigureStep
              isInitialRelease={isInitialRelease}
              activeBumpType={activeBumpType}
              onBumpTypeChange={setBumpType}
              currentVersion={diff?.currentVersion ?? null}
              computedVersion={computedVersion}
              notes={notes}
              onNotesChange={(v) => {
                setNotes(v);
                if (v.trim()) setNotesError("");
              }}
              notesError={notesError}
              notesMaxLength={NOTES_MAX_LENGTH}
            />
          )}
          {currentStep === 3 && (
            <ReleasePublishStep
              computedVersion={computedVersion}
              activeBumpType={activeBumpType}
              isInitialRelease={isInitialRelease}
              diff={diff}
              notes={notes}
            />
          )}
        </div>
      )}
    </StepperLayout>
  );
};

export default NewReleasePage;
