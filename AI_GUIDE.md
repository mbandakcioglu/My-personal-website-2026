# AI Maintenance Guide - Murat Bandakçioğlu Portfolio

This document serves as a reference for any AI agent assisting in the maintenance or expansion of this portfolio project.

## Project Overview

A premium, highly-animated personal portfolio for Murat Bandakçioğlu, a Senior Front-end Developer & Team Lead. The project focuses on a "radical" and "premium" aesthetic, avoiding standard layouts (Topological Betrayal).

## Tech Stack

- **Structure**: Semantic HTML5
- **Styling**: Tailwind CSS (via CDN) + Custom Vanilla CSS
- **Interactions**: Vanilla JavaScript (no frameworks)
- **Deployment-Ready**: SEO optimized (JSON-LD, Meta tags), responsive, and cross-browser tested (Domain: `bandakcioglu.com`).

## Design System & Guidelines

- **Color Palette**:
  - **Primary**: Brand orange (`#ff4d00`)
  - **Background**: Deep Zinc/Black (`#09090b`)
  - **Text**: Zinc hierarchy (`#fafafa` for titles, `#a1a1aa` for body)
- **Aesthetics**:
  - **Glassmorphism**: Navigation use `backdrop-filter: blur(12px)` and `rgba(9, 9, 11, 0.8)` background.
  - **Typography**: Modern, bold, uppercase tracking for headers. Asymmetrical layouts. **SEO Note**: The main `<h1>` is "Murat Bandakçıoğlu" in the About section. The Hero banner name "MURAT" is an `<h2>`.

## Key Maintenance Rules

1. **Nav Border Fix**: The navigation bar must have a `1px solid transparent` base border to prevent flickering when transitioning to `rgba(255, 255, 255, 0.1)` on scroll.
2. **Casing (TR/EN)**: English technical terms (e.g., "Developer", "Build") must maintain their original casing even in Turkish content. Pay attention to the dotless "i" (ı) vs dotted "i" (İ) when converting case manually.
3. **Heading Hierarchy**:
   - `<h1>`: Murat Bandakçıoğlu (Found in About section)
   - `<h2>`: MURAT (Hero section), Section Titles (Hakkımda, Deneyim, etc.)
4. **Contact Section**: The contact form is currently hidden (via `hidden` class) as per user request. The remaining contact links are centered using `flex flex-col items-center`. Do not restore the form unless explicitly requested.
5. **Experience Content**: descriptions should highlight:
   - **Mar.ca**: Pug/Modern CSS boilerplate, high high Lighthouse performance, WP themes/plugins, hosting management.
   - **Kodzillaistanbul**: Pharma brands (GSK, Novartis, etc.), Vanilla JS/jQuery, a11y standards.
   - **Madebycat**: Team Lead (10 people), Code Review, Ar-Ge.
   - **Related Digital**: Divi plugin, design-to-WordPress integration.
   - **Personal**: Evli ve iki kedi babası (Add this to professional summaries if needed).

## Files

- `index.html`: Main structure, SEO, and base styles.
- `js/script.js`: Scroll logic and reveal animations.
- `images/`: Social icons, background assets, and `logo.png`.

## Verification

- Always verify transitions on scroll.
- Ensure the grain overlay (`.grain-overlay`) remains at `z-index: 50` but with `pointer-events: none`.
- Check responsiveness for both mobile and desktop.
