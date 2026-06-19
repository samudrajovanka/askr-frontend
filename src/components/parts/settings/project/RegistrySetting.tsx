"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import { BasicAlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Code from "@/components/ui/code";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import type { UpsertRegistryPayload } from "@/endpoints/registry/type";
import { upsertRegistrySchema } from "@/endpoints/registry/validator";
import { isInvalidField } from "@/lib/helpers/field";
import { hasPermission } from "@/lib/permissions";
import { useUpsertRegistryConfig } from "@/query/registry";
import { useWorkspace } from "@/query/workspace";
import type { GetRegistryConfig } from "@/types/registry";
import RegistryResyncAlert from "./RegistryResyncAlert";

type RegistrySettingProps = {
  workspaceSlug: string;
  projectSlug: string;
  config: GetRegistryConfig | null;
};

const RegistrySetting = ({
  workspaceSlug,
  projectSlug,
  config,
}: RegistrySettingProps) => {
  const mutation = useUpsertRegistryConfig(workspaceSlug, projectSlug);
  const workspaceQuery = useWorkspace(workspaceSlug);
  const canManage = hasPermission(
    workspaceQuery.data?.data?.data?.workspace?.role,
    "registry:manage",
  );

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingConfigValue, setPendingConfigValue] =
    useState<UpsertRegistryPayload | null>(null);

  const executeUpsertConfig = async (value: UpsertRegistryPayload) => {
    await mutation.mutateAsync({
      registryUrl: value.registryUrl.trim().replace(/\/$/, ""),
      scope: value.scope,
      authToken: value.authToken?.trim() || undefined,
    });
    toast.success("Registry configuration saved");
    setShowConfirmDialog(false);
  };

  const form = useForm({
    defaultValues: {
      registryUrl: config?.registryUrl ?? "",
      scope: config?.scope ?? "",
      authToken: "",
    } as UpsertRegistryPayload,
    validators: {
      onChange: upsertRegistrySchema,
      onSubmit: upsertRegistrySchema,
    },
    onSubmit: async ({ value }) => {
      const isScopeChanged = config?.scope && value.scope !== config.scope;
      if (config?.hasRelease && isScopeChanged) {
        setPendingConfigValue(value);
        setShowConfirmDialog(true);
      } else {
        await executeUpsertConfig(value);
      }
    },
  });

  const generateDisplayPackageName = (scope: string) => {
    let displayPackageName = config
      ? config.packageName?.replace(`@${config.scope}/`, `@${scope}/`)
      : `@${scope || "<scope>"}/${projectSlug}`;
    displayPackageName += "-tokens";

    return displayPackageName;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Registry Settings</CardTitle>
          <CardDescription>
            Configure your project&apos;s NPM registry integration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {config?.isNeedResyncPackageName && (
            <RegistryResyncAlert
              workspaceSlug={workspaceSlug}
              projectSlug={projectSlug}
              config={config}
              canManage={canManage}
              className="mb-6"
            />
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex flex-col gap-5"
          >
            <form.Field name="registryUrl">
              {(field) => {
                const isInvalid = isInvalidField(field);

                return (
                  <Field data-invalid={isInvalid} data-required>
                    <FieldLabel htmlFor={field.name}>Registry URL</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://npm.pkg.github.com"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="scope">
              {(field) => {
                const isInvalid = isInvalidField(field);

                return (
                  <Field data-invalid={isInvalid} data-required>
                    <FieldLabel htmlFor={field.name}>Scope</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="acme"
                      />
                    </InputGroup>
                    {isInvalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : (
                      <FieldDescription>
                        Package will be published as{" "}
                        <Code className="ml-0.5">
                          {generateDisplayPackageName(field.state.value)}
                        </Code>
                      </FieldDescription>
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="authToken">
              {(field) => {
                const isInvalid = isInvalidField(field);

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Auth Token</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="npm_xxxx..."
                    />
                    {isInvalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : (
                      <p className="typography-xsmall text-muted-foreground">
                        Leave empty to keep the existing token
                      </p>
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={
                      !canSubmit ||
                      isSubmitting ||
                      mutation.isPending ||
                      !canManage
                    }
                  >
                    {mutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>

      <BasicAlertDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title="Change Package Scope?"
        description={
          <span>
            This project has already published a release. Changing the scope
            from <Code>@{config?.scope}</Code> to{" "}
            <Code>@{pendingConfigValue?.scope}</Code> will change the name of
            the library to{" "}
            <Code>
              {generateDisplayPackageName(pendingConfigValue?.scope ?? "")}
            </Code>{" "}
            on the next release.
          </span>
        }
        cancelButton={{
          children: "Cancel",
        }}
        actionButton={{
          children: "Yes, Change Scope",
          disabled: mutation.isPending,
          onClick: () => {
            if (pendingConfigValue) {
              executeUpsertConfig(pendingConfigValue);
            }
          },
        }}
      />
    </>
  );
};

export default RegistrySetting;
