'use client';
import { motion } from 'framer-motion';
import { Settings, Sparkles, Rocket } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const steps = [
  {
    icon: Settings,
    number: '01',
    title: 'Configure',
    description: 'Choose your database, select authentication, enable features, and customize middleware — all through an intuitive interface.',
    details: ['Choose database', 'Select authentication', 'Enable features', 'Configure middleware'],
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'Generate',
    description: 'Express Builder creates the complete project structure with routes, controllers, models, services, and tests.',
    details: ['Scaffold project', 'Generate code', 'Configure tools', 'Setup testing'],
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Launch',
    description: 'Run npm install and start building immediately. Your production-ready Express API is ready to go.',
    details: ['Install dependencies', 'Configure env', 'Run dev server', 'Start building'],
  },
];

export default function HowItWorks() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">
            From Idea to API in{' '}
            <span className="accent-gradient">Three Steps</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Get from concept to production in minutes, not hours.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass rounded-xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold text-accent/30">{step.number}</span>
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <step.icon size={20} className="text-accent" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-[#a0a0a0] mb-6 leading-relaxed">{step.description}</p>

                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <motion.li
                        key={detail}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 + 0.3 }}
                        className="flex items-center gap-2 text-sm text-[#a0a0a0]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px bg-accent/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
