# Fornieri Luxury Real Estate Website

A multipage luxury real estate experience for Fornieri, showcasing prestige listings, advisory services, leadership, and a concierge contact form. The project uses a maintainable file hierarchy with dedicated assets for styling, interactivity, media, and documentation.

## Project structure

```
.
├── index.html                 # Home
├── about.html                 # Brand story, philosophy, and methodology
├── listings.html              # Current prestige portfolio
├── services.html              # Advisory offerings and methodology
├── team.html                  # Leadership profile and partner testimonials
├── contact.html               # Concierge contact form and office details
├── README.md                  # Project overview and maintenance notes
├── package.json               # npm scripts and Vite dependency
├── vite.config.js             # Vite multipage configuration
├── .gitignore                 # Node/Vite artefact exclusions
├── fornieri-luxury-website.html # Legacy redirect to preserve old entry point
└── public
    ├── css
    │   └── style.css          # Global styling, shared components, and responsive layout
    ├── js
    │   └── main.js            # Navigation, active-state handling, and intersection observers
    ├── images                 # Brand photography and headshots
    │   ├── Luke_010_HiRes.jpg
    │   ├── images.jpeg
    │   └── main.jpg
    └── video
        └── 27-Cambridge-Drive-hero.mp4
```

## Features

- Immersive home hero with autoplaying video background, glassmorphism overlay, and clear pathways to listings and consultations.
- Dedicated pages for About, Listings, Services, Team, and Contact, each reusing shared navigation, footer, and design system.
- Responsive grid layouts, soft depth, and motion-driven reveals tuned for a high-end aesthetic across devices.
- Sticky navigation with automatic active-state highlighting, accessible mobile drawer, and smooth scrolling for same-page anchors.
- Concierge enquiry form with semantic markup, validation attributes, and privacy messaging on the contact page.
- Intersection Observer animations that gracefully degrade when unavailable or when reduced-motion is preferred.

## Getting started

### Quick preview options

1. **npm dev server (recommended)**
    - Install dependencies once: `npm install`
    - Start the local server: `npm run dev`
    - Vite will open `http://localhost:5173/`; additional pages are available at `/about.html`, `/listings.html`, etc.
2. **Direct file open**
    - Open any `.html` page (e.g., `index.html`) directly in your browser.
    - Keep the `public/` directory alongside the HTML files so styles, scripts, media, and video assets resolve correctly.
3. Optional: host via any static site provider (Netlify, Vercel, GitHub Pages). All paths are relative to the project root.

### Available npm scripts

- `npm run dev` – Launches the Vite development server with hot reload for all pages.
- `npm run build` – Produces the static production build in `dist/`.
- `npm run preview` – Serves the production build locally for a final QA pass.

## Customisation tips

- Update copy, property details, and contact information directly inside the relevant page (`about.html`, `listings.html`, etc.).
- Swap hero or property imagery by replacing assets under `public/images/` or the hero video in `public/video/`.
- Extend styles within `public/css/style.css`; the file uses CSS variables for quick theming.
- Add new interactions or tracking snippets in `public/js/main.js`.

## Maintenance notes

- The legacy `fornieri-luxury-website.html` now performs a zero-delay redirect to `index.html` so existing links remain functional.
- Maintain high-resolution imagery (2000px+) to preserve visual fidelity on retina devices.
- Validate HTML and CSS periodically, especially after making copy or layout changes. Tools like the W3C validator and `stylelint` integrate easily if you choose to add a build pipeline later.
