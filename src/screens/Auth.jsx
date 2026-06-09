import React, { useState } from 'react';
import { Icon } from '../components/Icon';

export const Auth = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Registered users list state
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('registered_users');
    if (saved) return JSON.parse(saved);
    return [{ name: 'Sachin', email: 'sachin@gmail.com', password: 'qwerty123' }];
  });

  // Login fields
  const [loginEmail, setLoginEmail] = useState('sachin@gmail.com');
  const [loginPassword, setLoginPassword] = useState('qwerty123');
  
  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulated short delay
    setTimeout(() => {
      if (!loginEmail || !loginPassword) {
        setError('Please fill in all fields.');
        setLoading(false);
        return;
      }
      
      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === loginEmail.toLowerCase()
      );

      if (!matchedUser) {
        setError('User not found. Please register.');
        setLoading(false);
        return;
      }

      if (matchedUser.password !== loginPassword) {
        setError('Incorrect password.');
        setLoading(false);
        return;
      }
      
      onLoginSuccess({
        name: matchedUser.name,
        email: matchedUser.email
      });
      setLoading(false);
    }, 800);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (!regName || !regEmail || !regPassword || !regConfirmPassword) {
        setError('Please fill in all fields.');
        setLoading(false);
        return;
      }

      if (regPassword !== regConfirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }

      const emailExists = users.some(
        (u) => u.email.toLowerCase() === regEmail.toLowerCase()
      );

      if (emailExists) {
        setError('Email is already registered. Please sign in.');
        setLoading(false);
        return;
      }

      const updatedUsers = [...users, { name: regName, email: regEmail, password: regPassword }];
      setUsers(updatedUsers);
      localStorage.setItem('registered_users', JSON.stringify(updatedUsers));

      onLoginSuccess({
        name: regName,
        email: regEmail
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <header className="auth-card-header">
          <div className="auth-logo">
            <span className="logo-symbol">B</span>
            <span className="logo-text">BINDER-OS</span>
          </div>
          <p className="auth-subtitle">Enter your credentials to access the ERP suite</p>
        </header>

        <div className="auth-tabs">
          <button 
            type="button"
            className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setError(''); }}
          >
            Sign In
          </button>
          <button 
            type="button"
            className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => { setActiveTab('register'); setError(''); }}
          >
            Register
          </button>
          <div className={`tab-slider ${activeTab}`} />
        </div>

        {error && (
          <div className="auth-error-banner">
            <Icon name="info" size={16} />
            <span>{error}</span>
          </div>
        )}

        {activeTab === 'login' ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="email@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="label-row">
                <label className="form-label">Password</label>
                <a href="#forgot" className="forgot-link" onClick={() => alert('Forgot Password link clicked (demo)')}>Forgot password?</a>
              </div>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <div className="credentials-tip">
              <span className="tip-badge">DEMO CREDS</span>
              <span className="tip-text">sachin@gmail.com / qwerty123</span>
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Sign In'}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="John Doe"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="email@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Minimum 6 characters"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Re-type your password"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Sign Up'}
            </button>
          </form>
        )}
      </div>

      <style>{`
        .auth-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100vw;
          background-color: var(--color-bg);
          padding: 24px;
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-lg);
          padding: 40px 32px;
          box-shadow: var(--shadow-lg);
        }

        .auth-card-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .logo-symbol {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: var(--border-radius-sm);
          background-color: var(--color-brand);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 18px;
        }

        .auth-logo .logo-text {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 20px;
          letter-spacing: 0.5px;
          color: var(--color-text-primary);
        }

        .auth-subtitle {
          font-size: 13px;
          color: var(--color-text-secondary);
        }

        .auth-tabs {
          display: flex;
          position: relative;
          background-color: var(--color-bg);
          padding: 4px;
          border-radius: var(--border-radius-md);
          margin-bottom: 24px;
          border: 1px solid var(--color-border);
        }

        .auth-tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          padding: 10px 0;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-secondary);
          cursor: pointer;
          z-index: 2;
          transition: color var(--transition-fast);
        }

        .auth-tab-btn.active {
          color: var(--color-text-primary);
        }

        .tab-slider {
          position: absolute;
          top: 4px;
          bottom: 4px;
          width: calc(50% - 4px);
          background-color: var(--color-surface);
          border-radius: calc(var(--border-radius-md) - 2px);
          box-shadow: var(--shadow-sm);
          z-index: 1;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tab-slider.register {
          transform: translateX(100%);
        }

        .auth-error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #EF4444;
          padding: 12px;
          border-radius: var(--border-radius-md);
          margin-bottom: 20px;
          font-size: 13px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .forgot-link {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .credentials-tip {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--color-brand-light);
          border: 1px solid rgba(232, 70, 26, 0.2);
          padding: 10px 12px;
          border-radius: var(--border-radius-md);
          margin-bottom: 24px;
        }

        .tip-badge {
          font-size: 9px;
          font-weight: 700;
          color: var(--color-brand);
          background-color: #FFFFFF;
          border: 1px solid var(--color-brand);
          padding: 2px 4px;
          border-radius: 4px;
          white-space: nowrap;
        }

        .tip-text {
          font-size: 11px;
          color: var(--color-brand-dark);
          font-family: monospace;
        }

        .auth-submit-btn {
          width: 100%;
          height: 46px;
        }

        /* Loading Spinner */
        .spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #FFFFFF;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
