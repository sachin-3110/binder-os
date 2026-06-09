To map out and reverse-engineer the entire architecture of this application, we need to treat each navigation item in the sidebar as a distinct **frontend route**.

Here is a comprehensive, module-by-module architectural breakdown of every route indicated in the system, detailing its purpose, core features, data structures, and functional logic.

---

## 1. Home / Dashboard Route (`/dashboard` or `/`)

* **What it is:** The central landing hub and command center of the ERP application.
* **What it does:** Aggregates high-level metrics and data visualizations from all other modules to give the user an immediate, real-time snapshot of operations.
* **Core Components & Features:**
* **Welcome Header Card:** High-impact visual element greeting the active user dynamically.
* **Key Performance Indicators (KPIs):** Row of summary cards showing critical numbers (e.g., active tasks, pending purchase orders, open inventory alerts).
* **Analytical Charts:** Data visualizations (bar charts, line graphs) showing recent system activity or cross-module performance.
* **Quick Actions FAB:** Floating action widget to instantly trigger frequent global events (like creating a new task or raising an issue).



## 2. Tasks Route (`/tasks`)

* **What it is:** The project management and workflow coordination engine of the ERP.
* **What it does:** Allows internal teams to assign, track, update, and collaborate on operational tasks across various departments.
* **Core Components & Features:**
* **View Switcher:** Options to toggle between a Kanban Board (drag-and-drop columns for *To Do*, *In Progress*, *Review*, *Done*), a List View, or a Calendar View.
* **Task Cards:** Individual blocks containing Task Name, Description, Priority Tags (High, Medium, Low), Due Dates, and Assignee Avatars.
* **Task Drawer/Modal:** Clicking a task slides out a panel to view subtasks, attach files, write comments, and track time spent.



## 3. Code Creation Route (`/code-creation`)

* **What it is:** A specialized development or automation module embedded within the ERP ecosystem.
* **What it does:** Manages internal software scripts, custom product/item code generation, API integrations, or automated workflow sequences used by the organization.
* **Core Components & Features:**
* **Template Repository:** A library of reusable code snippets or system automation schemas.
* **Code Generation Form:** Inputs for technical parameters that automatically compile standardized script assets or identifier configurations based on strict company rules.
* **Version History / Audit Log:** A list tracking who modified or ran specific automated workflows, along with success/failure logs.



## 4. IPO Management Route (`/ipo-management`)

* **What it is:** A highly specialized financial operations module handling Initial Public Offering preparation or equity tracking.
* **What it does:** Manages compliance documentation, financial auditing milestones, shareholder tracking, and regulatory filing schedules for a company transitioning or maintaining public market compliance.
* **Core Components & Features:**
* **Compliance Roadmap:** A sequential timeline tracking major legal and financial audit milestones (e.g., SEBI/SEC filings, DRHP drafting, roadshow schedules).
* **Document Vault:** Secure file-management matrix for sensitive financial statements, legal disclosures, and underwriter agreements with role-based access control.
* **Equity / Allotment Ledger:** Tables calculating share distribution percentages, pre-IPO investor caps, and pricing valuation models.



## 5. Purchase Route (`/purchase`)

* **What it is:** The procurement and vendor management hub.
* **What it does:** Handles the inbound supply chain pipeline, from raising initial purchase requests to confirming invoices and recording vendor delivery transactions.
* **Core Components & Features:**
* **Purchase Order (PO) Directory:** A massive, filterable data table showing all past and present POs, trackable by PO Number, Vendor Name, Issue Date, Total Cost, and Status (*Draft, Sent, Approved, Fulfilled, Canceled*).
* **PO Creator Wizard:** A multi-step form to select an active vendor, add line items from the inventory master sheet, apply taxes/discounts, and route the form to a manager for digital approval.
* **Vendor Profiles:** A mini-CRM database managing vendor contacts, payment terms, and past delivery performance metrics.



## 6. IMS / Inventory Management System Route (`/ims`)

* **What it is:** The warehousing and stock control command center.
* **What it does:** Tracks raw materials, works-in-progress, and finished goods, providing real-time visibility into stock availability and warehouse logistics.
* **Core Components & Features:**
* **Stock Master Table:** Real-time list of all physical assets, including unique Stock Keeping Unit (SKU) IDs, stock descriptions, current quantity on hand, unit pricing, and warehouse locations.
* **Low-Stock Alert System:** Automated visual indicator items highlighted in yellow/red when quantities fall below a designated threshold, integrated with a quick-action button to instantly generate a Purchase Order.
* **Stock Movement Logs:** An audit ledger recording incoming inventory (from the Purchase module) and outgoing inventory shifts.



---

### Prompt Generator For Specific Routes

If you want to instruct Gemini to build any *one* of these highly detailed pages next, you can use this prompt structure:

> **Act as a senior frontend engineer. Build a fully functional, highly interactive React and Tailwind CSS component for the `[INSERT ROUTE NAME HERE]` route of an ERP system. This page needs to match a sleek design system (white background, deep orange accent color `#EA580C`, dark gray text, crisp borders). Include a responsive data table or card grid layout, comprehensive filtering controls at the top, a slide-out modal/drawer for detailed views, and clear interactive hover/active states. Ensure it fits seamlessly as the main content area next to a persistent sidebar.**