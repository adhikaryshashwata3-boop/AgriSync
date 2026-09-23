import { motion, AnimatePresence } from 'framer-motion'
import Card from './_Card'

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const icons = {
    qr: (
      <>
        <path d="M4 4h6v6H4z" />
        <path d="M14 4h6v6h-6z" />
        <path d="M4 14h6v6H4z" />
        <path d="M14 14h2v2h-2z" />
        <path d="M18 14h2v6h-2z" />
        <path d="M14 18h4" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 11a8 8 0 0 0-14.9-4" />
        <path d="M4 4v4h4" />
        <path d="M4 13a8 8 0 0 0 14.9 4" />
        <path d="M20 20v-4h-4" />
      </>
    ),
    swap: (
      <>
        <path d="M7 7h12l-3-3" />
        <path d="M17 17H5l3 3" />
      </>
    ),
    alert: (
      <>
        <path d="M10.3 4.5 2.7 18a1.5 1.5 0 0 0 1.3 2.2h16a1.5 1.5 0 0 0 1.3-2.2L13.7 4.5a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    users: (
      <>
        <path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" />
        <circle cx="9.5" cy="7.5" r="3.5" />
        <path d="M17 11a3.5 3.5 0 0 0 0-7" />
        <path d="M17 14.5h.5a4 4 0 0 1 4 4V20" />
      </>
    ),
    money: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M7 9h.01M17 15h.01" />
      </>
    ),
  }

  return <svg {...common}>{icons[name] || icons.arrow}</svg>
}

const defaultRows = [
  {
    token: 'AG-1024',
    farmer: 'Ramesh Kumar',
    crop: 'Wheat',
    arrival: '09:42 AM',
    status: 'Waiting',
    wait: '12 min',
  },
  {
    token: 'AG-1025',
    farmer: 'Sanjay Das',
    crop: 'Paddy',
    arrival: '09:47 AM',
    status: 'Quality Check',
    wait: '8 min',
  },
  {
    token: 'AG-1026',
    farmer: 'Anita Devi',
    crop: 'Maize',
    arrival: '09:51 AM',
    status: 'Verified',
    wait: '4 min',
  },
  {
    token: 'AG-1027',
    farmer: 'Mohan Singh',
    crop: 'Wheat',
    arrival: '09:58 AM',
    status: 'Waiting',
    wait: '2 min',
  },
  {
    token: 'AG-1028',
    farmer: 'Priya Sharma',
    crop: 'Paddy',
    arrival: '10:03 AM',
    status: 'Quality Check',
    wait: '1 min',
  },
]

const statusClass = {
  Waiting: 'waiting',
  'Quality Check': 'checking',
  Verified: 'verified',
}

export default function LiveQueue({
  rows = defaultRows,
  onAction,
  onRefresh,
  onToast,
}) {
  const queueRows = rows?.length ? rows : defaultRows

  const handleAction = (action) => {
    if (onAction) {
      onAction(action)
    } else if (onToast) {
      onToast(`${action} action opened`)
    }
  }

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh()
    } else if (onToast) {
      onToast('Queue refreshed')
    }
  }

  const handleToast = (message) => {
    if (onToast) onToast(message)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        width: '100%',
        fontSize: 15,
      }}
    >
      {/* HEADER */}
      <div
        className="page-heading"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
          marginBottom: 24,
        }}
      >
        <div>
          <small
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '1.5px',
              opacity: 0.65,
            }}
          >
            MANDI CONTROL ROOM • LIVE OPERATIONS
          </small>

          <h1
            style={{
              fontSize: 40,
              lineHeight: 1.05,
              margin: '7px 0 9px',
              fontWeight: 850,
              letterSpacing: '-1px',
            }}
          >
            Live Queue
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: 16,
              opacity: 0.72,
              maxWidth: 620,
            }}
          >
            Keep farmer movement smooth, reduce unnecessary waiting, and
            process arrivals in the right order.
          </p>
        </div>

        <motion.button
          className="primary"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleAction('gate')}
          style={{
            minHeight: 48,
            padding: '12px 19px',
            fontSize: 15,
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            whiteSpace: 'nowrap',
          }}
        >
          <Icon name="qr" size={19} />
          Scan QR Slot
        </motion.button>
      </div>

      {/* LIVE STATUS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.08 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '13px 17px',
          marginBottom: 18,
          borderRadius: 14,
          background: 'rgba(34, 116, 58, 0.08)',
          border: '1px solid rgba(34, 116, 58, 0.16)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#29934c',
              boxShadow: '0 0 0 5px rgba(41,147,76,.12)',
              display: 'inline-block',
            }}
          />
          Live queue is active
        </div>

        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            opacity: 0.6,
          }}
        >
          Last updated just now
        </span>
      </motion.div>

      {/* KPI CARDS */}
      <div
        className="operator-stats"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 14,
          marginBottom: 18,
        }}
      >
        {[
          ['24', 'Farmers today', 'users'],
          ['7', 'In queue', 'clock'],
          ['18 min', 'Avg. waiting', 'clock'],
          ['₹8.4L', 'Procurement value', 'money'],
        ].map(([value, label, icon], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ y: -3 }}
            style={{
              padding: '18px 19px',
              borderRadius: 16,
              background: '#fff',
              border: '1px solid rgba(20,45,28,.09)',
              boxShadow: '0 8px 25px rgba(17, 35, 22, .055)',
              minHeight: 105,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 29,
                  lineHeight: 1,
                  fontWeight: 850,
                }}
              >
                {value}
              </span>

              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 11,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'rgba(32,112,48,.08)',
                  color: '#28723a',
                }}
              >
                <Icon name={icon} size={19} />
              </span>
            </div>

            <span
              style={{
                fontSize: 14,
                fontWeight: 650,
                opacity: 0.62,
              }}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* QUEUE + QUICK ACTIONS */}
      <div
        className="operator-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 285px',
          gap: 16,
          alignItems: 'stretch',
        }}
      >
        {/* QUEUE TABLE */}
        <Card>
          <div
            className="card-heading"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 21,
                  fontWeight: 820,
                }}
              >
                Live procurement queue
              </h3>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: 14,
                  opacity: 0.62,
                }}
              >
                Priority and farmer status update continuously.
              </p>
            </div>

            <motion.button
              className="secondary small"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleRefresh}
              style={{
                minHeight: 40,
                padding: '9px 14px',
                fontSize: 14,
                fontWeight: 750,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              <Icon name="refresh" size={17} />
              Refresh
            </motion.button>
          </div>

          <div
            className="table-wrap"
            style={{
              overflowX: 'auto',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: 760,
              }}
            >
              <thead>
                <tr>
                  {[
                    'Token',
                    'Farmer',
                    'Crop',
                    'Arrival',
                    'Status',
                    'Wait',
                    'Action',
                  ].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        textAlign: 'left',
                        padding: '11px 10px',
                        fontSize: 12,
                        letterSpacing: '.6px',
                        textTransform: 'uppercase',
                        opacity: 0.52,
                        borderBottom: '1px solid rgba(20,45,28,.09)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <AnimatePresence initial={false}>
                  {queueRows.map((row, index) => (
                    <motion.tr
                      key={row.token || `${row.farmer}-${index}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.045 }}
                      whileHover={{
                        backgroundColor: 'rgba(32,112,48,.025)',
                      }}
                    >
                      <td
                        style={{
                          padding: '15px 10px',
                          fontWeight: 800,
                          fontSize: 14,
                          borderBottom:
                            '1px solid rgba(20,45,28,.065)',
                        }}
                      >
                        {row.token || row.id || `AG-${1024 + index}`}
                      </td>

                      <td
                        style={{
                          padding: '15px 10px',
                          fontWeight: 720,
                          fontSize: 14,
                          borderBottom:
                            '1px solid rgba(20,45,28,.065)',
                        }}
                      >
                        {row.farmer || row.name || 'Farmer'}
                      </td>

                      <td
                        style={{
                          padding: '15px 10px',
                          fontSize: 14,
                          borderBottom:
                            '1px solid rgba(20,45,28,.065)',
                        }}
                      >
                        {row.crop || row.commodity || 'Wheat'}
                      </td>

                      <td
                        style={{
                          padding: '15px 10px',
                          fontSize: 14,
                          whiteSpace: 'nowrap',
                          borderBottom:
                            '1px solid rgba(20,45,28,.065)',
                        }}
                      >
                        {row.arrival || row.time || '10:00 AM'}
                      </td>

                      <td
                        style={{
                          padding: '15px 10px',
                          borderBottom:
                            '1px solid rgba(20,45,28,.065)',
                        }}
                      >
                        <span
                          className={`status ${statusClass[row.status] || ''}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '6px 9px',
                            borderRadius: 999,
                            fontSize: 12,
                            fontWeight: 800,
                            whiteSpace: 'nowrap',
                            background:
                              row.status === 'Verified'
                                ? 'rgba(32,112,48,.1)'
                                : row.status === 'Quality Check'
                                  ? 'rgba(219,165,57,.14)'
                                  : 'rgba(100,110,105,.10)',
                            color:
                              row.status === 'Verified'
                                ? '#27743a'
                                : row.status === 'Quality Check'
                                  ? '#9a7017'
                                  : '#626a65',
                          }}
                        >
                          {row.status || 'Waiting'}
                        </span>
                      </td>

                      <td
                        style={{
                          padding: '15px 10px',
                          fontSize: 14,
                          fontWeight: 750,
                          whiteSpace: 'nowrap',
                          borderBottom:
                            '1px solid rgba(20,45,28,.065)',
                        }}
                      >
                        {row.wait || row.waiting || '5 min'}
                      </td>

                      <td
                        style={{
                          padding: '15px 10px',
                          borderBottom:
                            '1px solid rgba(20,45,28,.065)',
                        }}
                      >
                        <motion.button
                          className="action-btn"
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleAction('gate')}
                          style={{
                            minHeight: 37,
                            padding: '8px 12px',
                            fontSize: 13,
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Process
                          <Icon name="arrow" size={15} />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Card>

        {/* QUICK ACTIONS */}
        <Card>
          <h3
            style={{
              margin: '0 0 5px',
              fontSize: 21,
              fontWeight: 820,
            }}
          >
            Quick actions
          </h3>

          <p
            style={{
              margin: '0 0 18px',
              fontSize: 14,
              lineHeight: 1.5,
              opacity: 0.62,
            }}
          >
            Common controls for faster mandi operations.
          </p>

          <div
            style={{
              display: 'grid',
              gap: 10,
            }}
          >
            {[
              [
                'Scan QR Code',
                'green',
                'qr',
                () => handleAction('gate'),
              ],
              [
                'Override Queue',
                'gold',
                'swap',
                () => handleToast('Queue override opened'),
              ],
              [
                'Alert Center',
                'gold',
                'alert',
                () => handleToast('No critical alerts'),
              ],
            ].map(([label, tone, icon, action], index) => (
              <motion.button
                key={label}
                onClick={action}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  minHeight: 58,
                  padding: '11px 13px',
                  borderRadius: 13,
                  border:
                    tone === 'green'
                      ? '1px solid rgba(32,112,48,.15)'
                      : '1px solid rgba(185,137,35,.17)',
                  background:
                    tone === 'green'
                      ? 'rgba(32,112,48,.055)'
                      : 'rgba(219,165,57,.07)',
                  color:
                    tone === 'green'
                      ? '#246b36'
                      : '#86631a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 11,
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    display: 'grid',
                    placeItems: 'center',
                    background:
                      tone === 'green'
                        ? 'rgba(32,112,48,.11)'
                        : 'rgba(219,165,57,.13)',
                    flexShrink: 0,
                  }}
                >
                  <Icon name={icon} size={18} />
                </span>

                <span style={{ flex: 1 }}>{label}</span>

                <Icon name="arrow" size={16} />
              </motion.button>
            ))}
          </div>

          <div
            style={{
              marginTop: 18,
              padding: '13px 14px',
              borderRadius: 12,
              background: 'rgba(20,45,28,.035)',
              fontSize: 13,
              lineHeight: 1.5,
              opacity: 0.7,
            }}
          >
            <strong style={{ opacity: 1 }}>Tip:</strong> Process verified
            farmers first to keep the gate moving.
          </div>
        </Card>
      </div>

      {/* ANALYTICS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.45fr) minmax(300px, .8fr)',
          gap: 16,
          marginTop: 16,
        }}
      >
        {/* THROUGHPUT */}
        <Card>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 18,
              gap: 15,
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 21,
                  fontWeight: 820,
                }}
              >
                Throughput today
              </h3>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: 14,
                  opacity: 0.62,
                }}
              >
                Farmers processed by hour
              </p>
            </div>

            <span
              style={{
                fontSize: 13,
                fontWeight: 800,
                padding: '7px 10px',
                borderRadius: 9,
                background: 'rgba(32,112,48,.08)',
                color: '#27743a',
              }}
            >
              24 processed
            </span>
          </div>

          <div
            className="bar-chart"
            style={{
              height: 205,
              display: 'flex',
              alignItems: 'flex-end',
              gap: 9,
              padding: '15px 4px 0',
              borderBottom: '1px solid rgba(20,45,28,.1)',
            }}
          >
            {[4, 7, 5, 9, 12, 10, 15, 13, 18, 16, 21, 24].map(
              (value, index) => (
                <motion.div
                  key={`${value}-${index}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 24) * 100}%` }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.045,
                    ease: 'easeOut',
                  }}
                  whileHover={{
                    scaleY: 1.04,
                    transformOrigin: 'bottom',
                  }}
                  style={{
                    flex: 1,
                    minWidth: 10,
                    borderRadius: '7px 7px 2px 2px',
                    background:
                      index === 11
                        ? '#207030'
                        : 'rgba(32,112,48,.22)',
                    position: 'relative',
                    cursor: 'default',
                  }}
                  title={`${value} farmers`}
                />
              ),
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 4,
              marginTop: 8,
              fontSize: 11,
              opacity: 0.48,
              textAlign: 'center',
            }}
          >
            {[
              '8 AM',
              '9',
              '10',
              '11',
              '12',
              '1 PM',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
            ].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </Card>

        {/* EXTRA CIRCLE / DONUT GRAPH */}
        <Card>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 10,
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 21,
                  fontWeight: 820,
                }}
              >
                Queue distribution
              </h3>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: 14,
                  opacity: 0.62,
                }}
              >
                Current farmer status
              </p>
            </div>

            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                padding: '6px 9px',
                borderRadius: 8,
                background: 'rgba(20,45,28,.05)',
                opacity: 0.65,
              }}
            >
              LIVE
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '24px 0 20px',
            }}
          >
            <motion.div
              initial={{ rotate: -90, scale: 0.85, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              style={{
                width: 184,
                height: 184,
                borderRadius: '50%',
                background:
                  'conic-gradient(#207030 0deg 180deg, #dba539 180deg 285deg, #a9b0aa 285deg 360deg)',
                padding: 17,
                position: 'relative',
                boxShadow: '0 12px 30px rgba(20,45,28,.08)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: 'inset 0 0 0 1px rgba(20,45,28,.04)',
                }}
              >
                <strong
                  style={{
                    fontSize: 34,
                    lineHeight: 1,
                    fontWeight: 900,
                  }}
                >
                  24
                </strong>

                <span
                  style={{
                    marginTop: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    opacity: 0.55,
                  }}
                >
                  Farmers
                </span>
              </div>
            </motion.div>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 11,
              borderTop: '1px solid rgba(20,45,28,.08)',
              paddingTop: 15,
            }}
          >
            {[
              ['Verified', '12', '50%', '#207030'],
              ['Quality Check', '7', '29%', '#dba539'],
              ['Waiting', '5', '21%', '#a9b0aa'],
            ].map(([label, value, percent, dot], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  fontSize: 14,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: dot,
                    flexShrink: 0,
                  }}
                />

                <span
                  style={{
                    flex: 1,
                    fontWeight: 680,
                  }}
                >
                  {label}
                </span>

                <span
                  style={{
                    fontWeight: 850,
                  }}
                >
                  {value}
                </span>

                <span
                  style={{
                    width: 38,
                    textAlign: 'right',
                    fontSize: 12,
                    opacity: 0.52,
                    fontWeight: 700,
                  }}
                >
                  {percent}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  )
}