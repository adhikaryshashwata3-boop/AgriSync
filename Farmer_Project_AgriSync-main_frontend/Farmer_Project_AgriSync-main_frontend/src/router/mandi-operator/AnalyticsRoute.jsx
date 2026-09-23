import { useEffect } from 'react'
import Analytics from '../../pages/mandi_operator/Analytics.jsx'
import { useMandiOperator } from './state/MandiOperatorContext'

export default function AnalyticsRoute() {
  const { actions } = useMandiOperator()
  useEffect(() => { actions.loadQueue().catch(() => {}) }, [actions])
  return <Analytics />
}
