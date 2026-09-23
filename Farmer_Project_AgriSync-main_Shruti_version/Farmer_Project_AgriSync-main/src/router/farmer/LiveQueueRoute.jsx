import { useEffect } from 'react'
import LiveQueue from '../../pages/farmer/Live Queue.jsx'
import { useFarmer } from './state/FarmerContext'

export default function LiveQueueRoute() {
  const { state, actions } = useFarmer()
  useEffect(() => { actions.loadQueue().catch(() => {}) }, [actions])

  const mine = state.queue?.myToken
  return <LiveQueue token={mine?.id || '—'} ahead={mine?.farmersAhead ?? 0} wait={mine?.estimatedWaitMinutes ?? 0} onRefresh={() => actions.loadQueue().catch(() => {})} />
}
