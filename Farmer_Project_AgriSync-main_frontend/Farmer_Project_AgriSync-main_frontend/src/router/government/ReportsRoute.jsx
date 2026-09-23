import { useEffect } from 'react'
import Reports from '../../pages/government/Reports.jsx'
import { useGovernment } from './state/GovernmentContext'

export default function ReportsRoute({ onToast }) {
  const { state, actions } = useGovernment()
  useEffect(() => { if (!state.audit) actions.loadAudit().catch(() => {}) }, [actions, state.audit])
  const handleGenerate = async (name) => {
    await actions.loadAudit()
    onToast?.(`${name} prepared from the current audit ledger`)
  }
  return <Reports onGenerate={handleGenerate} />
}
