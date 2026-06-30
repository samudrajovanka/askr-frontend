import { create } from "zustand";

type SidebarState = {
  isCollapsed: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  setIsMobile: (isMobile: boolean) => void;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  isMobile: false,
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  closeSidebar: () => set({ isCollapsed: true }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setIsCollapsed: (isCollapsed) => set({ isCollapsed }),
}));
