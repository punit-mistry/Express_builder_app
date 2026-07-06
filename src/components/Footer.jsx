'use client';
import { Terminal, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Live Builder', href: '#builder' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Examples', href: '/docs/examples' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: 'https://github.com/punit-mistry' },
      { label: 'Twitter', href: 'https://x.com/punitmistry49' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/punit-mistry-404ba2220/' },
      { label: 'Contact', href: 'mailto:punitmistr@gmail.com' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="#" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <Terminal size={16} className="text-accent" />
              </div>
              <span className="text-base font-semibold">
                Express<span className="text-accent">Builder</span>
              </span>
            </a>
            <p className="text-sm text-[#666] leading-relaxed mb-4">
              Scaffold production-ready Express.js APIs in minutes. Visual builder, clean architecture, best practices.
            </p>
            <div className="flex gap-3">
              <a href="https://github.com/punit-mistry" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/[0.08] transition-colors">
                <Github size={14} className="text-[#a0a0a0]" />
              </a>
              <a href="https://x.com/punitmistry49" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/[0.08] transition-colors">
                <Twitter size={14} className="text-[#a0a0a0]" />
              </a>
              <a href="https://www.linkedin.com/in/punit-mistry-404ba2220/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/[0.08] transition-colors">
                <Linkedin size={14} className="text-[#a0a0a0]" />
              </a>
              <a href="mailto:punitmistr@gmail.com" className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/[0.08] transition-colors">
                <Mail size={14} className="text-[#a0a0a0]" />
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#666] hover:text-[#a0a0a0] transition-colors"
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#666] flex items-center gap-1">
            &copy; {new Date().getFullYear()} Express Builder. Made with <Heart size={10} className="text-red-500" /> for the developer community.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#666]">
            <a href="#" className="hover:text-[#a0a0a0] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#a0a0a0] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
