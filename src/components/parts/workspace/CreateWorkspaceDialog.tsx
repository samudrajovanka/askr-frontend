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
} from "@/components/ui/input-group";
import app from "@/config/app";
import { createWorkspaceSchema } from "@/endpoints/workspace/validator";
import { isInvalidField } from "@/lib/helpers/field";
import { generateSlug } from "@/lib/helpers/slug";
import { useCreateWorkspace } from "@/query/workspace";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateWorkspaceDialog = ({ open, onOpenChange }: Props) => {
  const [slugTouched, setSlugTouched] = useState(false);
  const createMutation = useCreateWorkspace();

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
    validators: {
      onChange: createWorkspaceSchema,
      onSubmit: createWorkspaceSchema,
    },
    onSubmit: async ({ value }) => {
      await createMutation.mutateAsync({
        name: value.name.trim(),
        slug: value.slug.trim(),
      });
      toast.success("Workspace created successfully");
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
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
                  {createMutation.isPending
                    ? "Creating..."
                    : "Create Workspace"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;
