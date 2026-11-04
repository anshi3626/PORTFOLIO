# Anshika Yadav – Portfolio

React + TypeScript + Vite portfolio with a Three.js / React Three Fiber hero scene, Framer Motion reveals, and a mailto-based contact form.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ locally
```

## Edit your content

Almost everything lives in **`src/data/content.ts`**:

- `personal.github`: replace `PLACEHOLDER` with your GitHub URL. Until then the GitHub icon shows as a disabled placeholder.
- `projects`: set `status`, `problem`, `approach`, `results`, `github` and `demo`. Any field still set to `PLACEHOLDER` is shown as an unfinished item rather than being filled in with invented text. Only add results you have verified.
- `certifications`: add a `certificateUrl` only when a real certificate file or link exists. The "View Certificate" button appears only in that case.
- `creativeItems`: set `image` to a real image path (for example `/creative/poster-1.jpg` in `public/`) and update the titles. Keep images to your own work.

Nothing in the site claims a result, certificate, repository or screenshot that is not in this file.

## Notes

- **3D:** the hero scene and the About ornament load lazily. On devices without WebGL, on devices with 2 or fewer CPU threads, or when the visitor prefers reduced motion, a static CSS orb is shown instead.
- **Contact form:** there is no backend. Submitting opens the visitor's email app with the message pre-filled to your address. Nothing is stored or delivered by the site itself.
- **Accessibility:** skip link, semantic landmarks, keyboard-operable tabs and dialogs, `aria-current` on the active nav link, and reduced-motion support throughout.

## Deploy

Any static host works, since the output is plain files in `dist/`:

- **Vercel / Netlify:** import the repository, build command `npm run build`, output directory `dist`.
- **GitHub Pages:** set `base` in `vite.config.ts` to `'/<repo-name>/'`, then publish `dist/`.
