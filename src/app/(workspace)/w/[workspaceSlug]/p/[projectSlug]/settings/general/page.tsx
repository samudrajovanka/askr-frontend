import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata(
  { title: "General Settings" },
  { withSuffix: true },
);

const GeneralSettingsPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Manage your project settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Coming soon.</p>
      </CardContent>
    </Card>
  );
};

export default GeneralSettingsPage;
