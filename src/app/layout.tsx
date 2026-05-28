import "@/assets/styles/globals.css";
import outfit from "@/assets/fonts/outfit";
import Providers from "@/components/parts/providers";
import { Toaster } from "@/components/ui/sonner";
import generateMetadata from "@/lib/helpers/metadata";

export const metadata = generateMetadata();

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
