import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Flight Agent AI",
  description: "AI assistant for flight agents",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <ToastProvider>
          <aside className="hidden md:flex flex-col w-48 bg-gray-100 p-4 space-y-2">
            <nav className="flex flex-col gap-2">
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/customers" className="hover:underline">
                Customers
              </Link>
              <Link href="/searches" className="hover:underline">
                Searches
              </Link>
              <Link href="/settings" className="hover:underline">
                Settings
              </Link>
            </nav>
          </aside>
          <div className="flex-1 flex flex-col">
            <header className="bg-blue-600 text-white p-4 font-bold flex items-center justify-between">
              <span>Flight Agent AI</span>
              <nav className="md:hidden flex gap-3 text-sm">
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <Link href="/customers" className="hover:underline">
                  Customers
                </Link>
                <Link href="/searches" className="hover:underline">
                  Searches
                </Link>
                <Link href="/settings" className="hover:underline">
                  Settings
                </Link>
              </nav>
            </header>
            <main className="flex-1 p-4 overflow-y-auto">{children}</main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
