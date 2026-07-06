'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft, ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is Express Builder?',
    a: 'Express Builder is a visual scaffolding tool that generates production-ready Express.js applications. It sets up authentication, database connections, middleware, testing, and API routes based on your configuration choices.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'Yes, you need Node.js installed. Then run npx express-builder init in your terminal. The tool will guide you through the configuration process and generate your project.',
  },
  {
    q: 'What databases are supported?',
    a: 'Express Builder supports MongoDB (via Mongoose) and PostgreSQL (via node-postgres). You can select your preferred database during the setup process.',
  },
  {
    q: 'Is JWT authentication included?',
    a: 'Yes, when you enable JWT Authentication, Express Builder generates complete register, login, and profile routes with bcrypt password hashing and JWT token management.',
  },
  {
    q: 'What is Redis used for?',
    a: 'Redis is used for caching API responses to improve performance. When enabled, GET requests are cached with configurable TTL, and caches are automatically invalidated on write operations.',
  },
  {
    q: 'Can I customize the generated code?',
    a: 'Absolutely. The generated code is yours to modify. Express Builder follows best practices and clean architecture principles, making it easy to extend and customize.',
  },
  {
    q: 'Does it generate tests?',
    a: 'Yes, Express Builder can generate Jest and Supertest configuration files along with basic test templates for your API endpoints.',
  },
  {
    q: 'Is there a GUI version?',
    a: 'Yes! Visit the Live Builder on our website to configure your project visually through an interactive dashboard before generating the code.',
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState(null);

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
            <span className="accent-gradient">FAQ</span>
          </h1>
          <p className="text-[#a0a0a0]">Frequently asked questions about Express Builder.</p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors">
                <span className="text-sm font-medium pr-4">{faq.q}</span>
                <ChevronDown size={14} className={`text-[#666] shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-4 pb-4 text-sm text-[#a0a0a0] leading-relaxed border-t border-white/[0.06] pt-3">
                  {faq.a}
                </div>
              )}
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
