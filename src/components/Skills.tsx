import { useRef } from 'react';
import { skillGroups } from '../data/content';
import { useSectionReveal } from '../lib/useSectionReveal';

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="rule" data-rule aria-hidden="true" />
      <div className="section-head">
        <p className="mono kicker" data-reveal>
          Chapter 02 · Skills
        </p>
        <h2 className="display" data-reveal>
          What I have <em>studied.</em>
        </h2>
        <p className="lead" data-reveal>
          Areas I am learning and practising. These are not proficiency levels.
        </p>
      </div>

      <div className="skill-grid">
        {skillGroups.map((g) => (
          <div key={g.title} className="skill-col" data-reveal>
            <h3 className="mono label">{g.title}</h3>
            <ul className="plain-list">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
