import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Card from './_Card'

const reports = [
  {
    name: 'Daily Procurement Report',
    description:
      'Complete daily summary of crop procurement, quantities and transaction values.',
    type: 'PROCUREMENT',
    pages: '12 pages',
    icon: 'chart',
  },
  {
    name: 'Mandi Waiting-Time Report',
    description:
      'Operational analysis of farmer waiting time across monitored mandi centers.',
    type: 'OPERATIONS',
    pages: '8 pages',
    icon: 'clock',
  },
  {
    name: 'MSP Compliance Report',
    description:
      'State-level review of procurement prices against approved MSP references.',
    type: 'COMPLIANCE',
    pages: '10 pages',
    icon: 'shield',
  },
  {
    name: 'Farmer Transaction Summary',
    description:
      'Consolidated farmer transactions, quantities, payments and processing status.',
    type: 'TRANSACTIONS',
    pages: '14 pages',
    icon: 'document',
  },
]

function Icon({ type, size = 24 }) {
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

  if (type === 'chart') {
    return (
      <svg {...common}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M7 16l3-4 3 2 5-7" />
        <circle cx="7" cy="16" r="1" />
        <circle cx="10" cy="12" r="1" />
        <circle cx="13" cy="14" r="1" />
        <circle cx="18" cy="7" r="1" />
      </svg>
    )
  }

  if (type === 'clock') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3.5 2" />
        <path d="M5 4.5l1.8 1.2" />
        <path d="M19 4.5l-1.8 1.2" />
      </svg>
    )
  }

  if (type === 'shield') {
    return (
      <svg {...common}>
        <path d="M12 3l7 3v5.5c0 4.3-2.8 7.4-7 9.5-4.2-2.1-7-5.2-7-9.5V6l7-3z" />
        <path d="M8.5 12l2.2 2.2 4.8-5" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M6 3.5h8l4 4V20.5H6z" />
      <path d="M14 3.5v4h4" />
      <path d="M9 12h6" />
      <path d="M9 15.5h6" />
      <path d="M9 8.5h2" />
    </svg>
  )
}

export default function Reports({ onGenerate }) {
  const [generating, setGenerating] = useState(null)
  const [generatedReport, setGeneratedReport] = useState(null)

  const handleGenerate = async (name) => {
    setGenerating(name)

    try {
      if (onGenerate) {
        await onGenerate(name)
      }

      setGeneratedReport(name)
    } finally {
      setGenerating(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        paddingBottom: 45,
      }}
    >
      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 20,
          marginBottom: 28,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 7,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#287342',
              }}
            />

            <small
              style={{
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '1.5px',
                color: '#6e7972',
              }}
            >
              OFFICIAL REPORTING
            </small>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 38,
              lineHeight: 1.1,
              fontWeight: 850,
              color: '#17271d',
            }}
          >
            Reports & Downloads
          </h1>

          <p
            style={{
              margin: '9px 0 0',
              fontSize: 16,
              lineHeight: 1.55,
              color: '#727d75',
              maxWidth: 650,
            }}
          >
            Generate structured reports for procurement,
            mandi operations, MSP compliance and farmer activity.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '9px 13px',
            borderRadius: 12,
            background: '#f1f7ef',
            border: '1px solid #dcebd9',
            color: '#287342',
            fontSize: 13,
            fontWeight: 750,
          }}
        >
          <Icon type="document" size={16} />
          PDF READY
        </div>
      </motion.div>


      {/* REPORTING SUMMARY */}

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr repeat(3, 1fr)',
          gap: 1,
          padding: 1,
          borderRadius: 18,
          overflow: 'hidden',
          background: '#dfe8df',
          marginBottom: 22,
        }}
      >
        <div
          style={{
            background:
              'linear-gradient(120deg,#193d27,#28623c)',
            color: '#fff',
            padding: '19px 21px',
          }}
        >
          <small
            style={{
              fontSize: 11,
              letterSpacing: '1.2px',
              fontWeight: 800,
              opacity: 0.7,
            }}
          >
            REPORT CENTER
          </small>

          <strong
            style={{
              display: 'block',
              fontSize: 23,
              marginTop: 5,
            }}
          >
            Centralized reporting
          </strong>

          <span
            style={{
              display: 'block',
              marginTop: 5,
              fontSize: 12,
              opacity: 0.72,
              lineHeight: 1.5,
            }}
          >
            Select a report below to prepare an official
            operational summary.
          </span>
        </div>

        {[
          ['04', 'Available reports'],
          ['PDF', 'Output format'],
          ['24h', 'Reporting window'],
        ].map(([value, label], index) => (
          <motion.div
            key={label}
            whileHover={{ background: '#f7faf6' }}
            style={{
              background: '#fff',
              padding: '19px 18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <strong
              style={{
                fontSize: 25,
                color: '#26372d',
              }}
            >
              {value}
            </strong>

            <span
              style={{
                marginTop: 4,
                fontSize: 12,
                color: '#7a847d',
              }}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>


      {/* SECTION HEADER */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 13,
        }}
      >
        <div>
          <small
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: '#718078',
            }}
          >
            REPORT LIBRARY
          </small>

          <h2
            style={{
              margin: '4px 0 0',
              fontSize: 24,
              color: '#24342b',
            }}
          >
            Available reports
          </h2>
        </div>

        <span
          style={{
            fontSize: 12,
            color: '#7a847d',
          }}
        >
          Updated today
        </span>
      </div>


      {/* REPORT CARDS */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(2,minmax(0,1fr))',
          gap: 15,
        }}
      >
        {reports.map((report, index) => {
          const isGenerating =
            generating === report.name

          const isGenerated =
            generatedReport === report.name

          return (
            <motion.div
              key={report.name}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.12 + index * 0.08,
              }}
              whileHover={{
                y: -5,
              }}
            >
              <Card>
                <div
                  style={{
                    display: 'flex',
                    gap: 15,
                    alignItems: 'flex-start',
                  }}
                >
                  {/* ICON */}

                  <motion.div
                    whileHover={{
                      rotate: -4,
                      scale: 1.05,
                    }}
                    style={{
                      width: 52,
                      height: 52,
                      flexShrink: 0,
                      borderRadius: 15,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        index === 2
                          ? '#f8f1dc'
                          : '#eaf4e8',
                      color:
                        index === 2
                          ? '#a2731b'
                          : '#287342',
                    }}
                  >
                    <Icon
                      type={report.icon}
                      size={25}
                    />
                  </motion.div>

                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        alignItems: 'flex-start',
                        gap: 10,
                      }}
                    >
                      <div>
                        <small
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: '1px',
                            color: '#7a847d',
                          }}
                        >
                          {report.type}
                        </small>

                        <h3
                          style={{
                            fontSize: 19,
                            margin: '3px 0 0',
                            lineHeight: 1.25,
                            color: '#26362d',
                          }}
                        >
                          {report.name}
                        </h3>
                      </div>

                      <span
                        style={{
                          flexShrink: 0,
                          padding: '5px 8px',
                          borderRadius: 8,
                          background: '#f4f7f3',
                          color: '#758078',
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {report.pages}
                      </span>
                    </div>

                    <p
                      style={{
                        margin: '9px 0 14px',
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: '#78827b',
                      }}
                    >
                      {report.description}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          fontSize: 11,
                          color: '#778179',
                        }}
                      >
                        <Icon
                          type="document"
                          size={13}
                        />
                        PDF document
                      </span>

                      <motion.button
                        className="secondary small"
                        onClick={() =>
                          handleGenerate(
                            report.name
                          )
                        }
                        disabled={isGenerating}
                        whileHover={{
                          scale: 1.03,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        style={{
                          fontSize: 12,
                          fontWeight: 750,
                          padding:
                            '11px 18px',
                          minWidth: 155,
                        }}
                      >
                        {isGenerating
                          ? 'Preparing...'
                          : isGenerated
                            ? '✓ Generated'
                            : 'Generate Report →'}
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* GENERATION PROGRESS */}

                <AnimatePresence>
                  {isGenerating && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: 'auto',
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      style={{
                        marginTop: 14,
                        paddingTop: 12,
                        borderTop:
                          '1px solid #edf1ed',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent:
                            'space-between',
                          marginBottom: 5,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            color: '#718078',
                          }}
                        >
                          Preparing report
                        </span>

                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#287342',
                          }}
                        >
                          Processing
                        </span>
                      </div>

                      <div
                        style={{
                          height: 5,
                          background: '#e8eee7',
                          borderRadius: 20,
                          overflow: 'hidden',
                        }}
                      >
                        <motion.div
                          initial={{
                            width: '0%',
                          }}
                          animate={{
                            width: '100%',
                          }}
                          transition={{
                            duration: 0.75,
                          }}
                          style={{
                            height: '100%',
                            background:
                              'linear-gradient(90deg,#91bd88,#287342)',
                            borderRadius: 20,
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          )
        })}
      </div>


      {/* FOOTER INFORMATION */}

      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.55,
        }}
        style={{
          marginTop: 18,
          padding: '14px 17px',
          borderRadius: 14,
          border: '1px solid #e2e9e1',
          background: '#f8faf7',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: '#e5f0e3',
            color: '#287342',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon type="shield" size={16} />
        </div>

        <div>
          <strong
            style={{
              display: 'block',
              fontSize: 13,
              color: '#344239',
            }}
          >
            Official reporting workspace
          </strong>

          <span
            style={{
              fontSize: 11,
              color: '#7b857e',
            }}
          >
            Reports are prepared using the latest available
            government monitoring data.
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}