'use client';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Full-Stack Developer',
    company: 'TechFlow',
    avatar: 'AC',
    content: 'Express Builder completely transformed how I scaffold backend projects. The JWT setup alone saves me at least 30 minutes per project. The generated code is production-ready and follows best practices.',
    rating: 5,
  },
  {
    name: 'Sarah Williams',
    role: 'Backend Engineer',
    company: 'DataSync',
    avatar: 'SW',
    content: 'The database integration is seamless. I can go from idea to a working API with MongoDB in under 2 minutes. The project structure is exactly what I would set up manually, but done instantly.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Independent Developer',
    company: 'BuildLab',
    avatar: 'MJ',
    content: 'I have tried many scaffolding tools, but Express Builder is the only one that generates clean, maintainable code. The testing setup with Jest and Supertest is a game-changer for my workflow.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Tech Lead',
    company: 'CloudScale',
    avatar: 'PP',
    content: 'We use Express Builder for all our Node.js microservices. Consistency across projects, built-in best practices, and the API generator dramatically reduces our development time.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">
            Loved by{' '}
            <span className="accent-gradient">Developers</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            See what developers are saying about Express Builder.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass glass-hover rounded-xl p-6 flex flex-col"
            >
              <Quote size={20} className="text-accent/30 mb-4" />
              <p className="text-sm text-[#a0a0a0] leading-relaxed mb-6 flex-1">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={12} className="text-accent fill-accent" />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-xs font-semibold text-accent">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-[#666]">{t.role}, {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
