import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import QueryProvider from '../providers/query-provider';
import { Toaster } from '@/components/ui/sonner';

// Configure the global application font
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap'
});

// Application metadata
export const metadata: Metadata = {
  title: 'StockFlow',
  description: 'Multi-tenant Inventory Management System'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} dark`}>
      <body className="min-h-screen font-sans antialiased">
        {' '}
        <QueryProvider>
          {children}
          <Toaster
            theme="dark"
            position="top-right"
            richColors
            closeButton={false}
            duration={4000}
          />{' '}
        </QueryProvider>
      </body>
    </html>
  );
}
