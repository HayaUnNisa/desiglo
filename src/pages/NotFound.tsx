import { Home as HomeIcon } from 'lucide-react';
import { navigate } from '../hooks/useHashRouter';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Container, Btn } from '../components/ui';

/* ============================================================
   PAGE: 404
   ============================================================ */
export function NotFoundPage() {
  useDocumentHead('Page Not Found');
  return (
    <Container style={{ paddingTop: '96px', paddingBottom: '96px', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '5rem', color: 'rgba(255,255,255,0.15)', lineHeight: 1, marginBottom: '8px' }}>404</p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#fff', marginBottom: '12px', fontWeight: 400 }}>Page not found</h1>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '28px' }}>The page you\u2019re looking for doesn\u2019t exist or may have moved.</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Btn icon={HomeIcon} iconPos="left" onClick={() => navigate('/')}>Back to Home</Btn>
        <Btn variant="ghost" onClick={() => navigate('/contact')}>Contact Me</Btn>
      </div>
    </Container>
  );
}

