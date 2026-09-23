import { useEffect } from 'react'
import FarmerDashboard from '../../pages/farmer/Farmer dashboard.jsx'
import { useFarmer } from './state/FarmerContext'

export default function DashboardRoute({ onNavigate }) {
  const { state, actions } = useFarmer()
  useEffect(() => { actions.loadDashboard().catch(() => {}) }, [actions])

  const dashboard = state.dashboard || {}
  const activeToken = dashboard.activeToken
  const token = activeToken?.id || '—'
  const ahead = dashboard.farmersAhead ?? activeToken?.farmersAhead ?? 0
  const wait = dashboard.estimatedWaitMinutes ?? activeToken?.estimatedWaitMinutes ?? 0
  const slot = activeToken?.slotTime || '—'
  const msp = dashboard.referenceMsp ? [[dashboard.referenceMsp.crop, dashboard.referenceMsp.price, 'Reference']] : []

  return <FarmerDashboard token={token} slot={slot} ahead={ahead} wait={wait} onNavigate={onNavigate} msp={msp} />
}
