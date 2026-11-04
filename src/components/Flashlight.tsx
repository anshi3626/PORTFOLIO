import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { isLowPowerDevice, prefersReducedMotion } from '../lib/motion';

interface FlashlightProps {
  children: ReactNode;
  /** Beam radius in px on desktop. */
  radius?: number;
  /** How much the unlit layer is dimmed, 0 (none) to 1 (black). */
  dim?: number;
  className?: string;
}

/**
 * A torchlight that reveals the layer beneath a dark shade.
 *
 * - Pointer position is written straight to CSS custom properties inside a
 *   requestAnimationFrame loop, so pointer events never re-render React.
 * - Touch: press and drag to move the beam. It fades out after release.
 * - Reduced motion or low-power devices: the shade is removed entirely and
 *   the content is shown at full strength.
 */
export default function Flashlight({ children, radius = 170, dim = 0.78, className = '' }: FlashlightProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion() || isLowPowerDevice()) {
      root.dataset.mode = 'off';
      return;
    }
    root.dataset.mode = 'on';

    let raf = 0;
    let x = 0;
    let y = 0;
    let r = 0; // current beam radius (0 = hidden)
    let targetX = 0;
    let targetY = 0;
    let targetR = 0;

    const paint = () => {
      raf = 0;
      // Ease toward the target so the beam glides instead of snapping.
      x += (targetX - x) * 0.28;
      y += (targetY - y) * 0.28;
      r += (targetR - r) * 0.14;
      root.style.setProperty('--fx', `${x.toFixed(1)}px`);
      root.style.setProperty('--fy', `${y.toFixed(1)}px`);
      // Unitless: the stylesheet multiplies by 1px in calc().
      root.style.setProperty('--fr', r.toFixed(1));
      if (Math.abs(targetX - x) > 0.3 || Math.abs(targetY - y) > 0.3 || Math.abs(targetR - r) > 0.3) {
        raf = requestAnimationFrame(paint);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const rect = () => root.getBoundingClientRect();
    const place = (clientX: number, clientY: number) => {
      const b = rect();
      targetX = clientX - b.left;
      targetY = clientY - b.top;
    };

    const onEnter = (e: PointerEvent) => {
      place(e.clientX, e.clientY);
      if (x === 0 && y === 0) {
        x = targetX;
        y = targetY;
      }
      targetR = radius;
      schedule();
    };
    const onMove = (e: PointerEvent) => {
      place(e.clientX, e.clientY);
      if (e.pointerType === 'touch') {
        // Touch: the beam only lights while the finger is down.
        if (e.buttons === 0 && targetR === 0) return;
      }
      targetR = radius;
      schedule();
    };
    const onLeave = () => {
      targetR = 0;
      schedule();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        place(e.clientX, e.clientY);
        targetR = radius;
        schedule();
      }
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        // Keep the beam on the last touch point for a moment, then fade it out.
        window.setTimeout(() => {
          targetR = 0;
          schedule();
        }, 1600);
      }
    };

    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointerup', onUp);

    return () => {
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('pointerup', onUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [radius]);

  const style = { '--dim': dim } as CSSProperties;

  return (
    <div ref={rootRef} className={`flashlight ${className}`} style={style} data-mode="on">
      <div className="fl-lit">{children}</div>
      <div className="fl-shade" aria-hidden="true" />
    </div>
  );
}
