# BINDER-OS ERP Frontend Clone Implementation Plan

This project implements a high-fidelity frontend clone of the BINDER-OS ERP system in React. It features a responsive layout (optimized with a sidebar on desktop and a bottom navigation bar on mobile), an onboarding swipe flow, a persistent light/dark theme context, and full layouts for all 5 core modules specified in the guidelines.

## User Review Required

> [!IMPORTANT]
> **Aesthetic Treatment**: In line with the design guidelines, we will build custom interactive micro-animations for card hovers, view switches, and the theme toggle. We will also construct clean, responsive SVG charts (no external heavy chart libraries) to keep the app ultra-fast and visual.
> **Vanilla CSS**: We are using standard Vanilla CSS to achieve maximum customization and flexibility as requested.

## Open Questions

> [!NOTE]
> **Language Choice**: We have planned the setup using standard JavaScript (`jsx`) for maximum speed of iteration, but can switch to TypeScript (`tsx`) if you prefer. Please let us know if you want TypeScript.
> **Tailwind CSS vs Vanilla CSS**: The design guidelines suggest Vanilla CSS, but the reference analysis document mentions Tailwind CSS. We will proceed with Vanilla CSS unless you specify a preference for Tailwind.

---

## Proposed Changes

### Project Scaffold & Core Setup

Initialize a React web app in the workspace root directory using Vite.

#### [NEW] [package.json](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/package.json)
Standard project manifest containing React dependencies, development scripts, and build targets.

#### [NEW] [vite.config.js](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/vite.config.js)
Vite configuration for fast HMR (Hot Module Replacement) and compilation.

#### [NEW] [index.html](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/index.html)
Main entry point containing Google Fonts loader (Inter/Poppins) and the root hook `<div id="root">`.

#### [NEW] [src/index.css](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/index.css)
Global stylesheet declaring custom properties for Light/Dark themes and base utility classes.

---

### Core State & Shell Layout

Implement the global application wrapper, state, routing, and theme switcher.

#### [NEW] [src/context/ThemeContext.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/context/ThemeContext.jsx)
Context provider that toggles `light` vs `dark` class on the `<body>` element, persisting settings in `localStorage` and checking the user's initial system preference.

#### [NEW] [src/components/ThemeToggle.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/components/ThemeToggle.jsx)
A micro-animated button toggling between sun and moon states.

#### [NEW] [src/components/Icon.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/components/Icon.jsx)
A centralized SVG helper component rendering clean, vector-based icons for all modules (Home, Tasks, Code, IPO, Purchase, IMS, Sun, Moon).

#### [NEW] [src/components/Shell.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/components/Shell.jsx)
App shell component that houses:
* A persistent **Sidebar** for desktop viewports.
* A sticky **Bottom Navigation Bar** for mobile viewports.
* The main viewport wrapper for rendering current routes.

#### [NEW] [src/App.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/App.jsx)
Root component containing global state coordinates (current user session, current view route, onboarding progress).

---

### View Screens

Implement the 5 requested screens, designed according to the specifications.

#### [NEW] [src/screens/Onboarding.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/screens/Onboarding.jsx)
A swipe/carousel interface consisting of 3 slides with smooth CSS transitions, a typography-focused "BINDER-OS" header, and a "Get Started" button on the final slide leading to the Auth screen.

#### [NEW] [src/screens/Auth.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/screens/Auth.jsx)
A unified Login/Register layout with high-fidelity input fields and toggle tabs.

#### [NEW] [src/screens/Dashboard.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/screens/Dashboard.jsx)
The command center. Features:
* Orange welcome card: "Welcome back, [Name]".
* High-impact analytical KPI stats row.
* Custom-drawn SVG chart demonstrating activity trends.
* Quick actions floating widget.

#### [NEW] [src/screens/CodeCreation.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/screens/CodeCreation.jsx)
An automation/script builder component:
* Snippet builder panel.
* Automation form parameters input.
* Audit trail of previous code creations.

#### [NEW] [src/screens/IpoManagement.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/screens/IpoManagement.jsx)
Financial & Equity ledger view:
* Multi-stage compliance roadmap tracking filings.
* Document vault table.
* Calculator for share allotments and pricing calculations.

#### [NEW] [src/screens/PlaceholderViews.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/screens/PlaceholderViews.jsx)
Helper views for navigation completeness, including:
* **Tasks Route**: Interactive Kanban board mockup.
* **Purchase Route**: Table of purchase orders.
* **IMS Route**: Stock table with low-stock warnings.

---

## Verification Plan

### Automated Validation
* Build the application using `npm run build` to verify there are no compilation or syntax issues in the React source code.

### Manual Verification
* Deploy a local server with `npm run dev` and test responsiveness across:
  * **Desktop viewports** (check sidebar layout, table structures).
  * **Mobile viewports** (check bottom nav placement, onboarding swipe touch gesture area).
* Test the **Theme Switcher** toggle:
  * Check that CSS colors update properly in both modes.
  * Verify that reloading the page persists the selected theme state.
* Step through the entire user flow: `Onboarding Carousel -> Auth Switcher -> Dashboard -> Code Creation -> IPO Management -> Sub-tabs`.
