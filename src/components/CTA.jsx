'use client';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Github } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Start Building{' '}
            <span className="accent-gradient">Express APIs</span> Faster
          </h2>
          <p className="text-lg text-[#a0a0a0] mb-8 max-w-2xl mx-auto">
            Join hundreds of developers who ship production-ready Express.js APIs in minutes.
            No boilerplate. No hassle. Just clean, scalable code.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => document.querySelector('#builder')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-base"
            >
              Launch Builder
              <ArrowRight size={18} />
            </button>
            <a
              href="/docs"
              className="btn-secondary text-base"
            >
              <BookOpen size={18} />
              View Documentation
            </a>
            <a
              href="https://github.com/punit-mistry"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base"
            >
              <Github size={18} />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
