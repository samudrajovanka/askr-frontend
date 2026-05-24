"use client";

import { useForm } from "@tanstack/react-form";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import QueryHandling from "@/components/parts/query/QueryHandling";
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
  borderWidthUnits,
  TOKEN_LAYERS,
  TOKEN_STATUSES,
  tokenLayerOptions,
  tokenStatusOptions,
} from "@/constants/token";
import { createBorderTokenSchema } from "@/endpoints/token/validator";
import { isInvalidField } from "@/lib/helpers/field";
import {
  useCreateTokenBorder,
  useTokenBorders,
  useUpdateTokenBorder,
} from "@/query/token";
import type {
  BorderMeta,
  CreateBorderTokenPayload,
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
  value: 1,
  unit: "px",
  referenceId: undefined,
  status: TOKEN_STATUSES.STABLE,
  description: "",
} as CreateBorderTokenPayload;

const BorderTokenDrawer = ({
  open,
  onOpenChange,
  workspaceSlug,
  projectSlug,
  editToken,
  defaultLayer = TOKEN_LAYERS.PRIMITIVE,
}: Props) => {
  const isEditing = !!editToken;
  const createMutation = useCreateTokenBorder(workspaceSlug, projectSlug);
  const updateMutation = useUpdateTokenBorder(workspaceSlug, projectSlug);
  const primitiveTokensQuery = useTokenBorders(
    workspaceSlug,
    projectSlug,
    TOKEN_LAYERS.PRIMITIVE,
    { enabled: open },
  );

  const form = useForm({
    defaultValues: {
      ...defaultFormValues,
      layer: defaultLayer,
    } as CreateBorderTokenPayload,
    validators: {
      onChange: createBorderTokenSchema,
      onSubmit: createBorderTokenSchema,
    },
    onSubmit: async ({ value }) => {
      const payload: CreateBorderTokenPayload = {
        name: value.name.trim(),
        layer: value.layer,
        value: value.layer === TOKEN_LAYERS.PRIMITIVE ? value.value : undefined,
        unit: value.layer === TOKEN_LAYERS.PRIMITIVE ? value.unit : undefined,
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
        const meta = editToken.meta as BorderMeta | null;
        form.setFieldValue("name", editToken.name);
        form.setFieldValue("layer", editToken.layer);
        form.setFieldValue("value", meta?.rawValue ?? 1);
        form.setFieldValue(
          "unit",
          (meta?.unit ?? "px") as CreateBorderTokenPayload["unit"],
        );
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
            {isEditing ? "Edit Border Token" : "New Border Token"}
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
                        border.
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="thin"
                      autoFocus
                      className="font-mono"
                    />
                  </InputGroup>
                  {isInvalid ? (
                    <FieldError errors={field.state.meta.errors} />
                  ) : (
                    <FieldDescription>
                      Lowercase letters, numbers, and dots — e.g.{" "}
                      <span className="font-mono">thin</span> or{" "}
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
                            <FieldLabel htmlFor={field.name}>Width</FieldLabel>
                            <Input
                              id={field.name}
                              type="number"
                              inputMode="decimal"
                              min={0}
                              step={0.5}
                              value={
                                typeof field.state.value === "number"
                                  ? field.state.value
                                  : ""
                              }
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(Number(e.target.value))
                              }
                              placeholder="1"
                              className="font-mono"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
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
                                value as CreateBorderTokenPayload["unit"],
                              )
                            }
                          >
                            <SelectTrigger className="font-mono">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {borderWidthUnits.map((u) => (
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
                      placeholder="Briefly describe what this border is for"
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

export default BorderTokenDrawer;
