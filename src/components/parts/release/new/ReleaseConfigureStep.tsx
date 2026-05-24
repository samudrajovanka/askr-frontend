import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { DEFAULT_VERSION } from "@/constants/version";
import type { VersionBumpType } from "@/types/version";
import VersionBumpSelector from "../VersionBumpSelector";

type ReleaseConfigureStepProps = {
  isInitialRelease: boolean;
  activeBumpType: VersionBumpType;
  onBumpTypeChange: (type: VersionBumpType) => void;
  currentVersion: string | null;
  computedVersion: string;
  notes: string;
  onNotesChange: (notes: string) => void;
  notesError: string;
  notesMaxLength: number;
};

const ReleaseConfigureStep = ({
  isInitialRelease,
  activeBumpType,
  onBumpTypeChange,
  currentVersion,
  notes,
  onNotesChange,
  notesError,
  notesMaxLength,
}: ReleaseConfigureStepProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="typography-subheading font-semibold">
          Configure Release
        </h2>
        <p className="text-muted-foreground typography-small">
          Choose the version bump type and add optional release notes.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <FieldLabel>Version</FieldLabel>

          {isInitialRelease ? (
            <div className="rounded-lg border bg-muted/50 px-4 py-3">
              <p className="typography-small font-medium">Initial release</p>
              <p className="mt-0.5 font-mono typography-large font-semibold">
                v{DEFAULT_VERSION}
              </p>
              <p className="typography-small text-muted-foreground">
                First release always starts at v{DEFAULT_VERSION}.
              </p>
            </div>
          ) : (
            <VersionBumpSelector
              activeBumpType={activeBumpType}
              onBumpTypeChange={onBumpTypeChange}
              currentVersion={currentVersion}
            />
          )}
        </div>

        <Field data-required data-invalid={!!notesError}>
          <FieldLabel htmlFor="release-notes">Release notes</FieldLabel>
          <FieldContent>
            <InputGroup>
              <InputGroupTextarea
                id="release-notes"
                placeholder="Describe what changed in this release..."
                value={notes}
                maxLength={notesMaxLength}
                onChange={(e) => onNotesChange(e.target.value)}
                rows={4}
              />
              <InputGroupAddon align="block-end" className="justify-between">
                <div>
                  {notesError && (
                    <span className="text-destructive">{notesError}</span>
                  )}
                </div>
                <InputGroupText>
                  {notes.length}/{notesMaxLength}
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FieldContent>
        </Field>
      </div>
    </div>
  );
};

export default ReleaseConfigureStep;
