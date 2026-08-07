# Jay Purohit — Portfolio (Next.js)

Single-page portfolio. Design: dark, systems/dashboard-inspired palette (ink background,
amber + teal accents), Space Grotesk for display type, IBM Plex Sans/Mono for body and data
labels. Signature element: the hero pipeline diagram showing the real GSC → GA4 → Ubersuggest
→ Webflow → Claude (MCP) → pSEO deployment flow.

## Before you deploy

1. Add your resume PDF: drop the file at `public/resume.pdf` (create the `public/` folder if
   it isn't there). The "Download resume" button links to `/resume.pdf`.
2. Swap in your real domain/socials if you want more than email + phone + LinkedIn in the
   footer.
3. Content lives in `app/page.js` near the top (`proofStats`, `cases`, `stack`, `writing`
   arrays) — edit those, not the JSX layout, to update numbers or add a new case study later.

## Local dev (optional, needs internet for Google Fonts)

```
npm install
npm run dev
```

Open http://localhost:3000

## Deploy: GitHub + Vercel

```
git init
git add .
git commit -m "Initial portfolio"
gh repo create jay-purohit-portfolio --public --source=. --push
```

(or push to an existing repo you create on github.com manually, then `git remote add origin
<url>` and `git push -u origin main`)

Then in Vercel: New Project → Import the GitHub repo → it auto-detects Next.js → Deploy.
No environment variables needed. You'll get a free `*.vercel.app` URL immediately; add a
custom domain later from Project Settings → Domains whenever you're ready.

## Notes

- Build was verified locally (`npm run build` succeeds, single static page, ~87KB first load).
- Google Fonts are fetched at build time — this needs normal internet access, which Vercel's
  build environment has, so it'll work there even though it's not testable in a sandboxed
  environment with restricted network egress.
- Respects `prefers-reduced-motion` (the pipeline diagram's animated dashes turn off).
