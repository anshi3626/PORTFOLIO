/** Shared environment checks used by GSAP timelines and the flashlight. */

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Heuristic for low-powered devices: very few logical cores. */
export function isLowPowerDevice(): boolean {
  return typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 4) <= 2;
}

export function hasFinePointer(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
}
