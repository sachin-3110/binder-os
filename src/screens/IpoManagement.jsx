import React, { useState } from 'react';
import { Icon } from '../components/Icon';

export const IpoManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState('vault'); // 'vault' | 'equity'
  const [selectedMilestone, setSelectedMilestone] = useState(2);
  const [sharePrice, setSharePrice] = useState(145); // initial default price

  const milestones = [
    { title: 'Board Approval', desc: 'Board resolution for public listing approval.', status: 'Completed', date: 'Mar 10' },
    { title: 'DRHP Drafting', desc: 'Draft Red Herring Prospectus compiled with underwriters.', status: 'Completed', date: 'Apr 24' },
    { title: 'SEBI Filing', desc: 'Filing documentation submitted to SEBI for regulatory audit.', status: 'Active', date: 'May 30' },
    { title: 'Roadshow', desc: 'Pre-marketing and institutional roadshow presentations.', status: 'Pending', date: 'Jun 22' },
    { title: 'RHP & Pricing', desc: 'Red Herring Prospectus published, book building starts.', status: 'Pending', date: 'Jul 05' },
    { title: 'Allotment', desc: 'Share distribution ledger approved and credited to Demats.', status: 'Pending', date: 'Jul 18' }
  ];

  const initialDocs = [
    { name: 'Board_Resolution_Listing.pdf', category: 'Legal', version: 'v1.2', date: '2026-03-12', status: 'Approved' },
    { name: 'Draft_Red_Herring_Prospectus.pdf', category: 'Filing', version: 'v3.1', date: '2026-04-20', status: 'Approved' },
    { name: 'SEBI_Filing_Confirmation.pdf', category: 'Compliance', version: 'v1.0', date: '2026-05-30', status: 'Approved' },
    { name: 'Audited_Financial_Statement_FY25.xlsx', category: 'Finance', version: 'v2.0', date: '2026-05-25', status: 'Pending Review' }
  ];

  const [documents, setDocuments] = useState(initialDocs);
  const [newDocName, setNewDocName] = useState('');
  const [newDocCat, setNewDocCat] = useState('Legal');

  const handleUploadDoc = (e) => {
    e.preventDefault();
    if (!newDocName) return;

    setDocuments(prev => [
      {
        name: newDocName.endsWith('.pdf') || newDocName.endsWith('.xlsx') ? newDocName : `${newDocName}.pdf`,
        category: newDocCat,
        version: 'v1.0',
        date: new Date().toISOString().split('T')[0],
        status: 'Pending Review'
      },
      ...prev
    ]);
    setNewDocName('');
    alert('Document added to Vault for verification!');
  };

  const handleDeleteDoc = (idx) => {
    if (confirm('Are you sure you want to delete this document from the secure vault?')) {
      setDocuments(documents.filter((_, i) => i !== idx));
    }
  };

  // Equity calculations
  const equityShareholders = [
    { name: 'Promoter & Promoter Group', shares: 45000000, percentage: 45 },
    { name: 'Pre-IPO Institutional Investors', shares: 25000000, percentage: 25 },
    { name: 'Qualified Institutional Buyers (QIB)', shares: 15000000, percentage: 15 },
    { name: 'Retail Individual Investors', shares: 10000000, percentage: 10 },
    { name: 'Employee Stock Options Plan (ESOP)', shares: 5000000, percentage: 5 }
  ];

  const totalShares = equityShareholders.reduce((sum, s) => sum + s.shares, 0);
  const totalValuation = totalShares * sharePrice;

  return (
    <div className="ipo-container fade-in">
      {/* Header */}
      <section className="section-header">
        <div>
          <h2>IPO Compliance & Equity Management</h2>
          <p className="card-subtitle">SEBI filings timeline, document vaults, and equity pricing modeler</p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="compliance-timeline-card card">
        <h4 className="panel-title">SEBI / Compliance Roadmap</h4>
        <div className="timeline-horizontal">
          {milestones.map((ms, index) => {
            let nodeClass = 'pending';
            if (ms.status === 'Completed') nodeClass = 'completed';
            if (index === selectedMilestone) nodeClass = 'active';

            return (
              <div 
                key={index} 
                className={`timeline-step ${nodeClass}`}
                onClick={() => setSelectedMilestone(index)}
              >
                <div className="step-node-wrap">
                  <div className="step-node">
                    {ms.status === 'Completed' ? <Icon name="check" size={12} /> : <span>{index + 1}</span>}
                  </div>
                  {index < milestones.length - 1 && <div className="step-line" />}
                </div>
                <div className="step-meta">
                  <span className="step-title">{ms.title}</span>
                  <span className="step-date">{ms.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Detail Drawpanel */}
        <div className="milestone-details-panel">
          <div className="details-header">
            <span className={`badge milestone-status ${milestones[selectedMilestone].status.toLowerCase()}`}>
              {milestones[selectedMilestone].status}
            </span>
            <h4>{milestones[selectedMilestone].title}</h4>
          </div>
          <p className="details-desc">{milestones[selectedMilestone].desc}</p>
          <div className="details-requirements">
            <strong>Key Checkpoints:</strong>
            <ul>
              <li>Upload authenticated board resolution signatures</li>
              <li>Verification of statutory auditor certificates</li>
              <li>Underwriter vetting status: Approved</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tabs Row */}
      <div className="sub-tabs-row">
        <button 
          className={`sub-tab-btn ${activeSubTab === 'vault' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('vault')}
        >
          <Icon name="tasks" size={16} style={{ marginRight: 6 }} />
          Document Vault
        </button>
        <button 
          className={`sub-tab-btn ${activeSubTab === 'equity' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('equity')}
        >
          <Icon name="ipo" size={16} style={{ marginRight: 6 }} />
          Allotment & Valuation Modeler
        </button>
      </div>

      {/* Tab Contents */}
      {activeSubTab === 'vault' ? (
        <div className="tab-pane fade-in">
          <div className="vault-split">
            {/* Documents List */}
            <div className="card vault-list-card">
              <h4 className="panel-title">Secure Vault Matrices</h4>
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Category</th>
                      <th>Version</th>
                      <th>Upload Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc, idx) => (
                      <tr key={idx}>
                        <td><strong>{doc.name}</strong></td>
                        <td><span className="badge category-badge">{doc.category}</span></td>
                        <td><code>{doc.version}</code></td>
                        <td>{doc.date}</td>
                        <td>
                          <span className={`badge status-badge ${doc.status === 'Approved' ? 'success' : 'pending'}`}>
                            {doc.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons-cell">
                            <button className="table-action-btn delete" onClick={() => handleDeleteDoc(idx)} title="Delete file">
                              <Icon name="trash" size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Document Uploader Form */}
            <div className="card uploader-card">
              <h4 className="panel-title">Vault Upload Portal</h4>
              <form onSubmit={handleUploadDoc}>
                <div className="form-group">
                  <label className="form-label">Document File Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Underwriter_Agreement"
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Classification Group</label>
                  <select className="form-input" value={newDocCat} onChange={(e) => setNewDocCat(e.target.value)}>
                    <option value="Legal">Legal Documentation</option>
                    <option value="Compliance">Compliance filings</option>
                    <option value="Finance">Financial reports</option>
                    <option value="Marketing">Investor materials</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary submit-upload-btn">
                  Upload to Vault
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="tab-pane fade-in">
          <div className="valuation-modeler card">
            <h4 className="panel-title">Equity Valuation & Modeler Tool</h4>
            
            {/* Share Price Range Input Modeler */}
            <div className="modeler-settings">
              <div className="slider-row">
                <div className="slider-meta">
                  <label className="form-label">Projected Offer Price Per Share</label>
                  <span className="current-price-display">₹{sharePrice}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="250" 
                  value={sharePrice} 
                  onChange={(e) => setSharePrice(Number(e.target.value))}
                  className="price-range-slider"
                />
              </div>

              <div className="valuation-summary-metrics">
                <div className="val-stat">
                  <span>Total Shares Out</span>
                  <strong>{(totalShares / 10000000).toFixed(1)} Cr ({(totalShares).toLocaleString()})</strong>
                </div>
                <div className="val-stat brand-border">
                  <span>Target IPO Valuation</span>
                  <strong className="brand-txt">₹{(totalValuation / 10000000).toFixed(2)} Cr</strong>
                </div>
              </div>
            </div>

            {/* Shares Allotment Table */}
            <div className="table-container" style={{ marginTop: 24 }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Shareholder Class</th>
                    <th>Cap Allocation %</th>
                    <th>Number of Shares</th>
                    <th>Value at Offer</th>
                  </tr>
                </thead>
                <tbody>
                  {equityShareholders.map((s, i) => (
                    <tr key={i}>
                      <td><strong>{s.name}</strong></td>
                      <td><code>{s.percentage}%</code></td>
                      <td>{(s.shares).toLocaleString()}</td>
                      <td><strong>₹{(s.shares * sharePrice / 10000000).toFixed(2)} Cr</strong></td>
                    </tr>
                  ))}
                  <tr className="table-footer-row">
                    <td><strong>Total</strong></td>
                    <td><code>100%</code></td>
                    <td><strong>{(totalShares).toLocaleString()}</strong></td>
                    <td><strong>₹{(totalValuation / 10000000).toFixed(2)} Cr</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .ipo-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding-bottom: 24px;
        }

        /* Timeline grid and node structures */
        .timeline-horizontal {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 10px;
          margin-bottom: 24px;
        }

        @media (min-width: 768px) {
          .timeline-horizontal {
            flex-direction: row;
            justify-content: space-between;
            overflow-x: auto;
            padding-bottom: 12px;
          }
        }

        .timeline-step {
          flex: 1;
          display: flex;
          flex-direction: row;
          gap: 12px;
          align-items: center;
          cursor: pointer;
          transition: opacity var(--transition-fast);
        }

        @media (min-width: 768px) {
          .timeline-step {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            min-width: 110px;
          }
        }

        .step-node-wrap {
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
        }

        .step-node {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: var(--color-bg);
          border: 2px solid var(--color-border-hover);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 11px;
          color: var(--color-text-secondary);
          z-index: 2;
          transition: all var(--transition-fast);
        }

        .step-line {
          display: none;
          position: absolute;
          left: 28px;
          right: 0;
          height: 2px;
          background-color: var(--color-border);
          z-index: 1;
        }

        @media (min-width: 768px) {
          .step-line {
            display: block;
          }
        }

        .timeline-step.completed .step-node {
          background-color: #10B981;
          border-color: #10B981;
          color: #FFFFFF;
        }

        .timeline-step.completed .step-line {
          background-color: #10B981;
        }

        .timeline-step.active .step-node {
          border-color: var(--color-brand);
          color: var(--color-brand);
          box-shadow: 0 0 0 3px var(--color-brand-light);
        }

        .step-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .step-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .step-date {
          font-size: 10px;
          color: var(--color-text-tertiary);
        }

        /* Detail Panel for chosen roadmap milestone */
        .milestone-details-panel {
          background-color: var(--color-bg);
          border-radius: var(--border-radius-md);
          padding: 18px;
          border: 1px solid var(--color-border);
        }

        .details-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .milestone-status.active { background-color: rgba(232, 70, 26, 0.1); color: var(--color-brand); }
        .milestone-status.completed { background-color: rgba(16, 185, 129, 0.1); color: #10B981; }
        .milestone-status.pending { background-color: var(--color-border); color: var(--color-text-secondary); }

        .details-desc {
          font-size: 13px;
          color: var(--color-text-secondary);
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .details-requirements {
          font-size: 12px;
          color: var(--color-text-secondary);
        }

        .details-requirements ul {
          margin-top: 6px;
          padding-left: 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* Sub tabs styling */
        .sub-tabs-row {
          display: flex;
          border-bottom: 1px solid var(--color-border);
          gap: 16px;
        }

        .sub-tab-btn {
          background: transparent;
          border: none;
          padding: 12px 6px;
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-secondary);
          cursor: pointer;
          position: relative;
          transition: color var(--transition-fast);
          display: flex;
          align-items: center;
        }

        .sub-tab-btn:hover {
          color: var(--color-text-primary);
        }

        .sub-tab-btn.active {
          color: var(--color-brand);
        }

        .sub-tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--color-brand);
        }

        /* Split layouts */
        .vault-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 992px) {
          .vault-split {
            grid-template-columns: 2fr 1fr;
          }
        }

        .action-buttons-cell {
          display: flex;
          gap: 8px;
        }

        .table-action-btn {
          border: 1px solid var(--color-border);
          background-color: var(--color-surface);
          border-radius: var(--border-radius-sm);
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .table-action-btn:hover {
          border-color: var(--color-brand);
          color: var(--color-brand);
        }

        .table-action-btn.delete:hover {
          border-color: #EF4444;
          color: #EF4444;
          background-color: rgba(239, 68, 68, 0.05);
        }

        .submit-upload-btn {
          width: 100%;
          margin-top: 10px;
        }

        .category-badge {
          background-color: var(--color-bg);
          border: 1px solid var(--color-border-hover);
          color: var(--color-text-primary);
        }

        /* Modeler settings styling */
        .modeler-settings {
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .slider-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .slider-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .current-price-display {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 20px;
          color: var(--color-brand);
        }

        .price-range-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: var(--color-border-hover);
          outline: none;
        }

        .price-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-brand);
          cursor: pointer;
          box-shadow: 0 0 0 4px var(--color-brand-light);
          transition: transform var(--transition-fast);
        }

        .price-range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .valuation-summary-metrics {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 576px) {
          .valuation-summary-metrics {
            grid-template-columns: 1fr 1fr;
          }
        }

        .val-stat {
          display: flex;
          flex-direction: column;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          padding: 14px 18px;
          border-radius: var(--border-radius-md);
          gap: 4px;
        }

        .val-stat.brand-border {
          border-color: var(--color-brand);
        }

        .val-stat span {
          font-size: 11px;
          font-weight: 500;
          color: var(--color-text-secondary);
        }

        .val-stat strong {
          font-size: 20px;
          font-family: var(--font-heading);
          color: var(--color-text-primary);
        }

        .brand-txt {
          color: var(--color-brand) !important;
        }

        .table-footer-row td {
          border-top: 2px solid var(--color-border-hover);
          background-color: var(--color-bg);
          font-size: 15px;
        }
      `}</style>
    </div>
  );
};
