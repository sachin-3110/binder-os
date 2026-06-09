import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "./Icon";

export const Shell = ({ children, currentView, setView, user, onLogout }) => {
  const menuItems = [
    { id: "dashboard", label: "Home", icon: "home" },
    { id: "tasks", label: "Tasks", icon: "tasks" },
    { id: "code-creation", label: "Code Creation", icon: "code" },
    { id: "ipo-management", label: "IPO Management", icon: "ipo" },
    { id: "purchase", label: "Purchase", icon: "purchase" },
    { id: "ims", label: "IMS", icon: "ims" },
  ];

  return (
    <div className="shell-wrapper">
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-logo-section">
          <span className="logo-badge">BE</span>
          <span className="mobile-logo-text">BINDER-OS</span>
        </div>
        <div className="mobile-header-actions">
          <ThemeToggle />
          <button
            className="mobile-profile-btn"
            onClick={onLogout}
            title="Log Out"
          >
            <Icon name="user" size={18} />
          </button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="desktop-sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">BE</span>
          <div className="sidebar-logo-meta">
            <span className="sidebar-logo-title">BINDER-OS</span>
            <span className="sidebar-logo-subtitle">Enterprise Suite</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`sidebar-nav-item ${isActive ? "active" : ""}`}
              >
                <Icon
                  name={item.icon}
                  size={20}
                  className={`nav-icon ${isActive ? "active-icon" : ""}`}
                />
                <span className="nav-label">{item.label}</span>
                {isActive && <div className="active-nav-indicator" />}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-card">
            <div className="user-avatar-wrap">
              <Icon name="user" size={18} />
            </div>
            <div className="sidebar-user-info">
              <span className="user-name">{user?.name || "User"}</span>
              <span className="user-role">Administrator</span>
            </div>
            <button className="btn-logout" onClick={onLogout} title="Logout">
              <span className="logout-dot"></span>
            </button>
          </div>
          <div className="sidebar-theme-row">
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content-view">
        <div className="view-scroll-container">{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`mobile-nav-item ${isActive ? "active" : ""}`}
            >
              <Icon name={item.icon} size={20} className="mobile-nav-icon" />
              <span className="mobile-nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <style>{`
        .shell-wrapper {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background-color: var(--color-bg);
          position: relative;
        }

        /* Desktop Sidebar styling */
        .desktop-sidebar {
          display: none;
          flex-direction: column;
          width: 260px;
          background-color: var(--color-surface);
          border-right: 1px solid var(--color-border);
          padding: 24px 16px;
          height: 100%;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 8px 24px 8px;
          border-bottom: 1px solid var(--color-border);
        }

        .sidebar-logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--border-radius-sm);
          background-color: var(--color-brand);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 20px;
        }

        .sidebar-logo-meta {
          display: flex;
          flex-direction: column;
        }

        .sidebar-logo-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.5px;
          color: var(--color-text-primary);
        }

        .sidebar-logo-subtitle {
          font-size: 11px;
          color: var(--color-text-secondary);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 24px;
          flex: 1;
        }

        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--border-radius-md);
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: 14px;
          text-align: left;
          transition: all var(--transition-fast);
          position: relative;
        }

        .sidebar-nav-item:hover {
          background-color: var(--color-border);
          color: var(--color-text-primary);
        }

        .sidebar-nav-item.active {
          background-color: var(--color-brand);
          color: #FFFFFF;
        }

        .nav-icon {
          color: var(--color-text-secondary);
          transition: color var(--transition-fast);
        }

        .sidebar-nav-item.active .nav-icon {
          color: #FFFFFF;
        }

        .active-nav-indicator {
          position: absolute;
          right: 0;
          top: 25%;
          height: 50%;
          width: 4px;
          background-color: #FFFFFF;
          border-radius: 4px 0 0 4px;
        }

        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-top: 1px solid var(--color-border);
          padding-top: 16px;
        }

        .sidebar-user-card {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: var(--color-border);
          padding: 10px;
          border-radius: var(--border-radius-md);
          position: relative;
        }

        .user-avatar-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--color-surface);
          color: var(--color-text-secondary);
        }

        .sidebar-user-info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .user-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-primary);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .user-role {
          font-size: 10px;
          color: var(--color-text-secondary);
        }

        .btn-logout {
          background: transparent;
          border: none;
          cursor: pointer;
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          position: relative;
        }

        .logout-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #EF4444;
          transition: transform var(--transition-fast);
        }

        .btn-logout:hover .logout-dot {
          transform: scale(1.4);
        }

        .sidebar-theme-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px;
        }

        .theme-row-label {
          font-size: 12px;
          color: var(--color-text-secondary);
          font-weight: 500;
        }

        /* Mobile Header */
        .mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          padding: 0 16px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        .mobile-logo-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: var(--border-radius-sm);
          background-color: var(--color-brand);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 14px;
        }

        .mobile-logo-text {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.5px;
          color: var(--color-text-primary);
        }

        .mobile-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mobile-profile-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--color-border);
          border: 1px solid var(--color-border-hover);
          color: var(--color-text-primary);
          cursor: pointer;
        }

        /* Mobile Bottom Nav */
        .mobile-bottom-nav {
          display: flex;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
          z-index: 100;
          justify-content: space-around;
          padding-bottom: env(safe-area-inset-bottom);
        }

        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          background: transparent;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
          gap: 4px;
          transition: color var(--transition-fast);
        }

        .mobile-nav-item.active {
          color: var(--color-brand);
        }

        .mobile-nav-label {
          font-size: 10px;
          font-weight: 500;
        }

        /* View Content Window */
        .main-content-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
          padding-top: 60px; /* Offset for Mobile Header */
        }

        .view-scroll-container {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        /* Responsive Breakpoints */
        @media (min-width: 769px) {
          .desktop-sidebar {
            display: flex;
          }

          .mobile-header, .mobile-bottom-nav {
            display: none;
          }

          .main-content-view {
            padding-top: 0;
          }

          .view-scroll-container {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
};
