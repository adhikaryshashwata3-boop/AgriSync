import { motion } from 'framer-motion'
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
  }

  const icons = {
    wheat: (
      <>
        <path d="M12 21V4" />
        <path d="M12 8c-4 0-6-2-6-5 4 0 6 2 6 5Z" />
        <path d="M12 12c4 0 6-2 6-5-4 0-6 2-6 5Z" />
        <path d="M12 16c-4 0-6-2-6-5 4 0 6 2 6 5Z" />
        <path d="M12 20c4 0 6-2 6-5-4 0-6 2-6 5Z" />
      </>
    ),

    money: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M7 9h.01M17 15h.01" />
      </>
    ),

    calendar: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
      </>
    ),

    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),

    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M4 21h16" />
      </>
    ),

    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    trend: (
      <>
        <path d="M3 17l6-6 4 4 8-9" />
        <path d="M15 6h6v6" />
      </>
    ),

    chart: (
      <>
        <path d="M4 20V10" />
        <path d="M10 20V4" />
        <path d="M16 20v-7" />
        <path d="M22 20H2" />
      </>
    ),
  }

  return <svg {...common}>{icons[name] || icons.chart}</svg>
}

const defaultRows = []

export default function History({ records = [] }) {
  const rows = records.length
    ? records.map((item) => [
        item.date || '—',
        item.cropType || '—',
        item.quantityDisplay || '—',
        item.formattedAmount || `₹${Number(item.amount || 0).toLocaleString('en-IN')}`,
        item.status || '—',
      ])
    : defaultRows
  const totalValueNumber = records.reduce((sum, item) => sum + Number(item.amount || 0), 0)
  const totalValue = `₹${totalValueNumber.toLocaleString('en-IN')}`
  const totalQuantity = records.length ? records.map((item) => item.quantityDisplay || '').filter(Boolean).join(' + ') : '—'
  const monthlyData = records.map((item) => ({ month: String(item.date || '').slice(0, 3) || '—', value: Number(item.amount || 0) / 1000 }))
  const yearlyData = records.map((item) => ({ month: String(item.date || '').slice(-4) || '—', value: Number(item.amount || 0) / 1000 }))
  const maxMonthly = Math.max(...monthlyData.map(item => item.value), 1)
  const maxYearly = Math.max(...yearlyData.map(item => item.value), 1)

  const handleExport = () => {
    alert('The available procurement records are already loaded from the AGRISync backend.')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        width: '100%',
        maxWidth: 1450,
        margin: '0 auto',
        paddingBottom: 50,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 25,
          marginBottom: 28,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 2,
              color: '#6f806f',
              marginBottom: 8,
            }}
          >
            TRANSACTION RECORDS
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.05,
              color: '#16351f',
              letterSpacing: -1.5,
            }}
          >
            Procurement History
          </h1>

          <p
            style={{
              margin: '12px 0 0',
              color: '#68756b',
              fontSize: 16,
              maxWidth: 650,
              lineHeight: 1.6,
            }}
          >
            Review your previous mandi transactions, procurement trends,
            quantities and payment outcomes.
          </p>
        </div>

        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            border: '1px solid #cdd8ce',
            background: '#ffffff',
            color: '#20452a',
            padding: '13px 18px',
            borderRadius: 10,
            fontWeight: 800,
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(27,55,35,.06)',
          }}
        >
          <Icon name="download" size={18} />
          Export History
        </motion.button>
      </div>

      {/* SUMMARY STRIP */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 14,
          marginBottom: 26,
        }}
      >
        {[
          {
            label: 'TOTAL PROCUREMENT',
            value: totalValue,
            icon: 'money',
          },
          {
            label: 'TOTAL QUANTITY',
            value: totalQuantity,
            icon: 'wheat',
          },
          {
            label: 'TRANSACTIONS',
            value: '04',
            icon: 'calendar',
          },
          {
            label: 'PAYMENT SUCCESS',
            value: '100%',
            icon: 'check',
          },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            style={{
              background: '#ffffff',
              border: '1px solid #dce5dc',
              borderRadius: 14,
              padding: '20px 21px',
              minHeight: 108,
              boxShadow: '0 10px 25px rgba(31,57,39,.05)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: 1.2,
                  color: '#748177',
                }}
              >
                {item.label}
              </span>

              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  display: 'grid',
                  placeItems: 'center',
                  background: '#edf5ee',
                  color: '#28733c',
                }}
              >
                <Icon name={item.icon} size={17} />
              </span>
            </div>

            <strong
              style={{
                fontSize: 25,
                color: '#173b22',
                letterSpacing: -0.5,
              }}
            >
              {item.value}
            </strong>
          </motion.div>
        ))}
      </div>

      {/* GRAPH SECTION */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 18,
          marginBottom: 24,
        }}
      >
        {/* MONTHLY GRAPH */}
        <Card>
          <div
            style={{
              padding: '4px 4px 0',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 20,
                marginBottom: 25,
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    color: '#1f6732',
                    fontWeight: 900,
                    fontSize: 13,
                  }}
                >
                  <Icon name="trend" size={18} />
                  PROCUREMENT TREND
                </div>

                <h2
                  style={{
                    margin: '7px 0 4px',
                    fontSize: 23,
                    color: '#173b22',
                  }}
                >
                  Monthly Procurement
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: '#778279',
                    fontSize: 13,
                  }}
                >
                  Monthly value shown in ₹ thousands
                </p>
              </div>

              <div
                style={{
                  padding: '7px 11px',
                  borderRadius: 20,
                  background: '#fff6df',
                  color: '#966c13',
                  fontSize: 11,
                  fontWeight: 900,
                  whiteSpace: 'nowrap',
                }}
              >
                2026 TREND
              </div>
            </div>

            <div
              style={{
                height: 280,
                display: 'flex',
                alignItems: 'stretch',
                gap: 10,
                borderBottom: '1px solid #dce5dc',
                padding: '10px 8px 0',
              }}
            >
              {monthlyData.map((item, index) => {
                const height = `${(item.value / maxMonthly) * 100}%`

                return (
                  <div
                    key={item.month}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height, opacity: 1 }}
                      transition={{
                        duration: 0.65,
                        delay: index * 0.045,
                        ease: 'easeOut',
                      }}
                      whileHover={{
                        scaleX: 1.08,
                      }}
                      title={`₹${item.value}k`}
                      style={{
                        width: '72%',
                        minHeight: 8,
                        background:
                          index === 7
                            ? 'linear-gradient(180deg,#d9aa3c,#bb8621)'
                            : 'linear-gradient(180deg,#4d9a5b,#24723a)',
                        borderRadius: '7px 7px 0 0',
                        position: 'relative',
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          top: -23,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: 9,
                          fontWeight: 800,
                          color: '#607064',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.value}k
                      </span>
                    </motion.div>

                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#68766c',
                        paddingBottom: 9,
                      }}
                    >
                      {item.month}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        {/* YEARLY GRAPH */}
        <Card>
          <div
            style={{
              padding: '4px 4px 0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                color: '#1f6732',
                fontWeight: 900,
                fontSize: 13,
              }}
            >
              <Icon name="chart" size={18} />
              LONG-TERM VIEW
            </div>

            <h2
              style={{
                margin: '7px 0 4px',
                fontSize: 23,
                color: '#173b22',
              }}
            >
              Yearly Procurement
            </h2>

            <p
              style={{
                margin: 0,
                color: '#778279',
                fontSize: 13,
              }}
            >
              Annual value shown in ₹ lakhs
            </p>

            <div
              style={{
                height: 280,
                marginTop: 20,
                display: 'flex',
                alignItems: 'flex-end',
                gap: 18,
                padding: '15px 8px 0',
                borderBottom: '1px solid #dce5dc',
              }}
            >
              {yearlyData.map((item, index) => {
                const height = `${(item.value / maxYearly) * 100}%`

                return (
                  <div
                    key={item.year}
                    style={{
                      flex: 1,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      gap: 9,
                    }}
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.1,
                        ease: 'easeOut',
                      }}
                      whileHover={{
                        scaleX: 1.07,
                      }}
                      title={`₹${item.value}L`}
                      style={{
                        width: '65%',
                        minHeight: 10,
                        borderRadius: '8px 8px 0 0',
                        background:
                          index === yearlyData.length - 1
                            ? 'linear-gradient(180deg,#d5a638,#ad7d20)'
                            : 'linear-gradient(180deg,#4c9859,#27753d)',
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          top: -24,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: 10,
                          fontWeight: 900,
                          color: '#5f6d63',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        ₹{item.value}L
                      </span>
                    </motion.div>

                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: '#66736a',
                        paddingBottom: 9,
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* GRAPH NOTE */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '13px 16px',
          marginBottom: 24,
          border: '1px solid #e6dfc8',
          background: '#fffaf0',
          borderRadius: 10,
          color: '#776331',
          fontSize: 12,
          lineHeight: 1.5,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#c9992e',
            flexShrink: 0,
          }}
        />

        <span>
          <strong>Demo trend data:</strong> the graphs are frontend
          visualizations for the dashboard. Your current transaction table
          contains four 2026 records; connect the chart arrays to real
          transaction data when your backend is available.
        </span>
      </div>

      {/* TRANSACTION LEDGER */}
      <Card>
        <div
          style={{
            padding: '4px 4px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 20,
              marginBottom: 20,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                  color: '#758177',
                }}
              >
                TRANSACTION LEDGER
              </div>

              <h2
                style={{
                  margin: '6px 0 0',
                  fontSize: 24,
                  color: '#173b22',
                }}
              >
                Recent Procurement
              </h2>
            </div>

            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: '#637067',
              }}
            >
              4 completed transactions
            </div>
          </div>

          {/* TABLE HEADER */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.25fr 1fr 1fr 1fr .8fr',
              gap: 15,
              padding: '13px 16px',
              background: '#f5f8f4',
              borderTop: '1px solid #dce5dc',
              borderBottom: '1px solid #dce5dc',
              color: '#718076',
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            <span>DATE</span>
            <span>CROP</span>
            <span>QUANTITY</span>
            <span>PAYMENT</span>
            <span>STATUS</span>
          </div>

          {/* TABLE ROWS */}
          {rows.map((row, index) => (
            <motion.div
              key={row.date}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{
                backgroundColor: '#f8fbf7',
              }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.25fr 1fr 1fr 1fr .8fr',
                gap: 15,
                alignItems: 'center',
                padding: '19px 16px',
                borderBottom:
                  index === rows.length - 1
                    ? 'none'
                    : '1px solid #e5ebe5',
                fontSize: 14,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontWeight: 800,
                  color: '#29452f',
                }}
              >
                <span
                  style={{
                    width: 30,
                    height: 30,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 7,
                    background: '#edf5ee',
                    color: '#347543',
                  }}
                >
                  <Icon name="calendar" size={15} />
                </span>

                {row.date}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  fontWeight: 800,
                  color: '#304a35',
                }}
              >
                <Icon name="wheat" size={17} />
                {row.crop}
              </div>

              <span
                style={{
                  fontWeight: 700,
                  color: '#657168',
                }}
              >
                {row.quantity}
              </span>

              <strong
                style={{
                  color: '#173b22',
                  fontSize: 15,
                }}
              >
                {row.amount}
              </strong>

              <span
                style={{
                  display: 'inline-flex',
                  width: 'fit-content',
                  alignItems: 'center',
                  gap: 5,
                  padding: '6px 10px',
                  borderRadius: 20,
                  background: '#eaf6ed',
                  color: '#28743a',
                  fontSize: 11,
                  fontWeight: 900,
                }}
              >
                <Icon name="check" size={13} />
                {row.status}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* LOCATION FOOTER */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: 18,
          padding: '14px 16px',
          borderTop: '1px solid #dfe7df',
          color: '#6b786e',
          fontSize: 12,
        }}
      >
        <Icon name="location" size={17} />

        <span>
          Procurement records shown for{' '}
          <strong style={{ color: '#31533a' }}>
            Kolkata Central Mandi
          </strong>
        </span>
      </div>

      {/* RESPONSIVE STYLE */}
      <style>
        {`
          @media (max-width: 1050px) {
            .history-responsive {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 800px) {
            .history-table-row {
              grid-template-columns: 1fr 1fr !important;
            }
          }

          @media (max-width: 700px) {
            div[style*="grid-template-columns: repeat(4"] {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            div[style*="grid-template-columns: 2fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 520px) {
            div[style*="grid-template-columns: repeat(4"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </motion.div>
  )
}