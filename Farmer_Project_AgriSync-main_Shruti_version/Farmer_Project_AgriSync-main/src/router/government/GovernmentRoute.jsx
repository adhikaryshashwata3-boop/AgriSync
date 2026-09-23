import { useEffect } from 'react'
import Government from '../../pages/government/Government.jsx'
import { useGovernment } from './state/GovernmentContext'

function toMandiRows(dashboard) {
  const records = dashboard?.auditRecords || []
  if (!records.length) return []
  return [...new Set(records.map((record) => record.status || 'Active'))].map((status, index) => [
    `Procurement Cluster ${index + 1}`,
    'State Network',
    `${Math.min(99, 55 + records.filter((record) => (record.status || 'Active') === status).length * 8)}%`,
    dashboard?.statewideWaitAvg || '—',
    status,
  ])
}

function toProcurementRows(dashboard) {
  const records = dashboard?.auditRecords || []
  return [...new Set(records.map((record) => record.crop).filter(Boolean))].map((crop) => [
    crop,
    `${records.filter((record) => record.crop === crop).length} transactions`,
    'Live ledger',
    '—',
  ])
}

export default function GovernmentRoute({ onNavigate, onRefresh }) {
  const { state, actions } = useGovernment()
  useEffect(() => { actions.loadDashboard().catch(() => {}) }, [actions])
  const dashboard = state.dashboard || {}
  const recordCount = dashboard.auditRecords?.length || 0
  const backendStats = [
    { value: `${recordCount}`, label: 'Active ledger records', icon: '▤', trend: 'Live' },
    { value: `${dashboard.activeMandis ?? '—'}`, label: 'Active mandis', icon: '⌖', trend: 'Live' },
    { value: `${dashboard.statewideWaitAvg ?? '—'}`, label: 'Statewide average wait', icon: '◷', trend: 'Live' },
  ]
  return (
    <Government
      mandis={toMandiRows(dashboard)}
      procurement={toProcurementRows(dashboard)}
      backendStats={backendStats}
      onNavigate={onNavigate}
      onRefresh={async () => { await actions.loadDashboard(); onRefresh?.() }}
    />
  )
}
