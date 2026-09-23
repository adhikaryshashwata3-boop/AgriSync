import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import { mandiOperatorApi } from '../mandiOperatorApi'
import { initialMandiOperatorState, mandiOperatorReducer } from './mandiOperatorReducer'

const MandiOperatorContext = createContext(null)

export function MandiOperatorState({ children }) {
  const [state, dispatch] = useReducer(mandiOperatorReducer, initialMandiOperatorState)

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
    loadQueue: () => call('queue', mandiOperatorApi.queue),
    scanQrPass: (payload) => call('scan', () => mandiOperatorApi.scanQrPass(payload)),
    generateReceipt: (payload) => call('receipt', () => mandiOperatorApi.generateReceipt(payload)),
    loadPrices: (params) => call('prices', () => mandiOperatorApi.mspPrices(params)),
    loadAdvisories: (params) => call('advisories', () => mandiOperatorApi.advisory(params)),
  }), [call])

  const value = useMemo(() => ({ state, dispatch, api: mandiOperatorApi, actions }), [state, actions])
  return <MandiOperatorContext.Provider value={value}>{children}</MandiOperatorContext.Provider>
}

export const useMandiOperator = () => {
  const context = useContext(MandiOperatorContext)
  if (!context) throw new Error('useMandiOperator must be used inside MandiOperatorState')
  return context
}
