"use client";

import { useEffect } from "react";
import { MIN_SIDEBAR_SHOW_BREAKPOINT } from "@/constants/appLayout";
import { useSidebarStore } from "@/store/sidebar";

const useSidebar = () => {
  const {
    isCollapsed,
    isMobile,
    toggleSidebar,
    closeSidebar,
    setIsMobile,
    setIsCollapsed,
  } = useSidebarStore();

  useEffect(() => {
    const mql = window.matchMedia(
      `(max-width: ${MIN_SIDEBAR_SHOW_BREAKPOINT - 1}px)`,
    );

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const mobile = e.matches;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    handleChange(mql);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [setIsMobile, setIsCollapsed]);

  return { isCollapsed, isMobile, toggleSidebar, closeSidebar };
};

export { useSidebar };
