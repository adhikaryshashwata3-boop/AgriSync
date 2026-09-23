import { useEffect } from 'react'
import IndiaProcurementMap from '../../pages/government/IndiaProcurementMap.jsx'
import { useGovernment } from './state/GovernmentContext'

export default function IndiaProcurementMapRoute() {
  const { actions } = useGovernment()
  useEffect(() => { actions.loadDashboard().catch(() => {}) }, [actions])
  return <IndiaProcurementMap />
}
