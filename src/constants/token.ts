import type { LucideIcon } from "lucide-react";
import {
  AlignJustify,
  Bold,
  CaseSensitive,
  CornerUpLeft,
  Layers,
  Palette,
  Ruler,
  Space,
  Square,
  Type,
} from "lucide-react";

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

export const tokenCategoryLabels = {
  [TOKEN_CATEGORIES.COLOR]: "Color",
  [TOKEN_CATEGORIES.SPACING]: "Spacing",
  [TOKEN_CATEGORIES.TEXT]: "Text",
  [TOKEN_CATEGORIES.FONT]: "Font",
  [TOKEN_CATEGORIES.FONT_WEIGHT]: "Font Weight",
  [TOKEN_CATEGORIES.LEADING]: "Leading",
  [TOKEN_CATEGORIES.TRACKING]: "Tracking",
  [TOKEN_CATEGORIES.RADIUS]: "Radius",
  [TOKEN_CATEGORIES.SHADOW]: "Shadow",
  [TOKEN_CATEGORIES.BORDER]: "Border",
} as const;

export const tokenCategoryColors = {
  [TOKEN_CATEGORIES.COLOR]:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  [TOKEN_CATEGORIES.SPACING]:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  [TOKEN_CATEGORIES.TEXT]:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  [TOKEN_CATEGORIES.FONT]:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  [TOKEN_CATEGORIES.FONT_WEIGHT]:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  [TOKEN_CATEGORIES.LEADING]:
    "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  [TOKEN_CATEGORIES.TRACKING]:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  [TOKEN_CATEGORIES.RADIUS]:
    "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  [TOKEN_CATEGORIES.SHADOW]:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  [TOKEN_CATEGORIES.BORDER]:
    "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
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

export const tokenCategoryIcons: Record<string, LucideIcon> = {
  [TOKEN_CATEGORIES.COLOR]: Palette,
  [TOKEN_CATEGORIES.SPACING]: Ruler,
  [TOKEN_CATEGORIES.TEXT]: Type,
  [TOKEN_CATEGORIES.FONT]: CaseSensitive,
  [TOKEN_CATEGORIES.FONT_WEIGHT]: Bold,
  [TOKEN_CATEGORIES.LEADING]: AlignJustify,
  [TOKEN_CATEGORIES.TRACKING]: Space,
  [TOKEN_CATEGORIES.RADIUS]: CornerUpLeft,
  [TOKEN_CATEGORIES.SHADOW]: Layers,
  [TOKEN_CATEGORIES.BORDER]: Square,
};
