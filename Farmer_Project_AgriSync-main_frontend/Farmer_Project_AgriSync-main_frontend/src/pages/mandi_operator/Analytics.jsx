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
    'aria-hidden': true,
  }

  const icons = {
    produce: (
      <>
        <path d="M12 21V5" />
        <path d="M12 10c-3.5 0-5-2-5-5 3.5 0 5 2 5 5Z" />
        <path d="M12 14c3.5 0-5-2-5-5 3.5 0 5 5 5 5Z" />
        <path d="M12 18c3.5 0-5-2-5-5 3.5 0 5 2 5 5Z" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),

    money: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M7 9h.01M17 15h.01" />
      </>
    ),

    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h17" />
        <path d="m7 15 4-4 3 2 5-7" />
      </>
    ),

    calendar: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
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

const hourlyData = [
  { time: '07 AM', value: 25 },
  { time: '08 AM', value: 38 },
  { time: '09 AM', value: 42 },
  { time: '10 AM', value: 55 },
  { time: '11 AM', value: 70 },
  { time: '12 PM', value: 82 },
  { time: '01 PM', value: 90 },
  { time: '02 PM', value: 74 },
  { time: '03 PM', value: 62 },
  { time: '04 PM', value: 50 },
  { time: '05 PM', value: 35 },
  { time: '06 PM', value: 20 },
]

const cropData = [
  { name: 'Wheat', value: 128, percent: 41 },
  { name: 'Paddy', value: 96, percent: 31 },
  { name: 'Maize', value: 54, percent: 17 },
  { name: 'Other', value: 34, percent: 11 },
]

export default function Analytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
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
          PAGE HEADER
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
          flexWrap: 'wrap',
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
            PERFORMANCE INTELLIGENCE
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 42,
              lineHeight: 1.1,
              fontWeight: 800,
              color: '#17251b',
              letterSpacing: -1,
            }}
          >
            Mandi Analytics
          </h1>

          <p
            style={{
              margin: '9px 0 0',
              fontSize: 16,
              color: '#697569',
            }}
          >
            Understand throughput, waiting time and procurement value.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            border: '1px solid #d9e1d5',
            background: '#fff',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 800,
            color: '#405044',
          }}
        >
          <Icon name="calendar" size={18} />
          Today · Live Data
        </div>
      </div>

      {/* =====================================================
          KPI STRIP
      ====================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          border: '1px solid #dfe5dc',
          background: '#fff',
          marginBottom: 24,
        }}
      >
        {[
          {
            value: '312 q',
            label: 'Total Produce',
            sub: '+12.4% vs yesterday',
            icon: 'produce',
          },
          {
            value: '94%',
            label: 'On-time Processing',
            sub: '+3.2% vs yesterday',
            icon: 'check',
          },
          {
            value: '18 min',
            label: 'Average Wait',
            sub: '4 min faster today',
            icon: 'clock',
          },
          {
            value: '₹8.4L',
            label: 'Total Value',
            sub: '+8.7% vs yesterday',
            icon: 'money',
          },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ backgroundColor: '#fafcf8' }}
            style={{
              minHeight: 145,
              padding: '22px 24px',
              borderRight:
                index !== 3 ? '1px solid #dfe5dc' : 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: '#778176',
                }}
              >
                {item.label.toUpperCase()}
              </span>

              <span
                style={{
                  color: '#46714b',
                }}
              >
                <Icon name={item.icon} size={20} />
              </span>
            </div>

            <div>
              <strong
                style={{
                  display: 'block',
                  fontFamily: 'Space Grotesk, Inter, sans-serif',
                  fontSize: 31,
                  lineHeight: 1,
                  fontWeight: 800,
                  color: '#1e2d22',
                }}
              >
                {item.value}
              </strong>

              <span
                style={{
                  display: 'block',
                  marginTop: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#648068',
                }}
              >
                {item.sub}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* =====================================================
          MAIN CHART ROW
      ====================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 24,
          marginBottom: 24,
        }}
      >
        {/* HOURLY THROUGHPUT */}
        <Card>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 28,
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  marginBottom: 7,
                  color: '#344a37',
                }}
              >
                <Icon name="chart" size={20} />

                <h2
                  style={{
                    margin: 0,
                    fontFamily: 'Space Grotesk, Inter, sans-serif',
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  Hourly Throughput
                </h2>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: '#788277',
                }}
              >
                Relative produce handled throughout the day.
              </p>
            </div>

            <span
              style={{
                padding: '7px 11px',
                background: '#f2f5ef',
                border: '1px solid #e0e5dc',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 800,
                color: '#687365',
              }}
            >
              QUINTALS / HOUR
            </span>
          </div>

          {/* CHART */}
          <div
            style={{
              height: 300,
              display: 'flex',
              alignItems: 'flex-end',
              gap: 12,
              padding: '0 10px 0 8px',
              borderBottom: '1px solid #dfe5dc',
              position: 'relative',
            }}
          >
            {/* GRID */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '25%',
                borderTop: '1px dashed #e3e7e0',
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                borderTop: '1px dashed #e3e7e0',
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '75%',
                borderTop: '1px dashed #e3e7e0',
              }}
            />

            {hourlyData.map((item, index) => (
              <div
                key={item.time}
                style={{
                  flex: 1,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: `${item.value}%`,
                  }}
                  transition={{
                    delay: index * 0.045,
                    duration: 0.5,
                    ease: 'easeOut',
                  }}
                  whileHover={{
                    filter: 'brightness(.92)',
                  }}
                  title={`${item.time}: ${item.value}%`}
                  style={{
                    width: '72%',
                    minWidth: 12,
                    maxWidth: 38,
                    background:
                      'linear-gradient(180deg, #579b57 0%, #2d6c35 100%)',
                    borderRadius: '5px 5px 0 0',
                    transformOrigin: 'bottom',
                    cursor: 'pointer',
                  }}
                />
              </div>
            ))}
          </div>

          {/* X AXIS */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              padding: '10px 10px 0 8px',
            }}
          >
            {hourlyData.map((item) => (
              <div
                key={item.time}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#7b8479',
                }}
              >
                {item.time}
              </div>
            ))}
          </div>
        </Card>

        {/* CROP MIX */}
        <Card>
          <div
            style={{
              marginBottom: 20,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontSize: 22,
                fontWeight: 800,
                color: '#1d2b20',
              }}
            >
              Crop Mix
            </h2>

            <p
              style={{
                margin: '6px 0 0',
                fontSize: 14,
                color: '#788277',
              }}
            >
              Produce received today.
            </p>
          </div>

          {/* DONUT */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '8px 0 26px',
            }}
          >
            <div
              style={{
                width: 190,
                height: 190,
                borderRadius: '50%',
                background:
                  'conic-gradient(#2f7138 0 41%, #69a85d 41% 72%, #d6a63b 72% 89%, #c9cec6 89% 100%)',
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 122,
                  height: 122,
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
                    fontFamily: 'Space Grotesk, Inter, sans-serif',
                    fontSize: 28,
                    color: '#203024',
                  }}
                >
                  312
                </strong>

                <span
                  style={{
                    fontSize: 12,
                    color: '#7a8479',
                    fontWeight: 700,
                  }}
                >
                  TOTAL Q
                </span>
              </div>
            </div>
          </div>

          {/* LEGEND */}
          <div
            style={{
              display: 'grid',
              gap: 12,
            }}
          >
            {cropData.map((item, index) => (
              <div
                key={item.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 10,
                  borderBottom: '1px solid #edf0eb',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                  }}
                >
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background:
                        index === 0
                          ? '#2f7138'
                          : index === 1
                            ? '#69a85d'
                            : index === 2
                              ? '#d6a63b'
                              : '#c9cec6',
                    }}
                  />

                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#435044',
                    }}
                  >
                    {item.name}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                  }}
                >
                  <b
                    style={{
                      fontSize: 14,
                      color: '#253127',
                    }}
                  >
                    {item.value} q
                  </b>

                  <span
                    style={{
                      width: 38,
                      textAlign: 'right',
                      fontSize: 12,
                      color: '#7c857b',
                    }}
                  >
                    {item.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* =====================================================
          OPERATIONAL PERFORMANCE
      ====================================================== */}
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 22,
            paddingBottom: 18,
            borderBottom: '1px solid #e1e6df',
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontSize: 22,
                fontWeight: 800,
                color: '#1d2b20',
              }}
            >
              Operational Performance
            </h2>

            <p
              style={{
                margin: '5px 0 0',
                fontSize: 14,
                color: '#788277',
              }}
            >
              Key indicators across today's mandi operations.
            </p>
          </div>

          <Icon name="chart" size={23} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
          }}
        >
          {[
            {
              title: 'Gate Processing',
              value: '96%',
              description: 'Tokens processed successfully',
            },
            {
              title: 'Quality Clearance',
              value: '91%',
              description: 'First-pass quality approvals',
            },
            {
              title: 'Payment Completion',
              value: '98%',
              description: 'Settled without exceptions',
            },
          ].map((item, index) => (
            <div
              key={item.title}
              style={{
                padding: '8px 28px 12px',
                borderRight:
                  index !== 2
                    ? '1px solid #e0e5dd'
                    : 'none',
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#657064',
                  marginBottom: 12,
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <strong
                  style={{
                    fontFamily: 'Space Grotesk, Inter, sans-serif',
                    fontSize: 32,
                    color: '#2d7138',
                  }}
                >
                  {item.value}
                </strong>

                <div
                  style={{
                    flex: 1,
                    height: 7,
                    background: '#e7ece4',
                    overflow: 'hidden',
                    borderRadius: 999,
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: item.value }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      duration: 0.7,
                    }}
                    style={{
                      height: '100%',
                      background: '#4d8c4f',
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>

              <p
                style={{
                  margin: '10px 0 0',
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: '#7b857a',
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
          marginTop: 24,
          paddingTop: 18,
          borderTop: '1px solid #dfe5dc',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: '#7a8478',
          }}
        >
          Analytics are based on the current procurement queue available to the operator.
        </div>

        <button
          type="button"
          onClick={() =>
            alert('Detailed analytics report can be prepared from the current procurement data.')
          }
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 15px',
            border: '1px solid #cfd8cc',
            background: '#fff',
            borderRadius: 7,
            color: '#344235',
            fontSize: 13,
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          View Detailed Report
          <Icon name="arrow" size={16} />
        </button>
      </div>
    </motion.div>
  )
}