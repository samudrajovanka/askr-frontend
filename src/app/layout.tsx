import "@/assets/styles/globals.css";
import outfit from "@/assets/fonts/outfit";
import Providers from "@/components/parts/providers";
import { Toaster } from "@/components/ui/sonner";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata();

export default function RootLayout({ children }: React.PropsWithChildren) {
  const publishableKey =
    process.env.CLERK_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <Providers publishableKey={publishableKey}>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
