import { useRef } from 'react';
import { certifications, experience } from '../data/content';
import { useSectionReveal } from '../lib/useSectionReveal';

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="rule" data-rule aria-hidden="true" />
      <div className="section-head">
        <p className="mono kicker" data-reveal>
          Chapter 04 · Experience &amp; learning
        </p>
        <h2 className="display" data-reveal>
          Verified <em>record.</em>
        </h2>
      </div>

      <div className="exp-grid">
        <article className="exp" data-reveal>
          <p className="mono kicker">
            {experience.org} · {experience.date}
          </p>
          <h3 className="exp-title">{experience.title}</h3>
          <p className="muted">{experience.type}</p>
          <p>{experience.description}</p>
          <ul className="plain-list">
            {experience.activities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </article>

        <article className="exp" data-reveal>
          <p className="mono kicker">Certifications</p>
          <ul className="plain-list cert-list">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="todo mono">Certificate files: add when available.</p>
        </article>
      </div>
    </section>
  );
}
