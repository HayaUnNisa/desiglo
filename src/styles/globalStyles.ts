export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');
  :root { --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif; --font-serif: 'Instrument Serif', Georgia, serif; }
  * { box-sizing: border-box; }
  .title-gradient { background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.95) 55%, rgba(52,211,153,0.75) 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
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
