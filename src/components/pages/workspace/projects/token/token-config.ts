import {
  AlignJustify,
  Bold,
  CaseSensitive,
  CornerUpLeft,
  Layers,
  type LucideIcon,
  Palette,
  Ruler,
  Space,
  Square,
  Type,
} from "lucide-react";
import type { ComponentType } from "react";
import BorderTokenDrawer from "@/components/parts/token/border/BorderTokenDrawer";
import TokenBorderRow from "@/components/parts/token/border/TokenBorderRow";
import ColorTokenDrawer from "@/components/parts/token/color/ColorTokenDrawer";
import TokenColorFormatSelector from "@/components/parts/token/color/TokenColorFormatSelector";
import TokenColorRow from "@/components/parts/token/color/TokenColorRow";
import FontTokenDrawer from "@/components/parts/token/font/FontTokenDrawer";
import TokenFontRow from "@/components/parts/token/font/TokenFontRow";
import FontWeightTokenDrawer from "@/components/parts/token/font-weight/FontWeightTokenDrawer";
import TokenFontWeightRow from "@/components/parts/token/font-weight/TokenFontWeightRow";
import LeadingTokenDrawer from "@/components/parts/token/leading/LeadingTokenDrawer";
import TokenLeadingRow from "@/components/parts/token/leading/TokenLeadingRow";
import RadiusTokenDrawer from "@/components/parts/token/radius/RadiusTokenDrawer";
import TokenRadiusRow from "@/components/parts/token/radius/TokenRadiusRow";
import ShadowTokenDrawer from "@/components/parts/token/shadow/ShadowTokenDrawer";
import TokenShadowRow from "@/components/parts/token/shadow/TokenShadowRow";
import SpacingTokenDrawer from "@/components/parts/token/spacing/SpacingTokenDrawer";
import TokenSpacingRow from "@/components/parts/token/spacing/TokenSpacingRow";
import TextTokenDrawer from "@/components/parts/token/text/TextTokenDrawer";
import TokenTextRow from "@/components/parts/token/text/TokenTextRow";
import TokenTrackingRow from "@/components/parts/token/tracking/TokenTrackingRow";
import TrackingTokenDrawer from "@/components/parts/token/tracking/TrackingTokenDrawer";
import { TOKEN_CATEGORIES, tokenCategoryLabels } from "@/constants/token";
import {
  useDeleteTokenBorder,
  useDeleteTokenColor,
  useDeleteTokenFont,
  useDeleteTokenFontWeight,
  useDeleteTokenLeading,
  useDeleteTokenRadius,
  useDeleteTokenShadow,
  useDeleteTokenSpacing,
  useDeleteTokenText,
  useDeleteTokenTracking,
  useTokenBorders,
  useTokenColors,
  useTokenFonts,
  useTokenFontWeights,
  useTokenLeadings,
  useTokenRadii,
  useTokenShadows,
  useTokenSpacings,
  useTokenTexts,
  useTokenTrackings,
} from "@/query/token";
import type { Token, TokenLayer } from "@/types/token";

export type TokenConfig = {
  icon: LucideIcon;
  title: string;
  description: string;
  tokenTypeLabel: string;
  emptyTitle: string;
  emptyMessage: string;
  Row: ComponentType<{
    token: Token;
    onEdit: (token: Token) => void;
    onDelete: (token: Token) => void;
    canEdit: boolean;
    canDelete: boolean;
    [key: string]: unknown;
  }>;
  Drawer: ComponentType<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    workspaceSlug: string;
    projectSlug: string;
    editToken: Token | null;
    defaultLayer: TokenLayer;
    [key: string]: unknown;
  }>;
  useTokens: (
    workspaceSlug: string,
    projectSlug: string,
    layer: TokenLayer,
  ) => ReturnType<typeof useTokenColors>;
  useDeleteToken: (
    workspaceSlug: string,
    projectSlug: string,
  ) => ReturnType<typeof useDeleteTokenColor>;
  skeletonPreviewClassName?: string;
  ExtraControl?: React.ComponentType<{
    value: string;
    onChange: (v: string) => void;
  }>;
  getRowExtraProps?: (extraValue: string) => Record<string, unknown>;
};

export const tokenConfigMap: Record<string, TokenConfig> = {
  [TOKEN_CATEGORIES.COLOR]: {
    icon: Palette,
    title: "Color Tokens",
    description: "Manage your project's color tokens",
    tokenTypeLabel: "color token",
    emptyTitle: "No color tokens yet",
    emptyMessage:
      "Start building your color system by adding primitive and semantic color tokens.",
    Row: TokenColorRow,
    Drawer: ColorTokenDrawer,
    useTokens: useTokenColors,
    useDeleteToken: useDeleteTokenColor,
    skeletonPreviewClassName: "h-8 w-8 rounded-md",
    ExtraControl: TokenColorFormatSelector as React.ComponentType<{
      value: string;
      onChange: (v: string) => void;
    }>,
    getRowExtraProps: (extraValue) => ({ colorFormat: extraValue }),
  },
  [TOKEN_CATEGORIES.SPACING]: {
    icon: Ruler,
    title: "Spacing Tokens",
    description: "Manage your project's spacing tokens",
    tokenTypeLabel: "spacing token",
    emptyTitle: "No spacing tokens yet",
    emptyMessage:
      "Start building your spacing system by adding primitive and semantic spacing tokens.",
    Row: TokenSpacingRow,
    Drawer: SpacingTokenDrawer,
    useTokens: useTokenSpacings,
    useDeleteToken: useDeleteTokenSpacing,
  },
  [TOKEN_CATEGORIES.TEXT]: {
    icon: Type,
    title: "Text Tokens",
    description: "Manage your project's text tokens",
    tokenTypeLabel: "text token",
    emptyTitle: "No text tokens yet",
    emptyMessage:
      "Start building your text system by adding primitive and semantic text tokens.",
    Row: TokenTextRow,
    Drawer: TextTokenDrawer,
    useTokens: useTokenTexts,
    useDeleteToken: useDeleteTokenText,
  },
  [TOKEN_CATEGORIES.FONT]: {
    icon: CaseSensitive,
    title: "Font Tokens",
    description: "Manage your project's font tokens",
    tokenTypeLabel: "font token",
    emptyTitle: "No font tokens yet",
    emptyMessage:
      "Start building your font system by adding primitive and semantic font tokens.",
    Row: TokenFontRow,
    Drawer: FontTokenDrawer,
    useTokens: useTokenFonts,
    useDeleteToken: useDeleteTokenFont,
  },
  [TOKEN_CATEGORIES.FONT_WEIGHT]: {
    icon: Bold,
    title: "Font Weight Tokens",
    description: "Manage your project's font weight tokens",
    tokenTypeLabel: "font weight token",
    emptyTitle: "No font weight tokens yet",
    emptyMessage:
      "Start building your font weight system by adding primitive and semantic font weight tokens.",
    Row: TokenFontWeightRow,
    Drawer: FontWeightTokenDrawer,
    useTokens: useTokenFontWeights,
    useDeleteToken: useDeleteTokenFontWeight,
  },
  [TOKEN_CATEGORIES.LEADING]: {
    icon: AlignJustify,
    title: "Leading Tokens",
    description: "Manage your project's leading tokens",
    tokenTypeLabel: "leading token",
    emptyTitle: "No leading tokens yet",
    emptyMessage:
      "Start building your leading system by adding primitive and semantic leading tokens.",
    Row: TokenLeadingRow,
    Drawer: LeadingTokenDrawer,
    useTokens: useTokenLeadings,
    useDeleteToken: useDeleteTokenLeading,
  },
  [TOKEN_CATEGORIES.TRACKING]: {
    icon: Space,
    title: "Tracking Tokens",
    description: "Manage your project's tracking tokens",
    tokenTypeLabel: "tracking token",
    emptyTitle: "No tracking tokens yet",
    emptyMessage:
      "Start building your tracking system by adding primitive and semantic tracking tokens.",
    Row: TokenTrackingRow,
    Drawer: TrackingTokenDrawer,
    useTokens: useTokenTrackings,
    useDeleteToken: useDeleteTokenTracking,
  },
  [TOKEN_CATEGORIES.RADIUS]: {
    icon: CornerUpLeft,
    title: "Radius Tokens",
    description: "Manage your project's radius tokens",
    tokenTypeLabel: "radius token",
    emptyTitle: "No radius tokens yet",
    emptyMessage:
      "Start building your radius system by adding primitive and semantic radius tokens.",
    Row: TokenRadiusRow,
    Drawer: RadiusTokenDrawer,
    useTokens: useTokenRadii,
    useDeleteToken: useDeleteTokenRadius,
  },
  [TOKEN_CATEGORIES.SHADOW]: {
    icon: Layers,
    title: "Shadow Tokens",
    description: "Manage your project's shadow tokens",
    tokenTypeLabel: "shadow token",
    emptyTitle: "No shadow tokens yet",
    emptyMessage:
      "Start building your shadow system by adding primitive and semantic shadow tokens.",
    Row: TokenShadowRow,
    Drawer: ShadowTokenDrawer,
    useTokens: useTokenShadows,
    useDeleteToken: useDeleteTokenShadow,
  },
  [TOKEN_CATEGORIES.BORDER]: {
    icon: Square,
    title: "Border Tokens",
    description: "Manage your project's border tokens",
    tokenTypeLabel: "border token",
    emptyTitle: "No border tokens yet",
    emptyMessage:
      "Start building your border system by adding primitive and semantic border tokens.",
    Row: TokenBorderRow,
    Drawer: BorderTokenDrawer,
    useTokens: useTokenBorders,
    useDeleteToken: useDeleteTokenBorder,
  },
};

export { tokenCategoryLabels };
