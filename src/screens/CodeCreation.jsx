import React, { useState, useEffect } from 'react';
import { Icon } from '../components/Icon';

export const CodeCreation = ({ user }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('sku');
  const [prefix, setPrefix] = useState('BDR');
  const [module, setModule] = useState('IMS');
  const [action, setAction] = useState('AUTO_GENERATE');
  const [generatedCode, setGeneratedCode] = useState('');
  const [logs, setLogs] = useState([
    { id: 'RUN-483', name: 'IMS SKU Auto-Linker', module: 'IMS', ranBy: 'Shubh Saxena', date: '2026-06-09 11:20 AM', status: 'Success' },
    { id: 'RUN-482', name: 'Webhook Purchase Hook', module: 'Purchase', ranBy: 'System Cron', date: '2026-06-09 09:00 AM', status: 'Success' },
    { id: 'RUN-481', name: 'SEBI Compliance Audit Cron', module: 'IPO', ranBy: 'Shubh Saxena', date: '2026-06-08 04:30 PM', status: 'Failure' }
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const templates = [
    { id: 'sku', name: 'Product SKU Generator', desc: 'Creates unique items and product codes based on category prefixes.' },
    { id: 'webhook', name: 'Vendor Webhook Dispatcher', desc: 'Triggers vendor API notification upon PO approval.' },
    { id: 'cron', name: 'Daily Compliance Auditer', desc: 'Scans SEC/SEBI roadmap document uploads and alerts errors.' }
  ];

  // Dynamically compile the script preview code based on parameters
  useEffect(() => {
    if (selectedTemplate === 'sku') {
      setGeneratedCode(`/**
 * BINDER-OS product code compiler.
 * Compiled at: ${new Date().toISOString().split('T')[0]}
 */
import { generateHash } from 'binder-crypto';

export async function compileProductCode(item) {
  const codePrefix = "${prefix.toUpperCase() || 'BDR'}";
  const targetModule = "${module}";
  const sequenceId = Math.floor(Math.random() * 10000);
  
  return \`\${codePrefix}-\${targetModule}-\${sequenceId}\`;
}

// Action Trigger: ${action}`);
    } else if (selectedTemplate === 'webhook') {
      setGeneratedCode(`/**
 * BINDER-OS Webhook Dispatcher
 * Targets: /webhooks/${module.toLowerCase()}
 */
export async function dispatchWebhook(payload) {
  const response = await fetch('https://api.binder-os.com/v1/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Binder-Action': '${action}'
    },
    body: JSON.stringify({
      module: '${module}',
      dispatchedAt: new Date().toISOString(),
      payload
    })
  });
  return response.ok;
}`);
    } else {
      setGeneratedCode(`/**
 * BINDER-OS IPO Compliance Cron
 */
export default async function runComplianceAudit() {
  console.log("Starting compliance audit for: ${module}");
  const auditResult = await db.complianceRoadmap.scan({
    module: '${module}',
    action: '${action}'
  });
  
  if (auditResult.hasViolations) {
    throw new Error("Milestone alignment failed audit parameters");
  }
  return { status: 'COMPLIANT', auditedAt: new Date().toISOString() };
}`);
    }
  }, [selectedTemplate, prefix, module, action]);

  const handleRunScript = () => {
    setIsRunning(true);
    setTimeout(() => {
      const newRunId = `RUN-${Math.floor(Math.random() * 900) + 100}`;
      const scriptName = templates.find(t => t.id === selectedTemplate)?.name || 'Custom Script';
      
      setLogs(prev => [
        {
          id: newRunId,
          name: scriptName,
          module: module,
          ranBy: user?.name || 'Administrator',
          date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'Success'
        },
        ...prev
      ]);
      setIsRunning(false);
      alert(`Automation ${newRunId} compiled and executed successfully!`);
    }, 1200);
  };

  return (
    <div className="code-container fade-in">
      {/* Header Row */}
      <section className="section-header">
        <div>
          <h2>Code Creation & Workflows</h2>
          <p className="card-subtitle">Generate system automations, SKU compilers, and cron hooks</p>
        </div>
      </section>

      {/* Main Workspace Layout */}
      <div className="code-workspace">
        {/* Left Side: Templates List */}
        <div className="templates-panel card">
          <h4 className="panel-title">Automations Directory</h4>
          <div className="templates-list">
            {templates.map(t => (
              <button
                key={t.id}
                className={`template-item-btn ${selectedTemplate === t.id ? 'active' : ''}`}
                onClick={() => setSelectedTemplate(t.id)}
              >
                <div className="template-meta">
                  <strong>{t.name}</strong>
                  <p>{t.desc}</p>
                </div>
                {selectedTemplate === t.id && <div className="template-active-bar" />}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Compiler & Form */}
        <div className="compiler-panel card">
          <h4 className="panel-title">Configuration Parameters</h4>
          
          <div className="compiler-grid">
            {/* Parameters Form */}
            <form className="compiler-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Identifier Prefix</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={prefix} 
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="e.g. BDR"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target ERP Module</label>
                <select className="form-input" value={module} onChange={(e) => setModule(e.target.value)}>
                  <option value="IMS">Inventory Management (IMS)</option>
                  <option value="Purchase">Purchase (PO)</option>
                  <option value="IPO">IPO Management (Compliance)</option>
                  <option value="Tasks">Tasks Workflow</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">System Trigger Hook</label>
                <select className="form-input" value={action} onChange={(e) => setAction(e.target.value)}>
                  <option value="AUTO_GENERATE">AUTO_GENERATE (Compile Item SKU)</option>
                  <option value="ON_APPROVE">ON_APPROVE (Webhook POST)</option>
                  <option value="CRON_DAILY">CRON_DAILY (Periodic scan)</option>
                  <option value="MANUAL_RUN">MANUAL_RUN (Adhoc invocation)</option>
                </select>
              </div>

              <button 
                type="button" 
                className="btn btn-primary run-script-btn" 
                onClick={handleRunScript}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <span className="spinner" style={{ marginRight: 8 }}></span>
                    Compiling...
                  </>
                ) : (
                  <>
                    <Icon name="plus" size={16} style={{ marginRight: 6 }} />
                    Run Automation
                  </>
                )}
              </button>
            </form>

            {/* Generated Code Window */}
            <div className="code-preview-window">
              <div className="window-header">
                <span className="window-dot red" />
                <span className="window-dot yellow" />
                <span className="window-dot green" />
                <span className="window-filename">compiled_workflow.js</span>
              </div>
              <pre className="code-content-block">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Audit Trail Logs */}
      <section className="audit-trail card">
        <h4 className="panel-title">Automation Execution History</h4>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Run ID</th>
                <th>Automation Name</th>
                <th>Target Module</th>
                <th>Triggered By</th>
                <th>Date / Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i}>
                  <td className="log-id"><code>{log.id}</code></td>
                  <td><strong>{log.name}</strong></td>
                  <td><span className={`badge module-badge ${log.module.toLowerCase()}`}>{log.module}</span></td>
                  <td>{log.ranBy}</td>
                  <td>{log.date}</td>
                  <td>
                    <span className={`badge status-badge ${log.status.toLowerCase()}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <style>{`
        .code-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding-bottom: 24px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Workspace Grid */
        .code-workspace {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 992px) {
          .code-workspace {
            grid-template-columns: 1fr 2.5fr;
          }
        }

        .panel-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 16px;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 12px;
        }

        /* Left Templates List */
        .templates-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .template-item-btn {
          display: flex;
          text-align: left;
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-md);
          padding: 14px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all var(--transition-fast);
        }

        .template-item-btn:hover {
          border-color: var(--color-brand);
          background-color: var(--color-surface);
        }

        .template-item-btn.active {
          border-color: var(--color-brand);
          background-color: var(--color-brand-light);
        }

        .template-active-bar {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background-color: var(--color-brand);
        }

        .template-meta strong {
          font-size: 13px;
          display: block;
          margin-bottom: 4px;
          color: var(--color-text-primary);
        }

        .template-meta p {
          font-size: 11px;
          color: var(--color-text-secondary);
          line-height: 1.4;
        }

        /* Right Compiler Workspace */
        .compiler-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 768px) {
          .compiler-grid {
            grid-template-columns: 1fr 1.3fr;
          }
        }

        .compiler-form {
          display: flex;
          flex-direction: column;
        }

        .run-script-btn {
          margin-top: 10px;
          height: 44px;
        }

        /* Faux code editor style */
        .code-preview-window {
          background-color: #1E293B;
          border-radius: var(--border-radius-md);
          border: 1px solid #334155;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-md);
        }

        .window-header {
          background-color: #0F172A;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .window-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .window-dot.red { background-color: #EF4444; }
        .window-dot.yellow { background-color: #F59E0B; }
        .window-dot.green { background-color: #10B981; }

        .window-filename {
          font-family: monospace;
          font-size: 11px;
          color: #94A3B8;
          margin-left: 10px;
        }

        .code-content-block {
          padding: 16px;
          overflow: auto;
          flex: 1;
          margin: 0;
        }

        .code-content-block code {
          font-family: 'Courier New', Courier, monospace;
          font-size: 12px;
          color: #E2E8F0;
          line-height: 1.5;
          white-space: pre;
          display: block;
        }

        /* Badges & Tables styling */
        .log-id code {
          font-family: monospace;
          font-weight: 600;
          color: var(--color-brand);
          background-color: var(--color-brand-light);
          padding: 3px 6px;
          border-radius: 4px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 8px;
          font-size: 10px;
          font-weight: 700;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .module-badge.ims { background-color: rgba(245, 158, 11, 0.1); color: #F59E0B; }
        .module-badge.purchase { background-color: rgba(232, 70, 26, 0.1); color: #E8461A; }
        .module-badge.ipo { background-color: rgba(79, 70, 229, 0.1); color: #4F46E5; }
        .module-badge.tasks { background-color: rgba(59, 130, 246, 0.1); color: #3B82F6; }

        .status-badge.success { background-color: rgba(16, 185, 129, 0.1); color: #10B981; }
        .status-badge.failure { background-color: rgba(239, 68, 68, 0.1); color: #EF4444; }

        /* Spinner inside run button */
        .spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #FFFFFF;
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
};
