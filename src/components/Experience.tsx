import { certifications, experience } from '../data/content';
import Reveal from './Reveal';

export default function Experience() {
  return (
    <section id="experience">
      <div className="container split-grid">
        <div>
          <Reveal>
            <p className="eyebrow">04 · Experience</p>
            <h2 className="section-title">Learning in practice.</h2>
            <p className="section-lead">Virtual job simulations and hands-on training, not full-time employment.</p>
          </Reveal>
          <Reveal delay={0.1} className="glass exp-card">
            <h3>{experience.title}</h3>
            <p className="meta">
              {experience.org} · {experience.date} · {experience.type}
            </p>
            <p>{experience.description}</p>
            <p style={{ marginTop: 14, color: 'var(--text)' }}>Key activities:</p>
            <ul>
              {experience.activities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div id="certifications">
          <Reveal>
            <p className="eyebrow">05 · Certifications & Learning</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
              Courses & certificates
            </h2>
            <p className="section-lead" style={{ marginBottom: 24 }}>
              Certificate images are placeholders until the certificate files are added.
            </p>
          </Reveal>
          <div className="cert-grid">
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={0.05 * i} className="glass cert-card">
                <div className="placeholder-box">Cert</div>
                <div>
                  <h4>{c.title}</h4>
                  {c.issuer && <p>{c.issuer}</p>}
                  {c.certificateUrl && (
                    <a className="btn btn-ghost" style={{ marginTop: 8, padding: '6px 14px', fontSize: '0.8rem' }} href={c.certificateUrl} target="_blank" rel="noopener noreferrer">
                      View Certificate
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
