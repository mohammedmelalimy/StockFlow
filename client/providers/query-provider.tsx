'use client';

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function QueryProvider({ children }: { children: ReactNode }) {
  // Initialize the query client
  const [queryClient] = useState(() => new QueryClient());

  // Provide TanStack Query to the application
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
