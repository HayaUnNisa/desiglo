import { useState } from 'react';
import { navigate } from '../hooks/useHashRouter';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Reveal, Container, Pill, EmptyState, PortfolioCard } from '../components/ui';
import { AmbientScrim } from '../components/ThreeBackground';
import { portfolioData } from '../data/portfolio';

/* ============================================================
   PAGE: PORTFOLIO LISTING
   ============================================================ */
export function PortfolioPage() {
  useDocumentHead('Portfolio', 'Case studies of concept, portfolio, and client design projects.');
  const [filter, setFilter] = useState('All');
  const types = ['All', ...Array.from(new Set(portfolioData.map((p) => p.projectType)))];
  const filtered = filter === 'All' ? portfolioData : portfolioData.filter((p) => p.projectType === filter);

  return (
    <div className="relative pt-16 pb-24 px-6">
      <AmbientScrim opacity={0.25} />
      <Container className="relative" style={{ zIndex: 1 }}>
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Pill style={{ marginBottom: '16px', display: 'inline-block' }}>Case Studies</Pill>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#fff', marginBottom: '16px', fontWeight: 400 }}>Selected Design Work</h1>
            <p className="text-white/60 text-sm">Honestly labeled \u2014 concept explorations, self-directed portfolio pieces, and real client work are marked clearly.</p>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-10" role="group" aria-label="Filter by project type">
            {types.map((t) => (
              <button key={t} onClick={() => setFilter(t)} aria-pressed={filter === t} className="px-3.5 py-1.5 rounded-full text-xs font-medium" style={{ background: filter === t ? '#10B981' : 'transparent', color: filter === t ? '#04140F' : 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer' }}>{t}</button>
            ))}
          </div>
        </Reveal>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08}><PortfolioCard project={project} onDetail={() => navigate(`/portfolio/${project.slug}`)} /></Reveal>
            ))}
          </div>
        ) : <EmptyState title="No projects in this category yet" />}
      </Container>
    </div>
  );
}

