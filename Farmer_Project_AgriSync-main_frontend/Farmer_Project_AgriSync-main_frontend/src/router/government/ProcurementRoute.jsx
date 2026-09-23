import { useEffect } from 'react'
import Procurement from '../../pages/government/Procurement.jsx'
import { useGovernment } from './state/GovernmentContext'

export default function ProcurementRoute() {
  const { state, actions } = useGovernment()
  useEffect(() => { if (!state.dashboard) actions.loadDashboard().catch(() => {}) }, [actions, state.dashboard])
  const records = state.dashboard?.auditRecords || []
  const procurement = [...new Set(records.map((r) => r.crop))].map((crop) => [crop, `${records.filter((r) => r.crop === crop).length} transactions`, 'Live ledger', '—'])
  return <Procurement procurement={procurement} />
}
