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
    shield: (
      <>
        <path d="M12 3 20 6v5c0 5.2-3.3 8.5-8 10-4.7-1.5-8-4.8-8-10V6l8-3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </>
    ),
    wheat: (
      <>
        <path d="M12 21V5" />
        <path d="M12 9c-3.5 0-5-2-5-4 3.2 0 5 1.5 5 4Z" />
        <path d="M12 13c-3.5 0-5-2-5-4 3.2 0 5 1.5 5 4Z" />
        <path d="M12 9c3.5 0 5-2 5-4-3.2 0-5 1.5-5 4Z" />
        <path d="M12 13c3.5 0 5-2 5-4-3.2 0-5 1.5-5 4Z" />
      </>
    ),
    vehicle: (
      <>
        <path d="M5 17h14l-1.2-5H6.2L5 17Z" />
        <path d="M7 12 8.5 8h7l1.5 4" />
        <circle cx="8" cy="17.5" r="1.5" />
        <circle cx="16" cy="17.5" r="1.5" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
  }

  return <svg {...common}>{icons[name] || icons.qr}</svg>
}

export default function GateScan({ onProceed, tokenId = '—' }) {
  const handleProceed = () => {
    if (onProceed) {
      onProceed()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
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
          gap: 20,
          marginBottom: 25,
        }}
      >
        <div>
          <small
            style={{
              fontSize: 13,
              fontWeight: 850,
              letterSpacing: '1.5px',
              opacity: 0.62,
            }}
          >
            GATE VERIFICATION • MANDI ENTRY
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
            QR Gate Scan
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: 16,
              opacity: 0.68,
              maxWidth: 600,
            }}
          >
            Verify the farmer token before quality assessment and weighbridge
            processing.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            padding: '10px 14px',
            borderRadius: 999,
            background: 'rgba(32,112,48,.09)',
            border: '1px solid rgba(32,112,48,.16)',
            color: '#26733a',
            fontSize: 14,
            fontWeight: 800,
            whiteSpace: 'nowrap',
          }}
        >
          <motion.span
            animate={{
              opacity: [1, 0.45, 1],
              scale: [1, 0.86, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
            }}
            style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              background: '#29934c',
            }}
          />
          Scanner ready
        </motion.div>
      </div>

      {/* MAIN GRID */}
      <div
        className="gate-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, .85fr)',
          gap: 18,
          alignItems: 'stretch',
        }}
      >
        {/* SCANNER */}
        <Card className="scan-card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 18,
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 850,
                  letterSpacing: '1.2px',
                  opacity: 0.52,
                }}
              >
                SCANNER AREA
              </span>

              <h2
                style={{
                  margin: '5px 0 0',
                  fontSize: 23,
                  fontWeight: 820,
                }}
              >
                Scan farmer QR
              </h2>
            </div>

            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                display: 'grid',
                placeItems: 'center',
                background: 'rgba(32,112,48,.08)',
                color: '#27743a',
              }}
            >
              <Icon name="qr" size={21} />
            </span>
          </div>

          {/* QR SCANNER */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '15px 0 20px',
            }}
          >
            <motion.div
              className="qr-large"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                boxShadow: [
                  '0 0 0 rgba(119,181,90,0)',
                  '0 0 0 9px rgba(119,181,90,.10)',
                  '0 0 0 rgba(119,181,90,0)',
                ],
              }}
              transition={{
                scale: { duration: 0.45 },
                opacity: { duration: 0.45 },
                boxShadow: {
                  repeat: Infinity,
                  duration: 2.2,
                },
              }}
              style={{
                width: 250,
                height: 250,
                padding: 18,
                borderRadius: 20,
                background: '#fff',
                border: '1px solid rgba(20,45,28,.12)',
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridTemplateRows: 'repeat(7, 1fr)',
                gap: 4,
                boxShadow: '0 12px 35px rgba(20,45,28,.08)',
              }}
            >
              {Array.from({ length: 49 }).map((_, i) => {
                const row = Math.floor(i / 7)
                const col = i % 7

                const isFinder =
                  (row < 3 && col < 3) ||
                  (row < 3 && col > 3) ||
                  (row > 3 && col < 3)

                const finderRow = row % 7
                const finderCol = col % 7

                const finderInner =
                  isFinder &&
                  ((finderRow === 1 && finderCol === 1) ||
                    (finderRow === 1 && finderCol === 5) ||
                    (finderRow === 5 && finderCol === 1))

                const filled =
                  isFinder
                    ? finderInner || row === 0 || row === 2 || col === 0 || col === 2
                    : i % 4 !== 1 && i % 5 !== 0

                return (
                  <motion.i
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: filled ? 1 : 0 }}
                    transition={{
                      delay: 0.15 + i * 0.008,
                    }}
                    style={{
                      display: 'block',
                      borderRadius: 2,
                      background: filled ? '#17251b' : 'transparent',
                    }}
                  />
                )
              })}

              {/* SCAN LINE */}
              <motion.div
                animate={{
                  top: ['12%', '86%', '12%'],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.7,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  left: 28,
                  right: 28,
                  height: 2,
                  borderRadius: 999,
                  background: '#4f963f',
                  boxShadow: '0 0 12px rgba(79,150,63,.55)',
                }}
              />
            </motion.div>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '0 15px 10px',
            }}
          >
            <p
              style={{
                margin: '0 0 7px',
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Point the gate scanner at the farmer token QR.
            </p>

            <span
              style={{
                fontSize: 13,
                opacity: 0.55,
              }}
            >
              QR recognition is ready for the next arrival.
            </span>
          </div>
        </Card>

        {/* TOKEN DETAILS */}
        <Card>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 18,
            }}
          >
            <span
              className="eyebrow"
              style={{
                fontSize: 12,
                fontWeight: 850,
                letterSpacing: '1.2px',
                opacity: 0.55,
              }}
            >
              SCANNED TOKEN
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontWeight: 800,
                color: '#28733a',
              }}
            >
              <Icon name="shield" size={16} />
              Valid
            </span>
          </div>

          <div
            style={{
              padding: '17px 18px',
              borderRadius: 15,
              background: 'rgba(32,112,48,.055)',
              border: '1px solid rgba(32,112,48,.10)',
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 750,
                opacity: 0.52,
                letterSpacing: '.8px',
              }}
            >
              TOKEN NUMBER
            </span>

            <h2
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 34,
                lineHeight: 1,
                margin: '7px 0 0',
                fontWeight: 850,
                letterSpacing: '-.5px',
              }}
            >
              {tokenId}
            </h2>
          </div>

          {/* FARMER INFO */}
          <div
            style={{
              display: 'grid',
              gap: 10,
              marginBottom: 22,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 13px',
                borderRadius: 12,
                background: 'rgba(20,45,28,.035)',
              }}
            >
              <span
                style={{
                  width: 37,
                  height: 37,
                  borderRadius: 10,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'rgba(32,112,48,.09)',
                  color: '#28733a',
                }}
              >
                <Icon name="user" size={19} />
              </span>

              <div>
                <b
                  style={{
                    display: 'block',
                    fontSize: 15,
                    marginBottom: 2,
                  }}
                >
                  R. Kumar
                </b>

                <span
                  style={{
                    fontSize: 13,
                    opacity: 0.57,
                  }}
                >
                  Registered farmer
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 13px',
                borderRadius: 12,
                background: 'rgba(20,45,28,.035)',
              }}
            >
              <span
                style={{
                  width: 37,
                  height: 37,
                  borderRadius: 10,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'rgba(219,165,57,.11)',
                  color: '#94701b',
                }}
              >
                <Icon name="wheat" size={19} />
              </span>

              <div>
                <b
                  style={{
                    display: 'block',
                    fontSize: 15,
                    marginBottom: 2,
                  }}
                >
                  Wheat
                </b>

                <span
                  style={{
                    fontSize: 13,
                    opacity: 0.57,
                  }}
                >
                  50 quintals
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 13px',
                borderRadius: 12,
                background: 'rgba(20,45,28,.035)',
              }}
            >
              <span
                style={{
                  width: 37,
                  height: 37,
                  borderRadius: 10,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'rgba(20,45,28,.07)',
                  opacity: 0.75,
                }}
              >
                <Icon name="vehicle" size={19} />
              </span>

              <div>
                <b
                  style={{
                    display: 'block',
                    fontSize: 15,
                    marginBottom: 2,
                  }}
                >
                  WB-02-X-4321
                </b>

                <span
                  style={{
                    fontSize: 13,
                    opacity: 0.57,
                  }}
                >
                  Vehicle registration
                </span>
              </div>
            </div>
          </div>

          {/* PROCEED BUTTON */}
          <motion.button
            className="primary"
            whileHover={{
              scale: 1.015,
              y: -2,
            }}
            whileTap={{
              scale: 0.975,
            }}
            onClick={handleProceed}
            style={{
              width: '100%',
              minHeight: 53,
              padding: '13px 18px',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 850,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 9,
              cursor: 'pointer',
            }}
          >
            <Icon name="shield" size={19} />
            Verify & Proceed
            <Icon name="arrow" size={17} />
          </motion.button>

          <p
            style={{
              margin: '11px 0 0',
              textAlign: 'center',
              fontSize: 12,
              opacity: 0.5,
              lineHeight: 1.45,
            }}
          >
            Verification will move this token to quality assessment.
          </p>
        </Card>
      </div>

      {/* VERIFICATION STEPS */}
      <Card
        style={{
          marginTop: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 850,
              letterSpacing: '.8px',
              opacity: 0.58,
              whiteSpace: 'nowrap',
            }}
          >
            GATE WORKFLOW
          </span>

          {[
            ['1', 'QR Scan', true],
            ['2', 'Verification', true],
            ['3', 'Quality Check', false],
            ['4', 'Weighbridge', false],
          ].map(([number, label, active], index) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: active ? 800 : 650,
                opacity: active ? 1 : 0.42,
              }}
            >
              <span
                style={{
                  width: 27,
                  height: 27,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 12,
                  fontWeight: 850,
                  background: active
                    ? '#207030'
                    : 'rgba(20,45,28,.07)',
                  color: active ? '#fff' : 'inherit',
                }}
              >
                {number}
              </span>

              {label}

              {index < 3 && (
                <span
                  style={{
                    width: 24,
                    height: 1,
                    background: 'rgba(20,45,28,.13)',
                    marginLeft: 4,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}