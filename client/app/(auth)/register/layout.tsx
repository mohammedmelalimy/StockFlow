import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Brand header */}
      <header className="px-6 py-6">
        <Image
          src="/brand/logo-white.png"
          alt="StockFlow"
          width={1300}
          height={304}
          className="h-auto w-36"
          priority
        />
      </header>

      {/* Authentication page content */}
      <section className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">{children}</div>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-muted-foreground">© 2026 StockFlow</footer>
    </main>
  );
}
