'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, Copy, CheckCheck } from 'lucide-react';

const examples = [
  {
    title: 'MongoDB + JWT + Redis',
    desc: 'Full-featured API with authentication, database, and Redis caching.',
    config: { db: 'MongoDB', auth: true, apiGen: true, redis: true, middleware: ['CORS', 'Rate Limiting', 'Helmet', 'Compression'] },
    code: `// Generate with Express Builder:
// Select: MongoDB, JWT Auth, API Generator, Redis
// Middleware: CORS, Rate Limiting, Helmet, Compression

// src/app.js — Entry point
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes, DB, Redis, Auth — all auto-configured
app.listen(3000);`,
  },
  {
    title: 'PostgreSQL + API Generator',
    desc: 'REST API with PostgreSQL and auto-generated CRUD endpoints.',
    config: { db: 'PostgreSQL', auth: false, apiGen: true, redis: false, middleware: ['CORS'] },
    code: `// Generate with Express Builder:
// Select: PostgreSQL, API Generator
// Middleware: CORS

// src/config/database.js
const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'express_api',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

// Auto-creates 'items' table on startup
// CRUD routes at /api/items`,
  },
  {
    title: 'Minimal Express Server',
    desc: 'Lightweight server with just CORS and JSON parsing.',
    config: { db: 'MongoDB', auth: false, apiGen: false, redis: false, middleware: ['CORS'] },
    code: `// Generate with Express Builder:
// Select: MongoDB only
// Middleware: CORS

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3000);`,
  },
];

export default function ExamplesPage() {
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
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            <span className="accent-gradient">Examples</span>
          </h1>
          <p className="text-[#a0a0a0] max-w-2xl mx-auto">
            Ready-to-use configurations for common Express.js setups.
          </p>
        </div>

        <div className="space-y-6">
          {examples.map((ex, i) => (
            <ExampleCard key={i} example={ex} index={i} />
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

function ExampleCard({ example, index }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">{example.title}</h2>
          <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs glass px-2.5 py-1 rounded hover:bg-white/[0.08] transition-colors text-[#a0a0a0] hover:text-white">
            {copied ? <CheckCheck size={12} className="text-green-400" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-sm text-[#a0a0a0] mb-3">{example.desc}</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(example.config).map(([key, val]) => (
            <span key={key} className="text-xs px-2 py-0.5 rounded glass text-[#a0a0a0]">
              {key}: {typeof val === 'boolean' ? (val ? '✓' : '✗') : Array.isArray(val) ? val.join(', ') : val}
            </span>
          ))}
        </div>
      </div>
      <pre className="p-4 text-sm font-mono leading-6 overflow-x-auto bg-white/[0.01]">
        <code className="text-[#a0a0a0]">{example.code}</code>
      </pre>
    </div>
  );
}
