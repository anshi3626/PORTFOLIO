# Anshika Yadav · Portfolio

Editorial, cinematic portfolio built with React, TypeScript, Vite, GSAP (with ScrollTrigger) and Framer Motion.

## Run

```bash
npm install
npm run dev
npm run build      # type-check + production build into dist/
```

## Add your portrait

Save your photo as `public/portrait.jpg` (portrait orientation, at least 800 px wide works well). Until then, a marked placeholder is shown in the hero. Nothing is faked.

## Where content lives

Everything editable is in `src/data/content.ts`, based on your resume and the links you provided:

- `personal`: name, email, LinkedIn, GitHub, education.
- `hero`, `about`, `skillGroups`, `experience`, `certifications`: resume-backed text.
- `projects`: add `github` for a repository link. Projects without a link show no link button.
- `caseStudyTodo`: marks the case study text as "to be added". Replace it with real problem, approach and results once you have verified them.

## Motion stack

- **GSAP + ScrollTrigger:** the hero opening timeline, portrait parallax, section reveals (`src/lib/useSectionReveal.ts`), and the Hire Me string drawing, sway and hand pulls. Everything is scoped with `gsap.context` and reverted on unmount.
- **Framer Motion:** button hover and tap, the navigation indicator (`layoutId`), the Hire Me tilt and light sweep, and the contact overlay. Framer and GSAP never animate the same element.
- **Flashlight** (`src/components/Flashlight.tsx`): a reusable torchlight. It moves through CSS custom properties inside a `requestAnimationFrame` loop, so pointer events never re-render React. Touch works by press and drag. It is disabled for reduced motion and low-power devices.

## Accessibility

Skip link, semantic landmarks, keyboard-operable dialog with focus trap, Escape to close, focus returned to the trigger, visible focus rings, and `prefers-reduced-motion` support throughout.

## Deploy (Vercel)

Import the GitHub repository in Vercel. It detects Vite automatically. Build command `npm run build`, output directory `dist`.
