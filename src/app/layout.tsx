import type { Metadata, Viewport } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme';
import DrawerAppBar from '@/components/DrawerAppBar';
import { EventSourceProvider } from '@/context/EventSourceContext';

export const metadata: Metadata = {
  title: 'Btown Kids',
  description: '',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
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
