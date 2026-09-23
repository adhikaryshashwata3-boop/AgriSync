import { useEffect } from 'react'
import History from '../../pages/farmer/History.jsx'
import { getSession } from '../../api/client'
import { useFarmer } from './state/FarmerContext'

export default function HistoryRoute() {
  const { state, actions } = useFarmer()
  const farmerId = getSession().user?.id
  useEffect(() => { if (farmerId) actions.loadHistory(farmerId).catch(() => {}) }, [actions, farmerId])
  return <History records={state.history?.records || []} />
}
