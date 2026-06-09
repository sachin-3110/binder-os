import React, { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "./Icon";
import { useTheme } from "../context/ThemeContext";

export const Shell = ({ children, currentView, setView, user, onLogout }) => {
  const { theme, setTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { id: "dashboard", label: "Home", icon: "home" },
    { id: "tasks", label: "Tasks", icon: "tasks" },
    { id: "code-creation", label: "Code Creation", icon: "code" },
    { id: "ipo-management", label: "IPO Management", icon: "ipo" },
    { id: "purchase", label: "Purchase", icon: "purchase" },
    { id: "ims", label: "IMS", icon: "ims" },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <aside className={`desktop-sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-logo-btn">
          <div className="sidebar-logo">
            <button
              className="sidebar-collapse-btn"
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {"☰"}
            </button>
            <span className="sidebar-logo-icon">BE</span>
            {!isCollapsed && (
              <div className="sidebar-logo-meta">
                <span className="sidebar-logo-title">BINDER-OS</span>
                <span className="sidebar-logo-subtitle">Enterprise Suite</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Box in Sidebar */}
        <div className="sidebar-search-area">
          {isCollapsed ? (
            <button 
              className="sidebar-search-icon-only" 
              onClick={() => setIsCollapsed(false)}
              title="Search Modules"
            >
              <Icon name="search" size={16} />
            </button>
          ) : (
            <div className="sidebar-search-box">
              <Icon name="search" size={14} className="search-box-icon" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sidebar-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="search-clear-btn"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {filteredMenuItems.map((item) => {
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
                {!isCollapsed && (
                  <span className="nav-label">{item.label}</span>
                )}
                {isActive && <div className="active-nav-indicator" />}
              </button>
            );
          })}
          {filteredMenuItems.length === 0 && !isCollapsed && (
            <div className="search-no-results">
              No modules found
            </div>
          )}
        </nav>

        <div className="sidebar-footer">
          {showProfileMenu && (
            <div className="profile-popover">
              <div className="popover-header">User Options</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLogout();
                  setShowProfileMenu(false);
                }}
                className="popover-item logout-item"
              >
                <span className="logout-dot-sm" />
                {!isCollapsed && <span>Log Out</span>}
              </button>
            </div>
          )}

          <div
            className="sidebar-user-card"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="user-avatar-wrap">
              <Icon name="user" size={18} />
            </div>
            {!isCollapsed && (
              <div className="sidebar-user-info">
                <span className="user-name">{user?.name || "User"}</span>
                <span className="user-role">Administrator</span>
              </div>
            )}
            {!isCollapsed && (
              <button
                className="btn-logout"
                onClick={(e) => {
                  e.stopPropagation();
                  onLogout();
                }}
                title="Logout"
              >
                <span className="logout-dot"></span>
              </button>
            )}
          </div>

          <div className="sidebar-theme-row">
            {!isCollapsed && <span className="theme-row-label">Theme Settings</span>}
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
      .sidebar-logo-btn{
        display: flex;
        align-items: center;
        justify-content: center;
      }
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
          transition: width var(--transition-normal), padding var(--transition-normal);
        }

        .desktop-sidebar.collapsed {
          width: 78px;
          padding: 24px 12px;
        }

        .desktop-sidebar.collapsed .sidebar-search-area {
          padding: 16px 0 0 0;
        }

        .desktop-sidebar.collapsed .sidebar-logo {
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          padding: 0 0 24px 0;
        }

        .desktop-sidebar.collapsed .sidebar-nav-item {
          justify-content: center;
          padding: 12px;
        }

        .desktop-sidebar.collapsed .active-nav-indicator {
          right: 4px;
        }

        .desktop-sidebar.collapsed .sidebar-user-card {
          justify-content: center;
          padding: 10px 0;
        }

        .desktop-sidebar.collapsed .profile-popover {
          left: 78px;
          bottom: 16px;
          width: 200px;
          right: auto;
        }

        .sidebar-collapse-btn {
          background: transparent;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--border-radius-sm);
          margin-left: auto;
          transition: all var(--transition-fast);
        }

        .sidebar-collapse-btn:hover {
          background-color: var(--color-border);
          color: var(--color-text-primary);
        }

        .desktop-sidebar.collapsed .sidebar-collapse-btn {
          margin-left: 0;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 8px 24px 8px;
          border-bottom: 1px solid var(--color-border);
        }

        /* Search Box in Sidebar */
        .sidebar-search-area {
          padding: 16px 8px 0 8px;
        }

        .sidebar-search-box {
          display: flex;
          align-items: center;
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-md);
          padding: 8px 12px;
          gap: 8px;
          position: relative;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .sidebar-search-box:focus-within {
          border-color: var(--color-brand);
          box-shadow: 0 0 0 2px var(--color-brand-light);
        }

        .search-box-icon {
          color: var(--color-text-secondary);
        }

        .sidebar-search-input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 13px;
          color: var(--color-text-primary);
          width: 100%;
          padding: 0;
        }

        .search-clear-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--color-text-tertiary);
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
        }

        .search-clear-btn:hover {
          color: var(--color-text-primary);
        }

        .sidebar-search-icon-only {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-md);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
          margin: 0 auto;
        }

        .sidebar-search-icon-only:hover {
          border-color: var(--color-brand);
          color: var(--color-brand);
          background-color: var(--color-surface);
        }

        .search-no-results {
          padding: 16px 8px;
          font-size: 12px;
          color: var(--color-text-tertiary);
          text-align: center;
        }

        /* Sidebar theme row outside popover */
        .sidebar-theme-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 8px 0 8px;
          border-top: 1px solid var(--color-border);
          margin-top: 8px;
          width: 100%;
        }

        .desktop-sidebar.collapsed .sidebar-theme-row {
          justify-content: center;
          padding: 12px 0 0 0;
        }

        .theme-row-label {
          font-size: 12px;
          color: var(--color-text-secondary);
          font-weight: 500;
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
          position: relative;
        }

        .profile-popover {
          position: absolute;
          bottom: 85px;
          left: 0;
          right: 0;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-lg);
          padding: 12px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: popoverSlideUp var(--transition-fast) cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes popoverSlideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .popover-header {
          font-size: 10px;
          font-weight: 700;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
          padding: 0 8px;
        }

        .popover-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: var(--border-radius-sm);
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-align: left;
          width: 100%;
          transition: all var(--transition-fast);
        }

        .popover-item:hover {
          background-color: var(--color-bg);
          color: var(--color-text-primary);
        }

        .popover-item.active {
          background-color: var(--color-brand-light);
          color: var(--color-brand);
        }

        .popover-item .check-icon {
          margin-left: auto;
          color: var(--color-brand);
        }

        .popover-divider {
          height: 1px;
          background-color: var(--color-border);
          margin: 4px 0;
        }

        .logout-item {
          color: #EF4444;
        }

        .logout-item:hover {
          background-color: rgba(239, 68, 68, 0.05);
          color: #EF4444;
        }

        .logout-dot-sm {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #EF4444;
        }

        .sidebar-user-card {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: var(--color-border);
          padding: 10px;
          border-radius: var(--border-radius-md);
          position: relative;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }

        .sidebar-user-card:hover {
          background-color: var(--color-border-hover);
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
