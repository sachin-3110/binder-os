# BINDER-OS ERP Frontend Application

A high-fidelity responsive frontend clone of the BINDER-OS ERP suite built using **React (web)** and **Vite**, featuring a clean custom layout system (sidebar on desktop and sticky bottom navigation on mobile), a 3-page onboarding swipe flow, persistent Light/Dark theme switching, and comprehensive module boards.

---

## 🛠️ Technology Stack
1. **Core Runtime**: React (web) & Vite (fast building / HMR)
2. **Styling**: Vanilla CSS (modular design variables, flexbox, custom scrollbars, and micro-animations)
3. **Icons**: Centralized hand-made inline SVGs ([Icon.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/components/Icon.jsx))
4. **Theme Context**: Custom HTML `data-theme` attribute toggling ([ThemeContext.jsx](file:///c:/Users/sachi/OneDrive/Desktop/Binder33labs/src/context/ThemeContext.jsx))

---

## 🖥️ Modular Highlights

1. **Intro / Onboarding Screen**:
   - 3 swipeable onboarding cards explaining BINDER-OS value propositions.
   - Typography-focused brand badge and animated wireframe previews.
2. **Auth (Login / Register)**:
   - Slider-based switching tabs between Sign In and Registration.
   - Auto-filled demo credentials for quick assessment validation.
3. **Executive Dashboard**:
   - Dynamic greetings banner in brand-orange gradient.
   - Grid cards containing key metrics (tasks count, PO status, alerts).
   - Custom SVG trend charts showing transaction activity with interactive tooltip nodes.
4. **Code Creation & Automation**:
   - Selectable automation scripts (SKU compilation, vendor hook dispatchers).
   - Parameter form that regenerates code dynamically inside a dark-mode preview console.
   - Active execution run-logs table.
5. **IPO Management**:
   - Visual compliance roadmap timeline with custom checkpoints.
   - Secure Document Vault with file managers (upload portal, delete actions).
   - Equity pricing allotment ledger with a slider modeler for target valuation.
6. **Tasks (Kanban)**:
   - Structured lists partitioned into *To Do*, *In Progress*, *Review*, and *Done* buckets.
   - Interactive card navigation controls and quick task creation forms.
7. **Purchase (PO Directory)**:
   - Filterable table index tracking PO status (Draft, Sent, Approved).
   - PO creation wizard.
8. **IMS (Inventory)**:
   - Live physical assets stock tracker table showing SKUs.
   - Auto-highlights for items falling below reorder limits.
   - Active reorder links replenishing stock indicators.

---

## 🎨 Theme Specifications

| UI Element | Light Mode Color | Dark Mode Color |
| :--- | :--- | :--- |
| **Brand Accent** | `#E8461A` | `#E8461A` |
| **Background** | `#F9FAFB` | `#0B0F19` |
| **Sidebar / Surface** | `#FFFFFF` | `#161B26` |
| **Card Fill** | `#FFFFFF` | `#1E2533` |
| **Primary Text** | `#111827` | `#F3F4F6` |
| **Secondary Text** | `#4B5563` | `#9CA3AF` |
| **Borders** | `#F3F4F6` | `#262F40` |

---

## 🚀 Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation
Clone or navigate into the project directory and install the packages:
```bash
npm install
```

### Run Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to run the application.

### Build Bundle
Compile the production static assets:
```bash
npm run build
```
The production bundle will be generated under the `dist/` directory.
