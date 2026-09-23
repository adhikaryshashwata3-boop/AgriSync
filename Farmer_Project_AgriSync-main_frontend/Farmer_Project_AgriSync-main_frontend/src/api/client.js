const configuredBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
const API_BASE_URL = configuredBase.replace(/\/$/, '').replace(/\/v1$/, '')

export class ApiError extends Error {
  constructor(message, status = 0, payload = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

export async function apiRequest(path, { method = 'GET', body, headers = {}, signal } = {}) {
  const token = localStorage.getItem('agrisync-access-token')
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  let response
  try {
    console.log("API REQUEST URL:", `${API_BASE_URL}${cleanPath}`);
    console.log("API REQUEST BODY:", body);
    response = await fetch(`${API_BASE_URL}${cleanPath}`, {
      method,
      signal,
      headers: {
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch (error) {
    if (error?.name === 'AbortError') throw error
    throw new ApiError(
      `Cannot connect to AGRISync backend at ${API_BASE_URL}. Make sure the backend is running on port 5000.`,
      0,
      { cause: error?.message },
    )
  }

  let payload = null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      payload = await response.json()
    } catch {
      payload = null
    }
  } else {
    const text = await response.text().catch(() => '')
    payload = text ? { success: false, message: text } : null
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('agrisync-access-token')
      localStorage.removeItem('agrisync-user')
    }
    throw new ApiError(
      payload?.message || `Request failed with status ${response.status}`,
      response.status,
      payload,
    )
  }

  return payload
}

// Authentication gateway. The supplied backend authenticates with `phone`.
export const apiLogin = (identifier, password) =>
  apiRequest('/auth/login', {
    method: 'POST',
    body: {
      phone: identifier.trim(),
      password,
    },
  })

export const apiSignupFarmer = (data) =>
  apiRequest('/farmer/signup', { method: 'POST', body: data })

export const apiFarmerDashboard = () => apiRequest('/farmer/dashboard')
export const apiBookSlot = (data) => apiRequest('/farmer/book-slot', { method: 'POST', body: data })
export const apiLiveQueue = () => apiRequest('/farmer/live-queue')
export const apiRecommendedSlots = (params) =>
  apiRequest(`/farmer/recommended-slots${params ? `?${new URLSearchParams(params)}` : ''}`)
export const apiToken = (id) => apiRequest(`/farmer/token/${encodeURIComponent(id)}`)
export const apiMspPrices = (params) =>
  apiRequest(`/market/msp-prices${params ? `?${new URLSearchParams(params)}` : ''}`)
export const apiHistory = (farmerId) => apiRequest(`/farmer/history/${encodeURIComponent(farmerId)}`)
export const apiSupportInfo = () => apiRequest('/farmer/support-info')
export const apiCreateTicket = (data) => apiRequest('/farmer/ticket', { method: 'POST', body: data })

export const apiOperatorQueue = () => apiRequest('/operator/queue')
export const apiScanQr = (data) => apiRequest('/mandi/scan-qr-pass', { method: 'POST', body: data })
export const apiGenerateReceipt = (data) =>
  apiRequest('/procurement/generate-receipt', { method: 'POST', body: data })

export const apiStateDashboard = () => apiRequest('/admin/state-dashboard')
export const apiAuditLedger = () => apiRequest('/admin/audit-ledger')
export const apiAdvisories = (params) =>
  apiRequest(`/market/advisory${params ? `?${new URLSearchParams(params)}` : ''}`)
export const apiVerifyReceipt = (data) =>
  apiRequest('/procurement/verify-receipt', { method: 'POST', body: data })
export const apiLocalization = (lang = 'en') =>
  apiRequest(`/system/localization?lang=${encodeURIComponent(lang)}`)

export function saveSession({ accessToken, user }) {
  localStorage.setItem('agrisync-access-token', accessToken)
  localStorage.setItem('agrisync-user', JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem('agrisync-access-token')
  localStorage.removeItem('agrisync-user')
}

export function getSession() {
  try {
    return {
      token: localStorage.getItem('agrisync-access-token'),
      user: JSON.parse(localStorage.getItem('agrisync-user') || 'null'),
    }
  } catch {
    return { token: null, user: null }
  }
}

export { API_BASE_URL }
