import BillingSettingsPage from "@/components/pages/workspace/settings/BillingSettingsPage";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "Billing" },
  { withSuffix: true },
);

const BillingRoute = async () => {
  return <BillingSettingsPage />;
};

export default BillingRoute;
