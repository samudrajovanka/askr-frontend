"use client";

import { Check, Rocket, Settings } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRegistryConfig } from "@/query/registry";
import { useReleases } from "@/query/release";

type ReleaseSetupGuideProps = {
  workspaceSlug: string;
  projectSlug: string;
  onCreateRelease: () => void;
};

const ReleaseSetupGuide = ({
  workspaceSlug,
  projectSlug,
  onCreateRelease,
}: ReleaseSetupGuideProps) => {
  const { data: registryData } = useRegistryConfig(workspaceSlug, projectSlug);
  const { data: releasesData } = useReleases(workspaceSlug, projectSlug);

  const isRegistryConfigured = registryData?.data?.data?.config != null;
  const hasReleases = (releasesData?.data?.data?.releases?.length ?? 0) > 1;

  const steps = [
    {
      step: 1,
      icon: Settings,
      title: "Set up your registry",
      description:
        "Configure your npm registry to publish design tokens as a package.",
      completed: isRegistryConfigured,
      action: (
        <Link
          href={`/w/${workspaceSlug}/p/${projectSlug}/settings/registry`}
          className={buttonVariants({ variant: "outline-primary", size: "sm" })}
        >
          {isRegistryConfigured ? "View Registry" : "Configure Registry"}
        </Link>
      ),
    },
    {
      step: 2,
      icon: Rocket,
      title: "Create your first release",
      description:
        "Package your design tokens into a versioned release ready for integration.",
      completed: hasReleases,
      action: (
        <Button
          size="sm"
          onClick={onCreateRelease}
          disabled={!isRegistryConfigured}
        >
          Create Release
        </Button>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex flex-col gap-4">
        {steps.map((item) => (
          <Card key={item.step}>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                    <item.icon className="size-7 text-primary" />
                  </div>
                  <Badge className="absolute -top-2 -right-2">
                    {item.step}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col gap-3 pt-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="typography-subheading-2">{item.title}</h3>
                      {item.completed && (
                        <div className="flex size-5 items-center justify-center rounded-full bg-green-500/10">
                          <Check className="size-3 text-green-600" />
                        </div>
                      )}
                    </div>
                    <p className="typography-small mt-1 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  {item.action}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReleaseSetupGuide;
