import { personal } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">{personal.name}</p>
          <p className="mono muted">Technology. AI. Creativity.</p>
        </div>
        <ul className="footer-links mono">
          <li>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={personal.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="#collaborate">Email</a>
          </li>
        </ul>
        <p className="mono muted copy">© {year} {personal.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
