"use client";

import { useAuth } from "@clerk/nextjs";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Logo from "@/components/parts/logo/Logo";
import { Button, buttonVariants } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
];

const NavbarHomepage = () => {
  const { isSignedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar-wrapper sticky top-0 z-50">
      <div className="flex h-16 w-full justify-between items-center px-6">
        <Logo className="w-5/12" />

        <nav className="w-full hidden md:flex justify-center items-center gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg p-2 typography-small text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="w-5/12 flex justify-end">
          <div className="hidden items-center gap-2 md:flex">
            {isSignedIn ? (
              <Link
                href="/workspaces"
                className={buttonVariants({
                  variant: "default",
                  size: "default",
                })}
              >
                Dashboard
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "default",
                  })}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  className={buttonVariants({
                    variant: "default",
                    size: "default",
                  })}
                >
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 bottom-0 translate-y-full w-full border-t border-border/50 bg-background p-4 shadow-md md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 typography-regular text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            {isSignedIn ? (
              <Link
                href="/workspaces"
                className={buttonVariants({
                  variant: "default",
                  size: "default",
                })}
              >
                Dashboard
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className={buttonVariants({
                    variant: "outline",
                    size: "default",
                  })}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  className={buttonVariants({
                    variant: "default",
                    size: "default",
                  })}
                >
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavbarHomepage;
