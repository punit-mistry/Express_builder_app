'use client';
import { motion } from 'framer-motion';
import { FolderOpen, File, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const treeData = [
  { name: 'src/', type: 'folder', depth: 0 },
  { name: '├── controllers/', type: 'folder', depth: 0 },
  { name: '│   ├── auth.controller.js', type: 'file', depth: 0 },
  { name: '│   └── user.controller.js', type: 'file', depth: 0 },
  { name: '├── routes/', type: 'folder', depth: 0 },
  { name: '│   ├── auth.routes.js', type: 'file', depth: 0 },
  { name: '│   ├── user.routes.js', type: 'file', depth: 0 },
  { name: '│   └── index.js', type: 'file', depth: 0 },
  { name: '├── middleware/', type: 'folder', depth: 0 },
  { name: '│   ├── auth.middleware.js', type: 'file', depth: 0 },
  { name: '│   ├── errorHandler.js', type: 'file', depth: 0 },
  { name: '│   └── validate.js', type: 'file', depth: 0 },
  { name: '├── models/', type: 'folder', depth: 0 },
  { name: '│   ├── User.model.js', type: 'file', depth: 0 },
  { name: '│   └── index.js', type: 'file', depth: 0 },
  { name: '├── services/', type: 'folder', depth: 0 },
  { name: '│   ├── auth.service.js', type: 'file', depth: 0 },
  { name: '│   └── user.service.js', type: 'file', depth: 0 },
  { name: '├── tests/', type: 'folder', depth: 0 },
  { name: '│   ├── auth.test.js', type: 'file', depth: 0 },
  { name: '│   └── user.test.js', type: 'file', depth: 0 },
  { name: '├── config/', type: 'folder', depth: 0 },
  { name: '│   ├── database.js', type: 'file', depth: 0 },
  { name: '│   └── env.js', type: 'file', depth: 0 },
  { name: '└── app.js', type: 'file', depth: 0 },
];

export default function FileTreeShowcase() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading mb-4">
              Clean Architecture,{' '}
              <span className="accent-gradient">Every Time</span>
            </h2>
            <p className="section-subheading mb-8">
              Every project follows a consistent, modular structure that scales from prototype to production.
              No more guessing where files go.
            </p>
            <ul className="space-y-3">
              {[
                'Separation of concerns from day one',
                'Ready for team collaboration',
                'Easy to extend and maintain',
                'Follows industry best practices',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm text-[#a0a0a0]"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
              <FolderOpen size={14} className="text-accent" />
              <span className="text-xs text-[#a0a0a0] font-mono">express-api/</span>
            </div>
            <div className="p-5 font-mono text-sm leading-7">
              {treeData.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                  className={`flex items-center gap-2 ${
                    item.type === 'folder' ? 'text-white/80' : 'text-[#a0a0a0]'
                  }`}
                >
                  {item.type === 'folder' ? (
                    <ChevronRight size={10} className="text-accent shrink-0" />
                  ) : (
                    <span className="w-[10px] shrink-0" />
                  )}
                  <span>{item.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
