import { motion } from 'framer-motion'
import Card from './_Card'

function Icon({ name, size = 20, strokeWidth = 2 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const icons = {
    scale: (
      <>
        <path d="M6 4h12" />
        <path d="M8 4v3" />
        <path d="M16 4v3" />
        <path d="M4 8h16" />
        <path d="M7 8l-3 7h6L7 8Z" />
        <path d="M17 8l-3 7h6l-3-7Z" />
        <path d="M12 8v11" />
        <path d="M8 20h8" />
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

    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),

    truck: (
      <>
        <path d="M3 6h11v10H3z" />
        <path d="M14 9h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),

    bag: (
      <>
        <path d="M7 7h10l1 13H6L7 7Z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
        <path d="M9 11h6" />
      </>
    ),

    weight: (
      <>
        <path d="M6 4h12" />
        <path d="M8 4v4" />
        <path d="M16 4v4" />
        <path d="M5 8h14" />
        <path d="M4 20h16" />
        <path d="M7 20v-7h10v7" />
        <path d="M10 16h4" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    alert: (
      <>
        <path d="M12 3 2.8 19h18.4L12 3Z" />
        <path d="M12 9v4" />
        <path d="M12 16h.01" />
      </>
    ),
  }

  return <svg {...common}>{icons[name]}</svg>
}

export default function Weighbridge({
  gross,
  tare,
  setGross,
  setTare,
  onToast,
  onProceed,
}) {
  const grossValue = Number(gross || 0)
  const tareValue = Number(tare || 0)

  const net = Math.max(0, grossValue - tareValue)
  const quintals = net / 100

  const isReady =
    grossValue > 0 &&
    tareValue >= 0 &&
    grossValue >= tareValue

  const handleProceed = () => {
    if (!isReady) {
      onToast?.(
        'Please enter valid weights. Gross weight must be greater than or equal to tare weight.'
      )
      return
    }

    onProceed?.()
  }

  const handleRefresh = () => {
    onToast?.('Weighbridge reading refreshed')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        width: '100%',
        maxWidth: 1180,
        margin: '0 auto',
        paddingBottom: 40,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 24,
          marginBottom: 26,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 1.5,
              color: '#6c7869',
              marginBottom: 7,
            }}
          >
            SCALE LANE 02 · ACTIVE
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 42,
              lineHeight: 1.08,
              fontWeight: 800,
              color: '#17251b',
            }}
          >
            Weighbridge
          </h1>

          <p
            style={{
              margin: '10px 0 0',
              fontSize: 16,
              color: '#687568',
              lineHeight: 1.6,
            }}
          >
            Record gross and tare weights to certify net produce.
          </p>
        </div>

        <motion.div
          animate={{
            scale: [1, 1.025, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            padding: '11px 16px',
            borderRadius: 999,
            background: '#e7f3e2',
            color: '#286234',
            border: '1px solid #c8dfc0',
            fontSize: 14,
            fontWeight: 800,
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              background: '#3d9b4a',
              boxShadow: '0 0 0 5px #3d9b4a18',
            }}
          />

          Calibrated & Verified
        </motion.div>
      </div>

      {/* MAIN CARD */}
      <Card>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              display: 'grid',
              placeItems: 'center',
              background: '#edf5e9',
              color: '#2f7137',
            }}
          >
            <Icon name="scale" size={24} />
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontSize: 23,
                fontWeight: 800,
                color: '#17251b',
              }}
            >
              Vehicle Weight Capture
            </h2>

            <p
              style={{
                margin: '4px 0 0',
                color: '#758074',
                fontSize: 14,
              }}
            >
              Enter the certified scale readings for this vehicle.
            </p>
          </div>
        </div>

        {/* INPUTS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 18,
          }}
        >
          {/* GROSS */}
          <div
            style={{
              padding: 20,
              border: '1px solid #dce4d8',
              borderRadius: 18,
              background: '#fbfcfa',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                marginBottom: 11,
              }}
            >
              <Icon name="weight" size={19} />

              <label
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#334034',
                }}
              >
                Gross Weight
              </label>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <input
                value={gross ?? ''}
                onChange={(e) => setGross?.(e.target.value)}
                type="number"
                min="0"
                placeholder="0"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '15px 16px',
                  borderRadius: 13,
                  border: '1px solid #ccd7c9',
                  background: '#fff',
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#17251b',
                  outline: 'none',
                }}
              />

              <span
                style={{
                  fontWeight: 800,
                  color: '#6f796e',
                  fontSize: 15,
                }}
              >
                kg
              </span>
            </div>
          </div>

          {/* TARE */}
          <div
            style={{
              padding: 20,
              border: '1px solid #dce4d8',
              borderRadius: 18,
              background: '#fbfcfa',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                marginBottom: 11,
              }}
            >
              <Icon name="scale" size={19} />

              <label
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#334034',
                }}
              >
                Tare Weight
              </label>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <input
                value={tare ?? ''}
                onChange={(e) => setTare?.(e.target.value)}
                type="number"
                min="0"
                placeholder="0"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '15px 16px',
                  borderRadius: 13,
                  border: '1px solid #ccd7c9',
                  background: '#fff',
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#17251b',
                  outline: 'none',
                }}
              />

              <span
                style={{
                  fontWeight: 800,
                  color: '#6f796e',
                  fontSize: 15,
                }}
              >
                kg
              </span>
            </div>
          </div>

          {/* VEHICLE */}
          <div
            style={{
              padding: 20,
              border: '1px solid #dce4d8',
              borderRadius: 18,
              background: '#fbfcfa',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                marginBottom: 11,
              }}
            >
              <Icon name="truck" size={19} />

              <label
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#334034',
                }}
              >
                Vehicle Number
              </label>
            </div>

            <input
              defaultValue="WB-02-X-4321"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '15px 16px',
                borderRadius: 13,
                border: '1px solid #ccd7c9',
                background: '#fff',
                fontSize: 17,
                fontWeight: 700,
                color: '#17251b',
                outline: 'none',
              }}
            />
          </div>

          {/* BAG */}
          <div
            style={{
              padding: 20,
              border: '1px solid #dce4d8',
              borderRadius: 18,
              background: '#fbfcfa',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                marginBottom: 11,
              }}
            >
              <Icon name="bag" size={19} />

              <label
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#334034',
                }}
              >
                Bag Type
              </label>
            </div>

            <select
              defaultValue="Standard"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '15px 16px',
                borderRadius: 13,
                border: '1px solid #ccd7c9',
                background: '#fff',
                fontSize: 17,
                fontWeight: 700,
                color: '#17251b',
                outline: 'none',
              }}
            >
              <option>Standard</option>
              <option>Jute</option>
              <option>HDPE</option>
            </select>
          </div>
        </div>

        {/* METRICS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 16,
            marginTop: 22,
          }}
        >
          <motion.div
            whileHover={{ y: -3 }}
            style={{
              padding: 21,
              borderRadius: 18,
              background: '#eaf5e6',
              border: '1px solid #d3e6cd',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#62705f',
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              NET WEIGHT
            </span>

            <strong
              style={{
                display: 'block',
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontSize: 30,
                fontWeight: 800,
                color: '#245d2d',
              }}
            >
              {net.toLocaleString()} kg
            </strong>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            style={{
              padding: 21,
              borderRadius: 18,
              background: '#fff7e3',
              border: '1px solid #eee0bb',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#756d58',
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              QUINTALS
            </span>

            <strong
              style={{
                display: 'block',
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontSize: 30,
                fontWeight: 800,
                color: '#8b681f',
              }}
            >
              {quintals.toFixed(1)} q
            </strong>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            style={{
              padding: 21,
              borderRadius: 18,
              background: '#f1f3ef',
              border: '1px solid #dfe4dc',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#687266',
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              SCALE LANE
            </span>

            <strong
              style={{
                display: 'block',
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontSize: 30,
                fontWeight: 800,
                color: '#263228',
              }}
            >
              02
            </strong>
          </motion.div>
        </div>

        {/* CALCULATION STATUS */}
        <motion.div
          layout
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            marginTop: 22,
            padding: '17px 19px',
            borderRadius: 16,
            background: isReady ? '#f0f7ed' : '#faf7ee',
            border: `1px solid ${
              isReady ? '#d4e7ce' : '#eadfbe'
            }`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                display: 'grid',
                placeItems: 'center',
                background: isReady ? '#dcefd7' : '#f1e8cd',
                color: isReady ? '#2c7137' : '#87691f',
              }}
            >
              <Icon
                name={isReady ? 'check' : 'alert'}
                size={19}
              />
            </div>

            <div>
              <b
                style={{
                  display: 'block',
                  fontSize: 15,
                  color: '#29372c',
                }}
              >
                {isReady
                  ? 'Weight reading is ready for certification'
                  : 'Waiting for valid weight readings'}
              </b>

              <span
                style={{
                  display: 'block',
                  marginTop: 3,
                  fontSize: 13,
                  color: '#727b70',
                }}
              >
                Net = Gross − Tare
              </span>
            </div>
          </div>

          <div
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 19,
              fontWeight: 800,
              color: '#243127',
            }}
          >
            {grossValue.toLocaleString()} − {tareValue.toLocaleString()} ={' '}
            {net.toLocaleString()} kg
          </div>
        </motion.div>

        {/* BUTTONS */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 12,
            marginTop: 24,
            flexWrap: 'wrap',
          }}
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleRefresh}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 9,
              minHeight: 50,
              padding: '0 20px',
              borderRadius: 13,
              border: '1px solid #cdd8ca',
              background: '#fff',
              color: '#314032',
              fontSize: 15,
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            <Icon name="refresh" size={19} />
            Recapture
          </motion.button>

          <motion.button
            whileHover={{
              y: -2,
              boxShadow: '0 10px 24px rgba(39,92,45,.18)',
            }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleProceed}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              minHeight: 50,
              padding: '0 23px',
              borderRadius: 13,
              border: 'none',
              background: isReady ? '#285f31' : '#9ca69b',
              color: '#fff',
              fontSize: 15,
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: isReady
                ? '0 7px 18px rgba(39,95,49,.16)'
                : 'none',
            }}
          >
            <Icon name="check" size={19} />
            Certify & Continue
            <Icon name="arrow" size={18} />
          </motion.button>
        </div>
      </Card>

      {/* FOOTER INFO */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 9,
          marginTop: 18,
          color: '#7a8478',
          fontSize: 13,
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        <Icon name="check" size={16} />
        Scale readings are held in the current transaction state until the connected procurement workflow advances.
      </div>
    </motion.div>
  )
}