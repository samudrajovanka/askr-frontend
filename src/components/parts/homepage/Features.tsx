import {
  GitBranch,
  type LucideIcon,
  Package,
  Palette,
  Users,
} from "lucide-react";
import SectionHeaderHomepageTemplate from "@/components/parts/template/SectionHeaderHomepageTemplate";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Palette,
    title: "Token Management",
    description:
      "Create and organize color, spacing, typography, shadow, and border tokens in a single source of truth.",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description:
      "Semantic versioning with full release history. Track every change to your design tokens over time.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Workspace and member management. Invite your team, assign roles, and work together seamlessly.",
  },
  {
    icon: Package,
    title: "Export & Publish",
    description:
      "Generate CSS variables and publish your tokens as npm packages. Integrate into any codebase instantly.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="scroll-mt-20 py-20 md:py-24 container-layout"
    >
      <SectionHeaderHomepageTemplate
        tag="Features"
        title="Everything you need to manage design tokens"
        description="A complete platform for creating, versioning, and distributing your design system tokens."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group transition-shadow hover:shadow-md"
          >
            <CardHeader>
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                <feature.icon className="size-5 text-primary" />
              </div>
              <CardTitle className="typography-subheading-2">
                {feature.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
