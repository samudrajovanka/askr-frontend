"use client";

import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { createProjectSchema } from "@/endpoints/project/validator";
import { isInvalidField } from "@/lib/helpers/field";
import { generateSlug } from "@/lib/helpers/string";
import { hasPermission } from "@/lib/permissions";
import { useCreateProject } from "@/query/project";
import { useWorkspace } from "@/query/workspace";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceSlug: string;
};

const CreateProjectDialog = ({ open, onOpenChange, workspaceSlug }: Props) => {
  const [slugTouched, setSlugTouched] = useState(false);
  const createMutation = useCreateProject(workspaceSlug);
  const workspaceQuery = useWorkspace(workspaceSlug);
  const canCreate = hasPermission(
    workspaceQuery.data?.data?.data?.workspace?.role,
    "project:create",
  );

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
    validators: {
      onChange: createProjectSchema,
      onSubmit: createProjectSchema,
    },
    onSubmit: async ({ value }) => {
      await createMutation.mutateAsync({
        name: value.name.trim(),
        slug: value.slug.trim(),
        description: value.description?.trim(),
      });
      toast.success("Project created successfully");
      onOpenChange(false);
    },
  });

  useEffect(() => {
    if (open) {
      form.reset();
      setSlugTouched(false);
      createMutation.reset();
    }
  }, [open, createMutation.reset, form.reset]);

  if (!canCreate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-5 pt-2"
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
                    placeholder="e.g. Web Design System"
                    autoFocus
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
                      placeholder="web-design-system"
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
                  <FieldLabel htmlFor={field.name}>
                    Description{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Briefly describe what this project is for"
                      rows={3}
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

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={
                    !canSubmit || isSubmitting || createMutation.isPending
                  }
                >
                  {createMutation.isPending ? "Creating..." : "Create Project"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
