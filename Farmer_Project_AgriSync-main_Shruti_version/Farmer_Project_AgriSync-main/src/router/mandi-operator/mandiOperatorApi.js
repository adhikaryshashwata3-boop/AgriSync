import { apiRequest } from '../../api/client'

// Mandi Operator frontend gateway. Every method maps directly to an existing backend endpoint.
export const mandiOperatorApi = {
  queue: (signal) => apiRequest('/operator/queue', { signal }),
  scanQrPass: (payload, signal) => apiRequest('/mandi/scan-qr-pass', { method: 'POST', body: payload, signal }),
  generateReceipt: (payload, signal) => apiRequest('/procurement/generate-receipt', { method: 'POST', body: payload, signal }),
  mspPrices: (params, signal) => apiRequest(`/market/msp-prices${params ? `?${new URLSearchParams(params)}` : ''}`, { signal }),
  advisory: (params, signal) => apiRequest(`/market/advisory${params ? `?${new URLSearchParams(params)}` : ''}`, { signal }),
}
