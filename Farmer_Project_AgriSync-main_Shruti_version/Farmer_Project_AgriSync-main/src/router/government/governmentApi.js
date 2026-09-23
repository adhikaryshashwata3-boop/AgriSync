import { apiRequest } from '../../api/client'

// Government frontend gateway. Every method maps directly to an existing backend endpoint.
export const governmentApi = {
  stateDashboard: (signal) => apiRequest('/admin/state-dashboard', { signal }),
  auditLedger: (signal) => apiRequest('/admin/audit-ledger', { signal }),
  mspPrices: (params, signal) => apiRequest(`/market/msp-prices${params ? `?${new URLSearchParams(params)}` : ''}`, { signal }),
  advisories: (params, signal) => apiRequest(`/market/advisory${params ? `?${new URLSearchParams(params)}` : ''}`, { signal }),
  generateReceipt: (payload, signal) => apiRequest('/procurement/generate-receipt', { method: 'POST', body: payload, signal }),
  verifyReceipt: (payload, signal) => apiRequest('/procurement/verify-receipt', { method: 'POST', body: payload, signal }),
}
