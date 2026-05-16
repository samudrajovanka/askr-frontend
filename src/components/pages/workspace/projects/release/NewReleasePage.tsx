"use client";

import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import StepperLayout from "@/components/layout/StepperLayout";
import ReleaseConfigureStep from "@/components/parts/release/new/ReleaseConfigureStep";
import ReleasePublishStep from "@/components/parts/release/new/ReleasePublishStep";
import ReleaseReviewStep from "@/components/parts/release/new/ReleaseReviewStep";
import { Button } from "@/components/ui/button";
import { defaultVersion, versionBumpTypes } from "@/constants/version";
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
  const params = useParams();
  const router = useRouter();
  const workspaceSlug = params.workspaceSlug as string;
  const projectSlug = params.projectSlug as string;

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

  const createReleaseMutation = useCreateRelease(workspaceSlug, projectSlug);

  useEffect(() => {
    if (diff?.suggestedBumpType && bumpType === null) {
      setBumpType(diff.suggestedBumpType);
    }
  }, [diff?.suggestedBumpType, bumpType]);

  const activeBumpType: VersionBumpType =
    bumpType ?? diff?.suggestedBumpType ?? versionBumpTypes.PATCH;
  const computedVersion = diff
    ? bumpVersion(diff.currentVersion, activeBumpType)
    : defaultVersion;

  const isInitialRelease = diff?.currentVersion === null;

  const goToReleases = () => {
    router.push(`/w/${workspaceSlug}/p/${projectSlug}/release`);
  };

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
    await createReleaseMutation.mutateAsync({
      bumpType: activeBumpType,
      notes: notes.trim(),
    });
    toast.success("Release published successfully");
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
