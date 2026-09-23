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
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="3" />
        <path d="M16 2v4M8 2v4M3 9h18" />
      </>
    ),

    queue: (
      <>
        <path d="M6 5h12M6 12h12M6 19h8" />
        <circle cx="4" cy="5" r="1" fill="currentColor" />
        <circle cx="4" cy="12" r="1" fill="currentColor" />
        <circle cx="4" cy="19" r="1" fill="currentColor" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    wheat: (
      <>
        <path d="M12 21V7" />
        <path d="M12 10C8 10 6 8 6 5c3 0 6 1 6 5Z" />
        <path d="M12 14c4 0 6-2 6-5-3 0-6 1-6 5Z" />
        <path d="M12 17c-3 0-5-2-5-5 3 0 5 1 5 5Z" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),

    money: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M7 10h.01M17 14h.01" />
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
        <path d="M4 17l6-6 4 4 6-7" />
        <path d="M15 8h5v5" />
      </>
    ),
  }

  return <svg {...common}>{icons[name]}</svg>
}


function formatProcurementDate(date) {
  if (!date) return 'Date not available'

  const parsedDate = new Date(date)

  if (isNaN(parsedDate.getTime())) {
    return 'Date not available'
  }

  return parsedDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}



export default function FarmerDashboard({
    token,
    date,
    slot,
    ahead,
    wait,
    farmerName,
    mandiName,
    cropType,
    quantity,
    onNavigate,
    msp,
}) {
  const safeMsp = Array.isArray(msp) ? msp : []

  const aheadNumber = Number(ahead) || 0
  const waitNumber = Number(wait) || 0

  const progress = Math.max(
    12,
    Math.min(92, 100 - aheadNumber * 4)
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        maxWidth: 1450,
        margin: '0 auto',
        paddingBottom: 50,
      }}
    >
      {/* TOP HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 24,
          marginBottom: 26,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 1.5,
              color: '#6d7d70',
              marginBottom: 8,
            }}
          >
            FARMER PORTAL • TODAY
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(30px, 4vw, 46px)',
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: '#17351f',
            }}
          >
            Good morning, {farmerName || 'Farmer'}
          </h1>

          <p
            style={{
              margin: '10px 0 0',
              color: '#66746a',
              fontSize: 16,
              maxWidth: 650,
            }}
          >
            Everything you need for today’s procurement, in one simple view.
          </p>
        </div>

        <button
          className="primary"
          onClick={() => onNavigate('book')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            padding: '13px 20px',
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          <Icon name="calendar" size={18} />
          Book a Slot
        </button>
      </div>

      {/* MAIN HERO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          minHeight: 330,
          borderRadius: 24,
          overflow: 'hidden',
          marginBottom: 22,
          background:
            'linear-gradient(135deg, #173f25 0%, #246b38 58%, #3f8850 100%)',
          boxShadow: '0 18px 50px rgba(23,63,37,0.16)',
        }}
      >
        {/* HERO LEFT */}
        <div
          style={{
            padding: '38px 42px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 280,
              height: 280,
              borderRadius: '50%',
              right: -120,
              top: -130,
              background: 'rgba(255,255,255,0.07)',
            }}
          />

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 11px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.12)',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#b9ef8c',
                boxShadow: '0 0 0 5px rgba(185,239,140,0.12)',
              }}
            />
            PROCUREMENT ACTIVE
          </div>

          <h2
            style={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              margin: '25px 0 10px',
              letterSpacing: -1,
              lineHeight: 1.05,
            }}
          >
            {mandiName || 'No mandi selected'}
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'rgba(255,255,255,0.76)',
              fontSize: 14,
            }}
          >
            <Icon name="location" size={16} />
            Your selected procurement centre
          </div>

          <p
            style={{
              maxWidth: 570,
              color: 'rgba(255,255,255,0.78)',
              lineHeight: 1.7,
              margin: '20px 0 26px',
            }}
          >
            Your {cropType || 'produce'} booking of {quantity ?? 0} quintals is confirmed.
Keep your produce ready and follow your live queue position below.
          </p>

          <button
            onClick={() => onNavigate('queue')}
            style={{
              border: '1px solid rgba(255,255,255,0.28)',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              padding: '12px 17px',
              borderRadius: 10,
              cursor: 'pointer',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
            }}
          >
            Track Live Queue
            <Icon name="arrow" size={17} />
          </button>
        </div>

        {/* TOKEN PANEL */}
        <div
          style={{
            background: '#f8f5e9',
            padding: 34,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: 1.5,
              fontWeight: 900,
              color: '#758178',
            }}
          >
            YOUR LIVE TOKEN
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              margin: '8px 0 5px',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(44px, 5vw, 64px)',
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: -2,
                color: '#183d24',
              }}
            >
              {token}
            </div>

            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: '#e3f2df',
                color: '#28723b',
              }}
            >
              <Icon name="check" size={22} />
            </div>
          </div>

          <div
            style={{
              display: 'inline-flex',
              width: 'fit-content',
              padding: '7px 10px',
              borderRadius: 8,
              background: '#e5f2e3',
              color: '#286a37',
              fontSize: 12,
              fontWeight: 800,
              marginBottom: 24,
            }}
          >
          Confirmed • {formatProcurementDate(date)} • {slot}
          </div>

          {/* QUEUE PROGRESS */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
                fontSize: 12,
                fontWeight: 800,
                color: '#5f6b62',
              }}
            >
              <span>Queue progress</span>
              <span>{aheadNumber} ahead</span>
            </div>

            <div
              style={{
                height: 9,
                background: '#deded2',
                borderRadius: 999,
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.25 }}
                style={{
                  height: '100%',
                  borderRadius: 999,
                  background:
                    'linear-gradient(90deg, #2d743d, #83ad4e)',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 10,
                color: '#748078',
                fontSize: 12,
              }}
            >
              <span>Estimated wait</span>
              <strong style={{ color: '#244c2d' }}>
                {waitNumber} min
              </strong>
            </div>
          </div>
        </div>
      </motion.div>

      {/* QUICK STATS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
          marginBottom: 22,
        }}
      >
        {[
          {
            icon: 'queue',
            label: 'Current position',
            value: `${aheadNumber}`,
            suffix: 'farmers ahead',
          },
          {
            icon: 'clock',
            label: 'Estimated wait',
            value: `${waitNumber}`,
            suffix: 'minutes',
          },
          {
            icon: 'money',
            label: "Today's wheat MSP",
            value: '₹2,585',
            suffix: 'per quintal',
          },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + index * 0.08 }}
            whileHover={{ y: -3 }}
            style={{
              background: '#fff',
              border: '1px solid #e5e9e1',
              borderRadius: 16,
              padding: '20px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: 15,
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
                background: '#edf5e9',
                color: '#36733f',
              }}
            >
              <Icon name={item.icon} size={21} />
            </div>

            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#778178',
                  marginBottom: 4,
                }}
              >
                {item.label}
              </div>

              <strong
                style={{
                  fontSize: 23,
                  color: '#1c3b25',
                  marginRight: 7,
                }}
              >
                {item.value}
              </strong>

              <span
                style={{
                  color: '#778178',
                  fontSize: 12,
                }}
              >
                {item.suffix}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LOWER CONTENT */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.65fr 1fr',
          gap: 20,
          alignItems: 'start',
        }}
      >
        {/* MSP TABLE */}
        <Card>
          <div
            className="card-heading"
            style={{
              paddingBottom: 16,
              borderBottom: '1px solid #edf0eb',
            }}
          >
            <div>
              <h3 style={{ marginBottom: 4 }}>MSP Reference</h3>
              <p>Current reference prices for your planning.</p>
            </div>

            <button
              className="text-button"
              onClick={() => onNavigate('msp')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              View all
              <Icon name="arrow" size={15} />
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>MSP</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {safeMsp.length > 0 ? (
                  safeMsp.map(([crop, price]) => (
                    <tr key={crop}>
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 9,
                          }}
                        >
                          <span
                            style={{
                              width: 30,
                              height: 30,
                              display: 'grid',
                              placeItems: 'center',
                              borderRadius: 8,
                              background: '#eef5e8',
                              color: '#477a45',
                            }}
                          >
                            <Icon name="wheat" size={16} />
                          </span>

                          <b>{crop}</b>
                        </div>
                      </td>

                      <td>
                        <strong>{price}</strong>
                      </td>

                      <td>
                        <span className="pill success">
                          Reference
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">
                      No MSP data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* QUICK ACTIONS */}
        <Card>
          <div style={{ marginBottom: 18 }}>
            <h3 style={{ margin: 0 }}>Quick Actions</h3>
            <p style={{ marginTop: 5 }}>
              Get where you need to go faster.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 10,
            }}
          >
            <button
              onClick={() => onNavigate('book')}
              style={{
                width: '100%',
                border: '1px solid #dfe7dc',
                background: '#f7faf5',
                borderRadius: 12,
                padding: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'left',
                color: '#23452c',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontWeight: 800,
                }}
              >
                <Icon name="calendar" size={19} />
                Book procurement slot
              </span>

              <Icon name="arrow" size={17} />
            </button>

            <button
              onClick={() => onNavigate('queue')}
              style={{
                width: '100%',
                border: '1px solid #dfe7dc',
                background: '#f7faf5',
                borderRadius: 12,
                padding: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'left',
                color: '#23452c',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontWeight: 800,
                }}
              >
                <Icon name="queue" size={19} />
                Track live queue
              </span>

              <Icon name="arrow" size={17} />
            </button>

            <button
              onClick={() => onNavigate('msp')}
              style={{
                width: '100%',
                border: '1px solid #dfe7dc',
                background: '#f7faf5',
                borderRadius: 12,
                padding: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'left',
                color: '#23452c',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontWeight: 800,
                }}
              >
                <Icon name="trend" size={19} />
                Check all MSP rates
              </span>

              <Icon name="arrow" size={17} />
            </button>
          </div>

          {/* INFO MESSAGE */}
          <div
            style={{
              marginTop: 18,
              padding: 15,
              borderRadius: 12,
              background: '#f5f1df',
              border: '1px solid #e8dfbd',
              display: 'flex',
              gap: 11,
            }}
          >
            <div
              style={{
                color: '#8a6a22',
                flexShrink: 0,
              }}
            >
              <Icon name="check" size={18} />
            </div>

            <div>
              <strong
                style={{
                  display: 'block',
                  color: '#5e512e',
                  fontSize: 13,
                  marginBottom: 3,
                }}
              >
                You are all set
              </strong>

              <span
                style={{
                  color: '#766d4e',
                  fontSize: 12,
                  lineHeight: 1.5,
                }}
              >
                Your procurement slot is confirmed for today.
              </span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}