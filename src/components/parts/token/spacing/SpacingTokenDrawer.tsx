"use client";

import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { toast } from "sonner";
import TokenReferenceSelector from "@/components/parts/token/TokenReferenceSelector";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  spacingUnits,
  TOKEN_LAYERS,
  TOKEN_STATUSES,
  tokenLayerOptions,
  tokenStatusOptions,
} from "@/constants/token";
import { createSpacingTokenSchema } from "@/endpoints/token/validator";
import { isInvalidField } from "@/lib/helpers/field";
import {
  useCreateTokenSpacing,
  useTokenSpacings,
  useUpdateTokenSpacing,
} from "@/query/token";
import type {
  CreateSpacingTokenPayload,
  SpacingMeta,
  Token,
  TokenLayer,
  TokenStatus,
} from "@/types/token";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceSlug: string;
  projectSlug: string;
  editToken?: Token | null;
  defaultLayer?: TokenLayer;
};

const defaultValues = {
  name: "",
  layer: TOKEN_LAYERS.PRIMITIVE,
  value: 0,
  unit: "px",
  referenceId: undefined,
  status: TOKEN_STATUSES.STABLE,
  description: "",
} as CreateSpacingTokenPayload;

const SpacingTokenDrawer = ({
  open,
  onOpenChange,
  workspaceSlug,
  projectSlug,
  editToken,
  defaultLayer = TOKEN_LAYERS.PRIMITIVE,
}: Props) => {
  const isEditing = !!editToken;
  const createMutation = useCreateTokenSpacing(workspaceSlug, projectSlug);
  const updateMutation = useUpdateTokenSpacing(workspaceSlug, projectSlug);
  const primitiveTokensQuery = useTokenSpacings(
    workspaceSlug,
    projectSlug,
    TOKEN_LAYERS.PRIMITIVE,
    { enabled: open },
  );

  const form = useForm({
    defaultValues: {
      ...defaultValues,
      layer: defaultLayer,
    } as CreateSpacingTokenPayload,
    validators: {
      onChange: createSpacingTokenSchema,
      onSubmit: createSpacingTokenSchema,
    },
    onSubmit: async ({ value }) => {
      const isPrimitive = value.layer === TOKEN_LAYERS.PRIMITIVE;
      const payload = {
        name: value.name.trim(),
        layer: value.layer,
        value: isPrimitive ? value.value : undefined,
        unit: isPrimitive ? value.unit : undefined,
        referenceId: !isPrimitive ? value.referenceId : undefined,
        status: value.status,
        description: value.description?.trim(),
      };

      if (isEditing) {
        await updateMutation.mutateAsync({ tokenId: editToken.id, payload });
        toast.success("Token updated");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Token created");
      }

      onOpenChange(false);
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset form only when drawer opens
  useEffect(() => {
    if (open) {
      if (editToken) {
        const meta = editToken.meta as SpacingMeta | null;
        form.setFieldValue("name", editToken.name);
        form.setFieldValue("layer", editToken.layer);
        form.setFieldValue("value", meta?.rawValue ?? 0);
        form.setFieldValue(
          "unit",
          (meta?.unit ?? "px") as CreateSpacingTokenPayload["unit"],
        );
        form.setFieldValue(
          "referenceId",
          editToken.referenceTokenId ?? undefined,
        );
        form.setFieldValue("status", editToken.status);
        form.setFieldValue("description", editToken.description ?? "");
      } else {
        form.reset();
      }
      createMutation.reset();
      updateMutation.reset();
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent side="right" className="sm:max-w-md">
        <DrawerHeader>
          <DrawerTitle>
            {isEditing ? "Edit Spacing Token" : "New Spacing Token"}
          </DrawerTitle>
        </DrawerHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-5 no-scrollbar overflow-y-auto px-4"
        >
          <form.Field name="name">
            {(field) => {
              const isInvalid = isInvalidField(field);
              return (
                <Field data-invalid={isInvalid} data-required>
                  <FieldLabel htmlFor={field.name}>Token Name</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText className="font-mono">
                        spacing.
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="sm"
                      autoFocus
                      className="font-mono"
                    />
                  </InputGroup>
                  {isInvalid ? (
                    <FieldError errors={field.state.meta.errors} />
                  ) : (
                    <FieldDescription>
                      Lowercase letters, numbers, and dots — e.g.{" "}
                      <span className="font-mono">sm</span> or{" "}
                      <span className="font-mono">base</span>
                    </FieldDescription>
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="layer">
            {(field) => (
              <Field data-required>
                <FieldLabel>Layer</FieldLabel>
                <div className="flex gap-2">
                  {tokenLayerOptions.map((opt) => (
                    <Button
                      key={opt.value}
                      type="button"
                      onClick={() => field.handleChange(opt.value)}
                      variant={
                        field.state.value === opt.value
                          ? "outline-primary"
                          : "outline"
                      }
                      className="flex-1"
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </Field>
            )}
          </form.Field>

          <form.Subscribe selector={(s) => s.values.layer}>
            {(layer) => (
              <>
                {layer === TOKEN_LAYERS.PRIMITIVE && (
                  <form.Field name="value">
                    {(field) => {
                      const isInvalid = isInvalidField(field);
                      return (
                        <Field data-invalid={isInvalid} data-required>
                          <FieldLabel htmlFor={field.name}>
                            Spacing Value
                          </FieldLabel>
                          <div className="flex gap-2">
                            <Input
                              id={field.name}
                              name={field.name}
                              type="number"
                              inputMode="decimal"
                              value={field.state.value ?? ""}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(
                                  parseFloat(e.target.value) || 0,
                                )
                              }
                              placeholder="16"
                              className="font-mono flex-1"
                            />
                            <form.Field name="unit">
                              {(unitField) => (
                                <Select
                                  value={unitField.state.value ?? "px"}
                                  onValueChange={(v) =>
                                    unitField.handleChange(
                                      v as CreateSpacingTokenPayload["unit"],
                                    )
                                  }
                                >
                                  <SelectTrigger className="w-20 font-mono shrink-0">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {spacingUnits.map((u) => (
                                      <SelectItem key={u} value={u}>
                                        {u}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            </form.Field>
                          </div>
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                )}

                {layer === "semantic" && (
                  <form.Field name="referenceId">
                    {(field) => {
                      const isInvalid = isInvalidField(field);
                      return (
                        <Field data-invalid={isInvalid} data-required>
                          <FieldLabel>Reference Token</FieldLabel>

                          <TokenReferenceSelector
                            queryResult={primitiveTokensQuery}
                            value={field.state.value}
                            onChange={(val) => field.handleChange(val)}
                            isInvalid={isInvalid}
                          />

                          {isInvalid ? (
                            <FieldError errors={field.state.meta.errors} />
                          ) : (
                            <p className="typography-xsmall text-muted-foreground">
                              Select the primitive token to reference
                            </p>
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                )}
              </>
            )}
          </form.Subscribe>

          <form.Field name="status">
            {(field) => (
              <Field data-required>
                <FieldLabel>Status</FieldLabel>
                <div className="flex gap-2 flex-wrap">
                  {tokenStatusOptions.map((opt) => (
                    <Button
                      key={opt.value}
                      onClick={() =>
                        field.handleChange(opt.value as TokenStatus)
                      }
                      variant={
                        field.state.value === opt.value
                          ? "outline-primary"
                          : "outline"
                      }
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </Field>
            )}
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
                      placeholder="Briefly describe what this spacing is for"
                      rows={3}
                    />
                    <InputGroupAddon align="block-end" className="justify-end">
                      <InputGroupText className="typography-xsmall">
                        {(field.state.value || "").length}/500
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </form>

        <DrawerFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="button"
                disabled={
                  !canSubmit ||
                  isSubmitting ||
                  createMutation.isPending ||
                  updateMutation.isPending
                }
                onClick={() => form.handleSubmit()}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? isEditing
                    ? "Saving..."
                    : "Creating..."
                  : isEditing
                    ? "Save Changes"
                    : "Create Token"}
              </Button>
            )}
          </form.Subscribe>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SpacingTokenDrawer;
