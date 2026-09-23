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
    user: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </>
    ),
    grain: (
      <>
        <path d="M12 21V5" />
        <path d="M12 9c-3.5 0-5-2-5-4 3.2 0 5 1.5 5 4Z" />
        <path d="M12 13c-3.5 0-5-2-5-4 3.2 0 5 1.5 5 4Z" />
        <path d="M12 9c3.5 0 5-2 5-4-3.2 0-5 1.5-5 4Z" />
        <path d="M12 13c3.5 0 5-2 5-4 3.2 0 5 1.5 5 4Z" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
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
    edit: (
      <>
        <path d="m14 6 4 4" />
        <path d="M4 20h4l10.5-10.5a2.8 2.8 0 0 0-4-4L4 16v4Z" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
  }

  return <svg {...common}>{icons[name] || icons.check}</svg>
}

export default function QualityCheck({
  grade = 'A',
  setGrade,
  onProceed,
}) {
  const handleRecalculate = () => {
    if (setGrade) setGrade('A')
  }

  const handleOverride = () => {
    if (setGrade) {
      setGrade(grade === 'A' ? 'B' : 'A')
    }
  }

  const handleProceed = () => {
    if (onProceed) onProceed()
  }

  const parameters = [
    {
      label: 'Moisture',
      unit: '%',
      value: '12.4',
      limit: 'Recommended ≤ 14%',
    },
    {
      label: 'Foreign Matter',
      unit: '%',
      value: '0.8',
      limit: 'Recommended ≤ 1%',
    },
    {
      label: 'Shrivelled Grains',
      unit: '%',
      value: '1.2',
      limit: 'Recommended ≤ 2%',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
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
          marginBottom: 24,
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
            QUALITY ASSESSMENT • PROCUREMENT
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
            Quality Check · TK-1082
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: 16,
              opacity: 0.68,
              maxWidth: 680,
            }}
          >
            Record measurable parameters and approve the procurement grade.
          </p>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '9px 13px',
            borderRadius: 999,
            background: 'rgba(32,112,48,.08)',
            border: '1px solid rgba(32,112,48,.15)',
            color: '#28733a',
            fontSize: 13,
            fontWeight: 800,
            whiteSpace: 'nowrap',
          }}
        >
          <Icon name="check" size={17} />
          Assessment active
        </div>
      </div>

      <Card>
        {/* FARMER BANNER */}
        <div
          className="farmer-banner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: '15px 17px',
            marginBottom: 24,
            borderRadius: 15,
            background: 'rgba(32,112,48,.055)',
            border: '1px solid rgba(32,112,48,.10)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span
              className="avatar"
              style={{
                width: 46,
                height: 46,
                borderRadius: 13,
                background: '#e7f2e1',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 850,
                color: '#28733a',
                flexShrink: 0,
              }}
            >
              R
            </span>

            <div>
              <b
                style={{
                  display: 'block',
                  fontSize: 17,
                  marginBottom: 3,
                }}
              >
                R. Kumar
              </b>

              <small
                style={{
                  display: 'block',
                  color: '#74806f',
                  fontSize: 13,
                }}
              >
                Token ID: TK-1082 · Wheat · 50 quintals
              </small>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              fontSize: 13,
              fontWeight: 800,
              color: '#28733a',
            }}
          >
            <Icon name="grain" size={17} />
            Wheat procurement
          </div>
        </div>

        {/* MAIN QUALITY GRID */}
        <div
          className="quality-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(340px, .85fr)',
            gap: 22,
          }}
        >
          {/* INPUT PARAMETERS */}
          <div>
            <div
              style={{
                marginBottom: 17,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 820,
                }}
              >
                Input parameters
              </h3>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: 14,
                  opacity: 0.58,
                }}
              >
                Enter measured values from the physical inspection.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gap: 13,
              }}
            >
              {parameters.map((parameter, index) => (
                <motion.div
                  key={parameter.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  style={{
                    padding: '15px',
                    borderRadius: 14,
                    border: '1px solid rgba(20,45,28,.09)',
                    background: '#fff',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 9,
                    }}
                  >
                    <label
                      style={{
                        fontSize: 15,
                        fontWeight: 780,
                      }}
                    >
                      {parameter.label}
                    </label>

                    <span
                      style={{
                        fontSize: 12,
                        opacity: 0.5,
                      }}
                    >
                      {parameter.limit}
                    </span>
                  </div>

                  <div
                    style={{
                      position: 'relative',
                    }}
                  >
                    <input
                      defaultValue={parameter.value}
                      inputMode="decimal"
                      aria-label={parameter.label}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        minHeight: 47,
                        padding: '10px 48px 10px 13px',
                        borderRadius: 10,
                        border: '1px solid rgba(20,45,28,.13)',
                        background: 'rgba(20,45,28,.025)',
                        fontSize: 16,
                        fontWeight: 750,
                        outline: 'none',
                      }}
                    />

                    <span
                      style={{
                        position: 'absolute',
                        right: 14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: 14,
                        fontWeight: 800,
                        opacity: 0.52,
                      }}
                    >
                      {parameter.unit}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* INSPECTION NOTE */}
            <div
              style={{
                marginTop: 14,
                padding: '13px 15px',
                borderRadius: 12,
                background: 'rgba(219,165,57,.07)',
                border: '1px solid rgba(219,165,57,.13)',
                fontSize: 13,
                lineHeight: 1.5,
                color: '#725819',
              }}
            >
              Values are within the displayed procurement limits for the
              current assessment.
            </div>
          </div>

          {/* QUALITY INSIGHT */}
          <div>
            <div
              style={{
                marginBottom: 17,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 820,
                }}
              >
                Quality insight
              </h3>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: 14,
                  opacity: 0.58,
                }}
              >
                Current grade recommendation based on recorded values.
              </p>
            </div>

            {/* GRAIN VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="grain-image"
              style={{
                minHeight: 170,
                borderRadius: 17,
                background:
                  'linear-gradient(145deg, rgba(231,242,225,.95), rgba(247,239,214,.8))',
                border: '1px solid rgba(32,112,48,.10)',
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  border: '1px solid rgba(32,112,48,.10)',
                }}
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 42px)',
                  gap: 12,
                  transform: 'rotate(-5deg)',
                  position: 'relative',
                }}
              >
                {Array.from({ length: 9 }).map((_, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.08 * index,
                    }}
                    style={{
                      width: 42,
                      height: 20,
                      borderRadius: '70% 35% 70% 35%',
                      background:
                        index % 2 === 0 ? '#d6b45a' : '#c7a347',
                      transform: `rotate(${index % 2 === 0 ? -18 : 18}deg)`,
                      boxShadow:
                        'inset -2px -2px 0 rgba(100,70,20,.08)',
                    }}
                  />
                ))}
              </div>

              <span
                style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 13,
                  padding: '6px 9px',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,.72)',
                  backdropFilter: 'blur(5px)',
                  fontSize: 11,
                  fontWeight: 800,
                  opacity: 0.7,
                }}
              >
                VISUAL SAMPLE
              </span>
            </motion.div>

            {/* CONFIDENCE */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 11,
                marginTop: 13,
              }}
            >
              <div
                style={{
                  padding: '14px',
                  borderRadius: 13,
                  background: 'rgba(20,45,28,.035)',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: 12,
                    opacity: 0.52,
                    marginBottom: 5,
                  }}
                >
                  MEASURED CONFIDENCE
                </span>

                <b
                  style={{
                    fontSize: 25,
                    fontWeight: 880,
                  }}
                >
                  94%
                </b>
              </div>

              <div
                style={{
                  padding: '14px',
                  borderRadius: 13,
                  background: 'rgba(32,112,48,.07)',
                  border: '1px solid rgba(32,112,48,.10)',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: 12,
                    opacity: 0.52,
                    marginBottom: 5,
                  }}
                >
                  SUGGESTED GRADE
                </span>

                <b
                  style={{
                    fontSize: 25,
                    fontWeight: 880,
                    color: '#28733a',
                  }}
                >
                  {grade}
                </b>
              </div>
            </div>

            {/* GRADE SCALE */}
            <div
              style={{
                marginTop: 14,
                padding: '14px 15px',
                borderRadius: 13,
                border: '1px solid rgba(20,45,28,.08)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 9,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 780,
                  }}
                >
                  Procurement grade
                </span>

                <span
                  style={{
                    fontSize: 12,
                    opacity: 0.52,
                  }}
                >
                  Current: {grade}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  height: 8,
                  borderRadius: 999,
                  overflow: 'hidden',
                  background: '#e8e8e4',
                }}
              >
                <div
                  style={{
                    width: '65%',
                    background: '#207030',
                  }}
                />
                <div
                  style={{
                    width: '20%',
                    background: '#dba539',
                  }}
                />
                <div
                  style={{
                    width: '15%',
                    background: '#a9b0aa',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 7,
                  fontSize: 11,
                  opacity: 0.5,
                }}
              >
                <span>A — Premium</span>
                <span>B — Standard</span>
                <span>C — Below standard</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div
          className="button-row end"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap',
            marginTop: 25,
            paddingTop: 20,
            borderTop: '1px solid rgba(20,45,28,.08)',
          }}
        >
          <motion.button
            className="secondary"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleRecalculate}
            style={{
              minHeight: 46,
              padding: '11px 16px',
              fontSize: 14,
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Icon name="refresh" size={17} />
            Recalculate
          </motion.button>

          <motion.button
            className="secondary"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOverride}
            style={{
              minHeight: 46,
              padding: '11px 16px',
              fontSize: 14,
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Icon name="edit" size={17} />
            Override Grade
          </motion.button>

          <motion.button
            className="primary"
            whileHover={{
              y: -2,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={handleProceed}
            style={{
              minHeight: 48,
              padding: '11px 18px',
              fontSize: 15,
              fontWeight: 850,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
          >
            <Icon name="check" size={18} />
            Approve for Weighbridge
            <Icon name="arrow" size={16} />
          </motion.button>
        </div>
      </Card>
    </motion.div>
  )
}