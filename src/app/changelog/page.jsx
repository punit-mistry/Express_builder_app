'use client';
import Link from 'next/link';
import { Terminal, ArrowLeft, Tag } from 'lucide-react';

const versions = [
  {
    version: 'v1.0.0',
    date: 'July 2025',
    changes: [
      { type: 'feature', text: 'Visual Live Builder with real-time code generation.' },
      { type: 'feature', text: 'JWT authentication with register, login, and profile routes.' },
      { type: 'feature', text: 'Redis caching integration with auto-invalidation.' },
      { type: 'feature', text: 'MongoDB and PostgreSQL database support.' },
      { type: 'feature', text: 'API Generator with full CRUD endpoints.' },
      { type: 'feature', text: 'File-based code output with per-file copy.' },
      { type: 'feature', text: 'Standalone code generator page at /builder.' },
      { type: 'feature', text: 'Interactive CLI simulation in hero section.' },
      { type: 'feature', text: 'Dark theme with glassmorphism UI design.' },
      { type: 'fix', text: 'Page reload scroll position issue.' },
    ],
  },
  {
    version: 'v0.1.0',
    date: 'June 2025',
    changes: [
      { type: 'feature', text: 'Initial release of Express Builder.' },
      { type: 'feature', text: 'Basic Express.js code scaffolding.' },
      { type: 'feature', text: 'MongoDB CRUD template generation.' },
      { type: 'feature', text: 'NodeCache integration for GET caching.' },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
              <Terminal size={14} className="text-accent" />
            </div>
            <span className="text-sm font-semibold">Express<span className="text-accent">Builder</span></span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-xs text-[#666] hover:text-white transition-colors">
            <ArrowLeft size={12} /> Back
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            <span className="accent-gradient">Changelog</span>
          </h1>
          <p className="text-[#a0a0a0]">All releases and updates for Express Builder.</p>
        </div>

        <div className="space-y-8">
          {versions.map((v) => (
            <div key={v.version} className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Tag size={16} className="text-accent" />
                <div>
                  <h2 className="text-lg font-semibold">{v.version}</h2>
                  <p className="text-xs text-[#666]">{v.date}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {v.changes.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className={`shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full ${c.type === 'feature' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className={c.type === 'feature' ? 'text-[#a0a0a0]' : 'text-[#a0a0a0]'}>
                      <span className={`text-xs font-medium mr-1.5 ${c.type === 'feature' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {c.type === 'feature' ? 'NEW' : 'FIX'}
                      </span>
                      {c.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-[#666]">
          &copy; {new Date().getFullYear()} Express Builder
        </div>
      </footer>
    </div>
  );
}
