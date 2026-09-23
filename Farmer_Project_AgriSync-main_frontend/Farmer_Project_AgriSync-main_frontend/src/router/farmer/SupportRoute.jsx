import { useEffect } from 'react'
import Support from '../../pages/farmer/Support.jsx'
import { useFarmer } from './state/FarmerContext'

export default function SupportRoute() {
  const { state, actions } = useFarmer()
  useEffect(() => { actions.loadSupport().catch(() => {}) }, [actions])
  return <Support support={state.support?.support || null} onCreateTicket={actions.createTicket} />
}
