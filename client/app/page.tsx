import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-extrabold">StockFlow</h1>

      <p className="text-muted-foreground">Multi-tenant Inventory Management System</p>

      <div className="flex gap-3">
        <Button asChild>
          <Link href="/register">Get Started</Link>
        </Button>{' '}
      </div>
    </main>
  );
}
