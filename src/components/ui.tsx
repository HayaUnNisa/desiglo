import { useState } from 'react';
import { ChevronDown, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { useInViewOnce } from '../hooks/useInViewOnce';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { processSteps } from '../data/process';

export function Reveal({ children, delay = 0, className = '' }) {
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

export function Container({ children, wide = false, style, className = '' }) {
  return (
    <div className={className} style={{ maxWidth: wide ? '1120px' : '896px', margin: '0 auto', padding: '0 24px', ...style }}>
      {children}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, action }) {
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

export function GlassCard({ children, strong = false, className = '', style, ...rest }) {
  return (
    <div className={`${strong ? 'liquid-glass-strong' : 'liquid-glass-card'} ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
}

export function Pill({ children, style }) {
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

export function Btn({ children, onClick, variant = 'primary', size = 'md', icon: Icon, iconPos = 'right', type = 'button', disabled, className = '', ariaLabel, style }) {
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

export function Breadcrumbs({ items }) {
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

export function LoadingState({ label = 'Loading\u2026' }) {
  return (
    <div role="status" aria-live="polite" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px', gap: '16px', color: 'rgba(255,255,255,0.5)' }}>
      <div className="spinner" aria-hidden="true" />
      <span style={{ fontSize: '12px' }}>{label}</span>
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', message, onRetry, retryLabel = 'Try again' }) {
  return (
    <div role="alert" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <AlertCircle className="w-8 h-8" aria-hidden="true" style={{ color: 'rgba(255,255,255,0.4)', margin: '0 auto 16px' }} />
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>{title}</h2>
      {message && <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '24px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>{message}</p>}
      {onRetry && <Btn onClick={onRetry}>{retryLabel}</Btn>}
    </div>
  );
}

export function EmptyState({ title = 'Nothing here yet', message }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }} className="liquid-glass" role="status">
      <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500, marginBottom: message ? '8px' : 0 }}>{title}</p>
      {message && <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{message}</p>}
    </div>
  );
}

export function SuccessState({ title, message, cta }) {
  return (
    <div style={{ textAlign: 'center', padding: '32px 10px' }}>
      <div aria-hidden="true" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>
        <Check className="w-5 h-5" />
      </div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>{title}</h2>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', maxWidth: '380px', margin: '0 auto', lineHeight: 1.6 }}>{message}</p>
      {cta && <div style={{ marginTop: '24px' }}>{cta}</div>}
    </div>
  );
}

export function FieldError({ id, children }) {
  if (!children) return null;
  return <p id={id} role="alert" style={{ color: '#f87171', fontSize: '11px', marginTop: '6px' }}>{children}</p>;
}

export function Accordion({ items }) {
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

export function Dot({ color }) {
  return <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }} />;
}

export function DeviceFrame({ src, alt, label, device = 'desktop' }) {
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

export function PortfolioCard({ project, onDetail }) {
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

export function ProcessTimeline() {
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
