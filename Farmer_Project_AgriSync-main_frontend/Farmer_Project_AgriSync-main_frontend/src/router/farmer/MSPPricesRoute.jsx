import { useEffect } from 'react'
import MSPPrices from '../../pages/farmer/MSP Prices.jsx'
import { useFarmer } from './state/FarmerContext'

export default function MSPPricesRoute() {
  const { state, actions } = useFarmer()
  useEffect(() => { actions.loadPrices().catch(() => {}) }, [actions])
  return <MSPPrices prices={state.prices?.mspPrices || []} />
}
