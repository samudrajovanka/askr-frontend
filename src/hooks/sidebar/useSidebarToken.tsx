import { useMemo } from "react";
import { SIDEBAR_NAV_TYPE } from "@/constants/sidebar";
import { TOKEN_CATEGORIES, tokenCategoryIcons } from "@/constants/token";
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
        icon: tokenCategoryIcons[TOKEN_CATEGORIES.COLOR],
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Spacing",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/spacing`,
        icon: tokenCategoryIcons[TOKEN_CATEGORIES.SPACING],
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Text",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/text`,
        icon: tokenCategoryIcons[TOKEN_CATEGORIES.TEXT],
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Font",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/font`,
        icon: tokenCategoryIcons[TOKEN_CATEGORIES.FONT],
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Font Weight",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/font-weight`,
        icon: tokenCategoryIcons[TOKEN_CATEGORIES.FONT_WEIGHT],
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Leading",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/leading`,
        icon: tokenCategoryIcons[TOKEN_CATEGORIES.LEADING],
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Tracking",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/tracking`,
        icon: tokenCategoryIcons[TOKEN_CATEGORIES.TRACKING],
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Radius",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/radius`,
        icon: tokenCategoryIcons[TOKEN_CATEGORIES.RADIUS],
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Shadow",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/shadow`,
        icon: tokenCategoryIcons[TOKEN_CATEGORIES.SHADOW],
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Border",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/border`,
        icon: tokenCategoryIcons[TOKEN_CATEGORIES.BORDER],
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
