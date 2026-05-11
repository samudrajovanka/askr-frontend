"use client";

import {
  ArrowLeft,
  LayoutDashboard,
  PencilRuler,
  Rocket,
  Settings,
  SquareStack,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import Logo from "@/components/parts/logo/Logo";
import { buttonVariants } from "@/components/ui/button";
import SidebarWrapper from "./SidebarWrapper";

const SidebarProject = () => {
  const pathname = usePathname();
  const { workspaceSlug, projectSlug } = useParams();

  const navItems = useMemo(() => {
    return [
      {
        title: "Dashboard",
        href: `/w/${workspaceSlug}/p/${projectSlug}/dashboard`,
        icon: LayoutDashboard,
      },
      {
        title: "Tokens",
        href: `/w/${workspaceSlug}/p/${projectSlug}/tokens`,
        icon: PencilRuler,
      },
      {
        title: "Release",
        href: `/w/${workspaceSlug}/p/${projectSlug}/release`,
        icon: Rocket,
      },
      {
        title: "Integration",
        href: `/w/${workspaceSlug}/p/${projectSlug}/integration`,
        icon: Workflow,
      },
      {
        title: "Activity",
        href: `/w/${workspaceSlug}/p/${projectSlug}/activity`,
        icon: SquareStack,
      },
      {
        title: "Settings",
        href: `/w/${workspaceSlug}/p/${projectSlug}/settings/general`,
        icon: Settings,
      },
    ];
  }, [workspaceSlug, projectSlug]);

  return (
    <SidebarWrapper>
      <nav className="p-4 h-full bg-background">
        <Logo className="mb-6" />

        <div className="flex flex-col gap-1">
          <Link
            href={`/w/${workspaceSlug}/projects`}
            className={buttonVariants({
              variant: "ghost",
              className: "relative",
            })}
          >
            <ArrowLeft className="size-4 absolute left-2" />
            Project
          </Link>

          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={buttonVariants({
                  variant: isActive ? "default" : "ghost",
                  className: "justify-start",
                })}
              >
                <item.icon className="size-4" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>
    </SidebarWrapper>
  );
};

export default SidebarProject;
