import { motion } from 'framer-motion'
import Card from './_Card'

const cropIcons = {
  Wheat: '🌾',
  Paddy: '🌱',
  Rice: '🍚',
  Mustard: '🌼',
  Maize: '🌽',
  Cotton: '☁️',
  Soybean: '🫘',
  Sugarcane: '🎋',
}


export default function Procurement({ procurement = [] }) {
  const data = procurement || []
  const totalQuantity = data.length ? data.map((row) => row[1]).join(' + ') : '—'
  const totalValue = data.length ? 'Live ledger' : '—'
  const averageCompliance = data.length ? 'Live' : '—'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        paddingBottom: 40,
      }}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        className="page-heading"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{
          marginBottom: 25,
        }}
      >
        <div>
          <small
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#69746c',
            }}
          >
            STATE PROCUREMENT
          </small>

          <h1
            style={{
              fontSize: 32,
              fontWeight: 850,
              margin: '5px 0 7px',
              color: '#18251d',
            }}
          >
            Procurement Monitoring
          </h1>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: '#6d7770',
              margin: 0,
              maxWidth: 700,
            }}
          >
            Track quantity, procurement value and MSP compliance
            across monitored crops.
          </p>
        </div>

        <motion.div
          className="pill success"
          animate={{
            scale: [1, 1.025, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            fontSize: 13,
            fontWeight: 700,
            padding: '10px 15px',
          }}
        >
          ● Live Procurement
        </motion.div>
      </motion.div>


      {/* =====================================================
          TOP METRICS
      ===================================================== */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          marginBottom: 20,
        }}
      >

        {/* TOTAL QUANTITY */}

        <motion.div
          whileHover={{
            y: -5,
            scale: 1.01,
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Card>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 750,
                    color: '#6f7972',
                    letterSpacing: '.5px',
                  }}
                >
                  TOTAL QUANTITY
                </span>

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.15,
                    type: 'spring',
                  }}
                  style={{
                    fontSize: 34,
                    fontWeight: 850,
                    color: '#176238',
                    marginTop: 8,
                  }}
                >
                  {totalQuantity}
                </motion.div>

                <span
                  style={{
                    fontSize: 12,
                    color: '#218148',
                    fontWeight: 650,
                  }}
                >
                  ↑ 6.4% from yesterday
                </span>
              </div>

              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#e8f3e7',
                  fontSize: 22,
                }}
              >
                ⚖️
              </div>
            </div>
          </Card>
        </motion.div>


        {/* TOTAL VALUE */}

        <motion.div
          whileHover={{
            y: -5,
            scale: 1.01,
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Card>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 750,
                    color: '#6f7972',
                    letterSpacing: '.5px',
                  }}
                >
                  PROCUREMENT VALUE
                </span>

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.25,
                    type: 'spring',
                  }}
                  style={{
                    fontSize: 34,
                    fontWeight: 850,
                    color: '#176238',
                    marginTop: 8,
                  }}
                >
                  {totalValue}
                </motion.div>

                <span
                  style={{
                    fontSize: 12,
                    color: '#218148',
                    fontWeight: 650,
                  }}
                >
                  ↑ 4.8% this week
                </span>
              </div>

              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f8f1dc',
                  fontSize: 22,
                }}
              >
                ₹
              </div>
            </div>
          </Card>
        </motion.div>


        {/* COMPLIANCE */}

        <motion.div
          whileHover={{
            y: -5,
            scale: 1.01,
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Card>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 750,
                    color: '#6f7972',
                    letterSpacing: '.5px',
                  }}
                >
                  MSP COMPLIANCE
                </span>

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.35,
                    type: 'spring',
                  }}
                  style={{
                    fontSize: 34,
                    fontWeight: 850,
                    color: '#176238',
                    marginTop: 8,
                  }}
                >
                  {averageCompliance}
                </motion.div>

                <span
                  style={{
                    fontSize: 12,
                    color: '#218148',
                    fontWeight: 650,
                  }}
                >
                  ✓ Within approved MSP
                </span>
              </div>

              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#e8f3e7',
                  color: '#217744',
                  fontWeight: 800,
                  fontSize: 16,
                }}
              >
                92
              </div>
            </div>
          </Card>
        </motion.div>

      </div>


      {/* =====================================================
          PROCUREMENT TABLE
      ===================================================== */}

      <Card>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 20,
            flexWrap: 'wrap',
            marginBottom: 20,
          }}
        >

          <div>
            <small
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '1.3px',
                color: '#6b766e',
              }}
            >
              CROP-WISE PROCUREMENT
            </small>

            <h2
              style={{
                fontSize: 24,
                margin: '5px 0 5px',
                color: '#1d2a22',
              }}
            >
              Procurement Performance
            </h2>

            <p
              style={{
                fontSize: 13,
                color: '#778078',
                margin: 0,
              }}
            >
              Quantity, value and MSP compliance by crop.
            </p>
          </div>

          <span
            style={{
              padding: '8px 13px',
              borderRadius: 20,
              background: '#f1f6ef',
              color: '#277243',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {data.length} crops monitored
          </span>

        </div>


        {/* TABLE */}

        <div
          className="table-wrap"
          style={{
            overflowX: 'auto',
          }}
        >

          <table
            style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: '0 8px',
            }}
          >

            <thead>
              <tr>

                <th
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#6d7770',
                  }}
                >
                  CROP
                </th>

                <th
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#6d7770',
                  }}
                >
                  QUANTITY
                </th>

                <th
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#6d7770',
                  }}
                >
                  PROCUREMENT VALUE
                </th>

                <th
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#6d7770',
                  }}
                >
                  MSP COMPLIANCE
                </th>

                <th
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#6d7770',
                  }}
                >
                  STATUS
                </th>

              </tr>
            </thead>


            <tbody>

              {data.map((row, index) => {

                const crop = row[0]
                const quantity = row[1]
                const value = row[2]
                const compliance = parseInt(row[3], 10) || 0

                const icon =
                  cropIcons[crop] || '🌾'

                const isGood =
                  compliance >= 90

                return (
                  <motion.tr
                    key={crop}
                    initial={{
                      opacity: 0,
                      x: -18,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.15 + index * 0.09,
                    }}
                    whileHover={{
                      scale: 1.008,
                    }}
                    style={{
                      background: '#fafcf9',
                    }}
                  >

                    {/* CROP */}

                    <td
                      style={{
                        padding: '15px 14px',
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#25342b',
                        borderRadius: '12px 0 0 12px',
                      }}
                    >

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 11,
                        }}
                      >

                        <span
                          style={{
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 12,
                            background: '#edf5ea',
                            fontSize: 20,
                          }}
                        >
                          {icon}
                        </span>

                        <div>
                          <strong
                            style={{
                              display: 'block',
                              fontSize: 14,
                            }}
                          >
                            {crop}
                          </strong>

                          <span
                            style={{
                              display: 'block',
                              fontSize: 10,
                              color: '#7c857e',
                              marginTop: 3,
                            }}
                          >
                            Procurement crop
                          </span>
                        </div>

                      </div>

                    </td>


                    {/* QUANTITY */}

                    <td
                      style={{
                        padding: '15px 14px',
                        fontSize: 15,
                        fontWeight: 750,
                        color: '#29372f',
                      }}
                    >
                      {quantity}
                    </td>


                    {/* VALUE */}

                    <td
                      style={{
                        padding: '15px 14px',
                        fontSize: 15,
                        fontWeight: 750,
                        color: '#29372f',
                      }}
                    >
                      {value}
                    </td>


                    {/* COMPLIANCE */}

                    <td
                      style={{
                        padding: '15px 14px',
                        minWidth: 180,
                      }}
                    >

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: 6,
                        }}
                      >

                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 750,
                            color: isGood
                              ? '#237543'
                              : '#a16e18',
                          }}
                        >
                          {row[3]}
                        </span>

                        <span
                          style={{
                            fontSize: 10,
                            color: '#808980',
                          }}
                        >
                          compliant
                        </span>

                      </div>

                      <div
                        style={{
                          height: 7,
                          width: '100%',
                          borderRadius: 20,
                          overflow: 'hidden',
                          background: '#e8ede7',
                        }}
                      >

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${compliance}%`,
                          }}
                          transition={{
                            duration: 1,
                            delay: 0.25 + index * 0.08,
                          }}
                          style={{
                            height: '100%',
                            borderRadius: 20,
                            background: isGood
                              ? 'linear-gradient(90deg,#a9cf9f,#27834a)'
                              : '#d4a52d',
                          }}
                        />

                      </div>

                    </td>


                    {/* STATUS */}

                    <td
                      style={{
                        padding: '15px 14px',
                        borderRadius: '0 12px 12px 0',
                      }}
                    >

                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '7px 11px',
                          borderRadius: 20,
                          background: isGood
                            ? '#e9f6eb'
                            : '#fff4da',
                          color: isGood
                            ? '#237543'
                            : '#a16e18',
                          fontSize: 11,
                          fontWeight: 750,
                        }}
                      >
                        {isGood ? '✓ Compliant' : '⚠ Review'}
                      </span>

                    </td>

                  </motion.tr>
                )

              })}

            </tbody>

          </table>

        </div>

      </Card>


      {/* =====================================================
          BOTTOM SUMMARY
      ===================================================== */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: 18,
          marginTop: 18,
        }}
      >

        {/* PROCUREMENT DISTRIBUTION */}

        <Card>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 18,
            }}
          >

            <div>
              <small
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '1.2px',
                  color: '#6d7770',
                }}
              >
                PROCUREMENT DISTRIBUTION
              </small>

              <h3
                style={{
                  fontSize: 19,
                  margin: '5px 0 0',
                  color: '#25342b',
                }}
              >
                Crop contribution
              </h3>
            </div>

            <span
              style={{
                fontSize: 11,
                color: '#7b857e',
              }}
            >
              Total: {totalQuantity}
            </span>

          </div>


          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
            }}
          >

            {data.map((row, index) => {

              const quantity =
                parseFloat(
                  row[1].replace(/,/g, '')
                ) || 0

              const percentage =
                Math.min(
                  100,
                  Math.round(
                    (quantity / 4030) * 100
                  )
                )

              return (
                <div key={row[0]}>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 6,
                    }}
                  >

                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#354139',
                      }}
                    >
                      {cropIcons[row[0]] || '🌾'} {row[0]}
                    </span>

                    <span
                      style={{
                        fontSize: 11,
                        color: '#737e76',
                      }}
                    >
                      {percentage}%
                    </span>

                  </div>

                  <div
                    style={{
                      height: 8,
                      background: '#edf1ec',
                      borderRadius: 20,
                      overflow: 'hidden',
                    }}
                  >

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${percentage}%`,
                      }}
                      transition={{
                        duration: 1,
                        delay: index * 0.1,
                      }}
                      style={{
                        height: '100%',
                        borderRadius: 20,
                        background:
                          'linear-gradient(90deg,#a7ca9e,#27834a)',
                      }}
                    />

                  </div>

                </div>
              )
            })}

          </div>

        </Card>


        {/* MSP STATUS */}

        <Card>

          <small
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: '#6d7770',
            }}
          >
            MSP STATUS
          </small>

          <h3
            style={{
              fontSize: 19,
              margin: '5px 0 18px',
              color: '#25342b',
            }}
          >
            Network health
          </h3>


          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
            }}
          >

            {/* CIRCLE */}

            <div
              style={{
                width: 105,
                height: 105,
                borderRadius: '50%',
                background:
                  'conic-gradient(#27834a 0deg 331deg,#e9eee8 331deg 360deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >

              <div
                style={{
                  width: 79,
                  height: 79,
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
                    fontSize: 22,
                    color: '#1d683c',
                  }}
                >
                  92%
                </strong>

                <span
                  style={{
                    fontSize: 8,
                    color: '#7a847d',
                  }}
                >
                  COMPLIANT
                </span>

              </div>

            </div>


            <div>

              <strong
                style={{
                  display: 'block',
                  fontSize: 15,
                  color: '#25342b',
                  marginBottom: 7,
                }}
              >
                Strong MSP adherence
              </strong>

              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  lineHeight: 1.55,
                  color: '#78827b',
                }}
              >
                Most monitored procurement centers
                are operating within approved MSP
                reference prices.
              </p>

              <div
                style={{
                  marginTop: 10,
                  fontSize: 11,
                  color: '#237543',
                  fontWeight: 700,
                }}
              >
                ✓ 177 centers compliant
              </div>

            </div>

          </div>

        </Card>

      </div>


      {/* =====================================================
          INSIGHT
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
        }}
        style={{
          marginTop: 18,
          padding: '17px 20px',
          borderRadius: 18,
          background:
            'linear-gradient(100deg,#f0f8ee,#fbfcfa)',
          border: '1px solid #dce9da',
          display: 'flex',
          alignItems: 'center',
          gap: 15,
        }}
      >

        <div
          style={{
            width: 43,
            height: 43,
            borderRadius: 13,
            background: '#dcefdc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 21,
          }}
        >
          💡
        </div>

        <div>
          <strong
            style={{
              display: 'block',
              fontSize: 13,
              color: '#25342b',
            }}
          >
            Procurement insight
          </strong>

          <p
            style={{
              margin: '4px 0 0',
              fontSize: 11,
              color: '#758078',
              lineHeight: 1.5,
            }}
          >
            Wheat and Paddy together represent the largest
            share of current procurement volume, while overall
            MSP compliance remains above 90%.
          </p>
        </div>

      </motion.div>

    </motion.div>
  )
}