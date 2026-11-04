import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, motion, useAnimationControls, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { Copy, Check, X, ArrowUpRight } from 'lucide-react';
import { gsap } from '../lib/gsap';
import { personal, contactCopy } from '../data/content';
import { prefersReducedMotion } from '../lib/motion';
import { GitHubIcon, LinkedInIcon } from './Icons';

/*
 * Stage geometry (SVG units). The button, strings and hand all share this
 * 600 x 520 coordinate system, and the stage keeps the same aspect ratio,
 * so everything scales together on every screen size.
 */
const VB_W = 600;
const VB_H = 520;
// Button rectangle in SVG units. The strings attach along its bottom edge.
const BTN = { x: 220, y: 90, w: 280, h: 66 };
const ATTACH_Y = BTN.y + BTN.h;

const STRINGS = [
  { d: `M250 ${ATTACH_Y} C232 205 214 240 206 282`, origin: `250 ${ATTACH_Y}` },
  { d: `M300 ${ATTACH_Y} C282 196 250 236 232 268`, origin: `300 ${ATTACH_Y}` },
  { d: `M360 ${ATTACH_Y} C330 210 292 246 258 282`, origin: `360 ${ATTACH_Y}` },
  { d: `M420 ${ATTACH_Y} C380 226 318 282 274 312`, origin: `420 ${ATTACH_Y}` },
  { d: `M470 ${ATTACH_Y} C410 220 262 262 142 304`, origin: `470 ${ATTACH_Y}` },
];

/** Stylised hand, drawn in SVG. Fingertips sit where the strings are tied. */
function Hand() {
  return (
    <g className="hand-art">
      <defs>
        <linearGradient id="skinShade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b2b2b" />
          <stop offset="0.55" stopColor="#111" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <radialGradient id="skinHi" cx="0.35" cy="0.3" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="handShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="6" dy="10" stdDeviation="8" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      {/* Forearm */}
      <path d="M40 520 C60 440 98 392 150 362 L226 344 C246 396 262 450 276 520 Z" fill="url(#skinShade)" filter="url(#handShadow)" />
      {/* Palm */}
      <ellipse cx="205" cy="352" rx="66" ry="50" fill="url(#skinShade)" />
      <ellipse cx="205" cy="352" rx="66" ry="50" fill="url(#skinHi)" />
      {/* Fingers, curled around the strings */}
      <g fill="none" stroke="url(#skinShade)" strokeWidth="30" strokeLinecap="round">
        <path d="M172 320 Q180 290 204 294" />
        <path d="M200 316 Q210 280 234 282" />
        <path d="M232 322 Q242 292 264 300" />
        <path d="M250 346 Q262 322 280 326" />
      </g>
      {/* Thumb */}
      <path d="M150 352 Q118 326 140 306" fill="none" stroke="url(#skinShade)" strokeWidth="28" strokeLinecap="round" />
    </g>
  );
}

export default function HireMe() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const handRef = useRef<SVGGElement>(null);
  const handWrapRef = useRef<SVGGElement>(null);
  const stringRefs = useRef<(SVGPathElement | null)[]>([]);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelCloseRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // ---- GSAP: string draw-in, sway, hand pulls, pointer parallax ----
  useLayoutEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const strings = stringRefs.current.filter(Boolean) as SVGPathElement[];

      // Draw each string on scroll-in using stroke-dash.
      strings.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.to(strings, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: 'power2.inOut',
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });

      // Gentle sway, each string rotating around its attachment point.
      strings.forEach((p, i) => {
        gsap.to(p, {
          rotation: i % 2 ? 1.4 : -1.4,
          svgOrigin: STRINGS[i].origin,
          duration: 2.6 + i * 0.35,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.6,
        });
      });

      // Small natural pull: the hand tugs the strings, then rests.
      if (handRef.current) {
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.4, delay: 1.2 })
          .to(handRef.current, { x: -8, y: -4, duration: 0.5, ease: 'power2.out' })
          .to(handRef.current, { x: -3, y: -1, duration: 0.45, ease: 'power2.in' })
          .to(handRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.6)' });
      }
    }, sectionRef);

    // Restrained pointer parallax on the hand, via quickTo for efficiency.
    const wrap = handWrapRef.current;
    const stage = stageRef.current;
    let onMove: ((e: PointerEvent) => void) | undefined;
    let qx: ((v: number) => void) | undefined;
    let qy: ((v: number) => void) | undefined;
    if (wrap && stage && window.matchMedia('(pointer: fine)').matches) {
      qx = gsap.quickTo(wrap, 'x', { duration: 0.8, ease: 'power3' });
      qy = gsap.quickTo(wrap, 'y', { duration: 0.8, ease: 'power3' });
      onMove = (e: PointerEvent) => {
        const b = stage.getBoundingClientRect();
        const nx = (e.clientX - b.left) / b.width - 0.5;
        const ny = (e.clientY - b.top) / b.height - 0.5;
        qx?.(nx * 10);
        qy?.(ny * 6);
      };
      stage.addEventListener('pointermove', onMove);
    }

    return () => {
      if (stage && onMove) stage.removeEventListener('pointermove', onMove);
      ctx.revert();
    };
  }, []);

  // ---- Framer Motion: button tilt, elevation and light sweep ----
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 260, damping: 22 });
  const sry = useSpring(ry, { stiffness: 260, damping: 22 });
  const sweep = useAnimationControls();

  const onBtnMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const b = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 8);
  };
  const onBtnLeave = () => {
    rx.set(0);
    ry.set(0);
    sweep.set({ x: '-120%' });
  };
  const onBtnEnter = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    sweep.start({ x: '120%', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } });
  };

  // ---- Overlay: focus management and Escape ----
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    panelCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      // Keep Tab focus inside the dialog.
      if (e.key === 'Tab') {
        const panel = document.getElementById('collab-panel');
        if (!panel) return;
        const focusables = Array.from(
          panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus?.();
    };
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked: the address is still visible as selectable text.
      setCopied(false);
    }
  };

  return (
    <section id="collaborate" className="collab" ref={sectionRef} aria-labelledby="collab-title">
      <div className="collab-inner">
        <p className="mono collab-kicker">Chapter 05 · Hire me</p>
        <h2 id="collab-title" className="sr-only">
          {contactCopy.headline}
        </h2>

        <div className="collab-stage" ref={stageRef}>
          <svg
            ref={svgRef}
            className="collab-svg"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            aria-hidden="true"
            focusable="false"
          >
            <g className="strings">
              {STRINGS.map((s, i) => (
                <path
                  key={i}
                  ref={(el) => {
                    stringRefs.current[i] = el;
                  }}
                  d={s.d}
                  fill="none"
                  stroke="#0b0b0b"
                  strokeWidth={i === 4 ? 1.1 : 1.4}
                  strokeLinecap="round"
                />
              ))}
            </g>
            <g ref={handWrapRef}>
              <g ref={handRef}>
                <Hand />
              </g>
            </g>
          </svg>

          <motion.button
            ref={triggerRef}
            type="button"
            className="collab-btn"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="collab-panel"
            style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
            whileHover={reduce ? undefined : { y: -4 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 360, damping: 24 }}
            onPointerEnter={onBtnEnter}
            onPointerMove={onBtnMove}
            onPointerLeave={onBtnLeave}
            onClick={() => setOpen(true)}
          >
            <motion.span className="collab-sweep" aria-hidden="true" initial={{ x: '-120%' }} animate={sweep} />
            <span className="collab-label">Let's collaborate</span>
          </motion.button>
        </div>

        <p className="collab-note">{contactCopy.body}</p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="collab-backdrop"
            className="collab-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              id="collab-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="collab-panel-title"
              className="collab-panel"
              initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={panelCloseRef}
                type="button"
                className="panel-close"
                onClick={() => setOpen(false)}
                aria-label="Close contact panel"
              >
                <X size={20} aria-hidden="true" />
              </button>

              <p className="mono kicker">Contact</p>
              <h3 id="collab-panel-title" className="panel-title">
                Start a conversation
              </h3>

              <ul className="panel-list">
                <li>
                  <span className="mono label">Email</span>
                  <span className="panel-value">{personal.email}</span>
                  <button type="button" className="copy-btn" onClick={copyEmail}>
                    {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </li>
                <li>
                  <span className="mono label">LinkedIn</span>
                  <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="panel-link">
                    <LinkedInIcon size={16} /> View profile <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <span className="mono label">GitHub</span>
                  <a href={personal.github} target="_blank" rel="noopener noreferrer" className="panel-link">
                    <GitHubIcon size={16} /> View profile <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              </ul>

              <a
                className="btn btn-solid panel-cta"
                href={`mailto:${personal.email}?subject=${encodeURIComponent('Project inquiry')}`}
              >
                Start a project
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
