"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { isInvalidField } from "@/lib/helpers/field";
import { useUpsertRegistryConfig } from "@/query/registry";
import type { SafeRegistryConfig } from "@/types/registry";

// Form schema uses required string for authToken (empty = no change).
// The mutation payload converts "" to undefined.
const registryFormSchema = z.object({
  registryUrl: z
    .string()
    .url("Must be a valid URL")
    .max(500, "URL is too long"),
  scope: z
    .string()
    .min(1, "Scope is required")
    .max(100, "Scope is too long")
    .transform((value) => value.trim().replace(/^@+/, "")),
  authToken: z.string().max(500, "Auth token is too long"),
});

type RegistrySettingsFormProps = {
  workspaceSlug: string;
  projectSlug: string;
  config: SafeRegistryConfig | null;
};

const RegistrySettingsForm = ({
  workspaceSlug,
  projectSlug,
  config,
}: RegistrySettingsFormProps) => {
  const mutation = useUpsertRegistryConfig(workspaceSlug, projectSlug);

  const form = useForm({
    defaultValues: {
      registryUrl: config?.registryUrl ?? "",
      scope: config?.scope ?? "",
      authToken: "",
    },
    validators: {
      onChange: registryFormSchema,
      onSubmit: registryFormSchema,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync({
        registryUrl: value.registryUrl.trim().replace(/\/$/, ""),
        scope: value.scope,
        authToken: value.authToken.trim() || undefined,
      });
      toast.success("Registry configuration saved");
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registry Settings</CardTitle>
        <CardDescription>
          Configure your project&apos;s NPM registry integration.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                      Package will be published as @{field.state.value}/
                      {projectSlug}/tokens
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
                  disabled={!canSubmit || isSubmitting || mutation.isPending}
                >
                  {mutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrySettingsForm;
