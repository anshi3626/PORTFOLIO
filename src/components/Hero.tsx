import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { heroCopy, personal, PLACEHOLDER } from '../data/content';
import { GitHubIcon, LinkedInIcon } from './Icons';

const HeroScene = lazy(() => import('./HeroScene'));

/** True when WebGL is available and the user hasn't asked for reduced motion. */
function useCanRender3D() {
  const [ok, setOk] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      const lowEnd = (navigator.hardwareConcurrency || 4) <= 2;
      setOk(Boolean(gl) && !lowEnd && !reduce);
    } catch {
      setOk(false);
    }
  }, [reduce]);
  return ok;
}

export default function Hero() {
  const can3D = useCanRender3D();
  const reduce = useReducedMotion();
  const words = heroCopy.headline.split(' ');

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div>
          <motion.p
            className="eyebrow"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {heroCopy.intro}
          </motion.p>
          <h1 className="hero-name">
            <span className="gradient-text">{personal.name.toUpperCase()}</span>
          </h1>
          <p className="hero-headline" aria-label={heroCopy.headline}>
            {words.map((w, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
                initial={reduce ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.6 }}
                aria-hidden="true"
              >
                {w}
              </motion.span>
            ))}
          </p>
          <p className="hero-desc">{heroCopy.description}</p>

          <div className="hero-ctas">
            <a className="btn btn-primary" href="#projects">
              Explore My Work
            </a>
            <a className="btn btn-ghost" href="#contact">
              Let's Connect
            </a>
          </div>

          <div className="hero-socials">
            <a className="icon-btn" href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <LinkedInIcon />
            </a>
            {personal.github === PLACEHOLDER ? (
              <span className="icon-btn" aria-label="GitHub (placeholder, URL not yet added)" title="GitHub URL to be added">
                <GitHubIcon />
              </span>
            ) : (
              <a className="icon-btn" href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                <GitHubIcon />
              </a>
            )}
            <a className="icon-btn" href={`mailto:${personal.email}`} aria-label="Send email">
              <Mail size={18} />
            </a>
            <a href={`mailto:${personal.email}`} className="hero-email">
              {personal.email}
            </a>
          </div>
        </div>

        <div className="hero-scene">
          {can3D ? (
            <Suspense fallback={<div className="fallback-orb" aria-hidden="true" />}>
              <HeroScene />
            </Suspense>
          ) : (
            <div className="fallback-orb" role="img" aria-label="Decorative glowing orb" />
          )}
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <ArrowDown size={16} />
        <span />
      </div>
    </section>
  );
}
