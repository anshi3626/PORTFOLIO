import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { gsap } from './gsap';
import { prefersReducedMotion } from './motion';

/**
 * Scroll reveals for a section using GSAP + ScrollTrigger.
 *
 * - Elements with `data-reveal` fade and rise into view once.
 * - Elements with `data-rule` draw a thin horizontal rule from the left.
 *
 * Content is visible in the markup by default. The from-states are only
 * applied when motion is allowed, so nothing stays hidden without JS or
 * with reduced motion. Everything is reverted on unmount.
 */
export function useSectionReveal(scope: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]', el).forEach((node) => {
        gsap.from(node, {
          y: 36,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: node, start: 'top 88%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-rule]', el).forEach((node) => {
        gsap.from(node, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: node, start: 'top 92%', once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [scope]);
}
