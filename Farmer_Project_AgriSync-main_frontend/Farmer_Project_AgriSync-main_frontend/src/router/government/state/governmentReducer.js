export const initialGovernmentState = {
  loading: false,
  loadingByKey: {},
  error: null,
  errors: {},
  dashboard: null,
  audit: null,
  prices: null,
  advisories: null,
  procurement: null,
  verification: null,
}

export function governmentReducer(state, action) {
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
