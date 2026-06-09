import React, { useState } from 'react';
import { Icon } from '../components/Icon';

// ==========================================
// 1. TASKS VIEW (Kanban Board)
// ==========================================
export const TasksView = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Draft IPO Prospectus Section 4', desc: 'Vetting compliance descriptions with audit teams.', priority: 'High', status: 'todo' },
    { id: 2, title: 'Validate SKU generation script', desc: 'Test SKU compiler with 500 mock database catalog items.', priority: 'Medium', status: 'in-progress' },
    { id: 3, title: 'Audit FY25 Q3 ledger balance', desc: 'Confirm balance sheets match purchase ledger totals.', priority: 'High', status: 'review' },
    { id: 4, title: 'Deploy Webhook cron service', desc: 'Hook up PO approval dispatchers to production workers.', priority: 'Low', status: 'done' }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        title: newTaskTitle,
        desc: 'Custom task added from Quick Panel.',
        priority: newTaskPriority,
        status: 'todo'
      }
    ]);
    setNewTaskTitle('');
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const getTasksByStatus = (status) => tasks.filter(t => t.status === status);

  return (
    <div className="tasks-container fade-in">
      <div className="section-header-row">
        <div>
          <h2>Workflow Coordinator</h2>
          <p className="card-subtitle">Kanban board routing for departmental assignments</p>
        </div>
        <form onSubmit={handleAddTask} className="quick-task-form">
          <input 
            type="text" 
            placeholder="New task name..." 
            className="form-input quick-input" 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
          />
          <select 
            className="form-input quick-select"
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit" className="btn btn-primary quick-task-btn">
            <Icon name="plus" size={14} />
          </button>
        </form>
      </div>

      <div className="kanban-board">
        {['todo', 'in-progress', 'review', 'done'].map(status => (
          <div key={status} className="kanban-column">
            <div className="column-header">
              <span className="column-title">
                {status === 'todo' && 'To Do'}
                {status === 'in-progress' && 'In Progress'}
                {status === 'review' && 'Review'}
                {status === 'done' && 'Completed'}
              </span>
              <span className="column-count">{getTasksByStatus(status).length}</span>
            </div>

            <div className="column-cards-area">
              {getTasksByStatus(status).map(task => (
                <div key={task.id} className="task-card card">
                  <div className="task-priority-row">
                    <span className={`badge priority-badge ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>
                  <strong>{task.title}</strong>
                  <p>{task.desc}</p>
                  
                  <div className="task-card-actions">
                    {status !== 'todo' && (
                      <button 
                        onClick={() => {
                          const steps = ['todo', 'in-progress', 'review', 'done'];
                          const idx = steps.indexOf(status);
                          moveTask(task.id, steps[idx - 1]);
                        }}
                        className="move-btn"
                        title="Move back"
                      >
                        ◀
                      </button>
                    )}
                    {status !== 'done' && (
                      <button 
                        onClick={() => {
                          const steps = ['todo', 'in-progress', 'review', 'done'];
                          const idx = steps.indexOf(status);
                          moveTask(task.id, steps[idx + 1]);
                        }}
                        className="move-btn next"
                        title="Move forward"
                      >
                        ▶
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .tasks-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .section-header-row {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .section-header-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .quick-task-form {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .quick-input {
          max-width: 200px;
          height: 38px;
          padding: 8px 12px;
        }

        .quick-select {
          width: 100px;
          height: 38px;
          padding: 8px;
        }

        .quick-task-btn {
          width: 38px;
          height: 38px;
          padding: 0;
        }

        /* Board grid structure */
        .kanban-board {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          align-items: start;
        }

        .kanban-column {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-lg);
          padding: 16px;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 8px;
        }

        .column-title {
          font-weight: 700;
          font-size: 13px;
          color: var(--color-text-primary);
          text-transform: uppercase;
        }

        .column-count {
          font-size: 11px;
          font-weight: 600;
          background-color: var(--color-bg);
          padding: 2px 8px;
          border-radius: 10px;
        }

        .column-cards-area {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .task-card {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .task-card strong {
          font-size: 13px;
          color: var(--color-text-primary);
        }

        .task-card p {
          font-size: 11px;
          color: var(--color-text-secondary);
          line-height: 1.4;
        }

        .priority-badge.high { background-color: rgba(239, 68, 68, 0.1); color: #EF4444; }
        .priority-badge.medium { background-color: rgba(245, 158, 11, 0.1); color: #F59E0B; }
        .priority-badge.low { background-color: rgba(59, 130, 246, 0.1); color: #3B82F6; }

        .task-card-actions {
          display: flex;
          justify-content: flex-end;
          gap: 6px;
          margin-top: 8px;
        }

        .move-btn {
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          cursor: pointer;
          font-size: 10px;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .move-btn:hover {
          border-color: var(--color-brand);
          color: var(--color-brand);
        }

        .move-btn.next:hover {
          background-color: var(--color-brand);
          color: #FFFFFF;
          border-color: var(--color-brand);
        }
      `}</style>
    </div>
  );
};


// ==========================================
// 2. PURCHASE VIEW (PO Registry)
// ==========================================
export const PurchaseView = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([
    { poNum: 'PO-2026-001', vendor: 'Silicon Foundry Ltd', cost: 184000, date: '2026-06-01', status: 'Approved' },
    { poNum: 'PO-2026-002', vendor: 'Global Logistics Corp', cost: 24000, date: '2026-06-03', status: 'Approved' },
    { poNum: 'PO-2026-003', vendor: 'Apex Packaging', cost: 4500, date: '2026-06-07', status: 'Sent' },
    { poNum: 'PO-2026-004', vendor: 'Quantum Tech Labs', cost: 98000, date: '2026-06-08', status: 'Draft' }
  ]);

  const [newVendor, setNewVendor] = useState('');
  const [newCost, setNewCost] = useState('');

  const handleCreatePO = (e) => {
    e.preventDefault();
    if (!newVendor || !newCost) return;

    const sequence = purchaseOrders.length + 1;
    const poString = `PO-2026-00${sequence}`;

    setPurchaseOrders(prev => [
      {
        poNum: poString,
        vendor: newVendor,
        cost: Number(newCost),
        date: new Date().toISOString().split('T')[0],
        status: 'Draft'
      },
      ...prev
    ]);
    setNewVendor('');
    setNewCost('');
    alert(`Purchase Order ${poString} created as Draft!`);
  };

  const handleApprovePO = (poNum) => {
    setPurchaseOrders(purchaseOrders.map(po => 
      po.poNum === poNum ? { ...po, status: 'Approved' } : po
    ));
  };

  return (
    <div className="purchase-container fade-in">
      <div className="section-header-row">
        <div>
          <h2>Procurement Management</h2>
          <p className="card-subtitle">Raise purchase orders, select suppliers, and verify ledger balance</p>
        </div>
      </div>

      <div className="purchase-split">
        {/* PO directory table */}
        <div className="card po-list-card">
          <h4 className="panel-title">Purchase Order Registry</h4>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>PO Number</th>
                  <th>Vendor</th>
                  <th>Total Cost</th>
                  <th>Date Raised</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((po, i) => (
                  <tr key={i}>
                    <td><code>{po.poNum}</code></td>
                    <td><strong>{po.vendor}</strong></td>
                    <td>₹{(po.cost).toLocaleString()}</td>
                    <td>{po.date}</td>
                    <td>
                      <span className={`badge status-badge ${po.status.toLowerCase()}`}>
                        {po.status}
                      </span>
                    </td>
                    <td>
                      {po.status === 'Draft' ? (
                        <button className="btn btn-secondary action-btn-sm" onClick={() => handleApprovePO(po.poNum)}>
                          Approve
                        </button>
                      ) : (
                        <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Verified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PO wizard panel */}
        <div className="card po-wizard-card">
          <h4 className="panel-title">PO Creator Wizard</h4>
          <form onSubmit={handleCreatePO}>
            <div className="form-group">
              <label className="form-label">Vendor Entity Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Apex Packaging"
                value={newVendor}
                onChange={(e) => setNewVendor(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Total Cost (INR)</label>
              <input 
                type="number" 
                className="form-input" 
                placeholder="e.g. 15000"
                value={newCost}
                onChange={(e) => setNewCost(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary submit-po-btn">
              Raise Purchase Request
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .purchase-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 992px) {
          .purchase-split {
            grid-template-columns: 2.2fr 1fr;
          }
        }

        .action-btn-sm {
          padding: 6px 12px;
          font-size: 11px;
          border-radius: var(--border-radius-sm);
        }

        .submit-po-btn {
          width: 100%;
          margin-top: 10px;
        }

        .status-badge.draft { background-color: var(--color-border); color: var(--color-text-secondary); }
        .status-badge.sent { background-color: rgba(59, 130, 246, 0.1); color: #3B82F6; }
        .status-badge.approved { background-color: rgba(16, 185, 129, 0.1); color: #10B981; }
      `}</style>
    </div>
  );
};


// ==========================================
// 3. IMS VIEW (Inventory)
// ==========================================
export const ImsView = () => {
  const [stockItems, setStockItems] = useState([
    { sku: 'SKU-IMS-284', name: 'Silicon Substrate Wafer', stock: 140, minLimit: 150, unit: 'units', status: 'low' },
    { sku: 'SKU-IMS-285', name: 'Lead Frame Packaging Foil', stock: 800, minLimit: 300, unit: 'rolls', status: 'ok' },
    { sku: 'SKU-IMS-286', name: 'Gold Bonding Wire 0.8um', stock: 45, minLimit: 50, unit: 'spools', status: 'low' },
    { sku: 'SKU-IMS-287', name: 'Micro-Controller Die Core', stock: 1200, minLimit: 1000, unit: 'units', status: 'ok' },
    { sku: 'SKU-IMS-288', name: 'Polyimide Adhesive Paste', stock: 12, minLimit: 20, unit: 'tubes', status: 'low' }
  ]);

  const handleReorder = (sku, name, threshold) => {
    // Cross-module trigger: Increase stock item to mimic a reordered status
    setStockItems(stockItems.map(item => 
      item.sku === sku ? { ...item, stock: item.minLimit + 100, status: 'ok' } : item
    ));
    alert(`Reorder request sent to Procurement for ${name}. Stock replenished to test cross-module synchronization!`);
  };

  return (
    <div className="ims-container fade-in">
      <div className="section-header-row">
        <div>
          <h2>Warehouse & Inventory (IMS)</h2>
          <p className="card-subtitle">Real-time stock master ledger, SKU indexes, and warning monitors</p>
        </div>
      </div>

      <div className="card">
        <h4 className="panel-title">Stock Level Master Table</h4>
        
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>SKU ID</th>
                <th>Asset Description</th>
                <th>Quantity On Hand</th>
                <th>Reorder Threshold</th>
                <th>Alert Status</th>
                <th>Quick Operation</th>
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item, idx) => {
                const isLow = item.status === 'low';
                return (
                  <tr key={idx} className={isLow ? 'low-stock-tr' : ''}>
                    <td><code>{item.sku}</code></td>
                    <td><strong>{item.name}</strong></td>
                    <td>
                      <span className={`stock-number-wrap ${isLow ? 'danger' : ''}`}>
                        {item.stock} {item.unit}
                      </span>
                    </td>
                    <td>{item.minLimit} {item.unit}</td>
                    <td>
                      <span className={`badge status-badge ${isLow ? 'failure' : 'success'}`}>
                        {isLow ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td>
                      {isLow ? (
                        <button 
                          className="btn btn-primary reorder-btn" 
                          onClick={() => handleReorder(item.sku, item.name, item.minLimit)}
                        >
                          Reorder Link
                        </button>
                      ) : (
                        <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Sufficient</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .low-stock-tr {
          background-color: rgba(239, 68, 68, 0.02);
        }

        .stock-number-wrap {
          font-weight: 700;
        }

        .stock-number-wrap.danger {
          color: #EF4444;
        }

        .reorder-btn {
          padding: 6px 12px;
          font-size: 11px;
          border-radius: var(--border-radius-sm);
        }
      `}</style>
    </div>
  );
};
