'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import BuilderCore from './BuilderCore';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function LiveBuilder() {
  const [ref, isVisible] = useScrollAnimation({ margin: '-50px' });

  return (
    <section id="builder" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">
            Try the{' '}
            <span className="accent-gradient">Live Builder</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto mb-6">
            Configure your project visually and generate production-ready Express.js code instantly.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors"
          >
            Open standalone generator <ExternalLink size={14} />
          </Link>
        </motion.div>

        <BuilderCore />
      </div>
    </section>
  );
}
