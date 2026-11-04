import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { skillGroups } from '../data/content';
import Reveal from './Reveal';

export default function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next =
      e.key === 'ArrowRight' ? (index + 1) % skillGroups.length : (index - 1 + skillGroups.length) % skillGroups.length;
    setActiveId(skillGroups[next].id);
    document.getElementById(`skill-tab-${skillGroups[next].id}`)?.focus();
  };

  return (
    <section id="skills">
      <div className="container">
        <Reveal>
          <p className="eyebrow">02 · Skills</p>
          <h2 className="section-title">Technologies I've studied & worked with.</h2>
          <p className="section-lead">
            A map of tools and areas I am learning and practising. These are areas of study and hands-on exposure, not
            expert-level claims.
          </p>
        </Reveal>

        <div role="tablist" aria-label="Skill categories" className="skills-tabs">
          {skillGroups.map((g, i) => (
            <button
              key={g.id}
              id={`skill-tab-${g.id}`}
              role="tab"
              aria-selected={g.id === activeId}
              aria-controls="skills-panel"
              tabIndex={g.id === activeId ? 0 : -1}
              onClick={() => setActiveId(g.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {g.title}
            </button>
          ))}
        </div>

        <Reveal>
          <div id="skills-panel" role="tabpanel" aria-labelledby={`skill-tab-${group.id}`} className="glass skills-panel" key={group.id}>
            <h3>{group.title}</h3>
            <div>
              {group.items.map((item) => (
                <span key={item} className="skill-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <p className="skills-note">Skills are listed to show learning areas. No proficiency levels are claimed.</p>
      </div>
    </section>
  );
}
