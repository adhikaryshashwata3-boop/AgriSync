import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { AnimatePresence, motion } from 'framer-motion'

import LiveQueue from './Live Queue.jsx'
import GateScan from './Gate Scan.jsx'
import QualityCheck from './Quality Check.jsx'
import Weighbridge from './Weighbridge.jsx'
import Payments from './Payments.jsx'
import Analytics from './Analytics.jsx'
import HelpForGovt from './helpforGovt.jsx'

const seed = [
  ['TK-1081', 'Kahan Namer', 'Wheat', '50 q', 'Verified'],
  ['TK-1082', 'R. Kumar', 'Wheat', '50 q', 'Verified'],
  ['TK-1083', 'Boghal Namar', 'Paddy', '35 q', 'Inspecting'],
  ['TK-1084', 'Nurhar Raner', 'Wheat', '10 q', 'Verified'],
  ['TK-1085', 'Rovari Kingar', 'Paddy', '10 q', 'Verified'],
]

export default function MandiOperatorPortal({ onLogout }) {
  const { t } = useLanguage()
  const [page, setPage] = useState('queue')

  const [gross, setGross] = useState('7250')
  const [tare, setTare] = useState('2250')
  const [grade, setGrade] = useState('A')
  const [toast, setToast] = useState('')

  const notify = (message) => {
    setToast(message)

    setTimeout(() => {
      setToast('')
    }, 2400)
  }

  const net = Math.max(
    0,
    Number(gross || 0) - Number(tare || 0)
  )

  const quantity = net / 100

  const proceed = (message, nextPage) => {
    notify(message)
    setPage(nextPage)
  }

  /*
   * SIDEBAR NAVIGATION
   * Help for Government has been added as the 7th page.
   */
  const nav = [
    ['queue', '▦', t('liveQueue')],
    ['gate', '⌗', t('gate')],
    ['quality', '✓', t('quality')],
    ['weighbridge', '⚖', t('weighbridge')],
    ['payments', '₹', t('payments')],
    ['analytics', '▥', t('analytics')],
    ['helpGovt', '?', t('helpGovt')],
  ]

  /*
   * PAGE CONTENT
   */
  const pages = {
    queue: (
      <LiveQueue
        rows={seed}
        onAction={setPage}
        onRefresh={() => notify('Queue refreshed')}
        onToast={notify}
      />
    ),

    gate: (
      <GateScan
        onProceed={() =>
          proceed(
            'Token verified successfully.',
            'quality'
          )
        }
      />
    ),

    quality: (
      <QualityCheck
        grade={grade}
        setGrade={setGrade}
        onProceed={() =>
          proceed(
            `Grade ${grade} approved.`,
            'weighbridge'
          )
        }
      />
    ),

    weighbridge: (
      <Weighbridge
        gross={gross}
        tare={tare}
        setGross={setGross}
        setTare={setTare}
        onToast={notify}
        onProceed={() =>
          proceed(
            'Transaction certified.',
            'payments'
          )
        }
      />
    ),

    payments: (
      <Payments
        quantity={quantity}
        onToast={notify}
      />
    ),

    analytics: <Analytics />,

    /*
     * NEW GOVERNMENT HELP PAGE
     */
    helpGovt: (
      <HelpForGovt
        onToast={notify}
      />
    ),
  }

  return (
    <div className="portal operator-portal">

      {/* =========================
          SIDEBAR
      ========================== */}
      <aside className="sidebar">

        <div className="side-heading">
          {t('operator')}
        </div>

        {nav.map(([id, icon, label]) => (
          <button
            key={id}
            className={
              page === id
                ? 'selected'
                : ''
            }
            onClick={() => setPage(id)}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}

        <div className="sidebar-note">
          <strong>● {t('systemOnline')}</strong>
          <span>All mandi services active</span>
        </div>

        <button type="button" className="sidebar-logout" onClick={onLogout}>
          <span>↪</span>
          Logout
        </button>

      </aside>

      {/* =========================
          MAIN CONTENT
      ========================== */}
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

      {/* =========================
          TOAST
      ========================== */}
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
        >
          {toast}
        </motion.div>
      )}

    </div>
  )
}