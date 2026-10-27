# Prashanth — Frontend Developer Portfolio

> **Production-grade personal portfolio built with pure Vanilla HTML5, CSS3, and JavaScript (ES6+). Zero frameworks, zero build tools, 100% accessible, and statically deployable.**

---

## 📌 Table of Contents
1. [Overview & Positioning](#overview--positioning)
2. [Project Architecture & File Structure](#project-architecture--file-structure)
3. [Recruiter-Focused Features](#recruiter-focused-features)
4. [Deployment Instructions](#deployment-instructions)
   - [Deploying on Netlify (Drag & Drop or GitHub)](#1-deploying-on-netlify)
   - [Deploying on Vercel](#2-deploying-on-vercel)
   - [Deploying on GitHub Pages](#3-deploying-on-github-pages)
   - [Testing the Live Site on Mobile Devices](#testing-the-live-site-on-mobile-devices)
5. [Customization & Placeholders to Replace](#customization--placeholders-to-replace)
6. [How to Explain This Project in an Interview (Talking Points)](#how-to-explain-this-project-in-an-interview)
7. [Pre-Submission Checklist](#pre-submission-checklist)
8. [React Preloader Component Integration Guide (`shadcn`)](#react-preloader-component-integration-guide)

---

## 🎯 Overview & Positioning

This portfolio is specifically tailored for a **Frontend Developer role**, highlighting foundational mastery of the core web platform:
- **Semantic HTML5:** Native landmark tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), structured heading order (`<h1>` &rarr; `<h2>` &rarr; `<h3>`), and accessible screen-reader attributes.
- **Modern CSS3 Architecture:** Mobile-first layout, CSS custom properties (`:root` tokens with dark/light mode overrides), CSS Grid and Flexbox, and fluid typography via `clamp()`.
- **Vanilla JavaScript (ES6+):** Modular separation of DOM logic (`main.js`) and accessible form validation (`form.js`) without heavy third-party dependencies.
- **Supporting Strengths:** Clearly positions full-stack (Node.js/Express, Supabase/Firebase), mobile (React Native), and GenAI/OpenCV capabilities as force-multipliers for frontend engineering.

---

## 📁 Project Architecture & File Structure

```text
beginner/
├── index.html                   # Semantic, SEO-optimized, accessible single-page layout
├── css/
│   └── style.css                # CSS custom properties, BEM-naming, mobile-first queries
├── js/
│   ├── main.js                  # Theme toggle, mobile nav, scroll-spy, reveal animations, filters
│   └── form.js                  # Accessible validation, live char counter, double-submit protection
├── assets/
│   ├── images/
│   │   ├── favicon.svg          # Modern monogram SVG icon
│   │   ├── profile-placeholder.svg # High-res vector developer avatar
│   │   ├── study-sphere.svg     # GenAI study companion UI mockup
│   │   ├── blood-link.svg       # Emergency medical dispatch mockup
│   │   ├── edupulse.svg         # Computer vision attendance mockup
│   │   └── lyvon.svg            # High-performance D2C storefront mockup
│   └── resume.pdf               # Downloadable resume placeholder
├── components/
│   └── ui/
│       ├── skeleton-key-preloader.tsx # React/shadcn interactive preloader component
│       └── demo.tsx                   # Interactive preloader demo component
└── README.md                    # Documentation, interview guide & deployment instructions
```

---

## ⚡ Recruiter-Focused Features

Recruiters spend an average of 6–10 seconds evaluating a portfolio. This site includes high-impact recruiter features designed to maximize callback rates:

1. **Recruiter TL;DR Floating Modal:**
   - One-click trigger in the sticky header and hero section (`⚡ Recruiter TL;DR`).
   - Displays a 30-second candidate summary, target roles, immediate availability, top 3 engineering highlights, and instant contact options.
2. **Key Impact Numbers Bar:**
   - Highlights quantifiable business and technical metrics:
     - **35%**: Screen Load Time Reduction (*RideMate* carpooling app)
     - **95+**: Lighthouse Performance Score (*LYVON* D2C Storefront, LCP <1.8s)
     - **Top 112**: Finalist out of 1,000+ teams in *Cardano Asia International Hackathon*
     - **10K+**: Monthly active storefront visitors
3. **Interactive Project Category Filter:**
   - Instant live client-side filtering (`All`, `Frontend & E-Commerce`, `GenAI & Vision`, `Real-Time & Dispatch`) allowing hiring managers to view relevant work instantly.
4. **"Why Hire Me for Your Frontend Team" Matrix:**
   - Concrete breakdown of production strengths: Core Web Vitals optimization, WCAG accessibility, cross-platform adaptability, and agile sprint readiness.
5. **Direct Contact Card & Copy-to-Clipboard:**
   - One-click copy email button with instant tactile feedback.

---

## 🚀 Deployment Instructions

### 1. Deploying on Netlify

#### Option A: Drag & Drop (Fastest — 30 seconds)
1. Go to [app.netlify.com](https://app.netlify.com) and log in or create a free account.
2. Navigate to the **Sites** tab.
3. Drag and drop the entire `beginner/` folder into the upload dropzone.
4. Netlify will deploy the static site immediately and provide a live URL (e.g., `https://prashanth-portfolio.netlify.app`).

#### Option B: Via GitHub Repository
1. Push your folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/prashanth/portfolio.git
   git push -u origin main
   ```
2. In Netlify, click **Add new site** &rarr; **Import an existing project**.
3. Select **GitHub** and authorize your repo.
4. Leave the **Build command** empty (since no build step is required) and set **Publish directory** to `.`.
5. Click **Deploy Site**.

---

### 2. Deploying on Vercel
1. Install the Vercel CLI or visit [vercel.com](https://vercel.com).
2. If using the CLI, run in your terminal:
   ```bash
   npx vercel
   ```
3. Follow the interactive prompts:
   - *Set up and deploy?* &rarr; `Y`
   - *Which scope?* &rarr; (Select your account)
   - *Link to existing project?* &rarr; `N`
   - *What's your project's name?* &rarr; `prashanth-portfolio`
   - *In which directory is your code located?* &rarr; `./`
4. Vercel automatically detects static HTML/CSS/JS and deploys to a global edge network.

---

### 3. Deploying on GitHub Pages
1. Push the code to a GitHub repository named `portfolio` (or `username.github.io`).
2. Go to your repository settings on GitHub:
   - Click **Settings** &rarr; **Pages** (under the "Code and automation" sidebar).
   - Under **Build and deployment** &gt; **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`.
   - Click **Save**.
3. In 1–2 minutes, your site will be live at `https://<your-username>.github.io/<repo-name>/`.

---

### 📱 Testing the Live Site on Mobile Devices
To test touch interactions, hamburger menu, and responsiveness on an actual smartphone:
1. **Local Network Testing:**
   - Find your computer's local IP address (`ipconfig` on Windows &rarr; look for IPv4 Address, e.g., `192.168.1.5`).
   - Start a local server: `python -m http.server 3000`
   - On your phone connected to the **same Wi-Fi**, open Chrome/Safari and visit: `http://192.168.1.5:3000`.
2. **Production URL Testing:**
   - Once deployed to Netlify or Vercel, open the HTTPS link directly on iOS Safari or Android Chrome.
   - Verify tap target sizes (&ge; 44px), smooth scrolling, and form inputs.

---

## ✏️ Customization & Placeholders to Replace

Before submitting or sharing with recruiters, replace the following placeholders:

| Item | File | Location | Instructions |
|---|---|---|---|
| **Resume PDF** | `assets/resume.pdf` | Root assets folder | Replace the placeholder PDF with your real resume file (keep the filename `resume.pdf` or update `index.html` link). |
| **Profile Photo** | `assets/images/profile-placeholder.svg` | Hero image | Replace with your professional headshot (`profile.jpg` or `profile.png`), and update the `src` attribute in `index.html`. |
| **GitHub Links** | `index.html` | Hero, Projects, Contact, Footer | Replace `https://github.com/prashanth` with your active GitHub handle. |
| **LinkedIn Links** | `index.html` | Hero, Contact, Footer | Replace `https://linkedin.com/in/prashanth` with your real profile link. |
| **Project Live Demos** | `index.html` | Project card buttons | Replace placeholder `#projects` hrefs with your deployed project URLs. |
| **Contact Form Endpoint** | `js/form.js` | Lines 220–245 | Replace simulated delay with your Formspree ID (`https://formspree.io/f/YOUR_ID`) or Netlify Forms config. |

---

## 🎤 How to Explain This Project in an Interview

Here are technical talking points organized by topic that demonstrate senior frontend maturity:

### 1. Design Choices (Colors, Typography & Spacing)
- **CSS Custom Properties on `:root`:**
  - *"I defined a single source of truth for color tokens, spacing scales, and typography. Dark mode is implemented by switching `[data-theme='dark']` on the `<html>` root element, which seamlessly swaps background, surface, and text variables without duplicating CSS rules."*
- **Curated Color Palette:**
  - *"Instead of raw primary colors, I used an HSL-derived palette centered around a vibrant Indigo accent (`#4f46e5`) paired with an Electric Cyan secondary (`#06b6d4`), balanced by Slate neutrals (`#0f172a` to `#f8fafc`)."*
- **Fluid Typography:**
  - *"I utilized CSS `clamp()` functions for heading scales (e.g. `clamp(2.25rem, 1.95rem + 1.5vw, 3rem)`). This provides fluid responsiveness across viewport changes without requiring rigid, jumpy media queries for font sizes."*

### 2. Layout Decisions (CSS Grid vs. Flexbox)
- **Why CSS Grid:**
  - *"I used CSS Grid for two-dimensional layouts where alignment along both rows and columns is required: the Featured Projects grid, the Technical Arsenal cards, the Recruiter Metrics Bar, and the Quick Facts strip."*
- **Why Flexbox:**
  - *"I used Flexbox for one-dimensional layouts: the sticky header's distribution of logo, nav items, and action controls; the hero button group; the vertical experience timeline items; and form input icon alignments."*

### 3. Responsiveness Approach
- **Mobile-First Philosophy:**
  - *"Base CSS styles target mobile viewports first (under 600px). Enhancements are progressively layered using `min-width` queries at 600px (tablet), 900px (small desktop), and 1200px (large desktop). This keeps mobile CSS parsing fast and lightweight."*
- **Accessible Tap Targets & Viewport Guardrails:**
  - *"Every interactive control (hamburger toggle, theme toggle, buttons, form inputs) has a minimum tap target of 44&times;44px. All containers employ `box-sizing: border-box` and relative units, ensuring zero horizontal scrolling from 320px up to 1920px."*

### 4. Frontend Architecture & Separation of Concerns
- **Clean File Separation:**
  - *"HTML5 is purely semantic structure. CSS handles presentation and layout via BEM class names (`.project-card__thumbnail`, `.btn--primary`). JavaScript contains zero inline style modifications, instead toggling accessibility attributes and semantic classes (`.is-open`, `.is-valid`, `[data-theme='dark']`)."*
- **Performance & Zero Dependencies:**
  - *"No heavy runtime libraries, frameworks, or bundlers were needed. This ensures sub-second First Contentful Paint (FCP) and near-perfect 95+ Lighthouse audits."*

### 5. Form Validation Lifecycle
- **Progressive Two-Phase Validation:**
  - *"To avoid annoying users with aggressive errors while they type their first character, fields only validate on `blur`. Once a field enters an error state, it switches to real-time `input` validation so the user gets immediate feedback the moment their input becomes valid."*
- **Accessibility & ARIA Support:**
  - *"Each input links dynamically to its error container using `aria-describedby='[field]-error'` and toggles `aria-invalid='true/false'`. The submission status banner uses `aria-live='assertive'` to alert assistive technologies immediately."*
- **Double Submission Prevention:**
  - *"Upon submission, the button is immediately disabled, displays an inline CSS loading spinner, and locks against duplicate network dispatches."*

---

## ✅ Pre-Submission Checklist

Verify every item before submitting your portfolio:

- [x] **Responsive Verification:**
  - [x] 320px (iPhone SE): No horizontal scroll, hamburger menu operates smoothly.
  - [x] 768px (iPad/Tablet): Quick facts and project cards format cleanly in 2 columns.
  - [x] 1024px / 1440px (Desktop): Nav links expanded, 4-column metric counter aligned.
- [x] **Form Validation Edge Cases:**
  - [x] Empty submit triggers red borders and focused error messages.
  - [x] Name with numbers/symbols (e.g. `John123`) rejected; letters/spaces accepted.
  - [x] Invalid email (e.g. `user@`) rejected; standard email format accepted.
  - [x] Message under 10 chars rejected; live counter updates properly up to 500 characters.
  - [x] Submit button enters loading state and resets cleanly on success.
- [x] **Accessibility & SEO:**
  - [x] Single `<h1>` tag in the hero; logical heading structure throughout.
  - [x] High-contrast `:focus-visible` outlines present on keyboard tab navigation.
  - [x] Skip-to-content link functional when pressing Tab on page load.
  - [x] `prefers-reduced-motion` respected (animations disable gracefully).
  - [x] OpenGraph meta tags, Twitter cards, and SVG favicon in place.
- [x] **Theme Persistence:**
  - [x] Dark/light toggle switches smoothly and remembers choice in `localStorage`.

---

## 🔑 React Preloader Component Integration Guide

As requested, the interactive **Skeleton Key Preloader** React component is provided in:
- `components/ui/skeleton-key-preloader.tsx`
- `components/ui/demo.tsx`

### Why `/components/ui` is Standard
In modern React and **shadcn/ui** architectures:
- `/components/ui/`: Contains atomic, reusable UI primitives (buttons, dialogs, preloaders, inputs). Keeping these isolated from domain-specific feature components ensures modularity and simplifies updates via the shadcn CLI.

### How to integrate into a Next.js / Vite React project:
1. Initialize a modern React application:
   ```bash
   npx create-next-app@latest my-portfolio --typescript --tailwind --eslint
   ```
2. Initialize shadcn in your project:
   ```bash
   npx shadcn@latest init
   ```
3. Copy `skeleton-key-preloader.tsx` into your `components/ui/` folder.
4. Import and wrap your portfolio pages:
   ```tsx
   import SkeletonKeyPreloader from "@/components/ui/skeleton-key-preloader"

   export default function App() {
     return (
       <SkeletonKeyPreloader
         name="Prashanth"
         word="portfolio"
         metal="gold"
         about={["Frontend Developer", "Building interfaces", "that move."]}
         links={["github.com/prashanth", "linkedin.com/in/prashanth"]}
       >
         <YourPortfolioContent />
       </SkeletonKeyPreloader>
     )
   }
   ```
