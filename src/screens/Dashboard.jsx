import React, { useState } from 'react';
import { Icon } from '../components/Icon';

export const Dashboard = ({ user, setView }) => {
  const [activeChartPoint, setActiveChartPoint] = useState(null);
  
  // Demo stats
  const stats = [
    { title: 'Active Tasks', value: '12', change: '+3 this week', icon: 'tasks', color: '#3B82F6' },
    { title: 'Pending POs', value: '7', change: '2 awaiting approval', icon: 'purchase', color: '#E8461A' },
    { title: 'Low Stock Alerts', value: '4', change: 'Requires reorder', icon: 'ims', color: '#F59E0B' },
    { title: 'IPO Milestones', value: '3 / 8', change: 'Next filing: June 15', icon: 'ipo', color: '#10B981' }
  ];

  // Demo chart data: 6 days of transaction metrics
  const chartData = [
    { label: 'Mon', value: 30, details: '30 completed runs' },
    { label: 'Tue', value: 45, details: '45 completed runs' },
    { label: 'Wed', value: 35, details: '35 completed runs' },
    { label: 'Thu', value: 75, details: '75 completed runs' },
    { label: 'Fri', value: 60, details: '60 completed runs' },
    { label: 'Sat', value: 90, details: '90 completed runs' }
  ];

  const maxVal = 100;
  const chartHeight = 150;
  const chartWidth = 500;
  const padding = 30;

  // Calculate coordinates for SVG line path
  const points = chartData.map((d, i) => {
    const x = padding + (i * (chartWidth - padding * 2)) / (chartData.length - 1);
    const y = chartHeight - padding - (d.value / maxVal) * (chartHeight - padding * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <div className="dashboard-container fade-in">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="banner-content">
          <span className="banner-tagline">SYSTEM ACTIVE</span>
          <h1 className="banner-title">Welcome back, {user?.name || 'Administrator'}</h1>
          <p className="banner-text">Everything looks stable. You have 4 items requiring immediate attention.</p>
        </div>
        <div className="banner-decor">
          <span className="decor-glow"></span>
        </div>
      </section>

      {/* KPI Grid */}
      <section className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card card">
            <div className="stat-card-header">
              <span className="stat-card-title">{stat.title}</span>
              <div className="stat-icon-wrap" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                <Icon name={stat.icon} size={18} />
              </div>
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-footer">
              <span className="stat-card-change">{stat.change}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Analytics & Quick Action Section */}
      <div className="dashboard-main-row">
        {/* SVG Chart Card */}
        <div className="chart-card card">
          <div className="card-header-row">
            <div>
              <h3>System Activity Trend</h3>
              <p className="card-subtitle">Daily automated transaction counts</p>
            </div>
            <span className="chart-status-indicator">Online</span>
          </div>

          <div className="chart-wrapper">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="svg-chart">
              {/* Grid Lines */}
              <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} className="chart-grid-line" />
              <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} className="chart-grid-line" />
              <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} className="chart-grid-line" />

              {/* Gradient Area under line */}
              <path d={areaD} fill="url(#chartGrad)" />

              {/* Line */}
              <path d={pathD} fill="none" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" />

              {/* Dots / Nodes */}
              {points.map((p, i) => (
                <g 
                  key={i} 
                  className="chart-node-group"
                  onMouseEnter={() => setActiveChartPoint(p)}
                  onMouseLeave={() => setActiveChartPoint(null)}
                >
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r={activeChartPoint?.label === p.label ? 6 : 4} 
                    fill="var(--color-surface)" 
                    stroke="var(--color-brand)" 
                    strokeWidth="3"
                    style={{ transition: 'r 0.15s ease' }}
                  />
                  {/* Invisible larger hover trigger area */}
                  <circle cx={p.x} cy={p.y} r={14} fill="transparent" style={{ cursor: 'pointer' }} />
                </g>
              ))}

              {/* X Axis Labels */}
              {points.map((p, i) => (
                <text 
                  key={i} 
                  x={p.x} 
                  y={chartHeight - 8} 
                  textAnchor="middle" 
                  className="chart-axis-text"
                >
                  {p.label}
                </text>
              ))}

              {/* Definitions */}
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Custom Interactive Tooltip */}
            {activeChartPoint && (
              <div 
                className="chart-tooltip"
                style={{
                  left: `${(activeChartPoint.x / chartWidth) * 100}%`,
                  top: `${(activeChartPoint.y / chartHeight) * 100 - 30}%`
                }}
              >
                <strong>{activeChartPoint.label}: {activeChartPoint.value} runs</strong>
                <span className="tooltip-details">{activeChartPoint.details}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="quick-actions-card card">
          <h3>Quick Operations</h3>
          <p className="card-subtitle">Instant triggers for system events</p>
          <div className="quick-actions-grid">
            <button className="action-tile" onClick={() => setView('code-creation')}>
              <div className="action-tile-icon code">
                <Icon name="code" size={18} />
              </div>
              <span className="action-tile-label">Create Code</span>
            </button>

            <button className="action-tile" onClick={() => setView('ipo-management')}>
              <div className="action-tile-icon ipo">
                <Icon name="ipo" size={18} />
              </div>
              <span className="action-tile-label">IPO Filings</span>
            </button>

            <button className="action-tile" onClick={() => setView('tasks')}>
              <div className="action-tile-icon tasks">
                <Icon name="tasks" size={18} />
              </div>
              <span className="action-tile-label">Manage Tasks</span>
            </button>

            <button className="action-tile" onClick={() => setView('purchase')}>
              <div className="action-tile-icon purchase">
                <Icon name="purchase" size={18} />
              </div>
              <span className="action-tile-label">Purchase Orders</span>
            </button>
          </div>

          <div className="quick-banner">
            <div className="quick-banner-icon">
              <Icon name="info" size={16} />
            </div>
            <div className="quick-banner-body">
              <strong>System Notice</strong>
              <span>IPO compliance filings audit locks in 3 days.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding-bottom: 24px;
        }

        /* Welcome Banner Card */
        .welcome-banner {
          background: linear-gradient(135deg, #FF6F43 0%, var(--color-brand) 100%);
          border-radius: var(--border-radius-lg);
          padding: 32px;
          color: #FFFFFF;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        .banner-content {
          position: relative;
          z-index: 2;
          max-width: 600px;
        }

        .banner-tagline {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          background-color: rgba(255, 255, 255, 0.2);
          padding: 4px 8px;
          border-radius: 4px;
          margin-bottom: 12px;
          display: inline-block;
        }

        .banner-title {
          font-size: 26px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .banner-text {
          font-size: 14px;
          opacity: 0.9;
        }

        .banner-decor {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 300px;
          pointer-events: none;
        }

        .decor-glow {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          filter: blur(50px);
          top: -30px;
          right: -30px;
        }

        /* KPI Grid styling */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .stat-card {
          padding: 20px;
        }

        .stat-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .stat-card-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .stat-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
        }

        .stat-card-value {
          font-size: 28px;
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 6px;
        }

        .stat-card-change {
          font-size: 11px;
          font-weight: 500;
          color: var(--color-text-tertiary);
        }

        /* Dashboard layout structure */
        .dashboard-main-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 992px) {
          .dashboard-main-row {
            grid-template-columns: 1.6fr 1fr;
          }
        }

        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .card-subtitle {
          font-size: 12px;
          color: var(--color-text-secondary);
          margin-top: 4px;
        }

        .chart-status-indicator {
          font-size: 11px;
          font-weight: 600;
          color: #10B981;
          background-color: rgba(16, 185, 129, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
        }

        /* SVG chart design */
        .chart-wrapper {
          position: relative;
          width: 100%;
        }

        .svg-chart {
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .chart-grid-line {
          stroke: var(--color-border);
          stroke-width: 1;
        }

        .chart-axis-text {
          font-size: 10px;
          fill: var(--color-text-tertiary);
          font-weight: 500;
        }

        .chart-tooltip {
          position: absolute;
          background-color: var(--color-surface);
          border: 1px solid var(--color-brand);
          border-radius: var(--border-radius-sm);
          padding: 8px 12px;
          box-shadow: var(--shadow-md);
          pointer-events: none;
          z-index: 10;
          transform: translate(-50%, -100%);
          display: flex;
          flex-direction: column;
          white-space: nowrap;
          font-size: 11px;
          color: var(--color-text-primary);
        }

        .tooltip-details {
          color: var(--color-text-secondary);
          font-size: 10px;
          margin-top: 2px;
        }

        /* Quick actions styling */
        .quick-actions-card {
          display: flex;
          flex-direction: column;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .action-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 16px;
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .action-tile:hover {
          transform: translateY(-2px);
          border-color: var(--color-brand);
          background-color: var(--color-surface);
        }

        .action-tile-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #FFFFFF;
        }

        .action-tile-icon.code { background-color: #059669; }
        .action-tile-icon.ipo { background-color: #4F46E5; }
        .action-tile-icon.tasks { background-color: #3B82F6; }
        .action-tile-icon.purchase { background-color: #E8461A; }

        .action-tile-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .quick-banner {
          display: flex;
          gap: 12px;
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          padding: 12px 16px;
          border-radius: var(--border-radius-md);
          align-items: flex-start;
        }

        .quick-banner-icon {
          color: var(--color-brand);
          margin-top: 2px;
        }

        .quick-banner-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 11px;
        }

        .quick-banner-body strong {
          color: var(--color-text-primary);
        }

        .quick-banner-body span {
          color: var(--color-text-secondary);
        }
      `}</style>
    </div>
  );
};
