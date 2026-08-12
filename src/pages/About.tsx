import { navigate } from '../hooks/useHashRouter';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Reveal, Container, Pill, GlassCard, Btn, SectionHeader } from '../components/ui';
import { AmbientScrim } from '../components/ThreeBackground';
import { aboutValues as values } from '../data/about';

/* ============================================================
   PAGE: ABOUT
   ============================================================ */
export function AboutPage() {
  useDocumentHead('About', 'The studio behind the work \u2014 approach, values, and how projects are run.');
  return (
    <div className="relative pt-16 pb-24 px-6">
      <AmbientScrim opacity={0.25} />
      <Container className="relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" style={{ marginBottom: '64px' }}>
          <Reveal>
            <Pill style={{ marginBottom: '16px', display: 'inline-block' }}>About</Pill>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', marginBottom: '20px', fontWeight: 400 }}>A small studio, built around one clear point of view.</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>Desiglo designs and builds custom websites for businesses that want something distinctive, not a default template with a new logo dropped in.</p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.7 }}>The portfolio on this site exists to demonstrate range across industries \u2014 restaurants, real estate, healthcare, software \u2014 and to give visitors a concrete starting point for a conversation about their own site.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80" alt="Design studio workspace with a laptop and reference materials" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </Reveal>
        </div>

        <Reveal><SectionHeader eyebrow="Principles" title="How I work" /></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '64px' }}>
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <GlassCard style={{ padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>{v.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{v.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <GlassCard strong style={{ padding: '36px', textAlign: 'center', borderRadius: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', marginBottom: '12px', fontWeight: 400 }}>Let\u2019s talk about your project</h2>
            <div className="flex flex-wrap items-center justify-center gap-4" style={{ marginTop: '20px' }}>
              <Btn onClick={() => navigate('/project-request')}>Start a Project</Btn>
              <Btn variant="ghost" onClick={() => navigate('/contact')}>Contact Me</Btn>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </div>
  );
}

