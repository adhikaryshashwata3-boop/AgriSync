import { useEffect } from 'react'
import MandiMonitoring from '../../pages/government/Mandi Monitoring.jsx'
import { useGovernment } from './state/GovernmentContext'

export default function MandiMonitoringRoute() {
  const { state, actions } = useGovernment()
  useEffect(() => { if (!state.dashboard) actions.loadDashboard().catch(() => {}) }, [actions, state.dashboard])
  const records = state.dashboard?.auditRecords || []
  const queueRows = records.map((record) => [record.tokenId || '—', record.farmer || '—', record.crop || '—'])
  const mandis = records.length ? [...new Set(records.map((r) => r.status || 'Active'))].map((status, index) => [`Procurement Cluster ${index + 1}`, 'State Network', `${70 + index * 7}%`, state.dashboard?.statewideWaitAvg || '—', status]) : []
  return <MandiMonitoring mandis={mandis} queueRows={queueRows} backendAlerts={mandis.filter((row) => row[2] !== '—').map((row) => `${row[0]}: ${row[2]} utilization`)} />
}
