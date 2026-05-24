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
  RADIUS_SPECIALS,
  radiusUnits,
  TOKEN_LAYERS,
  TOKEN_STATUSES,
  tokenLayerOptions,
  tokenStatusOptions,
} from "@/constants/token";
import { createRadiusTokenSchema } from "@/endpoints/token/validator";
import { isInvalidField } from "@/lib/helpers/field";
import {
  useCreateTokenRadius,
  useTokenRadii,
  useUpdateTokenRadius,
} from "@/query/token";
import type {
  CreateRadiusTokenPayload,
  RadiusMeta,
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

const defaultFormValues = {
  name: "",
  layer: TOKEN_LAYERS.PRIMITIVE,
  mode: "custom",
  value: 0,
  unit: "px",
  referenceId: undefined,
  status: TOKEN_STATUSES.STABLE,
  description: "",
} as CreateRadiusTokenPayload;

const RadiusTokenDrawer = ({
  open,
  onOpenChange,
  workspaceSlug,
  projectSlug,
  editToken,
  defaultLayer = TOKEN_LAYERS.PRIMITIVE,
}: Props) => {
  const isEditing = !!editToken;
  const createMutation = useCreateTokenRadius(workspaceSlug, projectSlug);
  const updateMutation = useUpdateTokenRadius(workspaceSlug, projectSlug);
  const primitiveTokensQuery = useTokenRadii(
    workspaceSlug,
    projectSlug,
    TOKEN_LAYERS.PRIMITIVE,
    { enabled: open },
  );

  const form = useForm({
    defaultValues: {
      ...defaultFormValues,
      layer: defaultLayer,
    } as CreateRadiusTokenPayload,
    validators: {
      onChange: createRadiusTokenSchema,
      onSubmit: createRadiusTokenSchema,
    },
    onSubmit: async ({ value }) => {
      let primitivePayload: Partial<CreateRadiusTokenPayload> = {};
      if (value.layer === TOKEN_LAYERS.PRIMITIVE) {
        if (value.special === "full") {
          primitivePayload = { special: RADIUS_SPECIALS.FULL };
        } else if (value.special === "none") {
          primitivePayload = { special: RADIUS_SPECIALS.NONE };
        } else {
          primitivePayload = { value: value.value, unit: value.unit };
        }
      }

      const payload: CreateRadiusTokenPayload = {
        name: value.name.trim(),
        layer: value.layer,
        ...primitivePayload,
        referenceId:
          value.layer === TOKEN_LAYERS.SEMANTIC ? value.referenceId : undefined,
        status: value.status,
        description: value.description?.trim() || undefined,
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
        const meta = editToken.meta as RadiusMeta | null;
        form.setFieldValue("name", editToken.name);
        form.setFieldValue("layer", editToken.layer);
        if (meta?.special) {
          form.setFieldValue("special", meta.special);
          form.setFieldValue("value", 0);
          form.setFieldValue("unit", "px");
        } else {
          form.setFieldValue("special", undefined);
          form.setFieldValue("value", meta?.rawValue ?? 0);
          form.setFieldValue(
            "unit",
            (meta?.unit ?? "px") as CreateRadiusTokenPayload["unit"],
          );
        }
        form.setFieldValue(
          "referenceId",
          editToken.referenceTokenId ?? undefined,
        );
        form.setFieldValue("status", editToken.status);
        form.setFieldValue("description", editToken.description ?? "");
      } else {
        form.reset();
        form.setFieldValue("layer", defaultLayer);
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
            {isEditing ? "Edit Radius Token" : "New Radius Token"}
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
                        radius.
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
                      <span className="font-mono">sm</span>
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
                  <>
                    <form.Field name="special">
                      {(field) => (
                        <Field data-required>
                          <FieldLabel>Radius Mode</FieldLabel>
                          <div className="flex gap-2">
                            {(
                              [
                                { value: undefined, label: "Custom" },
                                { value: "full", label: "Full" },
                                { value: "none", label: "None" },
                              ] as const
                            ).map((opt) => (
                              <Button
                                key={opt.value ?? opt.label}
                                type="button"
                                onClick={() => {
                                  field.handleChange(
                                    opt.value as CreateRadiusTokenPayload["special"],
                                  );
                                  if (opt.value) {
                                    form.setFieldValue("value", undefined);
                                    form.setFieldValue("unit", undefined);
                                  } else {
                                    form.setFieldValue("value", 0);
                                    form.setFieldValue("unit", "px");
                                  }
                                }}
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
                          {field.state.value === "full" && (
                            <FieldDescription>
                              Fully rounded (
                              <span className="font-mono">
                                calc(infinity * 1px)
                              </span>
                              )
                            </FieldDescription>
                          )}
                          {field.state.value === "none" && (
                            <FieldDescription>
                              No radius (<span className="font-mono">0px</span>)
                            </FieldDescription>
                          )}
                        </Field>
                      )}
                    </form.Field>

                    <form.Subscribe selector={(s) => s.values.special}>
                      {(special) =>
                        special === undefined ? (
                          <div className="flex gap-2">
                            <form.Field name="value">
                              {(field) => {
                                const isInvalid = isInvalidField(field);
                                return (
                                  <Field
                                    data-invalid={isInvalid}
                                    data-required
                                    className="flex-1"
                                  >
                                    <FieldLabel htmlFor={field.name}>
                                      Value
                                    </FieldLabel>
                                    <Input
                                      id={field.name}
                                      type="number"
                                      inputMode="decimal"
                                      min={0}
                                      step={0.5}
                                      value={field.state.value}
                                      onBlur={field.handleBlur}
                                      onChange={(e) =>
                                        field.handleChange(
                                          Number(e.target.value),
                                        )
                                      }
                                      placeholder="8"
                                      className="font-mono"
                                    />
                                    {isInvalid && (
                                      <FieldError
                                        errors={field.state.meta.errors}
                                      />
                                    )}
                                  </Field>
                                );
                              }}
                            </form.Field>
                            <form.Field name="unit">
                              {(field) => (
                                <Field data-required className="w-24 shrink-0">
                                  <FieldLabel>Unit</FieldLabel>
                                  <Select
                                    value={field.state.value}
                                    onValueChange={(value) =>
                                      field.handleChange(
                                        value as CreateRadiusTokenPayload["unit"],
                                      )
                                    }
                                  >
                                    <SelectTrigger className="font-mono">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {radiusUnits.map((u) => (
                                        <SelectItem key={u} value={u}>
                                          {u}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </Field>
                              )}
                            </form.Field>
                          </div>
                        ) : null
                      }
                    </form.Subscribe>
                  </>
                )}

                {layer === TOKEN_LAYERS.SEMANTIC && (
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
                            <FieldDescription>
                              Select the primitive token to reference
                            </FieldDescription>
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
                      type="button"
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
                      placeholder="Briefly describe what this radius is for"
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

export default RadiusTokenDrawer;
