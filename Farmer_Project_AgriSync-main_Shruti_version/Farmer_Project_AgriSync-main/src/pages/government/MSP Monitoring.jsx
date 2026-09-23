import { motion } from 'framer-motion'
import Card from './_Card'

const msp = [
  {
    crop: 'Wheat',
    icon: '🌾',
    price: 2585,
    market: 2540,
    compliance: 96,
    centers: 48,
    procurement: '8,420 q',
    trend: '+4.8%',
  },
  {
    crop: 'Paddy',
    icon: '🌱',
    price: 2369,
    market: 2295,
    compliance: 91,
    centers: 52,
    procurement: '12,680 q',
    trend: '+7.2%',
  },
  {
    crop: 'Mustard',
    icon: '🌼',
    price: 6200,
    market: 6010,
    compliance: 94,
    centers: 36,
    procurement: '5,240 q',
    trend: '+3.6%',
  },
  {
    crop: 'Maize',
    icon: '🌽',
    price: 2400,
    market: 2265,
    compliance: 87,
    centers: 41,
    procurement: '6,890 q',
    trend: '+2.1%',
  },
]

const maxPrice = 6200

const styles = {
  page: {
    paddingBottom: 40,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 20,
    marginBottom: 24,
    flexWrap: 'wrap',
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1.5,
    color: '#758078',
  },

  title: {
    margin: '5px 0 6px',
    fontSize: 30,
    fontWeight: 800,
    color: '#18251d',
  },

  subtitle: {
    margin: 0,
    color: '#737d76',
    fontSize: 13,
    lineHeight: 1.6,
    maxWidth: 650,
  },

  live: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    padding: '9px 14px',
    borderRadius: 30,
    background: '#eaf6ec',
    color: '#20743f',
    fontSize: 12,
    fontWeight: 700,
    border: '1px solid #d4ead8',
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#2a9b55',
    boxShadow: '0 0 0 4px rgba(42,155,85,.12)',
  },

  overview: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.35fr',
    gap: 18,
    marginBottom: 18,
  },

  card: {
    borderRadius: 20,
    background: 'rgba(255,255,255,.94)',
    border: '1px solid #e7ece5',
    boxShadow: '0 8px 30px rgba(38,63,45,.07)',
    padding: 22,
  },

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  cardTitle: {
    margin: '5px 0 0',
    fontSize: 19,
    color: '#203028',
  },

  donutArea: {
    display: 'flex',
    alignItems: 'center',
    gap: 28,
    marginTop: 24,
  },

  donut: {
    width: 150,
    height: 150,
    position: 'relative',
    flexShrink: 0,
  },

  donutSvg: {
    width: '100%',
    height: '100%',
    transform: 'rotate(-90deg)',
  },

  donutTrack: {
    fill: 'none',
    stroke: '#edf1ec',
    strokeWidth: 12,
  },

  donutValue: {
    fill: 'none',
    stroke: '#27834a',
    strokeWidth: 12,
    strokeLinecap: 'round',
  },

  donutText: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  donutNumber: {
    fontSize: 28,
    fontWeight: 800,
    color: '#1d683c',
  },

  donutCaption: {
    fontSize: 10,
    color: '#7d877f',
    marginTop: 2,
  },

  donutInfo: {
    flex: 1,
  },

  bigNumber: {
    fontSize: 29,
    fontWeight: 800,
    color: '#1d683c',
  },

  infoText: {
    color: '#778078',
    fontSize: 12,
    lineHeight: 1.5,
    marginTop: 3,
  },

  miniStat: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #edf0ec',
    paddingTop: 10,
    marginTop: 10,
    fontSize: 12,
  },

  statGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginTop: 22,
  },

  statBox: {
    padding: 15,
    borderRadius: 15,
    background: '#f6f9f5',
    border: '1px solid #e8eee6',
  },

  statLabel: {
    display: 'block',
    color: '#788178',
    fontSize: 10,
    marginBottom: 7,
  },

  statNumber: {
    display: 'block',
    color: '#21332a',
    fontSize: 21,
    fontWeight: 800,
  },

  statSmall: {
    display: 'block',
    marginTop: 4,
    color: '#27834a',
    fontSize: 10,
    fontWeight: 600,
  },

  chartCard: {
    ...undefined,
  },

  legend: {
    display: 'flex',
    gap: 18,
    fontSize: 10,
    color: '#707970',
  },

  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },

  legendGreen: {
    width: 10,
    height: 10,
    borderRadius: 3,
    background: '#27834a',
  },

  legendGold: {
    width: 10,
    height: 10,
    borderRadius: 3,
    background: '#d4a52d',
  },

  chart: {
    marginTop: 28,
    display: 'flex',
    flexDirection: 'column',
    gap: 22,
  },

  barRow: {
    display: 'grid',
    gridTemplateColumns: '170px 1fr 115px',
    alignItems: 'center',
    gap: 18,
  },

  cropName: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  cropIcon: {
    width: 36,
    height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    background: '#edf6ea',
    fontSize: 18,
  },

  cropLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },

  cropTitle: {
    fontSize: 12,
    fontWeight: 750,
    color: '#26342c',
  },

  cropPrice: {
    fontSize: 9,
    color: '#858e87',
  },

  bars: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },

  track: {
    width: '100%',
    height: 9,
    borderRadius: 20,
    background: '#edf0ec',
    overflow: 'hidden',
  },

  priceText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 3,
  },

  marketPrice: {
    fontSize: 12,
    fontWeight: 750,
    color: '#27362d',
  },

  deviation: {
    fontSize: 9,
    color: '#b47a18',
  },

  crops: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
    marginTop: 18,
  },

  cropCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  status: {
    padding: '5px 9px',
    borderRadius: 20,
    background: '#eaf6ec',
    color: '#20743f',
    fontSize: 9,
    fontWeight: 700,
  },

  attention: {
    background: '#fff4da',
    color: '#a46b13',
  },

  cropCardTitle: {
    margin: '14px 0 14px',
    fontSize: 18,
    color: '#243229',
  },

  approved: {
    padding: 13,
    borderRadius: 13,
    background: '#f5f9f3',
    border: '1px solid #e6eee3',
  },

  approvedLabel: {
    display: 'block',
    color: '#7c857e',
    fontSize: 9,
    marginBottom: 4,
  },

  approvedPrice: {
    fontSize: 22,
    fontWeight: 800,
    color: '#1d683c',
  },

  details: {
    marginTop: 12,
  },

  detail: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '9px 0',
    borderBottom: '1px solid #edf0ec',
    fontSize: 10,
  },

  detailLabel: {
    color: '#808981',
  },

  detailValue: {
    color: '#2b392f',
    fontWeight: 700,
  },

  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6,
    fontSize: 10,
  },

  progressTrack: {
    height: 7,
    borderRadius: 20,
    background: '#edf0ec',
    overflow: 'hidden',
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 13,
    paddingTop: 12,
    borderTop: '1px solid #edf0ec',
    fontSize: 9,
  },

  insight: {
    marginTop: 18,
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    padding: '16px 19px',
    borderRadius: 18,
    background: 'linear-gradient(100deg,#f0f8ee,#fbfcfa)',
    border: '1px solid #dce9da',
  },

  insightIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#dcefdc',
    color: '#20743f',
    fontSize: 20,
    fontWeight: 800,
  },

  insightContent: {
    flex: 1,
  },

  insightTitle: {
    display: 'block',
    fontSize: 12,
    color: '#25342b',
  },

  insightText: {
    margin: '4px 0 0',
    color: '#758078',
    fontSize: 10,
    lineHeight: 1.5,
  },

  button: {
    border: '1px solid #cfe0cc',
    background: '#fff',
    color: '#20743f',
    padding: '10px 14px',
    borderRadius: 11,
    fontWeight: 700,
    fontSize: 11,
    cursor: 'pointer',
  },
}

function ComplianceCircle({ value }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div style={styles.donut}>
      <svg viewBox="0 0 120 120" style={styles.donutSvg}>
        <circle
          cx="60"
          cy="60"
          r={radius}
          style={styles.donutTrack}
        />

        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          style={styles.donutValue}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      </svg>

      <div style={styles.donutText}>
        <span style={styles.donutNumber}>{value}%</span>
        <span style={styles.donutCaption}>COMPLIANT</span>
      </div>
    </div>
  )
}

export default function MSPMonitoring() {
  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <div style={styles.eyebrow}>MSP COMPLIANCE</div>

          <h1 style={styles.title}>
            MSP Monitoring
          </h1>

          <p style={styles.subtitle}>
            Monitor approved MSP prices, procurement compliance
            and market-level price deviations across the network.
          </p>
        </div>

        <div style={styles.live}>
          <span style={styles.dot} />
          Network Live
        </div>
      </div>

      {/* OVERVIEW */}
      <div style={styles.overview}>

        {/* COMPLIANCE */}
        <Card>
          <div style={styles.cardHeader}>
            <div>
              <div style={styles.eyebrow}>
                NETWORK HEALTH
              </div>

              <h2 style={styles.cardTitle}>
                MSP Compliance
              </h2>
            </div>

            <span style={styles.status}>
              192 Centers
            </span>
          </div>

          <div style={styles.donutArea}>
            <ComplianceCircle value={92} />

            <div style={styles.donutInfo}>
              <div style={styles.bigNumber}>
                177
              </div>

              <div style={styles.infoText}>
                procurement centers currently
                operating within approved MSP
                guidelines.
              </div>

              <div style={styles.miniStat}>
                <span>Compliant</span>
                <strong style={{ color: '#218148' }}>
                  177
                </strong>
              </div>

              <div style={styles.miniStat}>
                <span>Under Review</span>
                <strong style={{ color: '#b47a18' }}>
                  15
                </strong>
              </div>
            </div>
          </div>
        </Card>

        {/* SNAPSHOT */}
        <Card>
          <div style={styles.eyebrow}>
            TODAY'S SNAPSHOT
          </div>

          <h2 style={styles.cardTitle}>
            Procurement Overview
          </h2>

          <div style={styles.statGrid}>

            <div style={styles.statBox}>
              <span style={styles.statLabel}>
                TOTAL PROCUREMENT
              </span>

              <strong style={styles.statNumber}>
                33,230 q
              </strong>

              <small style={styles.statSmall}>
                ↑ 6.4% today
              </small>
            </div>

            <div style={styles.statBox}>
              <span style={styles.statLabel}>
                MSP PROTECTED VALUE
              </span>

              <strong style={styles.statNumber}>
                ₹8.42 Cr
              </strong>

              <small style={styles.statSmall}>
                ↑ 4.2% this week
              </small>
            </div>

            <div style={styles.statBox}>
              <span style={styles.statLabel}>
                CENTERS MONITORED
              </span>

              <strong style={styles.statNumber}>
                192
              </strong>

              <small
                style={{
                  ...styles.statSmall,
                  color: '#778078',
                }}
              >
                Across 18 states
              </small>
            </div>

            <div style={styles.statBox}>
              <span style={styles.statLabel}>
                PRICE DEVIATIONS
              </span>

              <strong style={styles.statNumber}>
                15
              </strong>

              <small
                style={{
                  ...styles.statSmall,
                  color: '#b47a18',
                }}
              >
                Requires review
              </small>
            </div>

          </div>
        </Card>
      </div>

      {/* BAR GRAPH */}
      <Card>
        <div style={styles.cardHeader}>
          <div>
            <div style={styles.eyebrow}>
              APPROVED MSP VS MARKET
            </div>

            <h2 style={styles.cardTitle}>
              Crop-wise MSP Comparison
            </h2>

            <p style={styles.subtitle}>
              Approved MSP compared with average monitored
              procurement prices.
            </p>
          </div>

          <div style={styles.legend}>
            <span style={styles.legendItem}>
              <i style={styles.legendGreen} />
              Approved MSP
            </span>

            <span style={styles.legendItem}>
              <i style={styles.legendGold} />
              Market Price
            </span>
          </div>
        </div>

        <div style={styles.chart}>
          {msp.map((item, index) => {
            const approvedWidth =
              (item.price / maxPrice) * 100

            const marketWidth =
              (item.market / maxPrice) * 100

            const difference =
              Math.round(
                ((item.price - item.market) /
                  item.price) *
                  100
              )

            return (
              <motion.div
                key={item.crop}
                style={styles.barRow}
                initial={{
                  opacity: 0,
                  x: -25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
              >

                <div style={styles.cropName}>
                  <div style={styles.cropIcon}>
                    {item.icon}
                  </div>

                  <div style={styles.cropLabel}>
                    <strong style={styles.cropTitle}>
                      {item.crop}
                    </strong>

                    <span style={styles.cropPrice}>
                      MSP ₹{item.price.toLocaleString()}/q
                    </span>
                  </div>
                </div>

                <div style={styles.bars}>

                  <div style={styles.track}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${approvedWidth}%`,
                      }}
                      transition={{
                        duration: 1,
                        delay: index * 0.1,
                      }}
                      style={{
                        height: '100%',
                        borderRadius: 20,
                        background: '#27834a',
                      }}
                    />
                  </div>

                  <div style={styles.track}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${marketWidth}%`,
                      }}
                      transition={{
                        duration: 1,
                        delay: index * 0.1 + 0.15,
                      }}
                      style={{
                        height: '100%',
                        borderRadius: 20,
                        background: '#d4a52d',
                      }}
                    />
                  </div>

                </div>

                <div style={styles.priceText}>
                  <strong style={styles.marketPrice}>
                    ₹{item.market.toLocaleString()}
                  </strong>

                  <span style={styles.deviation}>
                    {difference}% below MSP
                  </span>
                </div>

              </motion.div>
            )
          })}
        </div>
      </Card>

      {/* CROP DETAILS */}
      <div style={styles.crops}>

        {msp.map((item, index) => (
          <motion.div
            key={item.crop}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
          >
            <Card>

              <div style={styles.cropCardTop}>
                <div
                  style={{
                    ...styles.cropIcon,
                    width: 45,
                    height: 45,
                    fontSize: 22,
                  }}
                >
                  {item.icon}
                </div>

                <span
                  style={{
                    ...styles.status,
                    ...(item.compliance < 90
                      ? styles.attention
                      : {}),
                  }}
                >
                  {item.compliance >= 90
                    ? '✓ Compliant'
                    : '⚠ Attention'}
                </span>
              </div>

              <h3 style={styles.cropCardTitle}>
                {item.crop}
              </h3>

              <div style={styles.approved}>
                <span style={styles.approvedLabel}>
                  APPROVED MSP
                </span>

                <strong style={styles.approvedPrice}>
                  ₹{item.price.toLocaleString()}
                  <small
                    style={{
                      fontSize: 10,
                      color: '#778078',
                    }}
                  >
                    {' '} / q
                  </small>
                </strong>
              </div>

              <div style={styles.details}>

                <div style={styles.detail}>
                  <span style={styles.detailLabel}>
                    Market Price
                  </span>

                  <b style={styles.detailValue}>
                    ₹{item.market.toLocaleString()} / q
                  </b>
                </div>

                <div style={styles.detail}>
                  <span style={styles.detailLabel}>
                    Centers
                  </span>

                  <b style={styles.detailValue}>
                    {item.centers}
                  </b>
                </div>

                <div style={styles.detail}>
                  <span style={styles.detailLabel}>
                    Procurement
                  </span>

                  <b style={styles.detailValue}>
                    {item.procurement}
                  </b>
                </div>

              </div>

              {/* PROGRESS */}
              <div style={{ marginTop: 15 }}>

                <div style={styles.progressHeader}>
                  <span>
                    Compliance
                  </span>

                  <strong
                    style={{
                      color:
                        item.compliance >= 90
                          ? '#218148'
                          : '#b47a18',
                    }}
                  >
                    {item.compliance}%
                  </strong>
                </div>

                <div style={styles.progressTrack}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${item.compliance}%`,
                    }}
                    transition={{
                      duration: 0.9,
                      delay: index * 0.08,
                    }}
                    style={{
                      height: '100%',
                      borderRadius: 20,
                      background:
                        item.compliance >= 90
                          ? 'linear-gradient(90deg,#d5a52f,#27834a)'
                          : '#d4a52d',
                    }}
                  />
                </div>

              </div>

              <div style={styles.footer}>
                <span>
                  7-day trend
                </span>

                <strong style={{ color: '#218148' }}>
                  {item.trend} ↑
                </strong>
              </div>

            </Card>
          </motion.div>
        ))}

      </div>

      {/* INSIGHT */}
      <motion.div
        style={styles.insight}
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ delay: 0.5 }}
      >
        <div style={styles.insightIcon}>
          ₹
        </div>

        <div style={styles.insightContent}>
          <strong style={styles.insightTitle}>
            MSP Monitoring Insight
          </strong>

          <p style={styles.insightText}>
            177 procurement centers are currently compliant.
            Maize has the highest deviation and should be
            prioritized for field-level review.
          </p>
        </div>

        <button style={styles.button}>
          Review Deviations →
        </button>
      </motion.div>

    </motion.div>
  )
}