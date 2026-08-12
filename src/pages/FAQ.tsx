import { navigate } from '../hooks/useHashRouter';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Reveal, Container, Pill, GlassCard, Btn, Accordion } from '../components/ui';
import { AmbientScrim } from '../components/ThreeBackground';
import { faqItems } from '../data/faq';

/* ============================================================
   PAGE: FAQ
   ============================================================ */
export function FAQPage() {
  useDocumentHead('FAQ', 'Answers about working together and pricing.');
  const categories = Array.from(new Set(faqItems.map((f) => f.category)));
  return (
    <div className="relative pt-16 pb-24 px-6">
      <AmbientScrim opacity={0.25} />
      <Container className="relative" style={{ zIndex: 1, maxWidth: '720px' }}>
        <Reveal>
          <div className="text-center mb-16">
            <Pill style={{ marginBottom: '16px', display: 'inline-block' }}>FAQ</Pill>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,5vw,3rem)', color: '#fff', fontWeight: 400 }}>Frequently Asked Questions</h1>
          </div>
        </Reveal>
        {categories.map((cat, ci) => (
          <Reveal key={cat} delay={ci * 0.06}>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>{cat}</h2>
              <Accordion items={faqItems.filter((f) => f.category === cat)} />
            </div>
          </Reveal>
        ))}
        <Reveal>
          <GlassCard style={{ padding: '28px', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '16px' }}>Have another question?</p>
            <Btn variant="ghost" onClick={() => navigate('/contact')}>Contact Me</Btn>
          </GlassCard>
        </Reveal>
      </Container>
    </div>
  );
}

