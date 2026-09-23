import { motion } from 'framer-motion'
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

  if (name === 'wheat') {
    return (
      <svg {...common}>
        <path d="M12 21V4" />
        <path d="M12 9C8 9 6 7 6 4c4 0 6 2 6 5Z" />
        <path d="M12 13c4 0 6-2 6-5-4 0-6 2-6 5Z" />
        <path d="M12 17c-4 0-6-2-6-5 4 0 6 2 6 5Z" />
        <path d="M12 21c4 0 6-2 6-5-4 0-6 2-6 5Z" />
      </svg>
    )
  }

  if (name === 'trend') {
    return (
      <svg {...common}>
        <path d="M4 17l5-5 4 3 7-8" />
        <path d="M16 7h4v4" />
      </svg>
    )
  }

  if (name === 'shield') {
    return (
      <svg {...common}>
        <path d="M12 3l7 3v5c0 4.8-3 8.4-7 10-4-1.6-7-5.2-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" />
      <path d="M15 9.5c-.7-.8-1.7-1.2-3-1.2-1.6 0-2.7.8-2.7 2 0 3 5.7 1.4 5.7 4.2 0 1.2-1.1 2-2.8 2-1.4 0-2.5-.5-3.2-1.3" />
    </svg>
  )
}

export default function MSPPrices({ prices: remotePrices = [] }) {
  const prices = remotePrices.map((item) => [item.crop, item.formattedPrice || `₹${Number(item.pricePerQuintal || 0).toLocaleString('en-IN')} / q`, item.season || 'Reference'])

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
          marginBottom: 28,
          paddingBottom: 24,
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
            PRICE TRANSPARENCY
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
            MSP Prices
          </h1>

          <p
            style={{
              margin: '14px 0 0',
              maxWidth: 650,
              color: '#68766c',
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            Reference minimum support prices for procurement planning,
            farmer decisions, and transparent mandi operations.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '11px 16px',
            border: '1px solid rgba(32,112,48,.18)',
            background: '#f3f8f1',
            borderRadius: 999,
            color: '#207030',
            fontSize: 13,
            fontWeight: 800,
            whiteSpace: 'nowrap',
          }}
        >
          <Icon name="shield" size={18} />
          Official reference
        </div>
      </div>

      {/* SUMMARY STRIP */}
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
          ['04', 'Tracked Crops', 'Current reference list'],
          ['₹2,585', 'Wheat MSP', 'Per quintal'],
          ['₹6,200', 'Highest Listed', 'Mustard · per quintal'],
        ].map(([value, label, note], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ backgroundColor: '#f5f8f2' }}
            style={{
              background: '#fff',
              padding: '22px 25px',
              minHeight: 100,
            }}
          >
            <div
              style={{
                fontSize: 27,
                fontWeight: 850,
                color: '#17251b',
                letterSpacing: '-.6px',
              }}
            >
              {value}
            </div>

            <div
              style={{
                marginTop: 5,
                fontWeight: 800,
                color: '#304236',
              }}
            >
              {label}
            </div>

            <div
              style={{
                marginTop: 3,
                color: '#89938c',
                fontSize: 12,
              }}
            >
              {note}
            </div>
          </motion.div>
        ))}
      </div>

      {/* PRICE TABLE */}
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
            paddingBottom: 20,
            marginBottom: 5,
            borderBottom: '1px solid rgba(23,37,27,.10)',
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                color: '#17251b',
              }}
            >
              Current reference prices
            </h2>

            <p
              style={{
                margin: '6px 0 0',
                color: '#7b877e',
                fontSize: 13,
              }}
            >
              Use these values when reviewing procurement offers.
            </p>
          </div>

          <div
            style={{
              fontSize: 12,
              color: '#68766c',
              fontWeight: 700,
            }}
          >
            Unit: ₹ / quintal
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: 700,
            }}
          >
            <thead>
              <tr
                style={{
                  textAlign: 'left',
                  borderBottom: '1px solid rgba(23,37,27,.10)',
                }}
              >
                <th style={thStyle}>CROP</th>
                <th style={thStyle}>REFERENCE MSP</th>
                <th style={thStyle}>REFERENCE STATUS</th>
                <th style={thStyle}>PLANNING USE</th>
              </tr>
            </thead>

            <tbody>
              {prices.map(([crop, price, status], i) => (
                <motion.tr
                  key={crop}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.08 }}
                  whileHover={{
                    backgroundColor: '#f7f9f5',
                  }}
                  style={{
                    borderBottom:
                      i === prices.length - 1
                        ? 'none'
                        : '1px solid rgba(23,37,27,.07)',
                  }}
                >
                  <td style={tdStyle}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 13,
                      }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          display: 'grid',
                          placeItems: 'center',
                          borderRadius: 12,
                          background: '#eef5e9',
                          color: '#207030',
                        }}
                      >
                        <Icon name="wheat" size={22} />
                      </div>

                      <div>
                        <strong
                          style={{
                            display: 'block',
                            color: '#17251b',
                            fontSize: 15,
                          }}
                        >
                          {crop}
                        </strong>

                        <span
                          style={{
                            color: '#89938c',
                            fontSize: 12,
                          }}
                        >
                          Procurement reference
                        </span>
                      </div>
                    </div>
                  </td>

                  <td style={tdStyle}>
                    <strong
                      style={{
                        fontSize: 20,
                        color: '#17251b',
                        letterSpacing: '-.3px',
                      }}
                    >
                      {price}
                    </strong>
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 7,
                        padding: '7px 11px',
                        borderRadius: 999,
                        background:
                          status === 'Stable' ? '#edf6ed' : '#f6f1df',
                        color:
                          status === 'Stable' ? '#207030' : '#876d1e',
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background:
                            status === 'Stable' ? '#207030' : '#b38a20',
                        }}
                      />
                      {status}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        color: '#68766c',
                        fontSize: 13,
                        lineHeight: 1.45,
                      }}
                    >
                      Compare against offered procurement rate before
                      confirmation.
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* INFORMATION SECTION */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: 20,
          marginTop: 20,
        }}
      >
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
                width: 46,
                height: 46,
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 12,
                background: '#eef5e9',
                color: '#207030',
              }}
            >
              <Icon name="trend" size={23} />
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 17,
                  color: '#17251b',
                }}
              >
                Why MSP matters
              </h3>

              <p
                style={{
                  margin: '7px 0 0',
                  color: '#68766c',
                  fontSize: 13,
                  lineHeight: 1.65,
                }}
              >
                MSP provides a reference point when evaluating procurement
                offers. Farmers and mandi operators can use the displayed
                values to make pricing discussions easier and more
                transparent.
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
                width: 46,
                height: 46,
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 12,
                background: '#f6f1df',
                color: '#8b701f',
              }}
            >
              <Icon name="shield" size={23} />
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 17,
                  color: '#17251b',
                }}
              >
                Price transparency
              </h3>

              <p
                style={{
                  margin: '7px 0 0',
                  color: '#68766c',
                  fontSize: 13,
                  lineHeight: 1.65,
                }}
              >
                Reference prices are displayed clearly so procurement
                decisions can be compared against a common benchmark.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* FOOTER NOTE */}
      <div
        style={{
          marginTop: 20,
          padding: '15px 18px',
          borderLeft: '3px solid #207030',
          background: '#f5f7f3',
          color: '#6d786f',
          fontSize: 12,
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: '#304236' }}>Planning note:</strong>{' '}
        These values are presented as the reference prices configured in
        this frontend. They are intended for procurement-planning UI and
        should be updated from the appropriate official source when live
        data is connected.
      </div>
    </motion.div>
  )
}

const thStyle = {
  padding: '14px 12px',
  fontSize: 11,
  letterSpacing: 1.1,
  color: '#879188',
  fontWeight: 850,
}

const tdStyle = {
  padding: '18px 12px',
  verticalAlign: 'middle',
}