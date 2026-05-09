import '@/assets/styles/globals.css';
import outfit from '@/assets/fonts/outfit';
import Providers from '@/components/parts/providers';
import generateMetadata from '@/lib/helpers/metadata';

export const metadata = generateMetadata();

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
