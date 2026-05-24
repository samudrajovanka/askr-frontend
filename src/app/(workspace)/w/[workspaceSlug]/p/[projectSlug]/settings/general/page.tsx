import ComingSoon from "@/components/parts/template/ComingSoon";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "General Settings" },
  { withSuffix: true },
);

const GeneralSettingsRoute = () => {
  return <ComingSoon />;
};

export default GeneralSettingsRoute;
