import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Icon } from './Icon';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      aria-label="Toggle theme"
    >
      <div className={`theme-toggle-icon-container ${theme}`}>
        {theme === 'light' ? (
          <Icon name="sun" size={20} className="theme-icon sun" />
        ) : (
          <Icon name="moon" size={20} className="theme-icon moon" />
        )}
      </div>
      <style>{`
        .theme-toggle-btn {
          background: var(--color-border);
          border: 1px solid var(--color-border-hover);
          color: var(--color-text-primary);
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          outline: none;
          width: 38px;
          height: 38px;
        }

        .theme-toggle-btn:hover {
          background: var(--color-border-hover);
          transform: scale(1.08) rotate(15deg);
        }

        .theme-toggle-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .theme-icon {
          animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.5) rotate(-60deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0);
            opacity: 1;
          }
        }
      `}</style>
    </button>
  );
};
