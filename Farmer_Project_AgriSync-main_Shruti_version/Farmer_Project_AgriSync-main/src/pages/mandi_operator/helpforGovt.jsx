import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    government: (
      <>
        <path d="m3 9 9-5 9 5" />
        <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
        <path d="M3 20h18" />
      </>
    ),

    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),

    alert: (
      <>
        <path d="M12 3 2.8 19h18.4L12 3Z" />
        <path d="M12 9v4" />
        <path d="M12 16h.01" />
      </>
    ),

    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    message: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3-.5L4 20l1.5-4A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
        <path d="M8 11h8M8 14h5" />
      </>
    ),

    report: (
      <>
        <path d="M5 3h14v18H5z" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </>
    ),

    support: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.7-1.7 1.1-1.7 2.4" />
        <path d="M12 16h.01" />
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

export default function helpforGovt({ onToast }) {
  const [category, setCategory] = useState('Operational Issue')
  const [priority, setPriority] = useState('Normal')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!message.trim()) {
      onToast?.('Please describe the issue before submitting.')
      return
    }

    setSubmitted(true)
    onToast?.('Request sent to the government help desk.')
  }

  const resetForm = () => {
    setMessage('')
    setCategory('Operational Issue')
    setPriority('Normal')
    setSubmitted(false)
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
            GOVERNMENT COORDINATION
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
            Help for Government
          </h1>

          <p
            style={{
              margin: '9px 0 0',
              fontSize: 16,
              color: '#697569',
            }}
          >
            Report mandi issues and share operational updates with government teams.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '10px 16px',
            background: '#eef6eb',
            border: '1px solid #d2e4cd',
            borderRadius: 8,
            color: '#2c6735',
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

          Government Desk Online
        </div>
      </div>

      {/* =====================================================
          QUICK STATUS STRIP
      ====================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          border: '1px solid #dfe5dc',
          background: '#fff',
          marginBottom: 24,
        }}
      >
        {[
          {
            label: 'ACTIVE MANDI',
            value: 'Kolkata Central',
            icon: 'government',
          },
          {
            label: 'CURRENT STATUS',
            value: 'Operations Normal',
            icon: 'check',
          },
          {
            label: 'SUPPORT RESPONSE',
            value: '< 30 minutes',
            icon: 'clock',
          },
        ].map((item, index) => (
          <div
            key={item.label}
            style={{
              minHeight: 105,
              padding: '20px 24px',
              borderRight:
                index !== 2 ? '1px solid #dfe5dc' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 15,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 9,
                background: '#f0f5ed',
                color: '#397040',
                flexShrink: 0,
              }}
            >
              <Icon name={item.icon} size={21} />
            </div>

            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: '#7b8579',
                  marginBottom: 5,
                }}
              >
                {item.label}
              </span>

              <strong
                style={{
                  fontSize: 16,
                  color: '#263329',
                }}
              >
                {item.value}
              </strong>
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.65fr 1fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* =================================================
            REQUEST FORM
        ================================================== */}
        <Card>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 20,
              paddingBottom: 20,
              marginBottom: 22,
              borderBottom: '1px solid #e1e6df',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 13,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 10,
                  background: '#edf5e9',
                  color: '#2f6f38',
                  flexShrink: 0,
                }}
              >
                <Icon name="message" size={23} />
              </div>

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
                  Submit a Government Request
                </h2>

                <p
                  style={{
                    margin: '5px 0 0',
                    fontSize: 14,
                    color: '#788277',
                  }}
                >
                  Send an operational issue or support request to the
                  responsible department.
                </p>
              </div>
            </div>

            <span
              style={{
                padding: '7px 10px',
                background: '#f4f6f2',
                border: '1px solid #e0e5dc',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 800,
                color: '#697468',
                whiteSpace: 'nowrap',
              }}
            >
              COORDINATION WORKFLOW
            </span>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  minHeight: 360,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 30,
                }}
              >
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 180 }}
                  style={{
                    width: 72,
                    height: 72,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '50%',
                    background: '#e4f2df',
                    color: '#2f7438',
                    marginBottom: 20,
                  }}
                >
                  <Icon name="check" size={34} />
                </motion.div>

                <h2
                  style={{
                    margin: 0,
                    fontFamily: 'Space Grotesk, Inter, sans-serif',
                    fontSize: 27,
                    color: '#213025',
                  }}
                >
                  Request Submitted
                </h2>

                <p
                  style={{
                    maxWidth: 480,
                    margin: '10px auto 0',
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: '#737e73',
                  }}
                >
                  Your request has been prepared for the government
                  coordination desk through the current portal workflow.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 12,
                    width: '100%',
                    maxWidth: 500,
                    marginTop: 25,
                  }}
                >
                  <div
                    style={{
                      padding: 14,
                      background: '#f7f9f5',
                      border: '1px solid #e0e6dc',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#7b8579',
                        letterSpacing: 0.8,
                      }}
                    >
                      CATEGORY
                    </span>

                    <b
                      style={{
                        display: 'block',
                        marginTop: 5,
                        fontSize: 14,
                        color: '#29362c',
                      }}
                    >
                      {category}
                    </b>
                  </div>

                  <div
                    style={{
                      padding: 14,
                      background: '#f7f9f5',
                      border: '1px solid #e0e6dc',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#7b8579',
                        letterSpacing: 0.8,
                      }}
                    >
                      PRIORITY
                    </span>

                    <b
                      style={{
                        display: 'block',
                        marginTop: 5,
                        fontSize: 14,
                        color: '#29362c',
                      }}
                    >
                      {priority}
                    </b>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    marginTop: 25,
                    padding: '11px 18px',
                    border: '1px solid #cfd8cc',
                    background: '#fff',
                    color: '#344235',
                    borderRadius: 7,
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* CATEGORY + PRIORITY */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 18,
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: 8,
                        fontSize: 13,
                        fontWeight: 800,
                        color: '#435044',
                      }}
                    >
                      Request Category
                    </label>

                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '14px 15px',
                        border: '1px solid #ccd7c9',
                        background: '#fff',
                        borderRadius: 7,
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#29362c',
                        outline: 'none',
                      }}
                    >
                      <option>Operational Issue</option>
                      <option>Procurement Support</option>
                      <option>Infrastructure Issue</option>
                      <option>Farmer Grievance</option>
                      <option>Payment Issue</option>
                      <option>Emergency Alert</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: 8,
                        fontSize: 13,
                        fontWeight: 800,
                        color: '#435044',
                      }}
                    >
                      Priority
                    </label>

                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '14px 15px',
                        border: '1px solid #ccd7c9',
                        background: '#fff',
                        borderRadius: 7,
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#29362c',
                        outline: 'none',
                      }}
                    >
                      <option>Normal</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>

                {/* SUBJECT */}
                <div style={{ marginTop: 20 }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: 8,
                      fontSize: 13,
                      fontWeight: 800,
                      color: '#435044',
                    }}
                  >
                    Mandi / Location
                  </label>

                  <input
                    defaultValue="Kolkata Central Mandi"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '14px 15px',
                      border: '1px solid #ccd7c9',
                      background: '#fff',
                      borderRadius: 7,
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#29362c',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* MESSAGE */}
                <div style={{ marginTop: 20 }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: 8,
                      fontSize: 13,
                      fontWeight: 800,
                      color: '#435044',
                    }}
                  >
                    Describe the Issue / Request
                  </label>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe what the government team needs to know..."
                    rows={7}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '14px 15px',
                      border: '1px solid #ccd7c9',
                      background: '#fff',
                      borderRadius: 7,
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: '#29362c',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  />
                </div>

                {/* ACTION */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 20,
                    marginTop: 22,
                    paddingTop: 20,
                    borderTop: '1px solid #e1e6df',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 12,
                      color: '#7a8478',
                    }}
                  >
                    <Icon name="government" size={16} />
                    Request will be routed through the government coordination workflow.
                  </div>

                  <motion.button
                    whileHover={{
                      y: -2,
                      boxShadow: '0 8px 18px rgba(39,95,49,.16)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleSubmit}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 9,
                      minHeight: 50,
                      padding: '0 22px',
                      border: 'none',
                      borderRadius: 7,
                      background: '#285f31',
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    Send to Government
                    <Icon name="send" size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* =================================================
            RIGHT SIDE
        ================================================== */}
        <div
          style={{
            display: 'grid',
            gap: 24,
          }}
        >
          {/* GOVERNMENT SUPPORT */}
          <Card>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  display: 'grid',
                  placeItems: 'center',
                  background: '#f1f5ee',
                  color: '#3c7042',
                  borderRadius: 9,
                }}
              >
                <Icon name="support" size={23} />
              </div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: 'Space Grotesk, Inter, sans-serif',
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#1f2d22',
                  }}
                >
                  Government Support
                </h2>

                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: 13,
                    color: '#788277',
                  }}
                >
                  Available coordination channels
                </p>
              </div>
            </div>

            {[
              ['Mandi Operations Desk', 'Operational support'],
              ['Procurement Department', 'MSP & procurement'],
              ['District Control Room', 'Urgent incidents'],
            ].map(([title, description], index) => (
              <motion.div
                key={title}
                whileHover={{ x: 3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 15,
                  padding: '14px 0',
                  borderTop:
                    index !== 0 ? '1px solid #e4e8e1' : 'none',
                }}
              >
                <div>
                  <b
                    style={{
                      display: 'block',
                      fontSize: 14,
                      color: '#303d33',
                    }}
                  >
                    {title}
                  </b>

                  <span
                    style={{
                      display: 'block',
                      marginTop: 4,
                      fontSize: 12,
                      color: '#7a8478',
                    }}
                  >
                    {description}
                  </span>
                </div>

                <Icon name="arrow" size={17} />
              </motion.div>
            ))}
          </Card>

          {/* RECENT REQUESTS */}
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
                <h2
                  style={{
                    margin: 0,
                    fontFamily: 'Space Grotesk, Inter, sans-serif',
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#1f2d22',
                  }}
                >
                  Recent Requests
                </h2>

                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: 13,
                    color: '#788277',
                  }}
                >
                  Latest coordination activity
                </p>
              </div>

              <Icon name="report" size={22} />
            </div>

            {[
              {
                title: 'Procurement update',
                time: '18 min ago',
                status: 'Resolved',
              },
              {
                title: 'Queue congestion',
                time: '42 min ago',
                status: 'Monitoring',
              },
              {
                title: 'Payment clarification',
                time: '1 hr ago',
                status: 'Resolved',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                style={{
                  padding: '14px 0',
                  borderTop:
                    index !== 0 ? '1px solid #e4e8e1' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <b
                    style={{
                      fontSize: 14,
                      color: '#303d33',
                    }}
                  >
                    {item.title}
                  </b>

                  <span
                    style={{
                      padding: '5px 8px',
                      background:
                        item.status === 'Resolved'
                          ? '#edf6e9'
                          : '#fff5df',
                      color:
                        item.status === 'Resolved'
                          ? '#36723d'
                          : '#85651f',
                      fontSize: 10,
                      fontWeight: 800,
                      borderRadius: 5,
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                <span
                  style={{
                    display: 'block',
                    marginTop: 5,
                    fontSize: 12,
                    color: '#7a8478',
                  }}
                >
                  {item.time}
                </span>
              </div>
            ))}
          </Card>

          {/* ALERT BOX */}
          <motion.div
            whileHover={{ y: -2 }}
            style={{
              padding: 20,
              border: '1px solid #eadfbd',
              background: '#fff9e9',
              borderRadius: 8,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
              }}
            >
              <div
                style={{
                  color: '#8b6b20',
                  marginTop: 1,
                }}
              >
                <Icon name="alert" size={22} />
              </div>

              <div>
                <b
                  style={{
                    display: 'block',
                    fontSize: 14,
                    color: '#57471f',
                  }}
                >
                  Emergency reporting
                </b>

                <p
                  style={{
                    margin: '6px 0 0',
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: '#7c6d48',
                  }}
                >
                  For critical mandi incidents, select
                  <strong> Critical </strong>
                  priority when submitting a request.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          marginTop: 28,
          paddingTop: 18,
          borderTop: '1px solid #dfe5dc',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
          fontSize: 12,
          color: '#7b8579',
        }}
      >
        <span>
          Mandi Operator → Government coordination
        </span>

        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          <Icon name="check" size={15} />
          Connected portal workflow
        </span>
      </div>
    </motion.div>
  )
}