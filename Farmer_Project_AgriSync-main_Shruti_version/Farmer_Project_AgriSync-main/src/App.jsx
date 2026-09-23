import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import Auth from './pages/Auth.jsx'
import FarmerRouter from './router/farmer/FarmerRouter.jsx'
import MandiOperatorRouter from './router/mandi-operator/MandiOperatorRouter.jsx'
import GovernmentRouter from './router/government/GovernmentRouter.jsx'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import LanguageSelector from './components/LanguageSelector'
// import { getSession } from './api/client'
import { getSession, clearSession } from './api/client'

function roleFromUser(user) {
  if (user?.role === 'OPERATOR') return 'operator'
  if (user?.role === 'ADMIN') return 'government'
  return 'farmer'
}

function AppContent() {
  const [session, setSession] = useState(() => getSession())
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(session.token && session.user))
  const [role, setRole] = useState(() => roleFromUser(session.user))
  const { t } = useLanguage()

  const handleAuthSuccess = (_selectedRole, result) => {
    const nextSession = getSession()
    const user = result?.user || nextSession.user
    setSession({ token: result?.accessToken || nextSession.token, user })
    setRole(roleFromUser(user))
    setIsAuthenticated(true)
  }
  const handleLogout = () => {
    clearSession()
    setSession({ token: null, user: null })
    setRole('farmer')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) return <Auth onAuthSuccess={handleAuthSuccess} />


  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <motion.div className="brand-mark" animate={{ rotate: [0, -4, 4, 0] }} transition={{ duration: 4, repeat: Infinity }}>🌾</motion.div>
          
          <div><strong>KisanConnect</strong><span>Digital Procurement Platform</span></div>
        </div>
        <div className="top-actions">
          {(role === 'farmer' || role === 'operator') && <LanguageSelector />}
          <div className="top-profile"><span className="online-dot" />{session.user?.name || (role === 'farmer' ? t('farmer') : role === 'operator' ? t('operator') : t('government'))}</div>
        </div>
      </header>
      <AnimatePresence mode="wait">
        <motion.div key={role} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .22 }}>
          {
            role === 'farmer'
          ? <FarmerRouter onLogout={handleLogout} />
          : role === 'operator'
            ? <MandiOperatorRouter />
            : <GovernmentRouter />
          }
          
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return <LanguageProvider><AppContent /></LanguageProvider>
}
