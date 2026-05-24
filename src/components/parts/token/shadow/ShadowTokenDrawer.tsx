"use client";

import { useForm } from "@tanstack/react-form";
import { Check, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
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
  TOKEN_LAYERS,
  TOKEN_STATUSES,
  tokenLayerOptions,
  tokenStatusOptions,
} from "@/constants/token";
import {
  createShadowTokenSchema,
  type ShadowLayer,
} from "@/endpoints/token/validator";
import { isInvalidField } from "@/lib/helpers/field";
import {
  useCreateTokenShadow,
  useTokenShadows,
  useUpdateTokenShadow,
} from "@/query/token";
import type {
  CreateShadowTokenPayload,
  ShadowMeta,
  Token,
  TokenLayer,
  TokenStatus,
} from "@/types/token";
import QueryHandling from "../../query/QueryHandling";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceSlug: string;
  projectSlug: string;
  editToken?: Token | null;
  defaultLayer?: TokenLayer;
};

const defaultLayer: ShadowLayer = {
  offsetX: 0,
  offsetY: 2,
  blur: 4,
  spread: undefined,
  color: "#000000",
  inset: false,
};

const defaultFormValues = {
  name: "",
  layer: TOKEN_LAYERS.PRIMITIVE,
  value: [{ ...defaultLayer }],
  referenceId: undefined,
  status: TOKEN_STATUSES.STABLE,
  description: "",
} as CreateShadowTokenPayload;

const ShadowTokenDrawer = ({
  open,
  onOpenChange,
  workspaceSlug,
  projectSlug,
  editToken,
  defaultLayer: defaultLayerProp = TOKEN_LAYERS.PRIMITIVE,
}: Props) => {
  const isEditing = !!editToken;
  const createMutation = useCreateTokenShadow(workspaceSlug, projectSlug);
  const updateMutation = useUpdateTokenShadow(workspaceSlug, projectSlug);
  const primitiveTokensQuery = useTokenShadows(
    workspaceSlug,
    projectSlug,
    TOKEN_LAYERS.PRIMITIVE,
    { enabled: open },
  );

  const form = useForm({
    defaultValues: {
      ...defaultFormValues,
      layer: defaultLayerProp,
    } as CreateShadowTokenPayload,
    validators: {
      onChange: createShadowTokenSchema,
      onSubmit: createShadowTokenSchema,
    },
    onSubmit: async ({ value }) => {
      const payload: CreateShadowTokenPayload = {
        name: value.name.trim(),
        layer: value.layer,
        value: value.layer === TOKEN_LAYERS.PRIMITIVE ? value.value : undefined,
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
        form.setFieldValue("name", editToken.name);
        form.setFieldValue("layer", editToken.layer);
        const meta = editToken.meta as ShadowMeta | null;
        if (meta?.layers && meta.layers.length > 0) {
          form.setFieldValue("value", meta.layers);
        } else {
          form.setFieldValue("value", [{ ...defaultLayer }]);
        }
        form.setFieldValue(
          "referenceId",
          editToken.referenceTokenId ?? undefined,
        );
        form.setFieldValue("status", editToken.status);
        form.setFieldValue("description", editToken.description ?? "");
      } else {
        form.reset();
        form.setFieldValue("layer", defaultLayerProp);
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
            {isEditing ? "Edit Shadow Token" : "New Shadow Token"}
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
                        shadow.
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
                      <span className="font-mono">card</span>
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
                      const layers = field.state.value ?? [];
                      const isInvalid = isInvalidField(field);

                      const updateLayer = (
                        idx: number,
                        patch: Partial<ShadowLayer>,
                      ) => {
                        const next = layers.map((l, i) =>
                          i === idx ? { ...l, ...patch } : l,
                        );
                        field.handleChange(next);
                      };

                      const addLayer = () => {
                        if (layers.length >= 10) return;
                        field.handleChange([...layers, { ...defaultLayer }]);
                      };

                      const removeLayer = (idx: number) => {
                        field.handleChange(layers.filter((_, i) => i !== idx));
                      };

                      return (
                        <Field data-invalid={isInvalid} data-required>
                          <div className="flex items-center justify-between">
                            <FieldLabel>Shadow Layers</FieldLabel>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={addLayer}
                              disabled={layers.length >= 10}
                              className="h-7 gap-1 text-xs"
                            >
                              <Plus className="size-3" />
                              Add Layer
                            </Button>
                          </div>

                          {isEditing && (
                            <p className="typography-xsmall text-muted-foreground rounded-md border border-input bg-muted/40 px-3 py-2">
                              Stored value:{" "}
                              <span className="font-mono">
                                {editToken?.value}
                              </span>
                              <br />
                              Edit below to replace with a new structured
                              definition.
                            </p>
                          )}

                          <div className="flex flex-col gap-3">
                            {layers.map((shadowLayer, idx) => (
                              <div
                                key={`layer-${
                                  // biome-ignore lint/suspicious/noArrayIndexKey: layers are order-sensitive
                                  idx
                                }`}
                                className="rounded-md border border-input p-3 flex flex-col gap-3"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">
                                    Layer {idx + 1}
                                  </span>
                                  {layers.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className="size-7 text-destructive hover:text-destructive"
                                      onClick={() => removeLayer(idx)}
                                    >
                                      <Trash2 className="size-3.5" />
                                    </Button>
                                  )}
                                </div>

                                {/* offsetX / offsetY */}
                                <div className="grid grid-cols-2 gap-2">
                                  <Field>
                                    <FieldLabel className="text-xs">
                                      Offset X
                                    </FieldLabel>
                                    <Input
                                      type="number"
                                      step={1}
                                      value={shadowLayer.offsetX}
                                      onChange={(e) =>
                                        updateLayer(idx, {
                                          offsetX: Number(e.target.value),
                                        })
                                      }
                                      className="font-mono text-sm"
                                    />
                                  </Field>
                                  <Field>
                                    <FieldLabel className="text-xs">
                                      Offset Y
                                    </FieldLabel>
                                    <Input
                                      type="number"
                                      step={1}
                                      value={shadowLayer.offsetY}
                                      onChange={(e) =>
                                        updateLayer(idx, {
                                          offsetY: Number(e.target.value),
                                        })
                                      }
                                      className="font-mono text-sm"
                                    />
                                  </Field>
                                </div>

                                {/* blur / spread */}
                                <div className="grid grid-cols-2 gap-2">
                                  <Field>
                                    <FieldLabel className="text-xs">
                                      Blur
                                    </FieldLabel>
                                    <Input
                                      type="number"
                                      min={0}
                                      step={1}
                                      value={shadowLayer.blur}
                                      onChange={(e) =>
                                        updateLayer(idx, {
                                          blur: Number(e.target.value),
                                        })
                                      }
                                      className="font-mono text-sm"
                                    />
                                  </Field>
                                  <Field>
                                    <FieldLabel className="text-xs">
                                      Spread{" "}
                                      <span className="text-muted-foreground font-normal">
                                        (optional)
                                      </span>
                                    </FieldLabel>
                                    <Input
                                      type="number"
                                      step={1}
                                      value={shadowLayer.spread ?? ""}
                                      placeholder="0"
                                      onChange={(e) => {
                                        const v = e.target.value;
                                        updateLayer(idx, {
                                          spread:
                                            v === "" ? undefined : Number(v),
                                        });
                                      }}
                                      className="font-mono text-sm"
                                    />
                                  </Field>
                                </div>

                                {/* color */}
                                <Field>
                                  <FieldLabel className="text-xs">
                                    Color
                                  </FieldLabel>
                                  <div className="flex gap-2">
                                    <input
                                      type="color"
                                      value={
                                        shadowLayer.color.startsWith("#")
                                          ? shadowLayer.color
                                          : "#000000"
                                      }
                                      onChange={(e) =>
                                        updateLayer(idx, {
                                          color: e.target.value,
                                        })
                                      }
                                      className="h-9 w-10 shrink-0 cursor-pointer rounded-md border border-input p-1"
                                    />
                                    <Input
                                      type="text"
                                      value={shadowLayer.color}
                                      onChange={(e) =>
                                        updateLayer(idx, {
                                          color: e.target.value,
                                        })
                                      }
                                      placeholder="#000000 or rgba(0,0,0,0.1)"
                                      className="font-mono text-sm flex-1"
                                    />
                                  </div>
                                  <p className="typography-xsmall text-muted-foreground">
                                    Hex, rgb(), or rgba() only
                                  </p>
                                </Field>

                                {/* inset */}
                                <Field>
                                  <FieldLabel className="text-xs">
                                    Inset
                                  </FieldLabel>
                                  <div className="flex gap-2">
                                    <Button
                                      type="button"
                                      variant={
                                        shadowLayer.inset
                                          ? "outline-primary"
                                          : "outline"
                                      }
                                      size="sm"
                                      onClick={() =>
                                        updateLayer(idx, { inset: true })
                                      }
                                    >
                                      Yes
                                    </Button>
                                    <Button
                                      type="button"
                                      variant={
                                        !shadowLayer.inset
                                          ? "outline-primary"
                                          : "outline"
                                      }
                                      size="sm"
                                      onClick={() =>
                                        updateLayer(idx, { inset: false })
                                      }
                                    >
                                      No
                                    </Button>
                                  </div>
                                </Field>
                              </div>
                            ))}
                          </div>

                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                )}

                {layer === TOKEN_LAYERS.SEMANTIC && (
                  <form.Field name="referenceId">
                    {(field) => {
                      const isInvalid = isInvalidField(field);
                      return (
                        <Field data-invalid={isInvalid} data-required>
                          <FieldLabel>Reference Token</FieldLabel>
                          <QueryHandling
                            queryResult={primitiveTokensQuery}
                            checkEmpty={({
                              data: {
                                data: { groups },
                              },
                            }) => !groups.length}
                            renderEmpty={
                              <div className="rounded-md border border-input px-3 py-2 text-sm text-muted-foreground">
                                No primitive tokens available
                              </div>
                            }
                            render={({
                              data: {
                                data: { groups },
                              },
                            }) => {
                              const primitiveTokens = groups.flatMap(
                                (g) => g.tokens,
                              );
                              return (
                                <div
                                  className={`max-h-48 overflow-y-auto rounded-md border ${isInvalid ? "border-destructive" : "border-input"}`}
                                >
                                  {primitiveTokens.map((token) => {
                                    const isSelected =
                                      field.state.value === token.id;
                                    return (
                                      <Button
                                        key={token.id}
                                        title={token.value}
                                        onClick={() =>
                                          field.handleChange(token.id)
                                        }
                                        className="w-full justify-between"
                                        variant={
                                          isSelected ? "ghost-primary" : "ghost"
                                        }
                                      >
                                        <span className="font-mono">
                                          {token.name}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="typography-xsmall text-muted-foreground font-mono">
                                            {token.value}
                                          </span>
                                          {isSelected && (
                                            <Check className="size-3.5" />
                                          )}
                                        </div>
                                      </Button>
                                    );
                                  })}
                                </div>
                              );
                            }}
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
                      placeholder="Briefly describe what this shadow is for"
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

export default ShadowTokenDrawer;
