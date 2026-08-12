import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ArrowUpRight } from 'lucide-react';
import { navigate } from '../hooks/useHashRouter';
import { Btn } from './ui';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Services', path: '/services' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => (path === '/' ? active === 'home' : active === path.replace('/', ''));

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, padding: '16px 16px 0' }}>
      <div className={`max-w-4xl mx-auto rounded-full flex items-center justify-between transition-all duration-500 ${scrolled ? 'liquid-glass-strong' : 'liquid-glass'}`} style={{ padding: '10px 20px' }}>
        <button onClick={() => navigate('/')} className="flex items-center gap-2.5" style={{ background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Desiglo home">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#10B981', color: '#04140F' }}><Sparkles className="w-3.5 h-3.5" aria-hidden="true" /></div>
          <span className="font-medium text-sm tracking-tight text-white">Desi<span style={{ color: '#34D399' }}>glo</span></span>
        </button>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <button
              key={l.path} onClick={() => navigate(l.path)} aria-current={isActive(l.path) ? 'page' : undefined}
              className="px-3 py-1.5 text-xs font-medium transition-colors duration-300"
              style={{ background: isActive(l.path) ? 'rgba(16,185,129,0.15)' : 'transparent', borderRadius: '9999px', border: 'none', cursor: 'pointer', color: isActive(l.path) ? '#34D399' : 'rgba(255,255,255,0.7)' }}
            >
              {l.name}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <Btn size="sm" icon={ArrowUpRight} onClick={() => navigate('/project-request')}>Start a Project</Btn>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white/80" style={{ background: 'none', border: 'none', cursor: 'pointer' }} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-3 max-w-4xl mx-auto rounded-2xl liquid-glass-strong p-6">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <button key={l.path} onClick={() => { navigate(l.path); setMobileOpen(false); }} aria-current={isActive(l.path) ? 'page' : undefined} className="text-base font-medium text-left" style={{ background: 'none', border: 'none', cursor: 'pointer', color: isActive(l.path) ? '#fff' : 'rgba(255,255,255,0.6)' }}>
                {l.name}
              </button>
            ))}
            <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '8px 0' }} />
            <Btn onClick={() => { navigate('/project-request'); setMobileOpen(false); }} style={{ width: '100%' }}>Start a Project</Btn>
          </nav>
        </div>
      )}
    </header>
  );
}
