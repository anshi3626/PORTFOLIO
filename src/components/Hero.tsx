import { useLayoutEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from '../lib/gsap';
import { hero, personal } from '../data/content';
import Flashlight from './Flashlight';
import Portrait from './Portrait';
import { prefersReducedMotion } from '../lib/motion';

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Opening timeline and scroll parallax. Everything is scoped to this section
  // and fully reverted on unmount.
  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-kicker', { opacity: 0, y: 12, duration: 0.6 })
        .from('.hero-line > span', { yPercent: 110, duration: 1.1, stagger: 0.12 }, '-=0.3')
        .from('.portrait-frame', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' }, '-=1.0')
        .from('.hero-meta', { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, '-=0.8');

      // Parallax: the portrait drifts slower than the page.
      gsap.to('.portrait-img, .portrait-missing', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <header id="home" className="hero" ref={root}>
      <div className="hero-top mono">
        <span className="hero-kicker">{hero.kicker}</span>
        <span className="hero-meta">{personal.location}</span>
        <span className="hero-meta">BCA · Cloud &amp; Security</span>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <h1 className="hero-name">
            <span className="hero-line">
              <span className="outline">{personal.firstName.toUpperCase()}</span>
            </span>
            <span className="hero-line">
              <span className="solid">{personal.lastName.toUpperCase()}</span>
            </span>
          </h1>

          <p className="hero-lead hero-meta">{hero.lead}</p>

          <Flashlight className="hero-flash" radius={150}>
            <p className="hero-words" aria-label={hero.revealWords.join(', ')}>
              {hero.revealWords.map((w) => (
                <span key={w} className="hero-word">
                  {w}
                </span>
              ))}
            </p>
          </Flashlight>
          <p className="hero-hint mono hero-meta">Move your cursor (or drag, on touch) to reveal</p>

          <p className="hero-desc hero-meta">{hero.description}</p>

          <div className="hero-actions hero-meta">
            <motion.a
              className="btn btn-solid"
              href="#projects"
              whileHover={reduce ? undefined : { y: -3 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              Explore the work
            </motion.a>
            <motion.a
              className="btn btn-line"
              href="#collaborate"
              whileHover={reduce ? undefined : { y: -3 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              Let's collaborate
            </motion.a>
          </div>
        </div>

        <figure className="portrait-frame">
          <Portrait priority />
          <figcaption className="mono caption">Fig. 01 — {personal.name}</figcaption>
        </figure>
      </div>

    </header>
  );
}
