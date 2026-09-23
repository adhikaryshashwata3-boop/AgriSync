import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Card from './_Card'

export default function Government({
  mandis = [],
  procurement = [],
  onNavigate,
  onRefresh,
  backendStats = [],
}) {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedMandi, setSelectedMandi] = useState(null)

  const handleRefresh = async () => {
    setRefreshing(true)

    try {
      if (onRefresh) await onRefresh()
    } finally {
      setTimeout(() => setRefreshing(false), 800)
    }
  }

  const stats = backendStats.length ? backendStats : []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        paddingBottom: 45,
      }}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 20,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              marginBottom: 7,
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: '#2c8a4b',
                boxShadow: '0 0 0 5px rgba(44,138,75,.10)',
              }}
            />

            <small
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '1.5px',
                color: '#617067',
              }}
            >
              STATE COMMAND CENTER
            </small>
          </div>

          <h1
            style={{
              fontSize: 34,
              lineHeight: 1.1,
              margin: 0,
              color: '#17271d',
              fontWeight: 850,
            }}
          >
            Government Dashboard
          </h1>

          <p
            style={{
              margin: '9px 0 0',
              fontSize: 14,
              color: '#737d76',
              maxWidth: 700,
              lineHeight: 1.55,
            }}
          >
            A real-time operational view of mandi activity,
            procurement, farmer waiting time and MSP compliance.
          </p>
        </div>

        <motion.button
          className="secondary"
          onClick={handleRefresh}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: '11px 17px',
            fontSize: 13,
            fontWeight: 750,
          }}
        >
          <motion.span
            animate={
              refreshing
                ? { rotate: 360 }
                : { rotate: 0 }
            }
            transition={
              refreshing
                ? {
                    duration: 0.7,
                    repeat: Infinity,
                    ease: 'linear',
                  }
                : {}
            }
            style={{
              display: 'inline-block',
              marginRight: 6,
            }}
          >
            ↻
          </motion.span>

          {refreshing ? 'Updating...' : 'Refresh Data'}
        </motion.button>
      </div>


      {/* =====================================================
          LIVE STATUS BANNER
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '19px 22px',
          borderRadius: 20,
          marginBottom: 20,
          background:
            'linear-gradient(105deg,#173d27,#245d37)',
          color: '#fff',
          boxShadow:
            '0 12px 30px rgba(24,67,39,.16)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 180,
            height: 180,
            borderRadius: '50%',
            right: -55,
            top: -100,
            background: 'rgba(255,255,255,.06)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: 120,
            height: 120,
            borderRadius: '50%',
            right: 80,
            bottom: -90,
            background: 'rgba(255,255,255,.04)',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 5,
              }}
            >
              <motion.span
                animate={{
                  opacity: [1, 0.35, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#8ee59c',
                }}
              />

              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '1px',
                }}
              >
                SYSTEM OPERATIONAL
              </span>
            </div>

            <strong
              style={{
                display: 'block',
                fontSize: 18,
                marginBottom: 4,
              }}
            >
              All monitored procurement centers are online
            </strong>

            <span
              style={{
                fontSize: 11,
                opacity: 0.75,
              }}
            >
              Last network synchronization: just now
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 25,
              alignItems: 'center',
            }}
          >
            <div>
              <small
                style={{
                  display: 'block',
                  fontSize: 9,
                  opacity: 0.65,
                  marginBottom: 3,
                }}
              >
                ACTIVE CENTERS
              </small>

              <strong style={{ fontSize: 23 }}>
                {mandis.length || 4}
              </strong>
            </div>

            <div
              style={{
                width: 1,
                height: 38,
                background: 'rgba(255,255,255,.18)',
              }}
            />

            <div>
              <small
                style={{
                  display: 'block',
                  fontSize: 9,
                  opacity: 0.65,
                  marginBottom: 3,
                }}
              >
                NETWORK HEALTH
              </small>

              <strong
                style={{
                  fontSize: 23,
                  color: '#9ae4a3',
                }}
              >
                98%
              </strong>
            </div>
          </div>
        </div>
      </motion.div>


      {/* =====================================================
          STAT STRIP
      ===================================================== */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(4,minmax(0,1fr))',
          gap: 13,
          marginBottom: 20,
        }}
      >
        {stats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.07,
            }}
            whileHover={{
              y: -4,
            }}
            style={{
              padding: '16px 17px',
              borderRadius: 16,
              background: '#fff',
              border: '1px solid #e3eae2',
              display: 'flex',
              alignItems: 'center',
              gap: 13,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                flexShrink: 0,
                borderRadius: 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  index === 1
                    ? '#f7efd5'
                    : '#eaf4e8',
                color: '#287342',
                fontSize: 19,
                fontWeight: 800,
              }}
            >
              {item.icon}
            </div>

            <div>
              <strong
                style={{
                  display: 'block',
                  fontSize: 20,
                  lineHeight: 1.1,
                  color: '#1d3025',
                }}
              >
                {item.value}
              </strong>

              <span
                style={{
                  display: 'block',
                  marginTop: 4,
                  fontSize: 10,
                  color: '#7b857e',
                }}
              >
                {item.label}
              </span>

              <span
                style={{
                  display: 'block',
                  marginTop: 4,
                  fontSize: 10,
                  fontWeight: 750,
                  color: '#2c8148',
                }}
              >
                {item.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>


      {/* =====================================================
          MAIN COMMAND CENTER
      ===================================================== */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.65fr 1fr',
          gap: 18,
          marginBottom: 18,
        }}
      >

        {/* MANDI OPERATIONS */}

        <Card>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 17,
            }}
          >
            <div>
              <small
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '1.2px',
                  color: '#738078',
                }}
              >
                LIVE OPERATIONS
              </small>

              <h3
                style={{
                  fontSize: 21,
                  margin: '4px 0',
                  color: '#223229',
                }}
              >
                Mandi activity
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: '#7a847d',
                }}
              >
                Current operational status of monitored centers.
              </p>
            </div>

            <span
              style={{
                padding: '6px 10px',
                borderRadius: 20,
                background: '#eaf5e9',
                color: '#287342',
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              LIVE
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(2,minmax(0,1fr))',
              gap: 10,
            }}
          >
            {mandis.map((m, index) => {
              const attention = m[4] === 'Attention'
              const busy = m[4] === 'Busy'

              return (
                <motion.div
                  key={m[0]}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.1 + index * 0.07,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  onClick={() =>
                    setSelectedMandi(m)
                  }
                  style={{
                    padding: 14,
                    borderRadius: 15,
                    background: attention
                      ? '#fffaf0'
                      : '#f8fbf8',
                    border: attention
                      ? '1px solid #f0dfad'
                      : '1px solid #e5ece4',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div>
                      <strong
                        style={{
                          display: 'block',
                          fontSize: 13,
                          color: '#26372d',
                        }}
                      >
                        {m[0]}
                      </strong>

                      <span
                        style={{
                          display: 'block',
                          marginTop: 3,
                          fontSize: 10,
                          color: '#7d877f',
                        }}
                      >
                        {m[1]}
                      </span>
                    </div>

                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: attention
                          ? '#d39f27'
                          : busy
                            ? '#e09c28'
                            : '#3a9253',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 14,
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        color: '#7c857f',
                      }}
                    >
                      Capacity
                    </span>

                    <strong
                      style={{
                        fontSize: 11,
                        color: '#2b7042',
                      }}
                    >
                      {m[2]}
                    </strong>
                  </div>

                  <div
                    style={{
                      height: 5,
                      borderRadius: 20,
                      background: '#e7ede6',
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: m[2],
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2 + index * 0.08,
                      }}
                      style={{
                        height: '100%',
                        borderRadius: 20,
                        background: attention
                          ? '#d2a12c'
                          : '#3b8d52',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        color: '#69756d',
                      }}
                    >
                      Wait: {m[3]}
                    </span>

                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 750,
                        color: attention
                          ? '#a37219'
                          : '#287342',
                      }}
                    >
                      {m[4]}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Card>


        {/* WAITING TIME COMMAND PANEL */}

        <Card>
          <small
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: '#738078',
            }}
          >
            FARMER EXPERIENCE
          </small>

          <h3
            style={{
              fontSize: 21,
              margin: '4px 0',
              color: '#223229',
            }}
          >
            Waiting time
          </h3>

          <p
            style={{
              fontSize: 12,
              color: '#7a847d',
              margin: 0,
            }}
          >
            Average time spent before processing.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '18px 0 13px',
            }}
          >
            <div
              style={{
                width: 145,
                height: 145,
                borderRadius: '50%',
                background:
                  'conic-gradient(#32864d 0deg 274deg,#e8eee7 274deg 360deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 112,
                  height: 112,
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <strong
                  style={{
                    fontSize: 35,
                    lineHeight: 1,
                    color: '#1c6338',
                  }}
                >
                  19
                </strong>

                <span
                  style={{
                    fontSize: 10,
                    marginTop: 5,
                    color: '#7a847d',
                    fontWeight: 700,
                  }}
                >
                  MINUTES
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '9px 12px',
              borderRadius: 11,
              background: '#eef7ec',
              color: '#287342',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            ✓ 6 minutes below target
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 13,
              paddingTop: 12,
              borderTop: '1px solid #edf1ed',
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: '#778178',
              }}
            >
              Target
            </span>

            <strong
              style={{
                fontSize: 11,
                color: '#34443a',
              }}
            >
              &lt; 25 min
            </strong>
          </div>
        </Card>
      </div>


      {/* =====================================================
          LOWER COMMAND AREA
      ===================================================== */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.35fr .85fr',
          gap: 18,
        }}
      >

        {/* PROCUREMENT SNAPSHOT */}

        <Card>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <div>
              <small
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '1.2px',
                  color: '#738078',
                }}
              >
                PROCUREMENT SNAPSHOT
              </small>

              <h3
                style={{
                  fontSize: 20,
                  margin: '4px 0',
                  color: '#223229',
                }}
              >
                Crop activity
              </h3>
            </div>

            <button
              className="text-button"
              onClick={() =>
                onNavigate &&
                onNavigate('procurement')
              }
              style={{
                fontSize: 12,
                fontWeight: 750,
              }}
            >
              Open procurement →
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 13,
            }}
          >
            {procurement.map((row, index) => {
              const compliance =
                parseInt(row[3], 10) || 0

              return (
                <motion.div
                  key={row[0]}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.15 + index * 0.07,
                  }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      '100px 1fr 55px',
                    alignItems: 'center',
                    gap: 13,
                  }}
                >
                  <strong
                    style={{
                      fontSize: 12,
                      color: '#344239',
                    }}
                  >
                    🌾 {row[0]}
                  </strong>

                  <div
                    style={{
                      height: 8,
                      borderRadius: 20,
                      overflow: 'hidden',
                      background: '#edf1ec',
                    }}
                  >
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${compliance}%`,
                      }}
                      transition={{
                        duration: 0.9,
                        delay: 0.2 + index * 0.08,
                      }}
                      style={{
                        height: '100%',
                        borderRadius: 20,
                        background:
                          'linear-gradient(90deg,#8fbd86,#2c8148)',
                      }}
                    />
                  </div>

                  <strong
                    style={{
                      fontSize: 11,
                      color: '#287342',
                      textAlign: 'right',
                    }}
                  >
                    {row[3]}
                  </strong>
                </motion.div>
              )
            })}
          </div>
        </Card>


        {/* ALERT CENTER */}

        <Card>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <div>
              <small
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '1.2px',
                  color: '#738078',
                }}
              >
                GOVERNANCE
              </small>

              <h3
                style={{
                  fontSize: 20,
                  margin: '4px 0',
                  color: '#223229',
                }}
              >
                Attention center
              </h3>
            </div>

            <span
              style={{
                width: 27,
                height: 27,
                borderRadius: '50%',
                background: '#fff3d8',
                color: '#a17119',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              !
            </span>
          </div>

          <div
            style={{
              padding: 13,
              borderRadius: 13,
              background: '#fffaf0',
              border: '1px solid #f2e3bd',
              marginBottom: 10,
            }}
          >
            <strong
              style={{
                display: 'block',
                fontSize: 12,
                color: '#795c20',
                marginBottom: 4,
              }}
            >
              Mandi queue attention
            </strong>

            <span
              style={{
                fontSize: 10,
                color: '#8a7650',
                lineHeight: 1.5,
              }}
            >
              One monitored center requires operational
              review.
            </span>
          </div>

          <div
            style={{
              padding: 13,
              borderRadius: 13,
              background: '#f1f8ef',
              border: '1px solid #dcebd9',
            }}
          >
            <strong
              style={{
                display: 'block',
                fontSize: 12,
                color: '#2b6f40',
                marginBottom: 4,
              }}
            >
              MSP compliance healthy
            </strong>

            <span
              style={{
                fontSize: 10,
                color: '#718072',
                lineHeight: 1.5,
              }}
            >
              Overall compliance remains above the
              state monitoring threshold.
            </span>
          </div>

          <button
            className="text-button"
            onClick={() =>
              onNavigate &&
              onNavigate('alerts')
            }
            style={{
              marginTop: 13,
              fontSize: 11,
              fontWeight: 750,
            }}
          >
            View all alerts →
          </button>
        </Card>
      </div>


      {/* =====================================================
          MANDI DETAILS POPUP
      ===================================================== */}

      <AnimatePresence>
        {selectedMandi && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMandi(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(16,30,21,.45)',
              backdropFilter: 'blur(5px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              style={{
                width: 'min(470px,100%)',
                background: '#fff',
                borderRadius: 22,
                padding: 24,
                boxShadow:
                  '0 25px 70px rgba(0,0,0,.2)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div>
                  <small
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: '1.2px',
                      color: '#728078',
                    }}
                  >
                    MANDI MONITORING
                  </small>

                  <h2
                    style={{
                      fontSize: 23,
                      margin: '5px 0 3px',
                      color: '#203128',
                    }}
                  >
                    {selectedMandi[0]}
                  </h2>

                  <span
                    style={{
                      fontSize: 11,
                      color: '#78827b',
                    }}
                  >
                    {selectedMandi[1]}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setSelectedMandi(null)
                  }
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: 0,
                    background: '#f1f4f0',
                    color: '#566259',
                    fontSize: 19,
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(3,1fr)',
                  gap: 10,
                  marginTop: 22,
                }}
              >
                {[
                  ['Capacity', selectedMandi[2]],
                  ['Wait', selectedMandi[3]],
                  ['Status', selectedMandi[4]],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      padding: 13,
                      borderRadius: 12,
                      background: '#f6f9f5',
                    }}
                  >
                    <small
                      style={{
                        display: 'block',
                        fontSize: 9,
                        color: '#7c857f',
                        marginBottom: 5,
                      }}
                    >
                      {label.toUpperCase()}
                    </small>

                    <strong
                      style={{
                        fontSize: 13,
                        color: '#287342',
                      }}
                    >
                      {value}
                    </strong>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  setSelectedMandi(null)
                }
                style={{
                  width: '100%',
                  marginTop: 19,
                  padding: '11px',
                  border: 0,
                  borderRadius: 12,
                  background: '#246b3c',
                  color: '#fff',
                  fontWeight: 750,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}