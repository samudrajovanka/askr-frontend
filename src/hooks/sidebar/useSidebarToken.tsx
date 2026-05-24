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
import { useMemo } from "react";
import { SIDEBAR_NAV_TYPE } from "@/constants/sidebar";
import type { SidebarNavItem } from "@/types/sidebar";

type UseSidebarTokenProps = {
  workspaceSlug: string;
  projectSlug: string;
  headerAction: () => void;
};

const useSidebarToken = ({
  workspaceSlug,
  projectSlug,
  headerAction,
}: UseSidebarTokenProps) => {
  const navItems = useMemo<SidebarNavItem[]>(() => {
    return [
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Color",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/colors`,
        icon: Palette,
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Spacing",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/spacing`,
        icon: Ruler,
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Text",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/text`,
        icon: Type,
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Font",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/font`,
        icon: CaseSensitive,
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Font Weight",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/font-weight`,
        icon: Bold,
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Leading",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/leading`,
        icon: AlignJustify,
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Tracking",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/tracking`,
        icon: Space,
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Radius",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/radius`,
        icon: CornerUpLeft,
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Shadow",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/shadow`,
        icon: Layers,
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Border",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/border`,
        icon: Square,
      },
    ];
  }, [workspaceSlug, projectSlug]);

  const header = useMemo(
    () => ({
      action: headerAction,
      title: "Token",
    }),
    [headerAction],
  );

  return { navItems, header };
};

export default useSidebarToken;
