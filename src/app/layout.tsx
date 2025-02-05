import type { Metadata, Viewport } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import './globals.css';
import DrawerAppBar from '@/components/Navigation';
import { EventSourceProvider } from '@/context/EventSourceContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Btown Kids',
  description: '',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <EventSourceProvider>
              <DrawerAppBar />
              {children}
            </EventSourceProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
