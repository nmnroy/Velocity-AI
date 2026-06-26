<div align="center">

# ⚡ Velocity AI

### Autonomous Data Automation for Modern Teams

*A premium, high-converting landing page built for the Next-Gen AI Platform Speed Run*

[![Live Demo](https://img.shields.io/badge/Live-Demo-FFC801?style=for-the-badge&logo=vercel&logoColor=172B36)](https://your-deployed-url.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Next.js-14-172B36?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-114C5A?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Zero Dependencies](https://img.shields.io/badge/Animation_Libs-ZERO-FF9932?style=for-the-badge)](#tech-stack)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Links](#live-links)
- [The Two Hard Requirements](#the-two-hard-requirements)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scoring Checklist](#scoring-checklist-self-audit)
- [Engineering Notes](#engineering-notes)

---

## 🎯 Overview

**Velocity AI** is a fully responsive, animated, production-grade landing page built in response to the **Next-Gen AI Platform Speed Run** problem statement. It showcases an AI-driven data automation platform through four core sections — **Hero**, **Feature Showcase**, **Pricing**, and **Social Proof** — engineered around two explicitly graded technical constraints:

| Requirement | Status |
|---|---|
| Dynamic multi-currency, multi-cycle pricing engine | ✅ Implemented |
| Strict re-render isolation on pricing state changes | ✅ Verified via React DevTools Profiler |
| Bento Grid ↔ Accordion responsive conversion | ✅ Implemented |
| Context Lock (active index survives breakpoint resize) | ✅ Implemented & manually tested |
| Zero banned animation/UI libraries | ✅ Confirmed — see `package.json` |
| Dark / Light theme toggle | ✅ Implemented, persists via `localStorage` |
| Continuous Scroll Reveal | ✅ Implemented via IntersectionObserver |

---

## 🔗 Live Links

| Resource | Link |
|---|---|
| 🌐 Live Deployment | `https://your-deployed-url.vercel.app` |
| 💻 Source Code | `https://github.com/your-username/your-repo` |
| 🎥 Demo Video | `https://drive.google.com/your-demo-link` |

---

## 🏗️ The Two Hard Requirements

### 1️⃣ Matrix-Driven Pricing & Performance-Isolated Currency Switcher

Pricing is **never hardcoded**. Every displayed price is computed live, on the client, from a multi-dimensional configuration matrix:

```
Final Price = baseMonthlyRateUSD × currencyConversionRate × regionalTariffMultiplier × cycleMultiplier
```

- **3 tiers** (`Starter`, `Growth`, `Enterprise`) × **3 currencies** (`USD`, `EUR`, `INR`) × **2 billing cycles** (`Monthly`, `Annual`) = **18 dynamically computed combinations**.
- A flat **20% annual discount** is applied via a single named constant (`ANNUAL_DISCOUNT_MULTIPLIER = 0.8`), never re-typed as a magic number anywhere else.
- Currency formatting uses the native `Intl.NumberFormat` API — correct symbol placement, decimal precision, and thousands separators per locale, with zero manual string concatenation.

**Re-render isolation** is enforced architecturally, not by convention:
- `PricingContext` (holding `currency`/`cycle` state) is scoped *only* inside the Pricing section.
- `TierCard` never receives `currency` or `cycle` as props — it structurally *cannot* re-render when they change.
- `PriceDisplay` is the **only** component that reads `PricingContext` and renders visible output — confirmed via React DevTools Profiler that toggling currency or billing cycle re-renders nothing but the price text nodes.

### 2️⃣ Bento-to-Accordion Wrapper with Context Lock

- **Desktop (≥768px):** features render as an asymmetric **Bento Grid**.
- **Mobile (<768px):** the same data renders as a touch-optimized **Accordion**, built entirely from scratch — zero Radix, zero Headless UI, zero Framer Motion.
- **Context Lock:** both views read and write the *same* `activeIndex` from a single shared `FeatureActiveContext`. If a user is hovering/focusing a Bento card and resizes the window past the mobile breakpoint, the Accordion mounts with that exact panel already animating open — no flash, no mismatch, no manual sync logic required, because the source of truth never duplicates across breakpoints.

---

## 🛠️ Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | Server Components by default → physically prevents unwanted re-renders bleeding upward |
| Styling | **Tailwind CSS** | Utility-first, zero runtime CSS-in-JS engine (compliant with motion rules) |
| Animation | **Native CSS Transitions/Animations + WAAPI** | No Framer Motion, no GSAP — 100% hardware-accelerated, zero dependency |
| State | **React Context + `useState`** | No Redux/Zustand — keeps the dependency count at zero and re-render scope provably small |
| Currency Formatting | **`Intl.NumberFormat`** | Native browser API, correct locale formatting, zero manual string math |
| Theming | **CSS Variables + `class` dark mode** | Instant, flicker-free theme switching, fully Tailwind-compatible |

**Explicitly NOT used (per competition rules):** Framer Motion, Radix UI, Shadcn, HeadlessUI, GSAP, Redux, Zustand.

---

## 🧱 Architecture

```
┌─────────────────────────────────────────────┐
│                 app/layout.tsx                │
│   ThemeProvider · SiteHeader · SiteFooter     │
└───────────────────┬───────────────────────────┘
                     │
   ┌─────────────────┼─────────────────┬─────────────────┐
   ▼                 ▼                 ▼                 ▼
┌────────┐   ┌──────────────────┐  ┌──────────┐  ┌─────────────┐
│  Hero  │   │  FeatureSection   │  │ Pricing  │  │ SocialProof │
│(mount  │   │  ┌─────────────┐  │  │ Section  │  │  Section    │
│ anim)  │   │  │FeatureActive │  │  │ ┌──────┐ │  │             │
└────────┘   │  │  Context     │  │  │ │Pricing│ │  └─────────────┘
             │  └──────┬───────┘  │  │ │Context│ │
             │   ┌─────┴─────┐    │  │ └───┬───┘ │
             │   ▼           ▼    │  │     ▼     │
             │ Bento      Accordion│  │PriceDisplay│
             │ Grid       (mobile) │  │(sole reader)│
             └────────────────────┘  └─────────────┘
```

**Key principle:** every interactive feature owns its state at the *smallest possible scope*. Nothing is global except theme.

---

## 🎨 Design System

| Token | Hex | Usage |
|---|---|---|
| 🟨 Forsythia | `#FFC801` | Primary accent / CTAs |
| 🟧 Deep Saffron | `#FF9932` | Secondary accent / gradients |
| 🟦 Nocturnal Expedition | `#114C5A` | Primary dark surface |
| ⬛ Oceanic Noir | `#172B36` | Near-black / dark mode base |
| 🟩 Mystic Mint | `#D9E8E2` | Secondary light surface |
| ⬜ Arctic Powder | `#F1F6F4` | Light background |

**Typography:** `JetBrains Mono` (headers, pricing numerals, eyebrows) + `Inter` (body, UI), both self-hosted via `next/font` — zero external font requests, zero layout shift.

**Motion system** — strict tiers matching the brief:
| Tier | Duration | Easing | Used For |
|---|---|---|---|
| Micro-interaction | 150–200ms | ease-out | hovers, toggles, chevrons |
| Structural reflow | 300–400ms | ease-in-out | accordion expand/collapse |
| Scroll Reveals | 600ms | cubic-bezier(0.16, 1, 0.3, 1) | Continuous entrance/exit on scroll |

All animations use `transform`/`opacity` only — zero layout-thrashing properties animated.

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build locally
```

---

## 📁 Project Structure

```
├── app/                    # Routes, layout, metadata
├── components/
│   ├── layout/              # Header, Footer
│   ├── sections/             # Hero, Feature, Pricing, SocialProof wrappers
│   ├── features/             # BentoGrid, BentoCard, AccordionPanel, Context
│   ├── pricing/               # TierCard, BillingToggle, CurrencySwitcher, PriceDisplay
│   ├── social-proof/           # LogoMarquee, TestimonialCard
│   └── ui/                      # Reusable: RevealOnScroll, ThemeToggle, AnimatedGradientBlob
├── hooks/                   # useBreakpoint, useScrollReveal
├── lib/                     # design-tokens, motion, pricing-matrix, pricing-engine, theme-context
└── public/icons/             # Provided SVG asset pack
```

---

## ✅ Scoring Checklist (Self-Audit)

- [x] Dynamic pricing matrix — no hardcoded final values anywhere
- [x] Re-render isolation verified via React DevTools Profiler
- [x] Bento ↔ Accordion responsive conversion, zero external libraries
- [x] Context Lock manually tested across multiple cards and resize directions
- [x] Semantic HTML — single `<h1>`, correct heading hierarchy, `<main>`/`<header>`/`<section>`/`<footer>`
- [x] Full SEO metadata — title, description, Open Graph, Twitter Card, canonical, sitemap, robots.txt
- [x] Entrance animation orchestration ≤ 500ms, verified in DevTools Performance panel
- [x] All assets (color palette, fonts, SVG pack) visibly and meaningfully integrated
- [x] Fully responsive: 320px → 1920px+, no clipping or overlap
- [x] Dark/light theme toggle, persists, respects OS preference
- [x] Continuous scroll reveal properly tracks viewport intersections
- [x] Zero banned dependencies — confirmed in `package.json`

---

## 🔍 Engineering Notes

**On Context Lock:** the hardest part of this requirement isn't the resize *event* — it's making sure the desktop and mobile views never maintain two separate sources of truth. By centralizing `activeIndex` in a single React Context consumed by both `BentoGrid` and the `Accordion`, the "transfer" the brief describes isn't an explicit step we wrote — it's a structural guarantee of the data model.

**On re-render isolation:** the temptation under time pressure is to reach for `React.memo` and call it solved. Memoization alone doesn't help if the state itself is ever passed down as props. The real fix is architectural: `TierCard` is *physically incapable* of re-rendering on a pricing change because pricing state never enters its prop signature at all.

**On Continuous Scroll Reveals & Performance:** Instead of relying on Tailwind class concatenation (which can fail during dynamic extraction or be overridden by global resets), the `RevealOnScroll` system bypasses CSS entirely. It applies exact `opacity` and `transform` values via inline React styles paired with a continuously listening `IntersectionObserver`. This guarantees bulletproof animations that fire continuously as you scroll up and down, completely decoupled from the CSS engine's state.

**On Theme Synchronization:** To achieve a true zero-FOUC (Flash of Unstyled Content) dark mode, the theme toggling architecture does not wait for React hydration. A blocking `<script>` in the `<head>` of `app/layout.tsx` checks `localStorage` and `matchMedia` during the initial HTML parse, injecting the `.dark` class instantly.

---

<div align="center">

Built for the **Next-Gen AI Platform Speed Run** · 26 June 2026

</div>
