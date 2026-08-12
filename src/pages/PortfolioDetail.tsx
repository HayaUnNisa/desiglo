import { useState, useEffect } from 'react';
import { Check, Send } from 'lucide-react';
import { navigate } from '../hooks/useHashRouter';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Reveal, Container, Pill, GlassCard, Btn, Breadcrumbs, LoadingState, ErrorState } from '../components/ui';
import { AmbientScrim } from '../components/ThreeBackground';
import { portfolioData } from '../data/portfolio';

/* ============================================================
   PAGE: PORTFOLIO DETAIL
   ============================================================ */
export function PortfolioDetailPage({ slug }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, [slug]);
  const project = portfolioData.find((p) => p.slug === slug);
  useDocumentHead(project ? project.title : 'Case Study Not Found', project ? project.shortDescription : undefined);

  if (loading) return <div className="pt-16"><LoadingState label="Loading case study\u2026" /></div>;
  if (!project) {
    return (
      <Container style={{ paddingTop: '64px' }}>
        <ErrorState title="Case study not found" message="This project may have been renamed or removed." onRetry={() => navigate('/portfolio')} retryLabel="Back to Portfolio" />
      </Container>
    );
  }

  return (
    <div className="relative pt-16 pb-24 px-6">
      <AmbientScrim opacity={0.25} />
      <Container className="relative" style={{ zIndex: 1 }}>
        <Breadcrumbs items={[{ label: 'Home', onClick: () => navigate('/') }, { label: 'Portfolio', onClick: () => navigate('/portfolio') }, { label: project.title }]} />
        <Reveal>
          <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '32px', aspectRatio: '21/9', background: '#18181b' }}>
            <img src={project.previewImage} alt={`${project.title} preview`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center gap-3" style={{ marginBottom: '16px' }}>
            <Pill>{project.projectType}</Pill>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{project.industry}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', marginBottom: '16px', fontWeight: 400 }}>{project.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.7, maxWidth: '640px', marginBottom: '40px' }}>{project.description}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginBottom: '40px' }}>
          <Reveal>
            <GlassCard style={{ padding: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#fff', marginBottom: '14px', fontWeight: 400 }}>Goals</h2>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.goals.map((g) => <li key={g} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}><Check className="w-4 h-4" aria-hidden="true" style={{ color: '#34d399', flexShrink: 0, marginTop: '1px' }} /><span>{g}</span></li>)}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard style={{ padding: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#fff', marginBottom: '14px', fontWeight: 400 }}>Approach</h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{project.approach}</p>
            </GlassCard>
          </Reveal>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <Reveal>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#fff', marginBottom: '16px', fontWeight: 400 }}>Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.gallery.map((src, i) => (
                  <div key={src} style={{ borderRadius: '14px', overflow: 'hidden', aspectRatio: '4/3', background: '#18181b' }}>
                    <img src={src} alt={`${project.title} detail ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <Reveal>
          <GlassCard style={{ padding: '28px', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#fff', marginBottom: '16px', fontWeight: 400 }}>Notable features</h2>
            <div className="flex flex-wrap gap-2">{project.features.map((f) => <span key={f} className="meta-tag">{f}</span>)}</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>{project.colorPalette.map((c) => <span key={c} title={c} style={{ width: '28px', height: '28px', borderRadius: '8px', background: c, border: '1px solid rgba(255,255,255,0.15)' }} />)}</div>
          </GlassCard>
        </Reveal>

        <Reveal>
          <GlassCard strong style={{ padding: '36px', textAlign: 'center', borderRadius: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', marginBottom: '12px', fontWeight: 400 }}>Want something like this?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', maxWidth: '420px', margin: '0 auto 24px' }}>Tell me about your business and I\u2019ll scope a project inspired by this direction.</p>
            <Btn icon={Send} onClick={() => navigate('/project-request')}>Start a Project</Btn>
          </GlassCard>
        </Reveal>
      </Container>
    </div>
  );
}

