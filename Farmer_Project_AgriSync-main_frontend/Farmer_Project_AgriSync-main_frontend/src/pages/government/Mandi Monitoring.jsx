import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Card from './_Card'
import IndiaProcurementMap from './IndiaProcurementMap.jsx'


export default function MandiMonitoring({ mandis = [], queueRows = [], backendAlerts = [] }) {
  const [showTransactions, setShowTransactions] = useState(false)

  const onlineCenters = mandis.length
  const displayRows = queueRows.length ? queueRows : []
  const displayAlerts = backendAlerts.length ? backendAlerts : []

  return (
    <motion.div
      className="mandi-monitoring-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      style={{
        width: '100%',
        paddingBottom: 40,
      }}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        className="page-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{
          marginBottom: 25,
        }}
      >
        <div>
          <small
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#68736b',
            }}
          >
            REAL-TIME NATIONAL NETWORK
          </small>

          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              margin: '5px 0 7px',
              color: '#17241c',
            }}
          >
            Mandi Monitoring
          </h1>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: '#68736c',
              maxWidth: 720,
              margin: 0,
            }}
          >
            Monitor market utilization, state procurement intensity
            and operational bottlenecks.
          </p>
        </div>

        <motion.div
          className="pill success mandi-live-badge"
          animate={{
            scale: [1, 1.025, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            fontSize: 13,
            fontWeight: 700,
            padding: '10px 15px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#238448',
              display: 'inline-block',
              boxShadow: '0 0 0 4px rgba(35,132,72,.12)',
            }}
          />

          {onlineCenters} centers online
        </motion.div>
      </motion.div>


      {/* =====================================================
          COMMAND CENTER
      ===================================================== */}

      <div className="monitor-command-grid">

        {/* =================================================
            LEFT KPI COLUMN
        ================================================= */}

        <motion.div
          className="monitor-kpi-column"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.12,
            duration: 0.55,
          }}
        >

          {/* TONNAGE */}

          <Card>
            <div
              className="tonnage-kpi"
              style={{
                position: 'relative',
                minHeight: 145,
              }}
            >
              <small
                style={{
                  fontSize: 14,
                  fontWeight: 650,
                  lineHeight: 1.35,
                  color: '#59655d',
                }}
              >
                Total Tonnage Procured Today
              </small>

              <div
                className="tonnage-number"
                style={{
                  fontSize: 38,
                  fontWeight: 850,
                  lineHeight: 1.1,
                  marginTop: 10,
                  color: '#175f38',
                  letterSpacing: '-1px',
                }}
              >
                2,036.7{' '}
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  q
                </span>
              </div>

              <p
                style={{
                  fontSize: 13,
                  marginTop: 7,
                  color: '#748078',
                }}
              >
                Procured Today
              </p>

              <motion.div
                className="tonnage-icon"
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                }}
                style={{
                  fontSize: 45,
                  fontWeight: 700,
                  color: '#217744',
                }}
              >
                ↗
              </motion.div>
            </div>
          </Card>


          {/* ACTIVE MANDIS */}

          <Card>
            <div className="command-stat">
              <small
                style={{
                  fontSize: 14,
                  fontWeight: 650,
                  color: '#59655d',
                }}
              >
                Active Mandis
              </small>

              <motion.strong
                initial={{
                  opacity: 0,
                  scale: 0.75,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.3,
                  type: 'spring',
                  stiffness: 180,
                }}
                style={{
                  display: 'block',
                  fontSize: 40,
                  lineHeight: 1.1,
                  marginTop: 8,
                  fontWeight: 850,
                  color: '#175f38',
                }}
              >
                20
              </motion.strong>

              <span
                style={{
                  fontSize: 13,
                  color: '#778179',
                }}
              >
                centers currently reporting
              </span>
            </div>
          </Card>


          {/* WAIT TIME */}

          <Card>
            <div className="command-stat">
              <small
                style={{
                  fontSize: 14,
                  fontWeight: 650,
                  lineHeight: 1.4,
                  color: '#59655d',
                }}
              >
                Average Wait Time
                <br />
                (State-wide)
              </small>

              <motion.strong
                initial={{
                  opacity: 0,
                  x: -18,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.42,
                }}
                style={{
                  display: 'block',
                  fontSize: 36,
                  fontWeight: 850,
                  lineHeight: 1.1,
                  marginTop: 9,
                  color: '#175f38',
                }}
              >
                14 min
              </motion.strong>

              <span
                className="positive-change"
                style={{
                  fontSize: 13,
                  fontWeight: 650,
                }}
              >
                ↓ 8% from yesterday
              </span>
            </div>
          </Card>

        </motion.div>


        {/* =================================================
            INDIA MAP
        ================================================= */}

        <motion.div
          className="monitor-map-column"
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.1,
            duration: 0.7,
          }}
        >
          <IndiaProcurementMap mandis={mandis} />
        </motion.div>


        {/* =================================================
            ALERT CENTER
        ================================================= */}

        <motion.div
          className="monitor-alert-column"
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.18,
            duration: 0.55,
          }}
        >
          <Card>

            <div
              className="alert-center-title"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 10,
              }}
            >
              <div>
                <small
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: '1.3px',
                    color: '#6c776f',
                  }}
                >
                  AI OPERATIONS
                </small>

                <h2
                  style={{
                    fontSize: 23,
                    lineHeight: 1.2,
                    margin: '5px 0 0',
                    color: '#1c2821',
                  }}
                >
                  AI Bottleneck Alert Center
                </h2>
              </div>

              <motion.div
                animate={{
                  rotate: [0, -8, 8, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                style={{
                  fontSize: 24,
                }}
              >
                ⚠
              </motion.div>
            </div>


            <div
              className="bottleneck-alerts"
              style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 9,
              }}
            >

              {displayAlerts.map((alert, index) => (
                <motion.div
                  key={alert}
                  className="bottleneck-alert"
                  initial={{
                    opacity: 0,
                    x: 22,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.25 + index * 0.09,
                  }}
                  whileHover={{
                    x: -5,
                    scale: 1.015,
                  }}
                  style={{
                    minHeight: 54,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 11,
                    padding: '10px 13px',
                    borderRadius: 13,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    ⚠
                  </span>

                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 650,
                      lineHeight: 1.35,
                    }}
                  >
                    {alert}
                  </p>
                </motion.div>
              ))}

            </div>
          </Card>
        </motion.div>

      </div>


      {/* =====================================================
          TRANSPARENCY LEDGER
      ===================================================== */}

      <motion.div
        className="transparency-ledger"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 0.55,
        }}
        style={{
          marginTop: 20,
        }}
      >

        <Card>

          {/* LEDGER HEADER */}

          <div
            className="ledger-topline"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 15,
              flexWrap: 'wrap',
            }}
          >

            <div>
              <small
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '1.3px',
                  color: '#6c776f',
                }}
              >
                TRANSPARENCY
              </small>

              <h2
                style={{
                  fontSize: 23,
                  margin: '5px 0 0',
                  color: '#1c2821',
                }}
              >
                Procurement Transparency Ledger
              </h2>
            </div>

            <motion.button
              className="secondary"
              type="button"
              onClick={() => setShowTransactions(true)}
              whileHover={{
                scale: 1.025,
              }}
              whileTap={{
                scale: 0.97,
              }}
              style={{
                fontSize: 14,
                fontWeight: 700,
                padding: '12px 17px',
                cursor: 'pointer',
              }}
            >
              ☷ &nbsp; View recent transactions →
            </motion.button>

          </div>


          {/* TABLE */}

          <div
            className="transparency-table-wrap"
            style={{
              marginTop: 18,
            }}
          >

            <table
              className="transparency-table"
              style={{
                width: '100%',
              }}
            >

              <thead>
                <tr>

                  <th
                    style={{
                      fontSize: 13,
                      fontWeight: 750,
                    }}
                  >
                    Farmer ID ↓
                  </th>

                  <th
                    style={{
                      fontSize: 13,
                      fontWeight: 750,
                    }}
                  >
                    Mandi Location
                  </th>

                  <th
                    style={{
                      fontSize: 13,
                      fontWeight: 750,
                    }}
                  >
                    Crop Type
                  </th>

                  <th
                    style={{
                      fontSize: 13,
                      fontWeight: 750,
                    }}
                  >
                    Payment Status
                  </th>

                  <th
                    style={{
                      fontSize: 13,
                      fontWeight: 750,
                    }}
                  >
                    Yield Check
                  </th>

                </tr>
              </thead>


              <tbody>

                {displayRows.map((row, index) => (
                  <motion.tr
                    key={row[0]}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.4 + index * 0.08,
                    }}
                  >

                    <td
                      style={{
                        fontSize: 14,
                        fontWeight: 650,
                      }}
                    >
                      {row[0]}
                    </td>

                    <td
                      style={{
                        fontSize: 14,
                      }}
                    >
                      {row[1]}
                    </td>

                    <td
                      style={{
                        fontSize: 14,
                      }}
                    >
                      {row[2]}
                    </td>

                    <td>
                      <span
                        className="payment-badge"
                        style={{
                          fontSize: 12,
                          fontWeight: 650,
                        }}
                      >
                        ✓ Direct Payment Triggered
                      </span>
                    </td>

                    <td>
                      <span
                        className="yield-badge"
                        style={{
                          fontSize: 12,
                          fontWeight: 650,
                        }}
                      >
                        Anomaly by AI
                      </span>
                    </td>

                  </motion.tr>
                ))}

              </tbody>

            </table>

          </div>

        </Card>

      </motion.div>


      {/* =====================================================
          TRANSACTION MODAL
      ===================================================== */}

      <AnimatePresence>

        {showTransactions && (

          <motion.div
            className="transaction-modal-backdrop"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setShowTransactions(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              background: 'rgba(20,31,24,.45)',
              backdropFilter: 'blur(5px)',
            }}
          >

            <motion.div
              className="transaction-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="recent-transactions-title"
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 16,
                scale: 0.97,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 24,
              }}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: 'min(760px, 100%)',
                maxHeight: '85vh',
                overflowY: 'auto',
                background: '#fff',
                borderRadius: 22,
                padding: 24,
                boxShadow: '0 25px 70px rgba(0,0,0,.22)',
              }}
            >

              {/* MODAL HEADER */}

              <div
                className="transaction-modal-header"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 20,
                }}
              >

                <div>

                  <small
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: '1.4px',
                      color: '#6b766e',
                    }}
                  >
                    LIVE LEDGER
                  </small>

                  <h2
                    id="recent-transactions-title"
                    style={{
                      fontSize: 25,
                      margin: '5px 0',
                      color: '#1d2a22',
                    }}
                  >
                    Recent Transactions
                  </h2>

                  <p
                    style={{
                      fontSize: 13,
                      color: '#78827b',
                      margin: 0,
                    }}
                  >
                    Latest procurement payments and quality checks.
                  </p>

                </div>


                <button
                  className="modal-close"
                  type="button"
                  aria-label="Close recent transactions"
                  onClick={() => setShowTransactions(false)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid #e2e8e1',
                    background: '#f7f9f6',
                    fontSize: 22,
                    lineHeight: 1,
                    cursor: 'pointer',
                    color: '#425047',
                  }}
                >
                  ×
                </button>

              </div>


              {/* TRANSACTION LIST */}

              <div
                className="transaction-list"
                style={{
                  marginTop: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >

                {displayRows.map((row, index) => (

                  <motion.div
                    className="transaction-item"
                    key={row[0]}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 15,
                      padding: '15px 16px',
                      borderRadius: 15,
                      background: '#f7f9f6',
                      border: '1px solid #e7ece5',
                    }}
                  >

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                      }}
                    >

                      <strong
                        style={{
                          fontSize: 14,
                          color: '#203028',
                        }}
                      >
                        {row[0]}
                      </strong>

                      <span
                        style={{
                          fontSize: 12,
                          color: '#78827b',
                        }}
                      >
                        {row[1]} · {row[2]}
                      </span>

                    </div>


                    <div
                      className="transaction-statuses"
                      style={{
                        display: 'flex',
                        gap: 7,
                        flexWrap: 'wrap',
                        justifyContent: 'flex-end',
                      }}
                    >

                      <span
                        className="payment-badge"
                        style={{
                          fontSize: 11,
                        }}
                      >
                        ✓ Paid
                      </span>

                      <span
                        className="yield-badge"
                        style={{
                          fontSize: 11,
                        }}
                      >
                        Yield checked
                      </span>

                    </div>

                  </motion.div>

                ))}

              </div>


              {/* MODAL FOOTER */}

              <div
                className="transaction-modal-footer"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 15,
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: '1px solid #e8ece7',
                }}
              >

                <span
                  style={{
                    fontSize: 12,
                    color: '#7b857e',
                  }}
                >
                  Showing {rows.length} latest records
                </span>

                <button
                  className="secondary"
                  type="button"
                  onClick={() => setShowTransactions(false)}
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    padding: '10px 18px',
                    cursor: 'pointer',
                  }}
                >
                  Done
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.div>
  )
}