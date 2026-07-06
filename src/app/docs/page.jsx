'use client';
import Link from 'next/link';
import { Terminal, ArrowLeft, BookOpen, Code2, Settings, Shield, Database, HardDrive } from 'lucide-react';

const sections = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Installation', desc: 'Install Express Builder via npm and get started in minutes.' },
      { label: 'Quick Start', desc: 'Create your first project with the interactive CLI.' },
      { label: 'Project Structure', desc: 'Understand the generated project architecture.' },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { label: 'Database Setup', desc: 'Configure MongoDB or PostgreSQL connections.' },
      { label: 'Authentication', desc: 'JWT-based auth with register, login, and protected routes.' },
      { label: 'Middleware', desc: 'CORS, rate limiting, Helmet, compression, and more.' },
      { label: 'Redis Caching', desc: 'Integrate Redis for high-performance caching.' },
    ],
  },
  {
    title: 'API Reference',
    link: '/docs/api',
    items: [
      { label: 'Auth Endpoints', desc: 'POST /api/auth/register, POST /api/auth/login, GET /api/auth/me' },
      { label: 'Items Endpoints', desc: 'Full CRUD: GET, POST, PUT, DELETE /api/items' },
      { label: 'Health Check', desc: 'GET /api/health — monitor server status.' },
    ],
  },
  {
    title: 'Examples',
    link: '/docs/examples',
    items: [
      { label: 'MongoDB + JWT + Redis', desc: 'Full-featured API with authentication and caching.' },
      { label: 'PostgreSQL + API Generator', desc: 'REST API with PostgreSQL and auto-generated CRUD.' },
      { label: 'Minimal Setup', desc: 'Lightweight Express server with essential middleware.' },
    ],
  },
];

export default function DocsPage() {
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            <span className="accent-gradient">Documentation</span>
          </h1>
          <p className="text-[#a0a0a0] max-w-2xl mx-auto">
            Everything you need to get started with Express Builder.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {sections.map((section) => (
            <div key={section.title} className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                {section.link && (
                  <Link href={section.link} className="text-xs text-accent hover:underline">View all &rarr;</Link>
                )}
              </div>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <div className="text-sm font-medium text-white">{item.label}</div>
                    <div className="text-xs text-[#666] mt-0.5">{item.desc}</div>
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
