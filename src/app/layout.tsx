import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import {
  DatabaseStatus,
  DatabaseStatusFallback,
} from "@/components/shared/database-status";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nexjs-practice-nov26",
  description: "Next.js app connected to MongoDB",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<DatabaseStatusFallback />}>
          <DatabaseStatus />
        </Suspense>
        <nav
          aria-label="Main navigation"
          className="flex min-h-14 items-center justify-between border-b border-slate-200 bg-white px-6"
        >
          <Link className="font-semibold text-slate-900" href="/">
            nexjs-practice-nov26
          </Link>
          <div className="flex items-center gap-5 text-sm font-medium">
            <Link
              className="text-slate-600 transition hover:text-indigo-700"
              href="/"
            >
              Overview
            </Link>
            <Link
              className="text-slate-600 transition hover:text-indigo-700"
              href="/users"
            >
              Users
            </Link>
            <Link
              className="text-slate-600 transition hover:text-indigo-700"
              href="/products"
            >
              Products
            </Link>
            <Link
              className="text-slate-600 transition hover:text-indigo-700"
              href="/todos"
            >
              Todos
            </Link>
            <Link
              className="text-slate-600 transition hover:text-indigo-700"
              href="/posts"
            >
              Posts
            </Link>
            <Link
              className="text-slate-600 transition hover:text-indigo-700"
              href="/quotes"
            >
              Quotes
            </Link>
            <Link
              className="text-slate-600 transition hover:text-indigo-700"
              href="/test"
            >
              Test
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
