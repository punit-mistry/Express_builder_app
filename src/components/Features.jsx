'use client';
import { motion } from 'framer-motion';
import { Terminal, Shield, Database, Code2, TestTube, GitBranch } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon: Terminal,
    title: 'Interactive CLI',
    description: 'Dynamic question flow with intelligent project configuration. Smart defaults and real-time validation.',
    gradient: 'from-accent/20 to-accent/5',
  },
  {
    icon: Shield,
    title: 'JWT Authentication',
    description: 'Pre-configured authentication system with secure defaults, refresh tokens, and role-based access control.',
    gradient: 'from-blue-500/20 to-blue-500/5',
  },
  {
    icon: Database,
    title: 'Database Setup',
    description: 'MongoDB and PostgreSQL integration using environment variables. Connection pooling and migration support.',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    icon: Code2,
    title: 'API Generator',
    description: 'Automatically generate routes, controllers, services, and validation with full TypeScript support.',
    gradient: 'from-purple-500/20 to-purple-500/5',
  },
  {
    icon: TestTube,
    title: 'Testing Suite',
    description: 'Generate Jest and Supertest configurations automatically. Integration and unit tests included.',
    gradient: 'from-orange-500/20 to-orange-500/5',
  },
  {
    icon: GitBranch,
    title: 'Git Integration',
    description: 'Initialize repositories with meaningful .gitignore, commitizen config, and project setup scripts.',
    gradient: 'from-pink-500/20 to-pink-500/5',
  },
];

export default function Features() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">
            Everything You Need to{' '}
            <span className="accent-gradient">Build APIs</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Production-ready features that save hours of configuration and boilerplate code.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass glass-hover rounded-xl p-6 group cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={22} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-[#a0a0a0] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
