'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Sparkles } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import { useSessionStorage } from '@/hooks/useSessionStorage';

const terminalLines = [
  { text: '$ npx express-builder init', delay: 800, type: 'command' },
  { text: '', delay: 300, type: 'empty' },
  { text: '? Choose Database', delay: 500, type: 'prompt' },
  { text: '❯ MongoDB', delay: 400, type: 'selected' },
  { text: '  PostgreSQL', delay: 200, type: 'option' },
  { text: '', delay: 300, type: 'empty' },
  { text: '✔ JWT Authentication Enabled', delay: 600, type: 'success' },
  { text: '✔ Rate Limiting Enabled', delay: 500, type: 'success' },
  { text: '✔ API Generator Enabled', delay: 500, type: 'success' },
  { text: '', delay: 400, type: 'empty' },
  { text: 'Generating project...', delay: 800, type: 'info' },
  { text: '', delay: 300, type: 'empty' },
  { text: '✓ Routes Created', delay: 400, type: 'success' },
  { text: '✓ Controllers Created', delay: 300, type: 'success' },
  { text: '✓ Models Created', delay: 300, type: 'success' },
  { text: '✓ Tests Created', delay: 300, type: 'success' },
  { text: '', delay: 400, type: 'empty' },
  { text: 'Project Generated Successfully 🚀', delay: 600, type: 'complete' },
];

const typeText = [
  'Generate Express.js Backends',
  'Without Boilerplate',
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentTypeLine, setCurrentTypeLine] = useState(0);
  const [currentTypeText, setCurrentTypeText] = useState('');
  const terminalRef = useRef(null);
  const terminalContainerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cliState, setCliState] = useSessionStorage('cli-state', null);

  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    if (lineIndex >= terminalLines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines([]);
        setLineIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const line = terminalLines[lineIndex];
    const timeout = setTimeout(() => {
      setVisibleLines((prev) => [...prev, { ...line, id: lineIndex }]);
      setLineIndex((i) => i + 1);
    }, line.delay);

    return () => clearTimeout(timeout);
  }, [lineIndex]);

  useEffect(() => {
    if (currentTypeLine >= typeText.length) return;
    const target = typeText[currentTypeLine];
    if (charIndex < target.length) {
      const timeout = setTimeout(() => {
        setCurrentTypeText((prev) => prev + target[charIndex]);
        setCharIndex((i) => i + 1);
      }, 40 + Math.random() * 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentTypeText('');
        setCharIndex(0);
        setCurrentTypeLine((i) => i + 1);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentTypeLine]);

  useEffect(() => {
    if (!terminalContainerRef.current) return;
    gsap.fromTo(
      terminalContainerRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 0.5, ease: 'power4.out' }
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleBackground />

      <div className="absolute inset-0 gradient-glow opacity-40" />

      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6"
            >
              <Sparkles size={14} className="text-accent" />
              <span className="text-xs text-accent font-medium">Visual Express.js Scaffolding</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              {currentTypeLine > 0 && (
                <span className="text-[#a0a0a0] font-light block">{typeText[0]}</span>
              )}
              <span className="accent-gradient block mt-2">
                {currentTypeText}
                <span className="inline-block w-[3px] h-[0.8em] bg-accent ml-1 animate-blink align-middle" />
              </span>
              {currentTypeLine === 0 && !currentTypeText && (
                <span className="accent-gradient block mt-2">
                  <span className="inline-block w-[3px] h-[0.8em] bg-accent ml-1 animate-blink align-middle" />
                </span>
              )}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg sm:text-xl text-[#a0a0a0] max-w-lg mb-8 leading-relaxed"
            >
              Build APIs faster with authentication, database setup, middleware, testing, and project structure generated automatically.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => {
                  try { sessionStorage.setItem('cta-click', 'hero-launch'); } catch {}
                  document.querySelector('#builder')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary text-base"
              >
                Launch Builder
                <ArrowRight size={18} />
              </button>
              <a
                href="https://github.com/punit-mistry/Express_builder_app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-base"
                onClick={() => { try { sessionStorage.setItem('cta-click', 'hero-github'); } catch {} }}
              >
                <Github size={18} />
                View GitHub
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center gap-6 mt-10 text-sm text-[#a0a0a0]"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-gradient-to-br from-accent/40 to-accent/20"
                  />
                ))}
              </div>
              <span>Trusted by <strong className="text-white">500+</strong> developers</span>
            </motion.div>
          </motion.div>

          <motion.div
            ref={terminalContainerRef}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 3}deg) rotateX(${-mousePos.y * 3}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="absolute -inset-4 bg-accent/5 rounded-2xl blur-2xl" />
            <div className="relative rounded-xl overflow-hidden glass border border-white/[0.08] shadow-2xl">
              <div className="relative">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs text-[#a0a0a0] ml-2 terminal-text">terminal — express-builder</span>
                </div>
                <div ref={terminalRef} className="p-5 font-mono text-sm leading-6 min-h-[320px] max-h-[380px] overflow-hidden">
                  {visibleLines.map((line, i) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`whitespace-pre-wrap ${
                        line.type === 'command' ? 'text-white' :
                        line.type === 'prompt' ? 'text-accent' :
                        line.type === 'selected' ? 'text-white font-semibold' :
                        line.type === 'option' ? 'text-[#666]' :
                        line.type === 'success' ? 'text-green-400' :
                        line.type === 'info' ? 'text-yellow-400' :
                        line.type === 'complete' ? 'text-green-400 font-semibold' :
                        ''
                      }`}
                    >
                      {line.text}
                      {i === visibleLines.length - 1 && line.type !== 'empty' && (
                        <span className="inline-block w-2 h-4 bg-accent/80 ml-1 animate-blink" />
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="animate-scanline absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}
