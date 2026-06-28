import type { LucideIcon } from "lucide-react";
import { FolderPlus, Layers, Rocket } from "lucide-react";
import SectionHeaderHomepageTemplate from "@/components/parts/template/SectionHeaderHomepageTemplate";
import { Badge } from "@/components/ui/badge";

type Step = {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    step: 1,
    icon: FolderPlus,
    title: "Create your workspace",
    description:
      "Set up a workspace for your team and create projects to organize your design systems.",
  },
  {
    step: 2,
    icon: Layers,
    title: "Define your design systems",
    description:
      "Configure your design systems rules in one unified structure.",
  },
  {
    step: 3,
    icon: Rocket,
    title: "Publish & integrate",
    description:
      "Create releases with semantic versioning and generate output ready to integrate into your codebase.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-muted/30 py-20 md:py-24 container-layout"
    >
      <SectionHeaderHomepageTemplate
        tag="How It Works"
        title="Get started in three simple steps"
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
        {steps.map((item) => (
          <div
            key={item.step}
            className="flex flex-col items-center text-center"
          >
            <div className="relative mb-6">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                <item.icon className="size-7 text-primary" />
              </div>
              <Badge className="absolute -top-2 -right-2">{item.step}</Badge>
            </div>

            <h3 className="typography-subheading-2">{item.title}</h3>
            <p className="typography-small mt-1 text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
