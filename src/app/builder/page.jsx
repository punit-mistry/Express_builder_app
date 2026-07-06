'use client';
import Link from 'next/link';
import { ArrowLeft, Terminal, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import BuilderCore from '@/components/BuilderCore';

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <ArrowLeft size={16} className="text-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Terminal size={14} className="text-accent" />
                </div>
                <span className="text-base font-semibold tracking-tight">
                  Express<span className="text-accent">Builder</span>
                </span>
              </div>
            </Link>
            <span className="text-xs text-[#666] font-mono">v1.0.0 — Code Generator</span>
          </div>
        </div>
      </nav>

      <main className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Express.js{' '}
              <span className="accent-gradient">Code Generator</span>
            </h1>
            <p className="text-[#a0a0a0] max-w-2xl mx-auto">
              Configure your project — database, auth, middleware, caching — and get production-ready Express.js code instantly. Copy it with one click.
            </p>
          </div>
        </div>

        <BuilderCore compact />
      </main>

      <footer className="border-t border-white/[0.06] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="https://github.com/punit-mistry" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg glass flex items-center justify-center hover:bg-white/[0.08] transition-colors">
              <Github size={12} className="text-[#a0a0a0]" />
            </a>
            <a href="https://x.com/punitmistry49" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg glass flex items-center justify-center hover:bg-white/[0.08] transition-colors">
              <Twitter size={12} className="text-[#a0a0a0]" />
            </a>
            <a href="https://www.linkedin.com/in/punit-mistry-404ba2220/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg glass flex items-center justify-center hover:bg-white/[0.08] transition-colors">
              <Linkedin size={12} className="text-[#a0a0a0]" />
            </a>
            <a href="mailto:punitmistr@gmail.com" className="w-7 h-7 rounded-lg glass flex items-center justify-center hover:bg-white/[0.08] transition-colors">
              <Mail size={12} className="text-[#a0a0a0]" />
            </a>
          </div>
          <p className="text-xs text-[#666]">
            &copy; {new Date().getFullYear()} Express Builder
          </p>
          <Link href="/" className="text-xs text-accent hover:underline">
            &larr; Back to Landing Page
          </Link>
        </div>
      </footer>
    </div>
  );
}
