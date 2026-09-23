import { useEffect } from 'react'
import Alerts from '../../pages/government/Alerts.jsx'
import { useGovernment } from './state/GovernmentContext'

export default function AlertsRoute({ onToast }) {
  const { state, actions } = useGovernment()
  useEffect(() => { actions.loadAdvisories().catch(() => {}) }, [actions])
  return <Alerts advisories={state.advisories?.activeAdvisories || []} onToast={onToast} />
}
