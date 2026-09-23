export const initialFarmerState = {
  loading: false,
  loadingByKey: {},
  error: null,
  errors: {},
  dashboard: null,
  queue: null,
  recommendedSlots: null,
  booking: null,
  token: null,
  history: null,
  prices: null,
  support: null,
  ticket: null,
  advisories: null,
}

export function farmerReducer(state, action) {
  switch (action.type) {
    case 'REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
        loadingByKey: { ...state.loadingByKey, [action.key]: true },
      }
    case 'SUCCESS':
      return {
        ...state,
        loading: Object.values({ ...state.loadingByKey, [action.key]: false }).some(Boolean),
        error: null,
        loadingByKey: { ...state.loadingByKey, [action.key]: false },
        errors: { ...state.errors, [action.key]: null },
        [action.key]: action.payload,
      }
    case 'ERROR':
      return {
        ...state,
        loading: Object.values({ ...state.loadingByKey, [action.key]: false }).some(Boolean),
        error: action.error,
        loadingByKey: { ...state.loadingByKey, [action.key]: false },
        errors: { ...state.errors, [action.key]: action.error },
      }
    case 'CLEAR_ERROR':
      return { ...state, error: null, errors: {} }
    default:
      return state
  }
}
