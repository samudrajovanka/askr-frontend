"use client";

import { useAuth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import TokenPreview from "./TokenPreview";

const Hero = () => {
  const { isSignedIn } = useAuth();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-32 right-0 h-[300px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="flex w-full flex-col items-center px-6 py-20 text-center md:py-24 container-layout">
        <h1 className="max-w-3xl typography-hero">
          Design Systems, <span className="text-primary">Simplified.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-muted-foreground typography-subheading-2 font-normal">
          Create, manage, and publish design systems for your entire team. Keep
          your design system consistent across every product and platform.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          {isSignedIn ? (
            <Link href="/workspaces" className={buttonVariants()}>
              Go to Dashboard
              <ArrowRight className="size-4" data-icon="inline-end" />
            </Link>
          ) : (
            <>
              <Link href="/auth/sign-up" className={buttonVariants()}>
                Get Started — Free
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Link>
              <a
                href="#features"
                className={buttonVariants({ variant: "outline" })}
              >
                Learn More
              </a>
            </>
          )}
        </div>

        <TokenPreview />
      </div>
    </section>
  );
};

export default Hero;
