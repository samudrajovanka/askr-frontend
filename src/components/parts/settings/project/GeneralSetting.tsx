"use client";

import { useRouter } from "@bprogress/next/app";
import { useForm } from "@tanstack/react-form";
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
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { DESCRIPTION_MAX_LENGTH } from "@/constants/string";
import { updateProjectSchema } from "@/endpoints/project/validator";
import { usePermission } from "@/hooks/usePermission";
import { isInvalidField } from "@/lib/helpers/field";
import { generateSlug } from "@/lib/helpers/string";
import { useUpdateProject } from "@/query/project";
import type { Project, UpdateProjectPayload } from "@/types/project";

type ProjectGeneralSettingProps = {
  project: Project;
  workspaceSlug: string;
};

const GeneralSetting = ({
  project,
  workspaceSlug,
}: ProjectGeneralSettingProps) => {
  const [slugTouched, setSlugTouched] = useState(true);
  const updateMutation = useUpdateProject(workspaceSlug);
  const { hasPermission } = usePermission(workspaceSlug);
  const router = useRouter();
  const canUpdate = hasPermission("project:update");

  const form = useForm({
    defaultValues: {
      name: project.name,
      slug: project.slug,
      description: project.description ?? "",
    } as UpdateProjectPayload,
    validators: {
      onChange: updateProjectSchema,
      onSubmit: updateProjectSchema,
    },
    onSubmit: async ({ value }) => {
      await updateMutation.mutateAsync({
        projectSlug: project.slug,
        payload: {
          name: value.name.trim(),
          slug: value.slug.trim(),
          description: value.description?.trim(),
        },
      });
      toast.success("Project updated successfully");

      if (value.slug.trim() !== project.slug) {
        router.push(
          `/w/${workspaceSlug}/p/${value.slug.trim()}/settings/general`,
        );
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Update your project details.</CardDescription>
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
                  <FieldLabel htmlFor={field.name}>Project Name</FieldLabel>
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
                    disabled={!canUpdate}
                    placeholder="e.g. Design System"
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
                      <InputGroupText>p/</InputGroupText>
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
                      disabled={!canUpdate}
                      placeholder="design-system"
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

          <form.Field name="description">
            {(field) => {
              const isInvalid = isInvalidField(field);
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Briefly describe what this project is for"
                      rows={3}
                      disabled={!canUpdate}
                      maxLength={DESCRIPTION_MAX_LENGTH}
                    />
                    <InputGroupAddon align="block-end" className="justify-end">
                      <InputGroupText className="typography-xsmall">
                        {(field.state.value || "").length}/
                        {DESCRIPTION_MAX_LENGTH}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                    updateMutation.isPending ||
                    !canUpdate
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
