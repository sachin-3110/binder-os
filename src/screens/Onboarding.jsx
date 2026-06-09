import React, { useState } from 'react';
import { Icon } from '../components/Icon';

export const Onboarding = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Run your business in one cohesive workspace',
      description: 'The operating system for modern enterprise operations. Streamline tasks, procurement, inventory, and finance without switching apps.',
      tagline: 'UNIFIED OS',
      color: '#E8461A'
    },
    {
      title: 'Real-time auditing & visual operation control',
      description: 'Keep your stock and financial filings always compliant. Follow timelines, track allotment registers, and monitor low-stock items instantly.',
      tagline: 'COMPLIANT & VISUAL',
      color: '#4F46E5'
    },
    {
      title: 'Smart developer automation at your fingertips',
      description: 'Generate product scripts, code automations, and custom workflows. Keep audit logs of every automated activity.',
      tagline: 'AUTOMATION READY',
      color: '#059669'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="onboarding-container">
      <header className="onboarding-header">
        <span className="logo-icon">B</span>
        <span className="logo-text">BINDER-OS</span>
      </header>

      <div className="slides-viewport">
        <div 
          className="slides-track" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div className="slide-item" key={index}>
              <div className="slide-card">
                <span className="slide-badge" style={{ backgroundColor: `${slide.color}22`, color: slide.color }}>
                  {slide.tagline}
                </span>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-description">{slide.description}</p>
                <div className="slide-graphic">
                  <div className="graphic-glow" style={{ backgroundColor: slide.color }} />
                  <div className="graphic-element">
                    {index === 0 && (
                      <div className="dashboard-wire">
                        <div className="wire-bar long" />
                        <div className="wire-grid">
                          <div className="wire-cell" />
                          <div className="wire-cell" />
                          <div className="wire-cell" />
                        </div>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="timeline-wire">
                        <div className="wire-node" />
                        <div className="wire-line" />
                        <div className="wire-node active" />
                        <div className="wire-line" />
                        <div className="wire-node" />
                      </div>
                    )}
                    {index === 2 && (
                      <div className="code-wire">
                        <span>const binder = new BinderOS();</span>
                        <span>binder.automate();</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="onboarding-footer">
        <div className="footer-left">
          {currentSlide > 0 && (
            <button className="nav-arrow-btn" onClick={handlePrev} aria-label="Previous Slide">
              <Icon name="arrowLeft" size={20} />
            </button>
          )}
        </div>

        <div className="dots-container">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot-indicator ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="footer-right">
          <button className="btn btn-primary btn-onboard-next" onClick={handleNext}>
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            {currentSlide < slides.length - 1 && <Icon name="arrowRight" size={16} style={{ marginLeft: 6 }} />}
          </button>
        </div>
      </footer>

      <style>{`
        .onboarding-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100vw;
          background-color: var(--color-bg);
          overflow: hidden;
          padding: 24px;
          justify-content: space-between;
        }

        .onboarding-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding-top: 16px;
        }

        .onboarding-header .logo-icon {
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

        .onboarding-header .logo-text {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 20px;
          letter-spacing: 0.5px;
          color: var(--color-text-primary);
        }

        .slides-viewport {
          flex: 1;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          overflow: hidden;
          position: relative;
        }

        .slides-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform var(--transition-normal);
        }

        .slide-item {
          flex-shrink: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }

        .slide-card {
          width: 100%;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-lg);
          padding: 32px 24px;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .slide-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 6px 12px;
          border-radius: 20px;
          margin-bottom: 20px;
        }

        .slide-title {
          font-size: 22px;
          line-height: 1.3;
          margin-bottom: 12px;
          color: var(--color-text-primary);
        }

        .slide-description {
          font-size: 14px;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: 30px;
        }

        .slide-graphic {
          width: 100%;
          height: 160px;
          border-radius: var(--border-radius-md);
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .graphic-glow {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.15;
        }

        .graphic-element {
          z-index: 1;
          width: 100%;
          padding: 16px;
        }

        .dashboard-wire {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
        }

        .wire-bar {
          height: 12px;
          background-color: var(--color-border-hover);
          border-radius: 6px;
        }

        .wire-bar.long {
          width: 60%;
        }

        .wire-grid {
          display: flex;
          gap: 8px;
          width: 80%;
          justify-content: center;
        }

        .wire-cell {
          height: 36px;
          flex: 1;
          background-color: var(--color-border);
          border-radius: var(--border-radius-sm);
        }

        .timeline-wire {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80%;
          margin: 0 auto;
        }

        .wire-node {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: var(--color-border-hover);
          border: 3px solid var(--color-surface);
        }

        .wire-node.active {
          background-color: var(--color-brand);
          box-shadow: 0 0 0 4px var(--color-brand-light);
        }

        .wire-line {
          flex: 1;
          height: 2px;
          background-color: var(--color-border-hover);
        }

        .code-wire {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
          font-family: monospace;
          font-size: 11px;
          color: var(--color-text-secondary);
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          padding: 12px;
          border-radius: var(--border-radius-sm);
          width: 90%;
          margin: 0 auto;
        }

        .onboarding-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          padding-bottom: 24px;
        }

        .nav-arrow-btn {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .nav-arrow-btn:hover {
          background: var(--color-border);
        }

        .dots-container {
          display: flex;
          gap: 8px;
        }

        .dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-border-hover);
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .dot-indicator.active {
          background-color: var(--color-brand);
          width: 24px;
          border-radius: 4px;
        }

        .btn-onboard-next {
          min-width: 110px;
          height: 40px;
          padding: 0 16px;
        }
      `}</style>
    </div>
  );
};
