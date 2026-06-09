The following information is extracted for your assessment project for the Frontend Developer opportunity at Binder33labs:


### **Technical Guidelines**

  * **Framework:** Your choice of React (web)
  * **Data:** Use dummy/mock data—no real API is required.
  * **Design Constraints:**
      * The design must be consistent with the reference app.
      * Ensure the UI is responsive.
  * **Theme Support:**
      * The implementation must support both Light and Dark modes.
      * Provide a toggle in the UI (e.g., in the header or sidebar) to switch themes.
      * Persist the theme choice in `localStorage` and respect the user's system preference on initial load.
  * **Reference App & Credentials:**
      * **URL:** <https://app.binder-os.com>
      * **Username:** shubh.saxena@erpbinder.com
      * **Password:** qwerty@22

### **Design Specifications**

| Element                    | Light Theme Specification   | Dark Theme Specification    |
| :------------------------- | :-------------------------- | :-------------------------- |
| **Primary / Brand Orange** | `#E8461A`                   | `#E8461A`                   |
| **Background**             | `#FFFFFF`                   | `#121212` (or `#0B0F19`)    |
| **Sidebar / Surface**      | `#FFFFFF`                   | `#1E1E1E` (or `#161B26`)    |
| **Text Primary**           | `#1A1A1A`                   | `#F3F4F6`                   |
| **Text Secondary**         | `#6B7280`                   | `#9CA3AF`                   |
| **Active Nav Highlight**   | `#E8461A` (with white text) | `#E8461A` (with white text) |
| **Border / Dividers**      | `#E5E7EB`                   | `#374151`                   |
| **Font**                   | Inter or Poppins            | Inter or Poppins            |

### **Screens to Build (5 Total)**

The required flow is: Intro \> Login/Register \> Dashboard \> Code Creation \> IPO Management.

1.  **Intro / Onboarding Screen (Swipe Pages)**
      * Must have 3 swipe/slide screens with smooth transitions.
      * Logo must be "BINDER-OS" (typography-based).
      * Tagline must be referenced from [binder-os.com](https://binder-os.com).
      * The last slide must include a "Get Started" button leading to the Login screen.
2.  **Login / Register Screen**
      * Must have a toggle between Login and Register tabs.
      * **Login Fields:** Email, Password, Forgot Password link, Sign In button.
      * **Register Fields:** Name, Email, Password, Confirm Password, Sign Up button.
3.  **Dashboard (Home) Screen**
      * Display a welcome banner: "Welcome back, \[Name\]" in brand orange.
      * Include a Bottom Navigation Bar with icons for: Home, Tasks, Code Creation, IPO Management, Purchase, IMS.
      * **Styling:** Active navigation state in orange, inactive in grey.
4.  **Code Creation Page & IPO Management Page**
      * Design is "as per your creativity".
      * You should check with the existing UI for reference.


