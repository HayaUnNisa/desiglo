import { Check } from 'lucide-react';
import { navigate } from '../hooks/useHashRouter';
import { useDocumentHead } from '../hooks/useDocumentHead';
import {
  Reveal,
  Container,
  Pill,
  GlassCard,
  Btn,
} from '../components/ui';
import { AmbientScrim } from '../components/ThreeBackground';
import { pricingTiers } from '../data/pricing';

/* ============================================================
   PAGE: PRICING
============================================================ */

export function PricingPage() {
  useDocumentHead(
    'Pricing',
    'Representative pricing for style customization, custom website design, and studio partnerships.'
  );

  return (
    <div style={{ position: 'relative' }}>
      <AmbientScrim />

      <Container className="relative" style={{ zIndex: 1 }}>
        <Pill
          style={{
            marginBottom: '16px',
            display: 'inline-block',
          }}
        >
          Pricing
        </Pill>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem,5vw,3.5rem)',
            color: '#fff',
            marginBottom: '16px',
            fontWeight: 400,
          }}
        >
          Representative pricing for design services
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7,
            maxWidth: '680px',
            marginBottom: '48px',
          }}
        >
          These ranges cover design and development work. Final pricing is
          confirmed after your project request is reviewed.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{
            marginBottom: '56px',
            alignItems: 'stretch',
          }}
        >
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.08}>
              <GlassCard
                strong={tier.highlighted}
                style={{
                  padding: '28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: tier.highlighted
                    ? '1px solid rgba(16,185,129,0.5)'
                    : undefined,
                  transform: tier.highlighted
                    ? 'translateY(-8px)'
                    : undefined,
                }}
              >
                <div>
                  {tier.highlighted && (
                    <Pill
                      style={{
                        marginBottom: '16px',
                        display: 'inline-block',
                      }}
                    >
                      Most Requested
                    </Pill>
                  )}

                  <h2
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.4rem',
                      color: '#fff',
                      marginBottom: '6px',
                      fontWeight: 400,
                    }}
                  >
                    {tier.name}
                  </h2>

                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.8rem',
                      color: '#fff',
                      marginBottom: '12px',
                    }}
                  >
                    {tier.range}
                  </p>

                  <p
                    style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.55)',
                      marginBottom: '20px',
                    }}
                  >
                    {tier.description}
                  </p>

                  <ul
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      marginBottom: '24px',
                    }}
                  >
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        style={{
                          display: 'flex',
                          gap: '8px',
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.65)',
                        }}
                      >
                        <Check
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                          style={{
                            color: '#10B981',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        />

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Btn
                variant={tier.highlighted ? 'primary' : 'outline'}
                size="sm"
                icon={null}
                iconPos="right"
                onClick={() =>
                navigate('/project-request', {
                service: tier.id,
                })
                }
                >
                Get Started
                </Btn>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div
            className="liquid-glass"
            style={{
              padding: '20px 24px',
              borderRadius: '16px',
              marginBottom: '40px',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.6,
            }}
          >
            Every project starts with a short request form so scope can be
            estimated accurately. Have pricing questions first? See the{' '}

            <button
              type="button"
              onClick={() => navigate('/faq', {})}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                textDecoration: 'underline',
                cursor: 'pointer',
                padding: 0,
                fontSize: '12px',
              }}
            >
              Pricing FAQ
            </button>

            {' '}or{' '}

            <button
              type="button"
              onClick={() => navigate('/contact', {})}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                textDecoration: 'underline',
                cursor: 'pointer',
                padding: 0,
                fontSize: '12px',
              }}
            >
              get in touch
            </button>
            .
          </div>
        </Reveal>
      </Container>
    </div>
  );
}