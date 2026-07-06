'use client';
import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { value: 10000, suffix: '+', label: 'Projects Generated' },
  { value: 50000, suffix: '+', label: 'APIs Created' },
  { value: 500, suffix: '+', label: 'Developers' },
  { value: 999, suffix: '%', label: 'Reliability', prefix: '99.' },
];

function StatCard({ stat, index }) {
  const isSpecial = stat.value === 999;
  const [ref, count] = useCountUp(
    isSpecial ? 99 : stat.value,
    2000,
    stat.suffix
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-xl p-6 text-center"
    >
      <div className="text-3xl sm:text-4xl font-bold text-accent mb-2 font-mono">
        {isSpecial ? '99.' : ''}{count}
      </div>
      <div className="text-sm text-[#a0a0a0]">{stat.label}</div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
