import { useRef } from 'react';
import { about, personal } from '../data/content';
import { useSectionReveal } from '../lib/useSectionReveal';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section id="about" className="section" ref={ref}>
      <div className="rule" data-rule aria-hidden="true" />
      <div className="section-head">
        <p className="mono kicker" data-reveal>
          Chapter 01 · About
        </p>
        <h2 className="display" data-reveal>
          Beyond the <em>code.</em>
        </h2>
      </div>

      <div className="about-body">
        <div className="about-text" data-reveal>
          {about.background.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          <p className="pull">{about.approach}</p>
        </div>

        <aside className="about-side" data-reveal>
          <h3 className="mono label">Interests</h3>
          <ul className="plain-list">
            {about.interests.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <h3 className="mono label">Education</h3>
          <p>{personal.education.degree}</p>
          <p className="muted">{personal.education.school}</p>
          <p className="muted mono">{personal.education.period}</p>
        </aside>
      </div>
    </section>
  );
}
