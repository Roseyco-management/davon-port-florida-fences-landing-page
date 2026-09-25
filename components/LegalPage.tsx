import Link from 'next/link';
import type { ReactNode } from 'react';

export const LEGAL_UPDATED = 'September 25, 2026';

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-emerald-700 hover:underline">
          &larr; Back to Davenport Florida Fences
        </Link>
        <h1 className="mt-6 text-4xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: {LEGAL_UPDATED}</p>
        <div className="mt-10 text-gray-700 leading-relaxed [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_a]:text-emerald-700 [&_a]:underline">
          {children}
        </div>
      </div>
    </main>
  );
}
