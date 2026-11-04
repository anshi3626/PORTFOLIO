import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/content';
import type { Project } from '../data/content';
import { useSectionReveal } from '../lib/useSectionReveal';

function CaseStudy({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`case ${index % 2 ? 'case--flip' : ''}`} data-reveal>
      <div className="case-head">
        <p className="mono kicker">{project.category}</p>
        <h3 className="case-title">{project.title}</h3>
        {project.status && <p className="mono status">Status: {project.status}</p>}
      </div>

      <div className="case-body">
        <p>{project.description}</p>

        <div className="case-tags" aria-label="Technologies used">
          {project.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        {project.caseStudyTodo && (
          <p className="todo mono">Problem, approach and results: to be added once you share them.</p>
        )}

        {project.github && (
          <a className="repo-link" href={project.github} target="_blank" rel="noopener noreferrer">
            View repository on GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="rule" data-rule aria-hidden="true" />
      <div className="section-head">
        <p className="mono kicker" data-reveal>
          Chapter 03 · Projects
        </p>
        <h2 className="display" data-reveal>
          Things I've been <em>building.</em>
        </h2>
      </div>

      <div className="cases">
        {projects.map((p, i) => (
          <CaseStudy key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
