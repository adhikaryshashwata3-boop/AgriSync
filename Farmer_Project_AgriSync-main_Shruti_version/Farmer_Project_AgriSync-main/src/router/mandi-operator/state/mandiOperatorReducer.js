export const initialMandiOperatorState = {
  loading: false,
  loadingByKey: {},
  error: null,
  errors: {},
  queue: null,
  scan: null,
  receipt: null,
  prices: null,
  advisories: null,
}

export function mandiOperatorReducer(state, action) {
  switch (action.type) {
    case 'REQUEST':
      return { ...state, loading: true, error: null, loadingByKey: { ...state.loadingByKey, [action.key]: true } }
    case 'SUCCESS':
      return { ...state, loading: Object.values({ ...state.loadingByKey, [action.key]: false }).some(Boolean), error: null, loadingByKey: { ...state.loadingByKey, [action.key]: false }, errors: { ...state.errors, [action.key]: null }, [action.key]: action.payload }
    case 'ERROR':
      return { ...state, loading: Object.values({ ...state.loadingByKey, [action.key]: false }).some(Boolean), error: action.error, loadingByKey: { ...state.loadingByKey, [action.key]: false }, errors: { ...state.errors, [action.key]: action.error } }
    default:
      return state
  }
}
