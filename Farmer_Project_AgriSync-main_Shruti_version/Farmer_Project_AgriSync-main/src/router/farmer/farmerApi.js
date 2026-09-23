import { apiRequest } from '../../api/client'

// Farmer frontend gateway. Every method maps directly to an existing backend endpoint.
export const farmerApi = {
  dashboard: (signal) => apiRequest('/farmer/dashboard', { signal }),
  liveQueue: (signal) => apiRequest('/farmer/live-queue', { signal }),
  recommendedSlots: (params, signal) => apiRequest(`/farmer/recommended-slots${params ? `?${new URLSearchParams(params)}` : ''}`, { signal }),
  recommendedMandis: (params, signal) =>
  apiRequest(`/farmer/recommended-mandis${params ? `?${new URLSearchParams(params)}` : ''}`, { signal }),

  bookSlot: async (payload, signal) => {
  console.log("FARMER API BOOK SLOT PAYLOAD:", payload)

  const result = await apiRequest('/farmer/book-slot', {
    method: 'POST',
    body: payload,
    signal,
  })

  console.log("FARMER API BOOK SLOT RESULT:", result)

  return result
},
  token: (id, signal) => apiRequest(`/farmer/token/${encodeURIComponent(id)}`, { signal }),
  history: (farmerId, signal) => apiRequest(`/farmer/history/${encodeURIComponent(farmerId)}`, { signal }),
  supportInfo: (signal) => apiRequest('/farmer/support-info', { signal }),
  createTicket: (payload, signal) => apiRequest('/farmer/ticket', { method: 'POST', body: payload, signal }),
  mspPrices: (params, signal) => apiRequest(`/market/msp-prices${params ? `?${new URLSearchParams(params)}` : ''}`, { signal }),
  advisory: (params, signal) => apiRequest(`/market/advisory${params ? `?${new URLSearchParams(params)}` : ''}`, { signal }),
}
