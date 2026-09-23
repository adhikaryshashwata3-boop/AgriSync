import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './_Card'


function Icon({ name, size = 24 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  if (name === 'phone') {
    return (
      <svg {...common}>
        <path d="M6.7 3.5h2.1l1.3 4-1.8 1.7a15.5 15.5 0 0 0 6.5 6.5l1.7-1.8 4 1.3v2.1c0 1.1-.9 2-2 2C11.1 19.3 4.7 12.9 4.7 5.5c0-1.1.9-2 2-2Z" />
      </svg>
    )
  }

  if (name === 'calendar') {
    return (
      <svg {...common}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 9h16" />
        <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
      </svg>
    )
  }

  if (name === 'check') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </svg>
    )
  }

  if (name === 'arrow') {
    return (
      <svg {...common}>
        <path d="M5 12h13" />
        <path d="m13 7 5 5-5 5" />
      </svg>
    )
  }

  if (name === 'clock') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    )
  }

  if (name === 'message') {
    return (
      <svg {...common}>
        <path d="M5 5h14v10H9l-4 4V5Z" />
        <path d="M8 9h8M8 12h5" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}

export default function Support({ support = null }) {
  const [activeSupport, setActiveSupport] = useState(null)
  const helpline = support?.helpline
  const items = support ? [
    { icon: 'phone', title: helpline?.title || 'Farmer Helpline', main: helpline?.number || '—', sub: helpline?.available || 'Support', description: 'Get assistance with procurement, mandi processes, token status, and general farmer queries.' },
    { icon: 'calendar', title: support.procurementHelp?.title || 'Slot Assistance', main: 'Booking & Rescheduling', sub: 'Guidance available', description: support.procurementHelp?.description || 'Guidance for procurement slot and token support.' },
    { icon: 'check', title: support.paymentSupport?.title || 'Payment Support', main: 'Payment Status', sub: 'Transaction assistance', description: support.paymentSupport?.description || 'Assistance with procurement payment status.' },
  ] : []

  const openAssistance = item => {
    setActiveSupport(item)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '8px 0 50px',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 30,
          paddingBottom: 25,
          marginBottom: 28,
          borderBottom: '1px solid rgba(23,37,27,.12)',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              marginBottom: 10,
              color: '#68766c',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 1.5,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#207030',
                boxShadow: '0 0 0 5px rgba(32,112,48,.10)',
              }}
            />
            HELP CENTER
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1,
              letterSpacing: '-1.8px',
              color: '#17251b',
            }}
          >
            Farmer Support
          </h1>

          <p
            style={{
              margin: '14px 0 0',
              maxWidth: 700,
              color: '#68766c',
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            Get help with slots, queue status, quality checks, payments,
            and procurement whenever you need it.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '11px 16px',
            borderRadius: 999,
            background: '#f3f8f1',
            border: '1px solid rgba(32,112,48,.18)',
            color: '#207030',
            fontSize: 13,
            fontWeight: 800,
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#207030',
            }}
          />
          Support available
        </div>
      </div>

      {/* QUICK HELP STRIP */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'rgba(23,37,27,.12)',
          border: '1px solid rgba(23,37,27,.12)',
          marginBottom: 30,
        }}
      >
        {[
          ['01', 'Choose a topic', 'Select the type of assistance you need.'],
          ['02', 'Contact support', 'Get the relevant guidance for your issue.'],
          ['03', 'Resolve your query', 'Follow the recommended next steps.'],
        ].map(([number, title, text], i) => (
          <motion.div
            key={number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ backgroundColor: '#f5f8f2' }}
            style={{
              background: '#fff',
              padding: '20px 24px',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 900,
                color: '#207030',
                letterSpacing: 1,
              }}
            >
              {number}
            </div>

            <div
              style={{
                marginTop: 7,
                fontSize: 15,
                fontWeight: 800,
                color: '#17251b',
              }}
            >
              {title}
            </div>

            <div
              style={{
                marginTop: 4,
                color: '#7b877e',
                fontSize: 12,
                lineHeight: 1.5,
              }}
            >
              {text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* SUPPORT OPTIONS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card>
              <div
                style={{
                  minHeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* ICON */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 14,
                    background: '#eef5e9',
                    color: '#207030',
                    marginBottom: 20,
                  }}
                >
                  <Icon name={item.icon} size={25} />
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: '#8a958d',
                    fontWeight: 800,
                    letterSpacing: 1,
                  }}
                >
                  SUPPORT SERVICE
                </div>

                <h2
                  style={{
                    margin: '7px 0 10px',
                    fontSize: 22,
                    color: '#17251b',
                    letterSpacing: '-.4px',
                  }}
                >
                  {item.title}
                </h2>

                <strong
                  style={{
                    display: 'block',
                    fontSize: 19,
                    color: '#207030',
                  }}
                >
                  {item.main}
                </strong>

                <div
                  style={{
                    marginTop: 5,
                    color: '#68766c',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {item.sub}
                </div>

                <p
                  style={{
                    margin: '16px 0 0',
                    color: '#7b877e',
                    fontSize: 13,
                    lineHeight: 1.65,
                  }}
                >
                  {item.description}
                </p>

                <div style={{ flex: 1 }} />

                <motion.button
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openAssistance(item)}
                  style={{
                    width: '100%',
                    marginTop: 22,
                    padding: '13px 16px',
                    border: '1px solid rgba(32,112,48,.22)',
                    background: '#f5f8f2',
                    color: '#207030',
                    borderRadius: 9,
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  Get assistance
                  <Icon name="arrow" size={17} />
                </motion.button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CONTACT INFORMATION */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 20,
          marginTop: 20,
        }}
      >
        <Card>
          <div
            style={{
              display: 'flex',
              gap: 18,
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 12,
                background: '#eef5e9',
                color: '#207030',
              }}
            >
              <Icon name="phone" size={23} />
            </div>

            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 850,
                  letterSpacing: 1,
                  color: '#8a958d',
                }}
              >
                FARMER HELPLINE
              </div>

              <h3
                style={{
                  margin: '6px 0 4px',
                  fontSize: 23,
                  color: '#17251b',
                }}
              >
                1800-000-2026
              </h3>

              <p
                style={{
                  margin: 0,
                  color: '#68766c',
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                For procurement support, slot assistance, queue questions,
                and general farmer queries.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div
            style={{
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 12,
                background: '#f6f1df',
                color: '#8a701e',
              }}
            >
              <Icon name="clock" size={23} />
            </div>

            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 850,
                  letterSpacing: 1,
                  color: '#8a958d',
                }}
              >
                SUPPORT STATUS
              </div>

              <h3
                style={{
                  margin: '6px 0 4px',
                  fontSize: 18,
                  color: '#17251b',
                }}
              >
                Assistance available
              </h3>

              <p
                style={{
                  margin: 0,
                  color: '#68766c',
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                Select a support category above to view the available
                assistance.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeSupport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSupport(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(17,28,20,.48)',
              display: 'grid',
              placeItems: 'center',
              padding: 20,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: 'min(520px, 100%)',
                background: '#fff',
                borderRadius: 18,
                padding: 30,
                boxShadow: '0 25px 70px rgba(0,0,0,.18)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 20,
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 13,
                    background: '#eef5e9',
                    color: '#207030',
                  }}
                >
                  <Icon name={activeSupport.icon} size={24} />
                </div>

                <button
                  onClick={() => setActiveSupport(null)}
                  style={{
                    border: 0,
                    background: '#f2f4f1',
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    color: '#536057',
                    fontSize: 18,
                  }}
                >
                  ×
                </button>
              </div>

              <div
                style={{
                  marginTop: 22,
                  fontSize: 11,
                  fontWeight: 850,
                  letterSpacing: 1.2,
                  color: '#8a958d',
                }}
              >
                SUPPORT REQUEST
              </div>

              <h2
                style={{
                  margin: '7px 0 8px',
                  fontSize: 27,
                  color: '#17251b',
                }}
              >
                {activeSupport.title}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: '#68766c',
                  lineHeight: 1.65,
                  fontSize: 14,
                }}
              >
                {activeSupport.description}
              </p>

              <div
                style={{
                  marginTop: 22,
                  padding: 17,
                  background: '#f5f8f2',
                  border: '1px solid rgba(32,112,48,.12)',
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: '#7b877e',
                    fontWeight: 800,
                    letterSpacing: 0.8,
                  }}
                >
                  CONTACT / NEXT STEP
                </div>

                <strong
                  style={{
                    display: 'block',
                    marginTop: 6,
                    fontSize: 17,
                    color: '#207030',
                  }}
                >
                  {activeSupport.main}
                </strong>

                <span
                  style={{
                    display: 'block',
                    marginTop: 4,
                    color: '#68766c',
                    fontSize: 12,
                  }}
                >
                  {activeSupport.sub}
                </span>
              </div>

              <button
                onClick={() => setActiveSupport(null)}
                style={{
                  width: '100%',
                  marginTop: 20,
                  padding: '14px 18px',
                  border: 0,
                  borderRadius: 9,
                  background: '#207030',
                  color: '#fff',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                Close assistance
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}