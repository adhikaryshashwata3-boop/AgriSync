import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import { farmerApi } from '../farmerApi'
import { farmerReducer, initialFarmerState } from './farmerReducer'

const FarmerContext = createContext(null)

export function FarmerState({ children }) {
  const [state, dispatch] = useReducer(farmerReducer, initialFarmerState)

  const call = useCallback(async (key, request) => {
    dispatch({ type: 'REQUEST', key })
    try {
      const payload = await request()
      dispatch({ type: 'SUCCESS', key, payload })
      return payload
    } catch (error) {
      dispatch({ type: 'ERROR', key, error })
      throw error
    }
  }, [])

  const actions = useMemo(() => ({
    loadDashboard: () => call('dashboard', farmerApi.dashboard),
    loadQueue: () => call('queue', farmerApi.liveQueue),
    loadRecommendedSlots: (params) => call('recommendedSlots', () => farmerApi.recommendedSlots(params)),
    loadToken: (id) => call('token', () => farmerApi.token(id)),
    loadHistory: (id) => call('history', () => farmerApi.history(id)),
    loadPrices: (params) => call('prices', () => farmerApi.mspPrices(params)),
    loadSupport: () => call('support', farmerApi.supportInfo),
    createTicket: (payload) => call('ticket', () => farmerApi.createTicket(payload)),
    loadAdvisories: (params) => call('advisories', () => farmerApi.advisory(params)),
    // bookSlot: (payload) => call('booking', () => farmerApi.bookSlot(payload)),
    bookSlot: (payload) => {
    console.log("CONTEXT BOOK SLOT CALLED:", payload)

    return call('booking', () => {
      console.log("CALLING FARMER API BOOK SLOT")
      return farmerApi.bookSlot(payload)
    })
  },
  }), [call])

  const value = useMemo(() => ({ state, dispatch, api: farmerApi, actions }), [state, actions])
  return <FarmerContext.Provider value={value}>{children}</FarmerContext.Provider>
}

export const useFarmer = () => {
  const context = useContext(FarmerContext)
  if (!context) throw new Error('useFarmer must be used inside FarmerState')
  return context
}
