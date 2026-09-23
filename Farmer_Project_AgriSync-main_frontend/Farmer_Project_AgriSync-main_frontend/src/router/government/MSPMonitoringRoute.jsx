import { useEffect } from 'react'
import MSPMonitoring from '../../pages/government/MSP Monitoring.jsx'
import { useGovernment } from './state/GovernmentContext'

export default function MSPMonitoringRoute() {
  const { state, actions } = useGovernment()
  useEffect(() => { actions.loadPrices().catch(() => {}) }, [actions])
  return <MSPMonitoring prices={state.prices?.mspPrices || []} />
}
