import { navigate } from '../hooks/useHashRouter';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Container, Breadcrumbs } from '../components/ui';
import { LEGAL_CONTENT } from '../data/legal';
import { NotFoundPage } from './NotFound';

/* ============================================================
   PAGE: LEGAL (generic)
   ============================================================ */
export function LegalPage({ slug }) {
  const content = LEGAL_CONTENT[slug];
  useDocumentHead(content ? content.title : 'Not Found');
  if (!content) return <NotFoundPage />;
  return (
    <div className="relative pt-16 pb-24 px-6">
      <Container style={{ maxWidth: '680px' }}>
        <Breadcrumbs items={[{ label: 'Home', onClick: () => navigate('/') }, { label: content.title }]} />
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>{content.title}</h1>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '40px' }}>Last updated {content.updated}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {content.sections.map((s) => (
            <div key={s.heading}>
              <h2 style={{ fontSize: '15px', color: '#fff', marginBottom: '8px', fontWeight: 600 }}>{s.heading}</h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

