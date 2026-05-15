export const tokenLayers = {
  PRIMITIVE: "primitive",
  SEMANTIC: "semantic",
} as const;

export const tokenLayerLabels = {
  [tokenLayers.PRIMITIVE]: "Primitive",
  [tokenLayers.SEMANTIC]: "Semantic",
} as const;

export const tokenStatuses = {
  STABLE: "stable",
  DEPRECATED: "deprecated",
  EXPERIMENTAL: "experimental",
} as const;

export const tokenStatusLabels = {
  [tokenStatuses.STABLE]: "Stable",
  [tokenStatuses.DEPRECATED]: "Deprecated",
  [tokenStatuses.EXPERIMENTAL]: "Experimental",
} as const;

export const tokenCategories = {
  COLOR: "color",
  SPACING: "spacing",
  TYPOGRAPHY: "typography",
  RADIUS: "radius",
  SHADOW: "shadow",
  BORDER: "border",
} as const;

export const tokenLayerValues = Object.values(tokenLayers) as [
  string,
  ...string[],
];
export const tokenStatusValues = Object.values(tokenStatuses) as [
  string,
  ...string[],
];
export const tokenCategoryValues = Object.values(tokenCategories) as [
  string,
  ...string[],
];

export const tokenLayerOptions = [
  {
    label: tokenLayerLabels[tokenLayers.PRIMITIVE],
    value: tokenLayers.PRIMITIVE,
  },
  {
    label: tokenLayerLabels[tokenLayers.SEMANTIC],
    value: tokenLayers.SEMANTIC,
  },
];

export const tokenStatusOptions = [
  {
    label: tokenStatusLabels[tokenStatuses.STABLE],
    value: tokenStatuses.STABLE,
  },
  {
    label: tokenStatusLabels[tokenStatuses.EXPERIMENTAL],
    value: tokenStatuses.EXPERIMENTAL,
  },
  {
    label: tokenStatusLabels[tokenStatuses.DEPRECATED],
    value: tokenStatuses.DEPRECATED,
  },
];
