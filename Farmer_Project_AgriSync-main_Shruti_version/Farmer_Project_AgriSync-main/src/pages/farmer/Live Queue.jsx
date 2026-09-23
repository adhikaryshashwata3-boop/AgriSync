import { motion } from 'framer-motion'
import Card from './_Card'

function Icon({ name, size = 22 }) {
  const paths = {
    refresh: (
      <>
        <path d="M20 11a8.1 8.1 0 0 0-14.8-4L3 10" />
        <path d="M3 5v5h5" />
        <path d="M4 13a8.1 8.1 0 0 0 14.8 4L21 14" />
        <path d="M21 19v-5h-5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    gate: (
      <>
        <path d="M4 20V9l8-5 8 5v11" />
        <path d="M8 20V11h8v9" />
        <path d="M4 20h16" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),
    scale: (
      <>
        <path d="M6 20h12" />
        <path d="M9 20V7h6v13" />
        <path d="M5 7h14" />
        <path d="M12 4v3" />
        <path d="M4 8l-2 5h4L4 8Z" />
        <path d="m20 8-2 5h4l-2-5Z" />
      </>
    ),
    payment: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h3" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="9" r="3" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
        <path d="M16 6.5a3 3 0 0 1 0 5.8" />
        <path d="M18 14a4.5 4.5 0 0 1 3 5" />
      </>
    ),
    activity: (
      <>
        <path d="M3 12h4l2-6 4 12 2-6h6" />
      </>
    ),
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}


export default function LiveQueue({
  token = 'AG-1024',
  ahead = 3,
  wait = 12,
  queue= null,
  onRefresh,
}) {
  const myToken = queue?.myToken
  const predictedProcessingTime =
  myToken?.predictedDurationMinutes ?? 0

  const farmersInQueue = queue?.farmersInQueue || []
  const stepper = queue?.stepper

  console.log("LIVE QUEUE DATA:", queue)

  const activity = farmersInQueue
  .filter(farmer => farmer.tokenId !== myToken?.tokenId)
  .slice(0, 3)
  .map(farmer => [
    farmer.tokenId,
    farmer.farmerName,
    farmer.status,
    'In queue',
  ])
  const queueTokenPosition = myToken?.queuePosition || 0
  const farmersCount = farmersInQueue.length
  const stepNames = [
    'Gate verification',
    'Quality check',
    'Weighbridge',
    'Payment',
  ]

  const stepIcons = [
    'gate',
    'check',
    'scale',
    'payment',
  ]
  const currentStepIndex = Math.max(
  0,
  Math.min((stepper?.currentStep || 1) - 1, stepNames.length - 1)
)
  const nextStepName = stepNames[currentStepIndex]
  const nextStepIcon = stepIcons[currentStepIndex]

  const stages = [
    {
      name: 'Gate verification',
      icon: 'gate',
      time: '2 min',
    },
    {
      name: 'Quality check',
      icon: 'check',
      time: '6 min',
    },
    {
      name: 'Weighbridge',
      icon: 'scale',
      time: '5 min',
    },
    {
      name: 'Payment',
      icon: 'payment',
      time: '2 min',
    },
  ].map((stage, index) => ({
    ...stage,
    status:
      index < currentStepIndex
        ? 'Completed'
        : index === currentStepIndex
          ? 'Next'
          : 'Pending',
  }))

  const progress =
  queueTokenPosition > 0 && farmersCount > 0
    ? Math.round(
        ((farmersCount - queueTokenPosition + 1) / farmersCount) * 100
      )
    : 0

  const handleRefresh = () => {
    if (onRefresh) onRefresh()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        width: '100%',
        maxWidth: 1450,
        margin: '0 auto',
        paddingBottom: 40,
      }}
    >
      {/* PAGE HEADER */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
          marginBottom: 28,
          paddingBottom: 24,
          borderBottom: '1px solid rgba(23,37,27,.1)',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              marginBottom: 9,
              color: '#27733c',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '.16em',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#4ca968',
                boxShadow: '0 0 0 5px rgba(76,169,104,.12)',
              }}
            />
            LIVE OPERATIONS
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.05,
              color: '#17251b',
              letterSpacing: '-.035em',
            }}
          >
            Your Live Queue
          </h1>

          <p
            style={{
              margin: '12px 0 0',
              maxWidth: 690,
              color: '#687269',
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            Follow your token as farmers move through gate, quality and
            weighbridge.
          </p>
        </div>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleRefresh}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            border: '1px solid rgba(23,37,27,.14)',
            background: '#fff',
            color: '#17251b',
            padding: '13px 19px',
            borderRadius: 12,
            fontWeight: 750,
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: '0 8px 22px rgba(23,37,27,.05)',
          }}
        >
          <Icon name="refresh" size={17} />
          Refresh queue
        </motion.button>
      </div>

      {/* LIVE STATUS STRIP */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          padding: '13px 18px',
          marginBottom: 20,
          borderRadius: 12,
          background: '#eef7ef',
          border: '1px solid #d7ead9',
          color: '#286439',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              background: '#3d9b58',
            }}
          />
          Queue is live and updating
        </div>

        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#66806c',
          }}
        >
          Mandi operations · {myToken?.mandiName || 'Mandi'}
        </span>
      </div>

      {/* QUEUE HERO */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1.35fr 1fr',
          gap: 16,
          marginBottom: 22,
        }}
      >
        {/* TOKEN */}
        <motion.div
          whileHover={{ y: -3 }}
          style={{
            minHeight: 205,
            padding: 26,
            borderRadius: 18,
            color: '#fff',
            background:
              'linear-gradient(135deg, #173b24 0%, #245e36 58%, #2f7845 100%)',
            boxShadow: '0 18px 45px rgba(23,59,36,.16)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 180,
              height: 180,
              borderRadius: '50%',
              right: -70,
              top: -70,
              background: 'rgba(255,255,255,.06)',
            }}
          />

          <span
            style={{
              position: 'relative',
              display: 'block',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '.15em',
              opacity: 0.68,
            }}
          >
            YOUR TOKEN
          </span>

          <div
            style={{
              position: 'relative',
              marginTop: 14,
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 48,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-.04em',
            }}
          >
            {token}
          </div>

          <div
            style={{
              position: 'relative',
              marginTop: 22,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#8ed29a',
              }}
            />
            Active in queue
          </div>
        </motion.div>

        {/* POSITION */}
        <motion.div
          whileHover={{ y: -3 }}
          style={{
            minHeight: 205,
            padding: 26,
            borderRadius: 18,
            background: '#fff',
            border: '1px solid rgba(23,37,27,.09)',
            boxShadow: '0 15px 35px rgba(23,37,27,.055)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <span
              style={{
                color: '#718076',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '.14em',
              }}
            >
              CURRENT POSITION
            </span>

            <Icon name="users" size={18} />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
              marginTop: 5,
            }}
          >
            <strong
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 40,
                color: '#17251b',
              }}
            >
              {ahead}
            </strong>

            <span
              style={{
                color: '#6d786f',
                fontSize: 14,
                fontWeight: 650,
              }}
            >
              farmers ahead
            </span>
          </div>

          <div
            style={{
              height: 9,
              borderRadius: 20,
              background: '#e8eee9',
              overflow: 'hidden',
              margin: '23px 0 13px',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                height: '100%',
                borderRadius: 20,
                background: 'linear-gradient(90deg, #2e8148, #69ad6f)',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#718076',
              fontSize: 13,
            }}
          >
            <span>Queue progress</span>
            <strong style={{ color: '#286439' }}>{Math.round(progress)}%</strong>
          </div>
        </motion.div>

        {/* NEXT STEP */}
        <motion.div
          whileHover={{ y: -3 }}
          style={{
            minHeight: 205,
            padding: 26,
            borderRadius: 18,
            background: '#fbfaf4',
            border: '1px solid #e8e2cb',
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
                color: '#867b5e',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '.14em',
              }}
            >
              NEXT STEP
            </span>

            <div
              style={{
                width: 38,
                height: 38,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 10,
                background: '#efe7cb',
                color: '#796a42',
              }}
            >
              <Icon name={nextStepIcon} size={19} />
            </div>
          </div>

          <h3
            style={{
              margin: '22px 0 8px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 22,
              color: '#263126',
            }}
          >
            {nextStepName}
          </h3>

          <p
            style={{
              margin: 0,
              color: '#70776f',
              fontSize: 14,
              lineHeight: 1.55,
            }}
          >
            Your token will be processed at this stage when the queue reaches you.
          </p>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginTop: 19,
              padding: '7px 11px',
              borderRadius: 999,
              background: '#fff',
              border: '1px solid #ddd4b8',
              color: '#75663d',
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            In queue
          </span>
        </motion.div>
      </div>

      {/* LOWER CONTENT */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.65fr .85fr',
          gap: 18,
          alignItems: 'start',
        }}
      >
        {/* PROCESS FLOW */}
        <Card>
          <div
            style={{
              padding: '5px 4px 21px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <div>
              <div
                style={{
                  color: '#27733c',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '.13em',
                  marginBottom: 7,
                }}
              >
                PROCUREMENT FLOW
              </div>

              <h3
                style={{
                  margin: 0,
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 24,
                  color: '#17251b',
                }}
              >
                Queue movement
              </h3>

              <p
                style={{
                  margin: '6px 0 0',
                  color: '#788179',
                  fontSize: 14,
                }}
              >
                Typical processing flow at the mandi.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                color: '#5f6e64',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              <Icon name="clock" size={15} />
              ~{wait} min remaining
            </div>
          </div>

          <div
            style={{
              border: '1px solid rgba(23,37,27,.08)',
              borderRadius: 13,
              overflow: 'hidden',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: '#f5f7f4',
                    textAlign: 'left',
                  }}
                >
                  <th
                    style={{
                      padding: '14px 18px',
                      color: '#6c786f',
                      fontSize: 11,
                      letterSpacing: '.1em',
                      fontWeight: 800,
                    }}
                  >
                    STAGE
                  </th>
                  <th
                    style={{
                      padding: '14px 18px',
                      color: '#6c786f',
                      fontSize: 11,
                      letterSpacing: '.1em',
                      fontWeight: 800,
                    }}
                  >
                    STATUS
                  </th>
                  <th
                    style={{
                      padding: '14px 18px',
                      color: '#6c786f',
                      fontSize: 11,
                      letterSpacing: '.1em',
                      fontWeight: 800,
                    }}
                  >
                    TYPICAL TIME
                  </th>
                </tr>
              </thead>

              <tbody>
                {stages.map((stage, i) => (
                  <motion.tr
                    key={stage.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      borderTop: '1px solid rgba(23,37,27,.07)',
                    }}
                  >
                    <td style={{ padding: '17px 18px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        <span
                          style={{
                            width: 34,
                            height: 34,
                            display: 'grid',
                            placeItems: 'center',
                            borderRadius: 9,
                            background:
                              stage.status === 'Completed'
                                ? '#e8f3e9'
                                : '#f4f0df',
                            color:
                              stage.status === 'Completed'
                                ? '#2e7a40'
                                : '#806d3d',
                          }}
                        >
                          <Icon name={stage.icon} size={17} />
                        </span>

                        <b
                          style={{
                            color: '#263128',
                            fontSize: 14,
                          }}
                        >
                          {stage.name}
                        </b>
                      </div>
                    </td>

                    <td style={{ padding: '17px 18px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '6px 10px',
                          borderRadius: 999,
                          background:
                            stage.status === 'Completed'
                              ? '#e9f5eb'
                              : '#f5f0dc',
                          color:
                            stage.status === 'Completed'
                              ? '#2d7740'
                              : '#806d3d',
                          fontSize: 11,
                          fontWeight: 800,
                        }}
                      >
                        {stage.status === 'Completed' && (
                          <Icon name="check" size={12} />
                        )}
                        {stage.status}
                      </span>
                    </td>

                    <td
                      style={{
                        padding: '17px 18px',
                        color: '#56635a',
                        fontSize: 14,
                        fontWeight: 650,
                      }}
                    >
                      {stage.time}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* RECENT ACTIVITY */}
        <Card>
          <div style={{ padding: '5px 3px 18px' }}>
            <div
              style={{
                color: '#27733c',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '.13em',
                marginBottom: 7,
              }}
            >
              LIVE ACTIVITY
            </div>

            <h3
              style={{
                margin: 0,
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 23,
                color: '#17251b',
              }}
            >
              Queue updates
            </h3>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            {activity.map((item, index) => (
              <motion.div
                key={item[0]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.08 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr',
                  gap: 12,
                  padding: '15px 3px',
                  borderTop:
                    index === 0
                      ? '1px solid rgba(23,37,27,.08)'
                      : '1px solid rgba(23,37,27,.06)',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 11,
                    background: '#edf5ee',
                    color: '#2d7540',
                  }}
                >
                  <Icon name="activity" size={18} />
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <b
                      style={{
                        color: '#263128',
                        fontSize: 13,
                      }}
                    >
                      {item[0]}
                    </b>

                    <span
                      style={{
                        color: '#89928b',
                        fontSize: 11,
                      }}
                    >
                      {item[3]}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      color: '#707a72',
                      fontSize: 12,
                    }}
                  >
                    {item[1]} ·{' '}
                    <strong style={{ color: '#3b7650' }}>
                      {item[2]}
                    </strong>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            style={{
              width: '100%',
              marginTop: 15,
              padding: '11px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              border: '1px solid rgba(23,37,27,.1)',
              borderRadius: 10,
              background: '#fff',
              color: '#31583b',
              fontWeight: 750,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            View queue history
            <Icon name="arrow" size={14} />
          </button>
        </Card>
      </div>

      {/* FOOTER METRICS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
          marginTop: 18,
        }}
      >
        {[
        [String(farmersCount), 'Farmers currently queued', 'users'],
        [`${predictedProcessingTime} min`, 'Predicted processing time', 'clock'],
        [`${wait} min`, 'Estimated wait time', 'clock'],
        [`Position ${queueTokenPosition}`, 'Your queue position', 'activity'],
      ].map(([value, label, icon], index) => (
          <motion.div
            key={label}
            whileHover={{ y: -2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 15,
              padding: '18px 20px',
              background: '#f7f8f5',
              border: '1px solid rgba(23,37,27,.07)',
              borderRadius: 13,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 10,
                background: '#e8f1e9',
                color: '#347748',
              }}
            >
              <Icon name={icon} size={18} />
            </div>

            <div>
              <strong
                style={{
                  display: 'block',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 20,
                  color: '#1c2b20',
                }}
              >
                {value}
              </strong>

              <span
                style={{
                  display: 'block',
                  marginTop: 2,
                  color: '#788279',
                  fontSize: 12,
                }}
              >
                {label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}