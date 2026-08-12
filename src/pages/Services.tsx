import { Check, Send } from 'lucide-react';
import { navigate } from '../hooks/useHashRouter';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Reveal, Container, Pill, GlassCard, Btn, ProcessTimeline } from '../components/ui';
import { AmbientScrim } from '../components/ThreeBackground';
import { servicesData } from '../data/services';

/* ============================================================
   PAGE: SERVICES
   ============================================================ */
export function ServicesPage() {
  useDocumentHead('Services', 'Full custom website design, redesigns, and ongoing website support.');
  return (
    <div className="relative pt-16 pb-24 px-6">
      <AmbientScrim opacity={0.25} />
      <Container className="relative" style={{ zIndex: 1 }}>
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Pill style={{ marginBottom: '16px', display: 'inline-block' }}>Services</Pill>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#fff', marginBottom: '16px', fontWeight: 400 }}>Three ways to work together</h1>
            <p className="text-white/60 text-sm">Every project is a paid design and development engagement, scoped specifically to your business.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginBottom: '80px' }}>
          {servicesData.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <GlassCard style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>{s.name}</h2>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', fontStyle: 'italic' }}>{s.tagline}</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '20px' }}>{s.description}</p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {s.included.map((f) => <li key={f} style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}><Check className="w-3.5 h-3.5" aria-hidden="true" style={{ color: '#34d399', flexShrink: 0, marginTop: '2px' }} /><span>{f}</span></li>)}
                  </ul>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginBottom: '20px' }}>Ideal for: {s.idealFor}</p>
                </div>
                <Btn size="sm" icon={Send} onClick={() => navigate('/project-request', { service: s.id })}>Start This Project</Btn>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal><div className="text-center mb-16"><h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: '#fff', fontWeight: 400 }}>How a project runs</h2></div></Reveal>
        <div style={{ marginBottom: '64px' }}><ProcessTimeline /></div>

        <Reveal>
          <GlassCard strong style={{ padding: '36px', textAlign: 'center', borderRadius: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', marginBottom: '12px', fontWeight: 400 }}>Not sure which service fits?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', maxWidth: '420px', margin: '0 auto 24px' }}>See representative pricing, or reach out with questions before submitting a request.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Btn onClick={() => navigate('/pricing')}>View Pricing</Btn>
              <Btn variant="ghost" onClick={() => navigate('/contact')}>Ask a Question</Btn>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </div>
  );
}

