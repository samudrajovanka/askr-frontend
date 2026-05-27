"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import app from "@/config/app";
import { createWorkspaceSchema } from "@/endpoints/workspace/validator";
import { isInvalidField } from "@/lib/helpers/field";
import { generateSlug } from "@/lib/helpers/string";
import { useUpdateWorkspace } from "@/query/workspace";
import type { Workspace } from "@/types/workspace";

type WorkspaceSettingProps = {
  workspace: Workspace;
};

const GeneralSetting = ({ workspace }: WorkspaceSettingProps) => {
  const [slugTouched, setSlugTouched] = useState(true);
  const updateMutation = useUpdateWorkspace();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: workspace.name,
      slug: workspace.slug,
    },
    validators: {
      onChange: createWorkspaceSchema,
      onSubmit: createWorkspaceSchema,
    },
    onSubmit: async ({ value }) => {
      await updateMutation.mutateAsync({
        slug: workspace.slug,
        payload: {
          name: value.name.trim(),
          slug: value.slug.trim(),
        },
      });
      toast.success("Workspace updated successfully");

      if (value.slug.trim() !== workspace.slug) {
        router.push(`/w/${value.slug.trim()}/settings/general`);
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace Settings</CardTitle>
        <CardDescription>Update your workspace details.</CardDescription>
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
          <form.Field name="name">
            {(field) => {
              const isInvalid = isInvalidField(field);
              return (
                <Field data-invalid={isInvalid} data-required>
                  <FieldLabel htmlFor={field.name}>Workspace Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      if (!slugTouched) {
                        form.setFieldValue(
                          "slug",
                          generateSlug(e.target.value),
                        );
                      }
                    }}
                    placeholder="e.g. Acme Corp"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="slug">
            {(field) => {
              const isInvalid = isInvalidField(field);
              return (
                <Field data-invalid={isInvalid} data-required>
                  <FieldLabel htmlFor={field.name}>URL Slug</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>{app.url}/w/</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        setSlugTouched(true);
                      }}
                      placeholder="acme-corp"
                    />
                  </InputGroup>
                  {isInvalid ? (
                    <FieldError errors={field.state.meta.errors} />
                  ) : (
                    <p className="typography-xsmall text-muted-foreground">
                      Lowercase letters, numbers, and hyphens only
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
                    !canSubmit || isSubmitting || updateMutation.isPending
                  }
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};

export default GeneralSetting;
