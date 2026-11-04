import { Mail } from 'lucide-react';
import { personal, PLACEHOLDER } from '../data/content';
import { GitHubIcon, LinkedInIcon } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <strong>{personal.name}</strong>
          <span>{personal.tagline}</span>
        </div>
        <div className="footer-links">
          <a className="icon-btn" href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          {personal.github === PLACEHOLDER ? (
            <span className="icon-btn" title="GitHub link to be added" aria-label="GitHub (placeholder)">
              <GitHubIcon />
            </span>
          ) : (
            <a className="icon-btn" href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
          )}
          <a className="icon-btn" href={`mailto:${personal.email}`} aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
        <p className="footer-copy">© {year} {personal.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
