import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Send, Check } from 'lucide-react';
import { navigate } from '../hooks/useHashRouter';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { Reveal, SectionHeader, GlassCard, Pill, Btn, Accordion, PortfolioCard, ProcessTimeline } from '../components/ui';
import { AmbientScrim } from '../components/ThreeBackground';
import { portfolioData } from '../data/portfolio';
import { faqItems } from '../data/faq';

/* ============================================================
   PAGE: HOME
   ============================================================ */
export function HomePage() {
  useDocumentHead('Home', 'Custom website design and development studio building distinctive sites for modern businesses.');
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [heroIn, setHeroIn] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => { const t = setTimeout(() => setHeroIn(true), 50); return () => clearTimeout(t); }, []);
  const heroStyle = (ms) => ({
    opacity: (reduced || heroIn) ? 1 : 0,
    transform: (reduced || heroIn) ? 'translateY(0px)' : 'translateY(16px)',
    transition: reduced ? 'none' : `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${ms}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${ms}ms`,
  });

  return (
    <div>
      <section className="relative w-full flex flex-col justify-center items-center px-6 pt-20 pb-20 overflow-hidden" style={{ minHeight: '88vh' }}>
        <AmbientScrim opacity={0.5} />
        <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center" style={{ zIndex: 1 }}>
          <div style={heroStyle(100)} className="mb-4">
            <Pill><span style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>Custom websites for modern businesses</span></Pill>
          </div>
          <h1 style={{ ...heroStyle(200), fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 0.98, letterSpacing: '-0.02em', fontWeight: 400 }} className="max-w-3xl mb-6 title-gradient">
            Websites that make your business look worth choosing.
          </h1>
          <p style={heroStyle(350)} className="max-w-xl text-white/65 text-sm md:text-base leading-relaxed mb-8">
            I design and build custom websites from scratch \u2014 no templates, no lookalikes. Just something built specifically around your business.
          </p>
          <div style={heroStyle(450)} className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Btn size="lg" icon={ArrowRight} onClick={() => navigate('/project-request')}>Start a Project</Btn>
            <Btn size="lg" variant="ghost" onClick={() => navigate('/portfolio')}>View Portfolio</Btn>
          </div>
          <div style={heroStyle(600)}>
            {!emailOpen ? (
              <button onClick={() => setEmailOpen(true)} className="text-xs text-white/50 hover:text-white/80 transition-colors flex items-center gap-1.5" style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                <Sparkles className="w-3 h-3 text-white/40" aria-hidden="true" /><span>Get notified about new work and availability</span>
              </button>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (emailInput.trim()) setSubmitted(true); }} className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full w-full" style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.6)', maxWidth: '340px' }}>
                {!submitted ? (
                  <>
                    <label htmlFor="home-email" className="sr-only">Email address</label>
                    <input id="home-email" type="email" required placeholder="Enter email for updates..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="bg-transparent text-xs text-white w-full" style={{ border: 'none', outline: 'none' }} />
                    <button type="submit" className="rounded-full p-1.5" style={{ background: '#10B981', color: '#04140F', border: 'none', cursor: 'pointer' }} aria-label="Subscribe"><Send className="w-3.5 h-3.5" /></button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-xs w-full justify-center" style={{ color: '#34d399', padding: '2px 8px' }}><Check className="w-3.5 h-3.5" /><span>You're on the list (demo mode)</span></div>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative max-w-4xl mx-auto">
        <Reveal><SectionHeader title="Choose the right way to start" subtitle="Whether you're launching something new or improving what's already live." /></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal delay={0.1}>
            <GlassCard style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <Pill style={{ marginBottom: '24px' }}>Option 01</Pill>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', margin: '0 0 12px', fontWeight: 400 }}>Website Redesign</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>Already have a site that feels dated or underperforms? Keep what works and rebuild what doesn\u2019t.</p>
              </div>
              <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>UX audit included</span>
                <Btn size="sm" icon={ArrowRight} onClick={() => navigate('/project-request', { service: 'redesign' })}>Request Redesign</Btn>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.2}>
            <GlassCard style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <Pill style={{ marginBottom: '24px' }}>Option 02</Pill>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', margin: '0 0 12px', fontWeight: 400 }}>Custom Website Design</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>Get a completely original website designed around your business, audience, and growth goals from the ground up.</p>
              </div>
              <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Tailored 1-on-1 service</span>
                <Btn size="sm" variant="ghost" icon={ArrowRight} onClick={() => navigate('/project-request', { service: 'custom' })}>Request Custom Site</Btn>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="py-20 px-6 relative max-w-4xl mx-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Reveal><SectionHeader eyebrow="Case Studies" title="Selected Design Work" action={<Btn variant="ghost" size="sm" icon={ArrowRight} onClick={() => navigate('/portfolio')}>View Portfolio</Btn>} /></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}><PortfolioCard project={project} onDetail={() => navigate(`/portfolio/${project.slug}`)} /></Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 relative max-w-3xl mx-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Reveal><div className="text-center mb-16"><h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: '#fff', fontWeight: 400 }}>The Design Process</h2><p className="text-white/60 text-sm mt-3">Clear, structured execution from discovery to launch.</p></div></Reveal>
        <ProcessTimeline />
      </section>

      <section className="py-20 px-6 relative max-w-2xl mx-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Reveal><h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: '#fff', textAlign: 'center', marginBottom: '48px', fontWeight: 400 }}>Frequently Asked Questions</h2></Reveal>
        <Accordion items={faqItems.slice(0, 4)} />
        <div style={{ textAlign: 'center', marginTop: '24px' }}><Btn variant="ghost" size="sm" onClick={() => navigate('/faq')}>View all FAQs</Btn></div>
      </section>

      <section className="py-20 px-6 relative max-w-4xl mx-auto text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Reveal>
          <GlassCard strong style={{ padding: '56px 32px', position: 'relative', overflow: 'hidden', borderRadius: '24px' }}>
            <AmbientScrim opacity={0.3} blurred />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#fff', marginBottom: '20px', fontWeight: 400 }}>Ready to launch a better website?</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.6 }}>Tell me about your business and I\u2019ll scope a custom build.</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Btn onClick={() => navigate('/project-request')}>Start a Project</Btn>
                <Btn variant="ghost" onClick={() => navigate('/portfolio')}>View Portfolio</Btn>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </section>
    </div>
  );
}

