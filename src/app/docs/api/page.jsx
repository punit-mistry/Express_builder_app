'use client';
import Link from 'next/link';
import { Terminal, ArrowLeft, ChevronRight } from 'lucide-react';

const endpoints = [
  {
    method: 'POST',
    path: '/api/auth/register',
    auth: false,
    desc: 'Create a new user account.',
    body: { name: 'string', email: 'string', password: 'string' },
    response: { message: 'User registered successfully', token: 'jwt...', user: { id: '...', name: '...', email: '...' } },
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    auth: false,
    desc: 'Authenticate and receive a JWT token.',
    body: { email: 'string', password: 'string' },
    response: { message: 'Login successful', token: 'jwt...' },
  },
  {
    method: 'GET',
    path: '/api/auth/me',
    auth: true,
    desc: 'Get the currently authenticated user.',
    response: { user: { id: '...', name: '...', email: '...' } },
  },
  {
    method: 'GET',
    path: '/api/items',
    auth: true,
    desc: 'List all items (with Redis caching).',
    response: { data: [{ id: '...', name: '...', description: '...' }] },
  },
  {
    method: 'POST',
    path: '/api/items',
    auth: true,
    desc: 'Create a new item.',
    body: { name: 'string', description: 'string' },
    response: { message: 'Item created', item: { id: '...' } },
  },
  {
    method: 'GET',
    path: '/api/items/:id',
    auth: true,
    desc: 'Get a single item by ID.',
    response: { data: { id: '...', name: '...' } },
  },
  {
    method: 'PUT',
    path: '/api/items/:id',
    auth: true,
    desc: 'Update an existing item.',
    body: { name: 'string', description: 'string' },
    response: { message: 'Item updated', data: { id: '...' } },
  },
  {
    method: 'DELETE',
    path: '/api/items/:id',
    auth: true,
    desc: 'Delete an item.',
    response: { message: 'Item deleted successfully' },
  },
  {
    method: 'GET',
    path: '/api/health',
    auth: false,
    desc: 'Health check endpoint.',
    response: { status: 'ok', timestamp: '2025-01-01T00:00:00.000Z' },
  },
];

export default function ApiPage() {
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
          <Link href="/docs" className="flex items-center gap-1.5 text-xs text-[#666] hover:text-white transition-colors">
            <ArrowLeft size={12} /> Docs
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            <span className="accent-gradient">API Reference</span>
          </h1>
          <p className="text-[#a0a0a0]">Base URL: <span className="font-mono text-white">http://localhost:3000/api</span></p>
        </div>

        <div className="space-y-3">
          {endpoints.map((ep) => (
            <div key={ep.path} className="glass rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    ep.method === 'GET' ? 'text-green-400 bg-green-400/10' :
                    ep.method === 'POST' ? 'text-blue-400 bg-blue-400/10' :
                    ep.method === 'PUT' ? 'text-yellow-400 bg-yellow-400/10' :
                    'text-red-400 bg-red-400/10'
                  }`}>{ep.method}</span>
                  <code className="text-sm font-mono text-white">{ep.path}</code>
                </div>
                {ep.auth && <span className="text-xs text-[#666]">🔒 Auth</span>}
              </div>
              <p className="text-xs text-[#a0a0a0] mb-3">{ep.desc}</p>
              {ep.body && (
                <div className="mb-2">
                  <div className="text-xs text-[#666] mb-1">Request body:</div>
                  <pre className="text-xs font-mono text-[#a0a0a0] bg-white/[0.02] rounded p-2">{JSON.stringify(ep.body, null, 2)}</pre>
                </div>
              )}
              <div>
                <div className="text-xs text-[#666] mb-1">Response:</div>
                <pre className="text-xs font-mono text-[#a0a0a0] bg-white/[0.02] rounded p-2">{JSON.stringify(ep.response, null, 2)}</pre>
              </div>
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
