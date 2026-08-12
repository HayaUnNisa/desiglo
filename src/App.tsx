// @ts-nocheck
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Menu, X, ArrowUpRight, Sparkles, ArrowRight, Send, Check,
  ChevronDown, Search, SlidersHorizontal, Monitor, Tablet, Smartphone, ArrowLeft,
  Mail, AlertCircle, Home as HomeIcon,
} from 'lucide-react';
import * as THREE from 'three';

/* ============================================================
   DATA
   ============================================================ */
const portfolioData = [
  {
    id: 'port-1', slug: 'northline-legal-concept', title: 'Northline Legal Advisory',
    industry: 'Legal Services', projectType: 'Concept Design',
    shortDescription: 'Self-initiated brand and website design concept for a contemporary corporate law firm.',
    description: 'This self-initiated concept project explores how corporate legal practices can move away from outdated typography and cluttered layouts toward an authoritative, ultra-refined dark editorial aesthetic.',
    goals: ['Create high-trust positioning for high-net-worth clients', 'Simplify complex practice-area breakdowns', 'Integrate a seamless consultation-booking path'],
    approach: 'Focused on high-contrast editorial typography (Instrument Serif paired with Inter), generous padding, and subtle glass accent cards to convey precision and authority.',
    features: ['Practice area explorer', 'Partner attorney profiles', 'Case study archive', 'Encrypted document portal shell'],
    colorPalette: ['#000000', '#18181B', '#F4F4F5', '#94A3B8'],
    typography: { heading: 'Instrument Serif', body: 'Inter' },
    previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'port-2', slug: 'luma-coffee-showcase', title: 'Luma Specialty Coffee',
    industry: 'Hospitality', projectType: 'Portfolio Project',
    shortDescription: 'Design exploration for a direct-trade coffee roastery with a subscription-style ordering flow.',
    description: 'A dedicated portfolio piece exploring tactile product presentation for artisanal coffee roasters — bag selector patterns, flavor profiles, and recurring delivery customization.',
    goals: ['Highlight origin storytelling and farmer partnerships', 'Prototype a coffee subscription builder UX', 'Keep image-heavy pages fast to load'],
    approach: 'Leaned into dark warm tones and minimal pill badges to map tasting notes (Jasmine, Bergamot, Cocoa) into an intuitive, scannable layout.',
    features: ['Flavor profile radar UI', 'Subscription builder grid', 'Roast level selector'],
    colorPalette: ['#050505', '#1C1917', '#F5F5F4', '#D97706'],
    typography: { heading: 'Instrument Serif', body: 'Inter' },
    previewImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'port-3', slug: 'solstice-yoga-studio', title: 'Solstice Yoga Studio',
    industry: 'Wellness', projectType: 'Client Project',
    shortDescription: 'A calm, class-booking-first website built for a boutique studio expanding to a second location.',
    description: 'Built for a real studio client preparing to open a second location. The brief called for a class schedule that felt inviting rather than clinical, and a way to introduce two instructor teams without doubling the navigation.',
    goals: ['Make the class schedule the first thing visitors understand', 'Introduce two locations without confusing navigation', 'Keep the tone warm without losing the dark cinematic system'],
    approach: 'Softened the palette with a warm sand accent against the dark base, and treated the schedule as the hero rather than burying it in a subpage.',
    features: ['Dual-location schedule switcher', 'Instructor profile grid', 'New-student intro pathway'],
    colorPalette: ['#0A0A0A', '#1A1714', '#F1EAE0', '#C9A876'],
    typography: { heading: 'Instrument Serif', body: 'Inter' },
    previewImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=900&q=80',
    ],
  },
];

const servicesData = [
  {
    id: 'custom', name: 'Full Custom Website Design & Development',
    tagline: 'A website built from the ground up around your business.',
    description: 'A complete design and build, shaped specifically around your goals and audience — discovery, information architecture, visual design, and development, all done from scratch.',
    included: ['Discovery & content strategy session', 'Custom UX architecture and wireframes', 'Fully original visual design system', 'Responsive development and launch support'],
    idealFor: 'Businesses that want a distinct identity, not a lookalike site.',
  },
  {
    id: 'redesign', name: 'Website Redesign & UX Audit',
    tagline: 'Modernize an existing site without starting over.',
    description: 'A structured review of what is and isn\u2019t working on your current site, followed by a redesign that keeps what performs and rebuilds what doesn\u2019t.',
    included: ['Full UX and content audit', 'Prioritized recommendations report', 'Redesigned key pages', 'Before/after comparison'],
    idealFor: 'Businesses with an existing site that feels dated or underperforms.',
  },
  {
    id: 'support', name: 'Ongoing Website Support',
    tagline: 'Keep your site current after launch.',
    description: 'Monthly design and development support for businesses that need new pages, content updates, and small improvements without starting a new project each time.',
    included: ['Priority turnaround on requests', 'New pages and content updates', 'Small feature additions', 'Monthly check-in on performance'],
    idealFor: 'Businesses with a site already live that keeps evolving.',
  },
];

const pricingTiers = [
  {
    id: 'starter', name: 'Starter Website', range: '$100 \u2013 $200',
    description: 'A Menu site for restaurants and cafes  .',
    features: ['Up to 2 pages', 'Fully custom design \u2014 no template base', '2 revision rounds', 'Launch support'],
  },
  {
    id: 'custom', name: 'Custom Website Design', range: '$500 \u2013 $1000', highlighted: true,
    description: 'A fully original site designed and built around your business.',
    features: ['Discovery & UX architecture', 'Fully custom visual design system', 'Up to 10 pages', '3 revision rounds', 'Launch support'],
  },
  {
    id: 'retainer', name: 'Custom', range: 'From $5,000',
    description: 'Ongoing design and development support for evolving businesses.',
    features: ['Everything in Custom Website Design', 'Priority scheduling', 'Ongoing updates & new pages', 'Quarterly design reviews'],
  },
];

const processSteps = [
  { step: '01', title: 'Discovery & Vision', desc: 'Understanding your business goals, audience, and desired aesthetic direction.' },
  { step: '02', title: 'Architecture & UX', desc: 'Planning content structure, conversion paths, and page-by-page wireframes.' },
  { step: '03', title: 'Visual Design', desc: 'Building the layout system, typography hierarchy, and interface details.' },
  { step: '04', title: 'Development & Launch', desc: 'Coding responsive pages, testing thoroughly, and launching live.' },
];

const faqItems = [
  { category: 'Working Together', q: 'Will my website work on mobile devices?', a: 'Every project is tested and optimized across mobile, tablet, and desktop before launch.' },
  { category: 'Working Together', q: 'How long does a project take?', a: 'A starter site typically takes 1\u20132 weeks. Full custom projects usually take 2\u20135 weeks depending on scope, content readiness, and revision rounds.' },
  { category: 'Working Together', q: 'What do you need from me to get started?', a: 'A short project request form is the first step \u2014 service type, a bit about your business, and a rough budget and timeline. From there I\u2019ll follow up with next steps.' },
  { category: 'Working Together', q: 'Can you redesign my existing site instead of starting over?', a: 'Yes \u2014 a Website Redesign & UX Audit keeps what\u2019s already working and rebuilds what isn\u2019t, rather than starting from a blank page.' },
  { category: 'Pricing', q: 'How is pricing determined?', a: 'Pricing depends on scope: page count, custom functionality, and revision rounds. The pricing page gives representative ranges; final pricing is confirmed after your request is reviewed.' },
  { category: 'Pricing', q: 'Do you require a deposit?', a: 'Yes, projects begin with a deposit, with the remainder due at agreed milestones. Details are covered in the Service Refund & Revision Policy.' },
];

const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy', updated: 'August 1, 2026',
    sections: [
      { heading: 'Information We Collect', body: 'When you submit the contact form or project request form, we collect the details you provide \u2014 such as your name, email, business name, and project information \u2014 solely to respond to your inquiry.' },
      { heading: 'How We Use Information', body: 'Submitted information is used only to evaluate and respond to your request. It is not sold or shared with third parties for marketing purposes.' },
      { heading: 'Cookies & Tracking', body: 'This site may use essential cookies required for basic functionality. See the Cookie Policy for details on what is used and how to manage preferences.' },
      { heading: 'Your Rights', body: 'You may request that any information you\u2019ve submitted be deleted at any time by reaching out through the contact form.' },
      { heading: 'Contact', body: 'Questions about this policy can be sent through the Contact page.' },
    ],
  },
  terms: {
    title: 'Terms of Service', updated: 'August 1, 2026',
    sections: [
      { heading: 'Use of This Site', body: 'This site is provided to showcase design work and to let visitors request custom website design and development services.' },
      { heading: 'Portfolio Content', body: 'Case studies and portfolio pieces shown on this site are demonstration work and remain the intellectual property of the studio. They are not licensed, sold, or made available for download or reproduction.' },
      { heading: 'Project Engagements', body: 'Custom project terms \u2014 including scope, pricing, timeline, and revisions \u2014 are confirmed individually once a project request is reviewed, before any work begins.' },
      { heading: 'Limitation of Liability', body: 'This site and its portfolio content are provided as-is. The studio is not liable for decisions made based on browsing this site alone, prior to a confirmed project agreement.' },
      { heading: 'Changes to These Terms', body: 'These terms may be updated periodically; the date above reflects the most recent revision.' },
    ],
  },
  'refund-policy': {
    title: 'Service Refund & Revision Policy', updated: 'August 1, 2026',
    sections: [
      { heading: 'Deposits', body: 'Projects begin with a deposit that secures your project slot and covers initial discovery work. Deposits are non-refundable once discovery has started.' },
      { heading: 'Milestone Payments', body: 'Remaining balances are billed at agreed project milestones. Completed milestones are non-refundable.' },
      { heading: 'Revisions', body: 'Each project tier includes a set number of revision rounds, listed on the Pricing page. Additional rounds can be added by agreement.' },
      { heading: 'Cancellations', body: 'If a project is cancelled before work begins beyond discovery, any payment made toward not-yet-started milestones is refunded in full.' },
    ],
  },
  cookies: {
    title: 'Cookie Policy', updated: 'August 1, 2026',
    sections: [
      { heading: 'Essential Cookies', body: 'This site may use a small number of essential cookies required for basic functionality, such as remembering your current page.' },
      { heading: 'Analytics', body: 'Aggregate, non-identifying analytics may be used to understand which pages are useful to visitors.' },
      { heading: 'Managing Preferences', body: 'Most browsers let you clear or block cookies through their settings menu.' },
      { heading: 'Questions', body: 'Reach out via the Contact page with any questions about cookie use.' },
    ],
  },
};

/* ============================================================
   HOOKS
   ============================================================ */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler));
  }, []);
  return reduced;
}

function useDebouncedValue(value, delay = 220) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function useDocumentHead(title, description) {
  useEffect(() => {
    document.title = title ? `${title} \u2014 Desiglo` : 'Desiglo \u2014 Web Design Studio & Development';
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}

function useInViewOnce(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ============================================================
   HASH ROUTER
   ============================================================ */
function parseHash() {
  let hash = window.location.hash || '#/';
  hash = hash.replace(/^#/, '');
  const [pathPart, queryPart] = hash.split('?');
  const segments = pathPart.split('/').filter(Boolean);
  const query = {};
  if (queryPart) {
    queryPart.split('&').forEach((pair) => {
      const [k, v] = pair.split('=');
      if (k) query[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
  }
  return { segments, query };
}

function useHashRouter() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

function navigate(path, query) {
  let hash = '#' + path;
  if (query) {
    const qs = Object.entries(query)
      .filter(([, v]) => v != null && v !== '')
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    if (qs) hash += '?' + qs;
  }
  window.location.hash = hash;
}

/* ============================================================
   REUSABLE UI PRIMITIVES
   ============================================================ */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInViewOnce();
  const reduced = usePrefersReducedMotion();
  const shown = reduced || inView;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0px)' : 'translateY(24px)',
        filter: shown ? 'blur(0px)' : 'blur(6px)',
        transition: reduced ? 'none' : `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Container({ children, wide = false, style, className = '' }) {
  return (
    <div className={className} style={{ maxWidth: wide ? '1120px' : '896px', margin: '0 auto', padding: '0 24px', ...style }}>
      {children}
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: action ? 'space-between' : undefined, alignItems: action ? 'flex-end' : undefined, gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
      <div>
        {eyebrow && <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '8px' }}>{eyebrow}</span>}
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: '#fff', margin: 0, fontWeight: 400 }}>{title}</h2>
        {subtitle && <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '12px', maxWidth: '560px', lineHeight: 1.6 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function GlassCard({ children, strong = false, className = '', style, ...rest }) {
  return (
    <div className={`${strong ? 'liquid-glass-strong' : 'liquid-glass-card'} ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
}

function Pill({ children, style }) {
  return <span className="glass-pill" style={{ padding: '6px 14px', fontSize: '11px', color: 'rgba(255,255,255,0.8)', ...style }}>{children}</span>;
}

const BTN_SIZES = {
  sm: { padding: '9px 16px', fontSize: '11px' },
  md: { padding: '12px 24px', fontSize: '12px' },
  lg: { padding: '14px 32px', fontSize: '13px' },
};
const BTN_VARIANTS = {
  primary: { background: '#10B981', color: '#04140F' },
  outline: { background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' },
  subtle: { background: 'rgba(255,255,255,0.08)', color: '#fff' },
  ghost: { background: 'transparent', color: '#fff' },
};

function Btn({ children, onClick, variant = 'primary', size = 'md', icon: Icon, iconPos = 'right', type = 'button', disabled, className = '', ariaLabel, style }) {
  const isGhost = variant === 'ghost';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${isGhost ? 'liquid-glass' : ''} btn-base ${className}`}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        borderRadius: '9999px', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
        border: BTN_VARIANTS[variant].border || 'none', textDecoration: 'none', whiteSpace: 'nowrap',
        opacity: disabled ? 0.5 : 1, ...BTN_SIZES[size], ...BTN_VARIANTS[variant], ...style,
      }}
    >
      {Icon && iconPos === 'left' && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPos === 'right' && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
    </button>
  );
}

function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '28px' }}>
      <ol style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', listStyle: 'none', margin: 0, padding: 0, fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.onClick ? (
              <button onClick={item.onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: 0, fontSize: '11px' }}>{item.label}</button>
            ) : (
              <span aria-current="page" style={{ color: 'rgba(255,255,255,0.85)' }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function LoadingState({ label = 'Loading\u2026' }) {
  return (
    <div role="status" aria-live="polite" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px', gap: '16px', color: 'rgba(255,255,255,0.5)' }}>
      <div className="spinner" aria-hidden="true" />
      <span style={{ fontSize: '12px' }}>{label}</span>
    </div>
  );
}

function ErrorState({ title = 'Something went wrong', message, onRetry, retryLabel = 'Try again' }) {
  return (
    <div role="alert" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <AlertCircle className="w-8 h-8" aria-hidden="true" style={{ color: 'rgba(255,255,255,0.4)', margin: '0 auto 16px' }} />
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>{title}</h2>
      {message && <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '24px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>{message}</p>}
      {onRetry && <Btn onClick={onRetry}>{retryLabel}</Btn>}
    </div>
  );
}

function EmptyState({ title = 'Nothing here yet', message }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }} className="liquid-glass" role="status">
      <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500, marginBottom: message ? '8px' : 0 }}>{title}</p>
      {message && <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{message}</p>}
    </div>
  );
}

function SuccessState({ title, message, cta }) {
  return (
    <div style={{ textAlign: 'center', padding: '32px 10px' }}>
     <div aria-hidden="true" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>
        <Check className="w-5 h-5" />
      </div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>{title}</h2>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', maxWidth: '380px', margin: '0 auto', lineHeight: 1.6 }}>{message}</p>
      {cta && <div style={{ marginTop: '24px' }}>{cta}</div>}
    </div>
  );
}

function FieldError({ id, children }) {
  if (!children) return null;
  return <p id={id} role="alert" style={{ color: '#f87171', fontSize: '11px', marginTop: '6px' }}>{children}</p>;
}

function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {items.map((it, i) => {
        const panelId = `accordion-panel-${it.q.slice(0, 12).replace(/\s+/g, '-')}-${i}`;
        return (
          <div key={i} className="liquid-glass" style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
            <h3 style={{ margin: 0 }}>
              <button
                aria-expanded={open === i} aria-controls={panelId}
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.9)', fontSize: '13px', fontWeight: 500 }}
              >
                <span>{it.q}</span>
                <ChevronDown className="w-4 h-4" aria-hidden="true" style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform .3s', flexShrink: 0 }} />
              </button>
            </h3>
            <div id={panelId} style={{ maxHeight: open === i ? '400px' : '0px', overflow: 'hidden', transition: 'max-height .3s ease' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, padding: '0 20px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', margin: 0, paddingTop: '12px' }}>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Dot({ color }) {
  return <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }} />;
}

function DeviceFrame({ src, alt, label, device = 'desktop' }) {
  const sizes = {
    desktop: { width: '100%', height: '100%' },
    tablet: { maxWidth: '620px', height: '75vh', margin: '0 auto' },
    mobile: { maxWidth: '320px', height: '70vh', margin: '0 auto' },
  };
  return (
    <div className="liquid-glass-strong" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)', ...sizes[device] }}>
      <div style={{ height: '32px', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(9,9,11,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: '6px' }}><Dot color="#ef4444" /><Dot color="#eab308" /><Dot color="#22c55e" /></div>
        <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>{label}</span>
        <div style={{ width: '40px' }} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', background: '#09090b' }}>
        <img src={src} alt={alt} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
      </div>
    </div>
  );
}

function PortfolioCard({ project, onDetail }) {
  return (
    <GlassCard style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <button onClick={onDetail} style={{ all: 'unset', cursor: 'pointer', display: 'block' }} aria-label={`Read ${project.title} case study`}>
        <div style={{ position: 'relative', aspectRatio: '16/10', background: '#18181b', overflow: 'hidden' }}>
          <img src={project.previewImage} alt={`${project.title} preview`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }} loading="lazy" />
          <span className="glass-pill" style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '10px', padding: '4px 10px', color: '#fff' }}>{project.projectType}</span>
        </div>
      </button>
      <div style={{ padding: '20px' }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>{project.industry}</span>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', margin: '0 0 8px', fontWeight: 400 }}>{project.title}</h3>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: '0 0 14px' }}>{project.shortDescription}</p>
        <button onClick={onDetail} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 0 }}>
          Read case study <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </GlassCard>
  );
}

function ProcessTimeline() {
  return (
    <div className="space-y-6">
      {processSteps.map((item, idx) => (
        <Reveal key={item.step} delay={idx * 0.08}>
          <div className="liquid-glass p-6 rounded-2xl flex items-center gap-6">
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'rgba(255,255,255,0.4)' }} aria-hidden="true">{item.step}</span>
            <div>
              <h3 className="text-base font-medium text-white mb-1">{item.title}</h3>
              <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ============================================================
   3D BACKGROUND
   ============================================================ */
function ThreeBackground() {
  const mountRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const cubeConfigs = [
      { size: 3.4, opacity: 0.45, spin: 0.006 },
      { size: 2.3, opacity: 0.28, spin: -0.011 },
      { size: 1.25, opacity: 0.65, spin: 0.017 },
    ];
    const cubes = cubeConfigs.map((cfg) => {
      const geo = new THREE.BoxGeometry(cfg.size, cfg.size, cfg.size);
      const edges = new THREE.EdgesGeometry(geo);
      const mat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: cfg.opacity });
      const mesh = new THREE.LineSegments(edges, mat);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(mesh);
      return { mesh, spin: cfg.spin };
    });
    group.position.set(1.8, -0.3, -2);
    scene.add(group);

    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x10b981, size: 0.022, transparent: true, opacity: 0.4, sizeAttenuation: true });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let frameId;
    const animate = () => {
      if (!reduced) {
        cubes.forEach(({ mesh, spin }) => { mesh.rotation.y += spin; mesh.rotation.x += spin * 0.6; });
        group.rotation.y += 0.0011;
        particles.rotation.y += 0.0004;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      cubes.forEach(({ mesh }) => { mesh.geometry.dispose(); mesh.material.dispose(); });
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true" />;
}

function AmbientScrim({ opacity = 0.4, blurred = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" style={{ zIndex: 0, filter: blurred ? 'blur(16px)' : 'none' }} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${0.55 - opacity * 0.3})` }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent, #000)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.85) 100%)' }} />
    </div>
  );
}

/* ============================================================
   NAVBAR & FOOTER
   ============================================================ */
const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Services', path: '/services' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function Navbar({ active }) {
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
         <span
         className="font-medium text-sm tracking-tight"
         style={{ color: '#10B981' }}
         >
         Desiglo
         </span>
        </button>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <button
              key={l.path} onClick={() => navigate(l.path)} aria-current={isActive(l.path) ? 'page' : undefined}
              className="px-3 py-1.5 text-xs font-medium transition-colors duration-300"
              style={{ background: isActive(l.path) ? 'rgba(16,185,129,0.15)' : 'transparent', borderRadius: '9999px', border: 'none', cursor: 'pointer', color: isActive(l.path) ? '#10B981' : 'rgba(255,255,255,0.7)' }}
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

function FooterCol({ title, links }) {
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

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '40px' }}>
      <Container wide style={{ padding: '64px 24px 32px' }}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8" style={{ marginBottom: '48px' }}>
          <div style={{ gridColumn: 'span 2' }} className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#10B981', color: '#04140F' }}><Sparkles className="w-3 h-3" aria-hidden="true" /></div>
              <span
               className="font-medium text-sm"
               style={{ color: '#10B981' }}
              >
              Desiglo
              </span>
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

/* ============================================================
   PAGE: HOME
   ============================================================ */
function HomePage() {
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
            We design and build custom websites from scratch \u2014 no templates, no lookalikes. Just something built specifically around your business.
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
                  <div className="flex items-center gap-2 text-xs w-full justify-center" style={{ color: '#10B981', padding: '2px 8px' }}><Check className="w-3.5 h-3.5" /><span>You're on the list (demo mode)</span></div>
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

/* ============================================================
   PAGE: PORTFOLIO LISTING
   ============================================================ */
function PortfolioPage() {
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

/* ============================================================
   PAGE: PORTFOLIO DETAIL
   ============================================================ */
function PortfolioDetailPage({ slug }) {
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
                {project.goals.map((g) => <li key={g} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}><Check className="w-4 h-4" aria-hidden="true" style={{ color: '#10B981', flexShrink: 0, marginTop: '1px' }} /><span>{g}</span></li>)}
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

/* ============================================================
   PAGE: SERVICES
   ============================================================ */
function ServicesPage() {
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
                    {s.included.map((f) => <li key={f} style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}><Check className="w-3.5 h-3.5" aria-hidden="true" style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} /><span>{f}</span></li>)}
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

/* ============================================================
   PAGE: PRICING
   ============================================================ */
function PricingPage() {
  useDocumentHead('Pricing', 'Representative pricing for style customization, custom website design, and studio partnerships.');
  return (
    <div className="relative pt-16 pb-24 px-6">
      <AmbientScrim opacity={0.25} />
      <Container className="relative" style={{ zIndex: 1 }}>
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Pill style={{ marginBottom: '16px', display: 'inline-block' }}>Pricing</Pill>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#fff', marginBottom: '16px', fontWeight: 400 }}>Representative pricing for design services</h1>
            <p className="text-white/60 text-sm">These ranges cover design and development work. Final pricing is confirmed after your project request is reviewed.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginBottom: '56px', alignItems: 'stretch' }}>
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.08}>
              <GlassCard strong={tier.highlighted} style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: tier.highlighted ? '1px solid rgba(16,185,129,0.5)' : undefined, transform: tier.highlighted ? 'translateY(-8px)' : undefined }}>
                <div>
                  {tier.highlighted && <Pill style={{ marginBottom: '16px', display: 'inline-block' }}>Most Requested</Pill>}
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginBottom: '6px', fontWeight: 400 }}>{tier.name}</h2>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff', marginBottom: '12px' }}>{tier.range}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginBottom: '20px' }}>{tier.description}</p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                    {tier.features.map((f) => <li key={f} style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}><Check className="w-3.5 h-3.5" aria-hidden="true" style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} /><span>{f}</span></li>)}
                  </ul>
                </div>
                <Btn variant={tier.highlighted ? 'primary' : 'outline'} size="sm" onClick={() => navigate('/project-request', { service: tier.id })}>Get Started</Btn>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="liquid-glass" style={{ padding: '20px 24px', borderRadius: '16px', marginBottom: '40px', fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            Every project starts with a short request form so scope can be estimated accurately. Have pricing questions first? See the <button onClick={() => navigate('/faq')} style={{ background: 'none', border: 'none', color: '#fff', textDecoration: 'underline', cursor: 'pointer', padding: 0, fontSize: '12px' }}>Pricing FAQ</button> or <button onClick={() => navigate('/contact')} style={{ background: 'none', border: 'none', color: '#fff', textDecoration: 'underline', cursor: 'pointer', padding: 0, fontSize: '12px' }}>get in touch</button>.
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

/* ============================================================
   PAGE: ABOUT
   ============================================================ */
function AboutPage() {
  useDocumentHead('About', 'The studio behind the work \u2014 approach, values, and how projects are run.');
  const values = [
    { title: 'Clarity', desc: 'Every design decision should make the site easier to understand and use \u2014 not just look impressive.' },
    { title: 'Craft', desc: 'Typography, spacing, and motion are treated as material, not decoration.' },
    { title: 'Honesty', desc: 'Portfolio work is labeled accurately \u2014 concept, portfolio, or client \u2014 never dressed up as something it isn\u2019t.' },
    { title: 'Collaboration', desc: 'The best sites come from a clear back-and-forth, not a single handoff.' },
  ];
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

/* ============================================================
   PAGE: CONTACT
   ============================================================ */
function ContactPage() {
  useDocumentHead('Contact', 'Get in touch with questions before starting a project.');
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Please enter at least 10 characters.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStatus('loading');
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="relative pt-16 pb-24 px-6">
      <AmbientScrim opacity={0.25} />
      <Container className="relative" style={{ zIndex: 1, maxWidth: '640px' }}>
        <Reveal>
          <div className="text-center mb-12">
            <Pill style={{ marginBottom: '16px', display: 'inline-block' }}>Contact</Pill>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,5vw,3rem)', color: '#fff', marginBottom: '16px', fontWeight: 400 }}>Get in touch</h1>
            <p className="text-white/60 text-sm">Questions before starting a project? Send a message \u2014 for a full project request, use the <button onClick={() => navigate('/project-request')} style={{ background: 'none', border: 'none', color: '#fff', textDecoration: 'underline', cursor: 'pointer', padding: 0, fontSize: '13px' }}>project request form</button> instead.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <GlassCard strong style={{ padding: '32px', borderRadius: '20px' }}>
            {status === 'success' ? (
              <SuccessState title="Message sent" message="Thanks for reaching out. In demo mode no email was sent, but the form and validation are fully functioning." cta={<Btn variant="ghost" onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: 'General Inquiry', message: '' }); }}>Send another message</Btn>} />
            ) : status === 'error' ? (
              <ErrorState title="Message couldn\u2019t be sent" message="Something went wrong on our end. Please try again." onRetry={() => setStatus('idle')} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '18px' }}>
                  <label htmlFor="contact-name" style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '6px' }}>Name</label>
                  <input id="contact-name" type="text" value={form.name} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'contact-name-error' : undefined} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl text-sm text-white" style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${errors.name ? '#f87171' : 'rgba(255,255,255,0.15)'}`, padding: '10px 16px', outline: 'none' }} />
                  <FieldError id="contact-name-error">{errors.name}</FieldError>
                </div>
                <div style={{ marginBottom: '18px' }}>
                  <label htmlFor="contact-email" style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '6px' }}>Email</label>
                  <input id="contact-email" type="email" value={form.email} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'contact-email-error' : undefined} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl text-sm text-white" style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${errors.email ? '#f87171' : 'rgba(255,255,255,0.15)'}`, padding: '10px 16px', outline: 'none' }} />
                  <FieldError id="contact-email-error">{errors.email}</FieldError>
                </div>
                <div style={{ marginBottom: '18px' }}>
                  <label htmlFor="contact-subject" style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '6px' }}>Subject</label>
                  <select id="contact-subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-xl text-sm text-white" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', padding: '10px 16px' }}>
                    <option>General Inquiry</option><option>Project Question</option><option>Press / Collaboration</option><option>Other</option>
                  </select>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label htmlFor="contact-message" style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '6px' }}>Message</label>
                  <textarea id="contact-message" rows={5} value={form.message} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'contact-message-error' : undefined} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl text-sm text-white" style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${errors.message ? '#f87171' : 'rgba(255,255,255,0.15)'}`, padding: '10px 16px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                  <FieldError id="contact-message-error">{errors.message}</FieldError>
                </div>
                <Btn type="submit" icon={status === 'loading' ? undefined : Send} disabled={status === 'loading'} style={{ width: '100%' }}>{status === 'loading' ? 'Sending\u2026' : 'Send Message'}</Btn>
              </form>
            )}
          </GlassCard>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="flex items-center justify-center gap-2" style={{ marginTop: '24px', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
            <Mail className="w-3.5 h-3.5" aria-hidden="true" /><span>Typical response time: 1\u20132 business days</span>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

/* ============================================================
   PAGE: PROJECT INQUIRY (multi-step)
   ============================================================ */
function ProjectInquiryPage({ presetService }) {
  useDocumentHead('Start a Project', 'Request a custom website design or redesign project.');
  const serviceMap = { custom: 'Full Custom Website Design & Development', redesign: 'Website Redesign & UX Audit', support: 'Ongoing Website Support', starter: 'Full Custom Website Design & Development', retainer: 'Ongoing Website Support' };
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [formData, setFormData] = useState({
    serviceType: serviceMap[presetService] || 'Full Custom Website Design & Development',
    businessName: '', email: '',
    budget: '$1,800 \u2013 $4,500 (Custom Website)',
    timeline: 'Within 1 Month',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('form'); // form | loading | success

  const next = () => {
    if (step === 2) {
      const e = {};
      if (!formData.businessName.trim()) e.businessName = 'Please enter a business or project name.';
      if (!formData.email.trim()) e.email = 'Please enter your email.';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = 'Please enter a valid email address.';
      setErrors(e);
      if (Object.keys(e).length > 0) return;
    }
    setStep((s) => Math.min(s + 1, totalSteps));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 900));
    setStatus('success');
  };

  return (
    <div className="relative flex flex-col justify-center items-center px-6 pb-20" style={{ minHeight: '85vh', paddingTop: '48px' }}>
      <AmbientScrim opacity={0.3} blurred />
      <Container style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>
        {status !== 'success' && (
          <div className="flex justify-between items-center mb-8">
            <Pill>Step {step} of {totalSteps}</Pill>
            <div className="flex gap-1" aria-hidden="true">
              {[1, 2, 3, 4].map((i) => <div key={i} style={{ height: '4px', borderRadius: '9999px', width: i <= step ? '24px' : '8px', background: i <= step ? '#10B981' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }} />)}
            </div>
          </div>
        )}

        <GlassCard strong style={{ padding: '32px', borderRadius: '24px' }}>
          {status === 'success' ? (
            <SuccessState
              title="Request received"
              message="Thanks for the details. In demo mode no email was sent, but the workflow is fully functioning \u2014 in production I\u2019ll review your request and reply within 1\u20132 business days with next steps."
              cta={<Btn variant="ghost" onClick={() => navigate('/')}>Back to Home</Btn>}
            />
          ) : status === 'loading' ? (
            <LoadingState label="Submitting your request\u2026" />
          ) : (
            <form onSubmit={step === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
              {step === 1 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>What service do you need?</h2>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '24px' }}>Select the primary scope for your project.</p>
                  <div className="space-y-3" role="radiogroup" aria-label="Service type">
                    {Object.values(serviceMap).filter((v, i, arr) => arr.indexOf(v) === i).map((item) => (
                      <button type="button" key={item} role="radio" aria-checked={formData.serviceType === item} onClick={() => setFormData({ ...formData, serviceType: item })} className="w-full text-left p-4 rounded-xl text-xs font-medium transition-all" style={{ background: formData.serviceType === item ? '#10B981' : 'rgba(255,255,255,0.05)', color: formData.serviceType === item ? '#04140F' : '#fff', border: formData.serviceType === item ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>{item}</button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>Tell me about your business</h2>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '24px' }}>Basic contact details so I can follow up.</p>
                  <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="inq-business" style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '6px' }}>Business or Project Name</label>
                    <input id="inq-business" type="text" value={formData.businessName} aria-invalid={!!errors.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} placeholder="Acme Studio" className="w-full rounded-xl text-xs text-white" style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${errors.businessName ? '#f87171' : 'rgba(255,255,255,0.15)'}`, padding: '10px 16px', outline: 'none' }} />
                    <FieldError>{errors.businessName}</FieldError>
                  </div>
                  <div>
                    <label htmlFor="inq-email" style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '6px' }}>Your Email Address</label>
                    <input id="inq-email" type="email" value={formData.email} aria-invalid={!!errors.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="hello@business.com" className="w-full rounded-xl text-xs text-white" style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${errors.email ? '#f87171' : 'rgba(255,255,255,0.15)'}`, padding: '10px 16px', outline: 'none' }} />
                    <FieldError>{errors.email}</FieldError>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>Budget &amp; timeline</h2>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '24px' }}>This helps scope recommendations accurately.</p>
                  <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="inq-budget" style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '6px' }}>Estimated Budget Range</label>
                    <select id="inq-budget" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full rounded-xl text-xs text-white" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', padding: '10px 16px' }}>
                      <option>Under $900 (Starter Website)</option>
                      <option>$900 \u2013 $2,500 (Focused Custom Build)</option>
                      <option>$1,800 \u2013 $4,500 (Custom Website)</option>
                      <option>$5,000+ (Studio Partnership)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="inq-timeline" style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '6px' }}>Desired Timeline</label>
                    <select id="inq-timeline" value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} className="w-full rounded-xl text-xs text-white" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', padding: '10px 16px' }}>
                      <option>ASAP (Rush)</option><option>Within 1 Month</option><option>1\u20133 Months</option><option>Flexible / Just Exploring</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>Review &amp; submit</h2>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '20px' }}>Confirm your selections before submitting.</p>
                  <div className="liquid-glass" style={{ padding: '16px', borderRadius: '12px' }}>
                    <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                      <div><dt style={{ display: 'inline', color: 'rgba(255,255,255,0.45)' }}>Scope: </dt><dd style={{ display: 'inline', margin: 0 }}>{formData.serviceType}</dd></div>
                      <div><dt style={{ display: 'inline', color: 'rgba(255,255,255,0.45)' }}>Business: </dt><dd style={{ display: 'inline', margin: 0 }}>{formData.businessName || 'Not specified'}</dd></div>
                      <div><dt style={{ display: 'inline', color: 'rgba(255,255,255,0.45)' }}>Email: </dt><dd style={{ display: 'inline', margin: 0 }}>{formData.email || 'Not specified'}</dd></div>
                      <div><dt style={{ display: 'inline', color: 'rgba(255,255,255,0.45)' }}>Budget: </dt><dd style={{ display: 'inline', margin: 0 }}>{formData.budget}</dd></div>
                      <div><dt style={{ display: 'inline', color: 'rgba(255,255,255,0.45)' }}>Timeline: </dt><dd style={{ display: 'inline', margin: 0 }}>{formData.timeline}</dd></div>
                    </dl>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-8 mt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {step > 1 ? <Btn variant="ghost" size="sm" icon={ArrowLeft} iconPos="left" onClick={prev}>Back</Btn> : <div />}
                {step < totalSteps ? <Btn size="sm" icon={ArrowRight} onClick={next}>Continue</Btn> : <Btn type="submit" size="sm">Submit Project Request</Btn>}
              </div>
            </form>
          )}
        </GlassCard>
      </Container>
    </div>
  );
}

/* ============================================================
   PAGE: FAQ
   ============================================================ */
function FAQPage() {
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

/* ============================================================
   PAGE: LEGAL (generic)
   ============================================================ */
function LegalPage({ slug }) {
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

/* ============================================================
   PAGE: 404
   ============================================================ */
function NotFoundPage() {
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

/* ============================================================
   ROOT APP
   ============================================================ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');
  :root { --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif; --font-serif: 'Instrument Serif', Georgia, serif; }
  * { box-sizing: border-box; }
  .title-gradient { background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.95) 55%, rgba(16,185,129,0.75) 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .liquid-glass { background: rgba(255,255,255,0.015); backdrop-filter: blur(12px) saturate(140%); -webkit-backdrop-filter: blur(12px) saturate(140%); box-shadow: inset 0 1px 1px rgba(255,255,255,0.1); position: relative; }
  .liquid-glass-card { background: rgba(255,255,255,0.025); backdrop-filter: blur(16px) saturate(130%); -webkit-backdrop-filter: blur(16px) saturate(130%); box-shadow: inset 0 1px 1px rgba(255,255,255,0.08); border-radius: 1.25rem; position: relative; }
  .liquid-glass-strong { background: rgba(8,8,8,0.8); backdrop-filter: blur(28px) saturate(160%); -webkit-backdrop-filter: blur(28px) saturate(160%); position: relative; border: 1px solid rgba(255,255,255,0.08); }
  .glass-pill { background: rgba(255,255,255,0.04); backdrop-filter: blur(16px) saturate(180%); -webkit-backdrop-filter: blur(16px) saturate(180%); border-radius: 9999px; border: 1px solid rgba(255,255,255,0.1); display: inline-block; }
  .meta-tag { font-size: 10px; color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 4px; }
  .spinner { width: 28px; height: 28px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.15); border-top-color: #10B981; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { .spinner { animation-duration: 2.4s; } }
  .skip-link { position: absolute; left: -9999px; top: 0; background: #10B981; color: #04140F; padding: 10px 16px; border-radius: 8px; z-index: 100; font-size: 12px; font-weight: 600; text-decoration: none; }
  .skip-link:focus { left: 16px; top: 16px; }
  .btn-base:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, button:focus-visible { outline: 2px solid #10B981; outline-offset: 2px; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.4); }
  select option { background: #0a0a0a; }
  ::selection { background-color: #10B981; color: #04140F; }
`;

export default function App() {
  const { segments, query } = useHashRouter();
  const mainRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (mainRef.current) mainRef.current.focus();
  }, [segments.join('/')]);

  const [a, b, c] = segments;
  let content;
  let activeSection = a || 'home';

  if (segments.length === 0) content = <HomePage />;
  else if (a === 'portfolio' && !b) content = <PortfolioPage />;
  else if (a === 'portfolio' && b) content = <PortfolioDetailPage slug={b} />;
  else if (a === 'services') content = <ServicesPage />;
  else if (a === 'pricing') content = <PricingPage />;
  else if (a === 'about') content = <AboutPage />;
  else if (a === 'contact') content = <ContactPage />;
  else if (a === 'project-request') content = <ProjectInquiryPage presetService={query.service} />;
  else if (a === 'faq') content = <FAQPage />;
  else if (['privacy', 'terms', 'refund-policy', 'cookies'].includes(a)) content = <LegalPage slug={a} />;
  else { content = <NotFoundPage />; activeSection = '__none__'; }

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-sans)', WebkitFontSmoothing: 'antialiased', letterSpacing: '-0.01em', overflowX: 'hidden', position: 'relative' }}>
      <style>{GLOBAL_CSS}</style>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ThreeBackground />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar active={activeSection} />
        <main id="main-content" tabIndex={-1} ref={mainRef} style={{ flex: 1, outline: 'none' }}>
          {content}
        </main>
        <Footer />
      </div>
    </div>
  );
}
