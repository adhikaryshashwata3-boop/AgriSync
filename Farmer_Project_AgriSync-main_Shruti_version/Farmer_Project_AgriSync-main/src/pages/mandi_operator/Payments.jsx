import { motion } from 'framer-motion'
import Card from './_Card'

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  const icons = {
    wallet: (
      <>
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H20v14H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" />
        <path d="M4 8h16" />
        <path d="M16 12h4" />
        <circle cx="16" cy="12" r="1" />
      </>
    ),

    check: (
      <path d="m5 12 4 4L19 6" />
    ),

    receipt: (
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M9 16h3" />
      </>
    ),

    farmer: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20c.7-3.2 3.1-5 7-5s6.3 1.8 7 5" />
      </>
    ),

    grain: (
      <>
        <path d="M12 21V5" />
        <path d="M12 10c-3.5 0-5-2-5-5 3.5 0 5 2 5 5Z" />
        <path d="M12 14c3.5 0 5-2 5-5-3.5 0-5 2-5 5Z" />
        <path d="M12 18c-3.5 0-5-2-5-5 3.5 0 5 2 5 5Z" />
      </>
    ),

    bank: (
      <>
        <path d="m3 9 9-5 9 5" />
        <path d="M5 10v7M9 10v7M15 10v7M19 10v7" />
        <path d="M3 20h18" />
      </>
    ),

    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
  }

  return <svg {...common}>{icons[name]}</svg>
}

export default function Payments({ quantity = 0, tokenId = '—', onToast, onGenerateReceipt }) {
  const safeQuantity = Number(quantity || 0)
  const mspRate = 2585
  const amount = safeQuantity * mspRate

  const handleReceipt = async () => {
    if (!tokenId || tokenId === '—') {
      onToast?.('No verified token is available for settlement.')
      return
    }
    await onGenerateReceipt?.({ tokenId, netWeightQuintal: safeQuantity })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        width: '100%',
        maxWidth: 1400,
        margin: '0 auto',
        padding: '10px 0 50px',
      }}
    >
      {/* =====================================================
          WEBSITE HEADER
      ====================================================== */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 30,
          paddingBottom: 24,
          marginBottom: 28,
          borderBottom: '1px solid #dfe5dc',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 1.8,
              color: '#71806f',
              marginBottom: 9,
            }}
          >
            PROCUREMENT · PAYMENT DESK
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 42,
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#17251b',
              letterSpacing: -1,
            }}
          >
            Procurement Payment
          </h1>

          <p
            style={{
              margin: '9px 0 0',
              fontSize: 16,
              color: '#697569',
            }}
          >
            Review and finalize the procurement transaction.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            border: '1px solid #cfe1c9',
            background: '#eef7eb',
            color: '#286334',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#3d9848',
            }}
          />

          Payment Completed
        </div>
      </div>

      {/* =====================================================
          PAYMENT OVERVIEW
      ====================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gap: 24,
          marginBottom: 24,
        }}
      >
        {/* LEFT — AMOUNT */}
        <Card>
          <div
            style={{
              minHeight: 250,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
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
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: 1.4,
                    color: '#7a8477',
                  }}
                >
                  TOTAL TRANSACTION VALUE
                </div>

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    color: '#687467',
                  }}
                >
                  Transaction ID · {tokenId}
                </div>
              </div>

              <div
                style={{
                  width: 48,
                  height: 48,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 10,
                  background: '#edf5e9',
                  color: '#2d7138',
                }}
              >
                <Icon name="wallet" size={25} />
              </div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  fontFamily: 'Space Grotesk, Inter, sans-serif',
                  fontSize: 52,
                  lineHeight: 1,
                  fontWeight: 800,
                  color: '#245d2d',
                  letterSpacing: -1.5,
                }}
              >
                ₹{amount.toLocaleString('en-IN')}
              </motion.div>

              <div
                style={{
                  marginTop: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#527258',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                <Icon name="check" size={17} />
                Settlement completed successfully
              </div>
            </div>
          </div>
        </Card>

        {/* RIGHT — FARMER */}
        <Card>
          <div
            style={{
              height: '100%',
              minHeight: 250,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1.4,
                color: '#7a8477',
              }}
            >
              FARMER & PRODUCE
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 12,
                    background: '#edf4e9',
                    color: '#36703c',
                  }}
                >
                  <Icon name="farmer" size={27} />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 21,
                      fontWeight: 800,
                      color: '#243127',
                    }}
                  >
                    R. Kumar
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 14,
                      color: '#758074',
                    }}
                  >
                    Farmer · Token {tokenId}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    padding: 15,
                    background: '#f7f9f5',
                    border: '1px solid #e1e6df',
                    borderRadius: 8,
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#7a8478',
                      letterSpacing: 0.8,
                    }}
                  >
                    CROP
                  </span>

                  <b
                    style={{
                      display: 'block',
                      marginTop: 6,
                      fontSize: 16,
                      color: '#263228',
                    }}
                  >
                    Wheat
                  </b>
                </div>

                <div
                  style={{
                    padding: 15,
                    background: '#f7f9f5',
                    border: '1px solid #e1e6df',
                    borderRadius: 8,
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#7a8478',
                      letterSpacing: 0.8,
                    }}
                  >
                    QUANTITY
                  </span>

                  <b
                    style={{
                      display: 'block',
                      marginTop: 6,
                      fontSize: 16,
                      color: '#263228',
                    }}
                  >
                    {safeQuantity.toFixed(1)} q
                  </b>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* =====================================================
          PAYMENT BREAKDOWN
      ====================================================== */}
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            paddingBottom: 18,
            borderBottom: '1px solid #e1e6df',
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontSize: 23,
                fontWeight: 800,
                color: '#1c2a20',
              }}
            >
              Payment Breakdown
            </h2>

            <p
              style={{
                margin: '5px 0 0',
                fontSize: 14,
                color: '#778176',
              }}
            >
              Certified quantity and applicable MSP rate.
            </p>
          </div>

          <Icon name="receipt" size={24} />
        </div>

        {/* TABLE HEADER */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
            padding: '12px 16px',
            background: '#f4f6f2',
            border: '1px solid #e1e6df',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.8,
            color: '#778176',
          }}
        >
          <span>DESCRIPTION</span>
          <span>QUANTITY</span>
          <span>RATE</span>
          <span style={{ textAlign: 'right' }}>AMOUNT</span>
        </div>

        {/* TABLE ROW */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
            alignItems: 'center',
            padding: '22px 16px',
            borderLeft: '1px solid #e1e6df',
            borderRight: '1px solid #e1e6df',
            borderBottom: '1px solid #e1e6df',
            fontSize: 15,
            color: '#344034',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              fontWeight: 800,
            }}
          >
            <Icon name="grain" size={21} />
            Wheat Procurement
          </div>

          <span>{safeQuantity.toFixed(1)} q</span>

          <span>₹{mspRate.toLocaleString('en-IN')}</span>

          <strong
            style={{
              textAlign: 'right',
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 18,
              color: '#245d2d',
            }}
          >
            ₹{amount.toLocaleString('en-IN')}
          </strong>
        </div>

        {/* TOTAL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '22px 16px',
            borderLeft: '1px solid #e1e6df',
            borderRight: '1px solid #e1e6df',
            borderBottom: '1px solid #e1e6df',
            background: '#fafbf9',
          }}
        >
          <div
            style={{
              width: 320,
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              rowGap: 10,
              alignItems: 'center',
            }}
          >
            <span
              style={{
                color: '#6f796e',
                fontSize: 14,
              }}
            >
              Subtotal
            </span>

            <span
              style={{
                textAlign: 'right',
                fontWeight: 700,
              }}
            >
              ₹{amount.toLocaleString('en-IN')}
            </span>

            <span
              style={{
                color: '#6f796e',
                fontSize: 14,
              }}
            >
              Deductions
            </span>

            <span
              style={{
                textAlign: 'right',
                fontWeight: 700,
              }}
            >
              ₹0
            </span>

            <div
              style={{
                gridColumn: '1 / -1',
                height: 1,
                background: '#dce2da',
                margin: '4px 0',
              }}
            />

            <strong
              style={{
                fontSize: 16,
                color: '#253127',
              }}
            >
              Final Payable
            </strong>

            <strong
              style={{
                textAlign: 'right',
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontSize: 24,
                color: '#245d2d',
              }}
            >
              ₹{amount.toLocaleString('en-IN')}
            </strong>
          </div>
        </div>
      </Card>

      {/* =====================================================
          TRANSACTION INFORMATION
      ====================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 18,
          marginTop: 24,
        }}
      >
        {[
          ['Transaction ID', tokenId],
          ['MSP Rate', `₹${mspRate.toLocaleString('en-IN')} / q`],
          ['Payment Status', 'Settled'],
        ].map(([label, value], index) => (
          <motion.div
            key={label}
            whileHover={{ y: -2 }}
            style={{
              padding: '18px 20px',
              background: '#fff',
              border: '1px solid #dfe5dc',
              borderRadius: 8,
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 0.8,
                color: '#7b8579',
                marginBottom: 7,
              }}
            >
              {label.toUpperCase()}
            </span>

            <strong
              style={{
                fontSize: 17,
                color: index === 2 ? '#2d7138' : '#273329',
              }}
            >
              {value}
            </strong>
          </motion.div>
        ))}
      </div>

      {/* =====================================================
          ACTION BAR
      ====================================================== */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
          marginTop: 28,
          paddingTop: 22,
          borderTop: '1px solid #dfe5dc',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 700,
              color: '#536052',
            }}
          >
            <Icon name="check" size={17} />
            Transaction is ready for receipt generation.
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 13,
              color: '#7a8478',
            }}
          >
            Settlement receipt is issued through the connected procurement gateway.
          </div>
        </div>

        <motion.button
          whileHover={{
            y: -2,
            boxShadow: '0 8px 20px rgba(39,95,49,.18)',
          }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleReceipt}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            minHeight: 52,
            padding: '0 25px',
            border: 'none',
            borderRadius: 7,
            background: '#285f31',
            color: '#fff',
            fontSize: 15,
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          <Icon name="download" size={19} />
          Generate Receipt
          <Icon name="arrow" size={18} />
        </motion.button>
      </div>
    </motion.div>
  )
}