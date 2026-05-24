export const TOKEN_LAYERS = {
  PRIMITIVE: "primitive",
  SEMANTIC: "semantic",
} as const;

export const tokenLayerLabels = {
  [TOKEN_LAYERS.PRIMITIVE]: "Primitive",
  [TOKEN_LAYERS.SEMANTIC]: "Semantic",
} as const;

export const TOKEN_STATUSES = {
  STABLE: "stable",
  DEPRECATED: "deprecated",
  EXPERIMENTAL: "experimental",
} as const;

export const tokenStatusLabels = {
  [TOKEN_STATUSES.STABLE]: "Stable",
  [TOKEN_STATUSES.DEPRECATED]: "Deprecated",
  [TOKEN_STATUSES.EXPERIMENTAL]: "Experimental",
} as const;

export const TOKEN_CATEGORIES = {
  COLOR: "color",
  SPACING: "spacing",
  TEXT: "text",
  FONT: "font",
  FONT_WEIGHT: "font-weight",
  LEADING: "leading",
  TRACKING: "tracking",
  RADIUS: "radius",
  SHADOW: "shadow",
  BORDER: "border",
} as const;

const UNIT = {
  PX: "px",
  REM: "rem",
  EM: "em",
  PERCENT: "%",
  VW: "vw",
  VH: "vh",
  FR: "fr",
  PT: "pt",
  CH: "ch",
  EX: "ex",
} as const;

export const tokenLayers = Object.values(TOKEN_LAYERS);
export const tokenStatuses = Object.values(TOKEN_STATUSES);

// ========= Radius =========
export const radiusUnits = [UNIT.PX, UNIT.REM, UNIT.PERCENT];

export const RADIUS_SPECIALS = {
  FULL: "full",
  NONE: "none",
} as const;

export const radiusSpecials = Object.values(RADIUS_SPECIALS);

// ========= Spacing =========
export const spacingUnits = [
  UNIT.PX,
  UNIT.REM,
  UNIT.EM,
  UNIT.PERCENT,
  UNIT.VW,
  UNIT.VH,
  UNIT.FR,
  UNIT.PT,
  UNIT.CH,
  UNIT.EX,
] as const;

// ========= Text (font-size) =========
export const textUnits = [UNIT.PX, UNIT.REM, UNIT.EM] as const;

// ========= Leading (line-height) =========
export const leadingUnits = [UNIT.PX, UNIT.REM, UNIT.EM] as const;

// ========= Tracking (letter-spacing) =========
export const trackingUnits = [UNIT.EM, UNIT.REM, UNIT.PX] as const;

// ========= Border =========
export const BORDER_TYPES = {
  WIDTH: "width",
} as const;

export const borderTypeLabels = {
  [BORDER_TYPES.WIDTH]: "Width",
} as const;

export const borderWidthUnits = [UNIT.PX, UNIT.REM, UNIT.EM] as const;

// ========= Font Weight =========
export const fontWeightNames = [
  "thin",
  "extralight",
  "light",
  "normal",
  "medium",
  "semibold",
  "bold",
  "extrabold",
  "black",
] as const;

export const tokenLayerOptions = [
  {
    label: tokenLayerLabels[TOKEN_LAYERS.PRIMITIVE],
    value: TOKEN_LAYERS.PRIMITIVE,
  },
  {
    label: tokenLayerLabels[TOKEN_LAYERS.SEMANTIC],
    value: TOKEN_LAYERS.SEMANTIC,
  },
];

export const tokenStatusOptions = [
  {
    label: tokenStatusLabels[TOKEN_STATUSES.STABLE],
    value: TOKEN_STATUSES.STABLE,
  },
  {
    label: tokenStatusLabels[TOKEN_STATUSES.EXPERIMENTAL],
    value: TOKEN_STATUSES.EXPERIMENTAL,
  },
  {
    label: tokenStatusLabels[TOKEN_STATUSES.DEPRECATED],
    value: TOKEN_STATUSES.DEPRECATED,
  },
];

export const fontWeightOptions = [
  100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;
