import { useEffect, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { X } from 'lucide-react';
import { projects } from '../data/content';
import type { Project } from '../data/content';
import Reveal from './Reveal';

/** Subtle 3D tilt that follows the pointer. Disabled on touch devices. */
function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <div ref={ref} className="glass tilt-card" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="icon-btn modal-close" onClick={onClose} aria-label="Close project details">
          <X size={18} />
        </button>
        <p className="eyebrow">{project.category}</p>
        <h3 id="project-modal-title">{project.title}</h3>
        {project.status && <p className="project-status">Status: {project.status}</p>}

        <h4>Overview</h4>
        <p>{project.description}</p>
        {project.objective && (
          <>
            <h4>Objective</h4>
            <p>{project.objective}</p>
          </>
        )}
        <h4>Technologies used</h4>
        <div>
          {project.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        {project.github && (
          <div className="project-actions" style={{ marginTop: 22 }}>
            <a className="btn btn-ghost" href={project.github} target="_blank" rel="noopener noreferrer">
              GitHub repository
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects">
      <div className="container">
        <Reveal>
          <p className="eyebrow">03 · Projects</p>
          <h2 className="section-title">
            Things I've been <span className="gradient-text">building.</span>
          </h2>
          <p className="section-lead">Hands-on projects from my learning journey.</p>
        </Reveal>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08}>
              <TiltCard>
                <span className="project-number">PROJECT {p.number}</span>
                <h3>{p.title}</h3>
                <p className="category">{p.category}</p>
                <p>{p.description}</p>
                <div>
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-actions">
                  <button className="btn btn-primary" onClick={() => setSelected(p)} aria-haspopup="dialog">
                    View Details
                  </button>
                  {p.github && (
                    <a className="btn btn-ghost" href={p.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
