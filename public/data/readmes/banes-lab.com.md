# Bane’s Lab – Jay Baleine's Portfolio Web Platform (ONGOING PROJECT)

**Professional Digital Showcase for Full-Stack Engineering, Creative Systems & OSRS Ecosystem Tools**

**banes-lab.com** is a meticulously engineered portfolio website that merges technical depth with artistic presentation. Featuring dynamic project galleries, modular component design, and real-time GitHub integration, this site demonstrates full-stack proficiency across React, Tailwind CSS, GitHub APIs, and interactive UI patterns.

The platform serves as a living resume and project showcase for frontend/backend engineering, graphics/UI design, and developer tools in the OSRS (Old School RuneScape) community and beyond.

---

## Overview

Bane’s Lab empowers discovery and engagement through:

- **Dynamic Project Rendering:** GitHub-powered repository cards with live README previews (public and private).
- **Visual Graphics Galleries:** Categorized design showcases with modal zoom, tags, and lazy-loaded assets.
- **Component-Based Layout:** Reusable Tailwind/React UI primitives optimized for maintainability.
- **Custom CSS/Markdown Theming:** Branded dark-mode prose and scroll-free layouts for immersive reading.
- **Performance-First Architecture:** Minimal bundle sizes via Vite, lazy loading, and zero external libraries except Keen Slider.

---

## Technical Architecture

**banes-lab.com** is built using a **modular React + Tailwind stack**, with clearly separated concerns across:

| **Module**           | **Purpose**                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| `App.jsx`            | Root router and layout scaffold with global background and animated content. |
| `pages/`             | Route-level screens: `Home`, `Graphics`, `Development`, `About`, `Contact`.  |
| `components/ui/`     | Reusable components: `Button`, `Modal`, `RepositoryCard`, `Slider`.          |
| `components/layout/` | Site-wide layout: `Header`, `Navbar`, `Footer`.                              |
| `data/`              | Precompiled structured data (images, project metadata, repo config).         |
| `hooks/`             | Custom React hooks: `useInView`, `useScrollDirection` for UX enhancements.   |
| `utils/`             | Utility functions for GitHub API integration and reusable logic.             |
| `styles/`            | Custom stylesheets: `globals.css`, `custom.css`, `markdown.css`.             |

---

## Key Engineering Features

### Development Project Showcase (GitHub Integrated)

- Fetches live public repos via GitHub API and merges with hand-curated private repo data.
- Displays repo metadata (`name`, `desc`, `lang`, `privacy`) with interactive modal to render Markdown README.
- Uses `remark-gfm` + `ReactMarkdown` for GitHub-flavored rendering and local fallback support.

### Graphic Design Galleries (Lazy Loaded + Categorized)

- Auto-generated UI using metadata from `/data/graphicsData.js`.
- Supports 10+ folders: _Droptracker_, _Enigma Esports_, _Varietyz Deluxe_, _RoseyRS_, and more.
- Responsive grid layout with modal image zoom (via Keen Slider) and scroll-based reveal animations.

### Modular React Components

- Clean, atomic component structure (e.g., `RepositoryCard`, `Modal`, `Button`) with semantic Tailwind classes.
- Enables reusability and maintainability across pages.
- Lazy zoom support and keyboard accessibility baked into UI.

### Custom Hooks & Animations

- `useInView`: Uses IntersectionObserver to fade galleries on scroll.
- `useScrollDirection`: Detects user scroll direction with throttle logic.
- `globals.css`: Custom slide-in animations, global dark mode layout, and scroll disabling.

### Design Fidelity & Markdown Styling

- Tailored `.markdown-body` styles using `Cinzel` + `Montserrat`, with full support for tables, code blocks, links.
- Matches visual identity across prose, modal, and interactive elements.

---

## Scalability & Maintainability

### Component-Centric Design

- Clear folder structure for pages, components, hooks, data, and styles.
- Easy to add new projects, folders, or UI components without impacting core logic.

### Performance Optimization

- Vite + Tailwind JIT = lightning-fast HMR and production builds.
- Purged CSS via correct Tailwind config with safelist for dynamic background classes.
- All images organized under `/public/assets/images/` for centralized management.

### Deployment-Ready

- Git-tracked build structure with `.vscode/settings.json`, `.gitignore`, `LICENSE`.
- FTP-ready deployment via one.com with `public` and `dist` separation.
- Uses clean URLs via React Router for SEO friendliness.

---

## Business & Professional Value

This site demonstrates:

- **End-to-End System Ownership:** From design to deployment, everything is handled in-house—no scaffolds, no dependencies on UI libraries beyond Tailwind.
- **Data-Driven Portfolio Strategy:** Combines live code from GitHub with refined markdown storytelling, appealing to both engineers and creatives.
- **Real-World Engineering Practices:** Component reuse, API integration, markdown parsing, error handling, hooks-based logic.
- **Accessible Branding Execution:** Every element is branded and polished—fonts, backgrounds, borders, colors.

---

## Conclusion

**banes-lab.com** is more than a portfolio—it’s a **working showcase of modular React engineering**, **systematic design thinking**, and **pragmatic web development**. Built to scale, adapt, and impress, it’s the type of project that speaks directly to recruiters, engineers, and business stakeholders.

Let’s connect to discuss how this level of attention to modularity, UI/UX polish, and system-level thinking can elevate your next product or platform.

---

🔗 [https://github.com/Varietyz/banes-lab.com](https://github.com/Varietyz/banes-lab.com)
