import { navigate } from '../hooks/useHashRouter';
import { Container } from './ui';

export function FooterCol({ title, links }) {
  return (
    <div>
      <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '14px' }}>{title}</h3>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {links.map((l) => (
          <li key={l.path}><button onClick={() => navigate(l.path)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.65)', fontSize: '13px', padding: 0 }}>{l.label}</button></li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '40px' }}>
      <Container wide style={{ padding: '64px 24px 32px' }}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8" style={{ marginBottom: '48px' }}>
          <div style={{ gridColumn: 'span 2' }} className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#10B981', color: '#04140F' }}><Sparkles className="w-3 h-3" aria-hidden="true" /></div>
              <span className="font-medium text-sm text-white">Desi<span style={{ color: '#34D399' }}>glo</span></span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '220px' }}>Custom website design and development for businesses that want something built specifically for them.</p>
          </div>
          <FooterCol title="Explore" links={[{ path: '/', label: 'Home' }, { path: '/portfolio', label: 'Portfolio' }, { path: '/services', label: 'Services' }]} />
          <FooterCol title="Studio" links={[{ path: '/services', label: 'Services' }, { path: '/pricing', label: 'Pricing' }, { path: '/about', label: 'About' }]} />
          <FooterCol title="Support" links={[{ path: '/faq', label: 'FAQ' }, { path: '/contact', label: 'Contact' }, { path: '/project-request', label: 'Start a Project' }]} />
          <FooterCol title="Legal" links={[{ path: '/privacy', label: 'Privacy Policy' }, { path: '/terms', label: 'Terms of Service' }, { path: '/refund-policy', label: 'Refund Policy' }, { path: '/cookies', label: 'Cookies' }]} />
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
          <span>\u00A9 {new Date().getFullYear()} Desiglo. Portfolio work shown is demonstration work.</span>
          <span>Built with React &amp; Tailwind CSS</span>
        </div>
      </Container>
    </footer>
  );
}
