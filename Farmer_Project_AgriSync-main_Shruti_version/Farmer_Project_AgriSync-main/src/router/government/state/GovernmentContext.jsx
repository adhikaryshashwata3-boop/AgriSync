import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import { governmentApi } from '../governmentApi'
import { governmentReducer, initialGovernmentState } from './governmentReducer'

const GovernmentContext = createContext(null)

export function GovernmentState({ children }) {
  const [state, dispatch] = useReducer(governmentReducer, initialGovernmentState)

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
    loadDashboard: () => call('dashboard', governmentApi.stateDashboard),
    loadAudit: () => call('audit', governmentApi.auditLedger),
    loadPrices: (params) => call('prices', () => governmentApi.mspPrices(params)),
    loadAdvisories: (params) => call('advisories', () => governmentApi.advisories(params)),
    generateReceipt: (payload) => call('procurement', () => governmentApi.generateReceipt(payload)),
    verifyReceipt: (payload) => call('verification', () => governmentApi.verifyReceipt(payload)),
  }), [call])

  const value = useMemo(() => ({ state, dispatch, api: governmentApi, actions }), [state, actions])
  return <GovernmentContext.Provider value={value}>{children}</GovernmentContext.Provider>
}

export const useGovernment = () => {
  const context = useContext(GovernmentContext)
  if (!context) throw new Error('useGovernment must be used inside GovernmentState')
  return context
}
