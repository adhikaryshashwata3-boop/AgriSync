import { useEffect,useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { AnimatePresence, motion } from 'framer-motion'

// import { farmerApi } from '../router/farmer/farmerApi'
import { useFarmer } from '../../router/farmer/state/FarmerContext'


import FarmerDashboard from './Farmer dashboard.jsx'
import BookSlot from './Book Slot.jsx'
import LiveQueue from './Live Queue.jsx'
import MSPPrices from './MSP Prices.jsx'
import History from './History.jsx'
import Support from './Support.jsx'

const msp = [
  ['Wheat', '₹2,585 / q'],
  ['Paddy (Common)', '₹2,369 / q'],
  ['Mustard', '₹6,200 / q'],
  ['Maize', '₹2,400 / q'],
]

export default function FarmerPortal({ onLogout }) {
  const { t } = useLanguage()
  const { state, actions } = useFarmer()
  const [page, setPage] = useState('dashboard')
  const [booked, setBooked] = useState(false)
  const [activeToken, setActiveToken] = useState(null)

  const [crop, setCrop] = useState('Wheat')
  const [qty, setQty] = useState('25')
  const [quantityUnit, setQuantityUnit] = useState('quintals')
  const [slot, setSlot] = useState('10:30 AM')

  const [toast, setToast] = useState('')

const queue = state.queue
const queueToken = queue?.myToken

const token =
  queueToken?.tokenId ||
  activeToken?.id ||
  null

const ahead =
  queueToken?.queuePosition != null
    ? Math.max(0, queueToken.queuePosition - 1)
    : 0

const wait =
  queueToken?.waitMinutes ?? 0

const displayWait =
  typeof wait === 'string'
    ? wait.replace(/\s*min\s*$/i, '')
    : wait
  
useEffect(() => {
  actions.loadDashboard().catch(error => {
    console.error('Failed to load farmer dashboard:', error)
  })

  actions.loadQueue().catch(error => {
    console.error('Failed to load farmer queue:', error)
  })
}, [actions])

  const dashboard = state.dashboard

  const dashboardToken = dashboard?.activeToken

  const dashboardFarmerName = dashboard?.farmer?.name || 'Farmer'

  const dashboardMandiName =
    dashboardToken?.mandiName || 'No mandi selected'

  const dashboardTokenId =
    dashboardToken?.tokenId || activeToken?.id || null

  const dashboardCrop =
    dashboardToken?.cropType || crop || null

  const dashboardQuantity =
    dashboardToken?.quantity ?? null

  const dashboardSlot = dashboardToken
    ? `${dashboardToken.slotStart?.slice(0, 5) || ''} - ${dashboardToken.slotEnd?.slice(0, 5) || ''}`
    : slot

  const dashboardAhead =
    dashboard?.farmersAhead ?? 0

  const dashboardWait =
    dashboard?.estimatedWaitMinutes ?? 0

  const dashboardDate = dashboardToken?.procurementDate || null

  const notify = message => {
    setToast(message)

    setTimeout(() => {
      setToast('')
    }, 2400)
  }
  const handleBookRequest = async (payload) => {
    console.log("PORTAL BOOK REQUEST:", payload)

    const result = await actions.bookSlot(payload)

    console.log("PORTAL BOOK RESULT:", result)

    return result
  }

  const book = async (serverToken) => {
    setBooked(true)

    if (serverToken) {
      setActiveToken(serverToken)
    }

    const unitNames = {
      kg: 'kg',
      quintals: 'quintals',
      tonnes: 'tonnes',
    }

    notify(
      `Slot booked successfully • Token ${serverToken?.tokenId || serverToken?.id || ''} • ${qty} ${unitNames[quantityUnit]}`
    )

    await actions.loadQueue()
    await actions.loadDashboard()

    setPage('queue')
  }

  const nav = [
    ['dashboard', '⌂', 'Dashboard'],
    ['book', '▣', 'Book Slot'],
    ['queue', '☷', 'Live Queue'],
    ['history', '◷', 'History'],
    ['msp', '₹', 'MSP Prices'],
    ['support', '?', 'Support'],
  ]

  const pages = {
    dashboard: (
      <FarmerDashboard
        token={dashboardTokenId}
        slot={dashboardSlot}
        date={dashboardDate}
        ahead={dashboardAhead}
        wait={dashboardWait}
        farmerName={dashboardFarmerName}
        mandiName={dashboardMandiName}
        cropType={dashboardCrop}
        quantity={dashboardQuantity}
        onNavigate={setPage}
        msp={msp}
      />
    ),

    book: (
      <BookSlot
        crop={crop}
        setCrop={setCrop}
        qty={qty}
        setQty={setQty}
        slot={slot}
        setSlot={setSlot}
        onBook={book}
        onBookRequest={handleBookRequest}
      />
    ),

    queue: (
    <LiveQueue
      token={token}
      ahead={ahead}
      wait={displayWait}
      queue={queue}
      onRefresh={async () => {
        await actions.loadQueue()
        notify('Queue refreshed successfully')
      }}
  />
    ),

    history: <History />,

    msp: <MSPPrices />,

    support: <Support />,
  }

  return (
    <div className="portal farmer-portal">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="side-heading">
          <span
            onClick={() => setPage('dashboard')}
            style={{ cursor: 'pointer' }}
          >
            KisanConnect 
          </span>
          <small>{t('farmer')} Portal</small>
        </div>

        <div className="sidebar-nav">
          {nav.map(([id, icon, label]) => (
            <button
              key={id}
              className={page === id ? 'selected' : ''}
              onClick={() => setPage(id)}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>

        <div className="sidebar-note">
          <strong>{t('needHelp')}</strong>
          <span>{t('call')}</span>
        </div>

        <button type="button" className="sidebar-logout" onClick={onLogout}>
          <span>↪</span>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {pages[page]}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}