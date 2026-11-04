import { lazy, Suspense } from 'react';
import { aboutParagraphs, personal, projects } from '../data/content';
import Reveal from './Reveal';

// Small decorative 3D element, loaded only when this section is reached.
const FloatingOrb = lazy(() => import('./AboutOrb'));

const stats = [
  { value: 'BCA', label: 'Cloud & Security, in progress' },
  { value: String(projects.length), label: 'Projects featured in this portfolio' },
  { value: 'AI + Design', label: 'Creative and technical learning' },
];

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <Reveal>
          <p className="eyebrow">01 · About</p>
          <h2 className="section-title">
            Beyond the <span className="gradient-text">Code.</span>
          </h2>
        </Reveal>

        <div className="about-grid" style={{ marginTop: 40 }}>
          <Reveal className="glass about-card">
            {aboutParagraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          <Reveal className="glass education-card" delay={0.1}>
            <p className="eyebrow" style={{ marginBottom: 8 }}>
              Education
            </p>
            <h3>{personal.education.degree}</h3>
            <p>{personal.education.school}</p>
            <p>{personal.education.period}</p>
            <p>Location: {personal.location}</p>
          </Reveal>

          <Reveal className="about-visual" delay={0.15}>
            <Suspense fallback={<div className="placeholder-box" style={{ height: '100%' }}>Loading…</div>}>
              <FloatingOrb />
            </Suspense>
          </Reveal>

          <div className="stats-row">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} className="glass stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
