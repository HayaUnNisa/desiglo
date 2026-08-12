import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { navigate } from '../hooks/useHashRouter';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Container, Pill, GlassCard, Btn, SuccessState, LoadingState, FieldError } from '../components/ui';
import { AmbientScrim } from '../components/ThreeBackground';

/* ============================================================
   PAGE: PROJECT INQUIRY (multi-step)
   ============================================================ */
export function ProjectInquiryPage({ presetService }) {
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

