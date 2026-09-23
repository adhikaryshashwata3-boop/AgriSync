import { motion } from "framer-motion";

import Card from "./_Card";

export default function Alerts({ onToast, advisories = [] }) {
  const alerts = advisories.map((item, index) => ({
    id: item.id || index + 1,
    severity: String(item.severity || 'info').toLowerCase(),
    label: item.severity || 'Info',
    title: item.title || item.category || 'Operational advisory',
    description: item.message || item.actionRequired || 'Review the current mandi advisory.',
    metric: item.mandiCenter || '—',
    metricLabel: item.category || 'Category',
    action: 'Review',
    time: item.timestamp || 'Current',
  }));

  const handleAction = (action) => {
    onToast(`${action} action completed`);
  };

  return (
    <motion.div
      className="alerts-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="page-heading">
        <div>
          <small>OPERATIONS MONITOR</small>
          <h1>Alert Center</h1>
          <p>
            Review priority issues across mandi capacity, waiting times and
            procurement compliance.
          </p>
        </div>

        <div className="alert-summary">
          <span className="status-dot" />
          <strong>{alerts.length}</strong>
          <span>open alerts</span>
        </div>
      </div>

      <div className="alert-toolbar">
        <div>
          <b>Priority issues</b>
          <span> Requires attention from the operations team</span>
        </div>

        <button
          className="secondary small"
          onClick={() => onToast("All alerts marked as reviewed")}
        >
          Mark all reviewed
        </button>
      </div>

      <div className="alert-list">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card>
              <div className={`alert-card ${alert.severity}`}>
                <div className="alert-main">
                  <div className="alert-top">
                    <span className={`severity ${alert.severity}`}>
                      <span className="severity-dot" />
                      {alert.label}
                    </span>

                    <span className="alert-time">{alert.time}</span>
                  </div>

                  <h3>{alert.title}</h3>
                  <p>{alert.description}</p>
                </div>

                <div className="alert-metric">
                  <strong>{alert.metric}</strong>
                  <span>{alert.metricLabel}</span>
                </div>

                <button
                  className="primary small"
                  onClick={() => handleAction(alert.action)}
                >
                  {alert.action}
                  <span>→</span>
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}