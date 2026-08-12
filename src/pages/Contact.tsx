import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { navigate } from '../hooks/useHashRouter';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Reveal, Container, Pill, GlassCard, Btn, SuccessState, ErrorState, FieldError } from '../components/ui';
import { AmbientScrim } from '../components/ThreeBackground';

/* ============================================================
   PAGE: CONTACT
   ============================================================ */
export function ContactPage() {
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

