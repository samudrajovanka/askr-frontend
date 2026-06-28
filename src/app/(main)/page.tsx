import HomePage from "@/components/pages/home/HomePage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata({
  title: "Askr — Design Systems Platform",
  description:
    "Create, manage, and publish design systems for your entire team. Keep your design system consistent across every product and platform.",
});

const HomeRoute = () => {
  return <HomePage />;
};

export default HomeRoute;
