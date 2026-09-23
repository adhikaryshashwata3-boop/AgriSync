import React,{ useEffect, useState } from 'react'
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
    wheat: (
      <>
        <path d="M12 21V6" />
        <path d="M12 10C8 10 6 8 6 5c3 0 6 1 6 5Z" />
        <path d="M12 14c4 0 6-2 6-5-3 0-6 1-6 5Z" />
        <path d="M12 17c-3 0-5-2-5-5 3 0 5 1 5 5Z" />
      </>
    ),

    scale: (
      <>
        <path d="M12 3v18" />
        <path d="M5 7h14" />
        <path d="M7 7 4 14h6L7 7Z" />
        <path d="m17 7-3 7h6l-3-7Z" />
        <path d="M7 21h10" />
      </>
    ),

    calendar: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="3" />
        <path d="M16 2v4M8 2v4M3 9h18" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
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

export default function BookSlot({
  crop,
  setCrop,
  qty,
  setQty,
  slot,
  setSlot,
  onBook,
  onBookRequest,
  recommendedSlots = [],
}) {
  /*
    IMPORTANT:
    quantityUnit is kept inside this component.
    You do NOT need to add anything to the parent component.
  */
  const [quantityUnit, setQuantityUnit] = useState('quintals')

  const getTodayDate = () => {
    const today = new Date()

    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const [procurementDate, setProcurementDate] = useState(getTodayDate())

  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingError, setBookingError] = useState('')

  const [mandiOptions, setMandiOptions] = useState([])
  const [selectedMandi, setSelectedMandi] = useState('')
  const [mandiLoading, setMandiLoading] = useState(false)
  const [mandiError, setMandiError] = useState('')

// FETCH RECOMMENDED MANDIS WHEN BOOKING DETAILS CHANGE
useEffect(() => {

  if (!slot || !procurementDate || !crop || !qty) {
    setMandiOptions([])
    setSelectedMandi('')
    return
  }

  let cancelled = false

  const fetchMandis = async () => {

    setMandiLoading(true)
    setMandiError('')

    try {

      const token = localStorage.getItem('agrisync-access-token')

      const params = new URLSearchParams({
        crop: crop,
        quantity: String(Number(qty)),
        date: procurementDate,
        slot: slot,
      })

      const response = await fetch(
        `http://localhost:5000/api/farmer/recommended-mandis?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result?.message || 'Unable to load mandis'
        )
      }

      if (!cancelled) {

        setMandiOptions(result?.mandis || [])

        setSelectedMandi('')

      }

    } catch (error) {

      if (!cancelled) {

        setMandiOptions([])

        setMandiError(
          error.message ||
          'Unable to load recommended mandis.'
        )

      }

    } finally {

      if (!cancelled) {
        setMandiLoading(false)
      }

    }

  }

  fetchMandis()

  return () => {
    cancelled = true
  }

}, [slot, procurementDate, crop, qty])

  const slots = recommendedSlots.length
    ? recommendedSlots.map((item) => item.slotTime).filter(Boolean)
    : [
        '09:30 AM',
        '10:30 AM',
        '11:30 AM',
        '01:00 PM',
        '02:30 PM',
      ]

  const unitLabels = {
    quintals: 'Quintals',
    kg: 'Kilograms',
    tonnes: 'Tonnes',
  }

  const unitShort = {
    quintals: 'q',
    kg: 'kg',
    tonnes: 't',
  }

  const selectedUnit = quantityUnit || 'quintals'

  const displayQuantity = qty
    ? `${qty} ${unitLabels[selectedUnit]}`
    : 'Not entered'

  const canConfirm =
    Boolean(qty) &&
    Number(qty) > 0 &&
    Boolean(crop) &&
    Boolean(slot) &&
    Boolean(procurementDate) &&
    Boolean(selectedMandi)

  const handleBooking = async () => {
    console.log("BOOKING BUTTON CLICKED")
    console.log("SELECTED MANDI:", selectedMandi)
    console.log("SLOT:", slot)
    console.log("QUANTITY:", qty)
    console.log("CROP:", crop)
    if (!canConfirm || bookingLoading) {
      if (!canConfirm) alert('Please enter your estimated quantity and select an arrival time before confirming.')
      return
    }

    setBookingLoading(true)
    setBookingError('')
    try {
      const request = onBookRequest || onBook

      console.log("ON BOOK REQUEST:", onBookRequest)
      console.log("ON BOOK:", onBook)
      console.log("REQUEST FUNCTION:", request)

      if (!request) throw new Error('Booking gateway is not configured.')
        console.log("SENDING BOOKING REQUEST:", {
        cropType: crop,
        quantity: Number(qty),
        quantityUnit: selectedUnit,
        date: procurementDate,
        slotTime: slot,
        mandiId: selectedMandi,
      })

        const result = await request({
        cropType: crop,
        quantity: Number(qty),
        quantityUnit: selectedUnit,
        date: procurementDate,
        slotTime: slot,
        mandiId: selectedMandi,
      })

      console.log("BOOKING API RESULT:", result)

      onBook?.(result.token)
    } catch (error) {
      setBookingError(error.message || 'Unable to book the slot. Please check the backend connection.')
    } finally {
      setBookingLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        maxWidth: 1450,
        margin: '0 auto',
        paddingBottom: 50,
        width: '100%',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 20,
          marginBottom: 28,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: 1.5,
              color: '#718078',
              marginBottom: 8,
            }}
          >
            SMART SCHEDULING
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(30px, 4vw, 44px)',
              letterSpacing: -1.4,
              color: '#173b23',
            }}
          >
            Book your procurement
          </h1>

          <p
            style={{
              margin: '10px 0 0',
              color: '#69766d',
              fontSize: 16,
              maxWidth: 650,
              lineHeight: 1.6,
            }}
          >
            Tell us what you are bringing and choose a convenient arrival
            window.
          </p>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '9px 13px',
            borderRadius: 999,
            background: '#e7f3e3',
            color: '#31703b',
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#3e8b48',
            }}
          />

          Slots available today
        </div>
      </div>

      {/* STEP INDICATOR */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 24,
          overflowX: 'auto',
          paddingBottom: 4,
        }}
      >
        {[
          ['01', 'Produce details'],
          ['02', 'Choose time'],
          ['03', 'Confirm'],
        ].map(([number, label], index) => (
          <div
            key={number}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: index === 0 ? '#246b38' : '#e9eee8',
                color: index === 0 ? '#fff' : '#69756d',
                fontSize: 11,
                fontWeight: 900,
              }}
            >
              {number}
            </div>

            <span
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: index === 0 ? '#214d2c' : '#78827b',
              }}
            >
              {label}
            </span>

            {index < 2 && (
              <div
                style={{
                  width: 45,
                  height: 1,
                  background: '#dce2da',
                  margin: '0 6px',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* MAIN LAYOUT */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.35fr 0.85fr',
          gap: 20,
          alignItems: 'start',
        }}
      >
        {/* LEFT SIDE */}
        <div>
          <Card>
            {/* CARD HEADER */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 13,
                marginBottom: 25,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  display: 'grid',
                  placeItems: 'center',
                  background: '#edf5e9',
                  color: '#35713d',
                }}
              >
                <Icon name="wheat" size={22} />
              </div>

              <div>
                <h3 style={{ margin: 0 }}>Your produce</h3>

                <p
                  style={{
                    margin: '4px 0 0',
                    color: '#718078',
                    fontSize: 13,
                  }}
                >
                  Help the mandi prepare the right capacity.
                </p>
              </div>
            </div>

            {/* CROP */}
            <div className="field">
              <label>What crop are you bringing?</label>

              <select
                value={crop || 'Wheat'}
                onChange={(e) => setCrop(e.target.value)}
                style={{
                  minHeight: 48,
                  fontSize: 15,
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <option value="Wheat">Wheat</option>
                <option value="Paddy">Paddy</option>
                <option value="Mustard">Mustard</option>
                <option value="Maize">Maize</option>
              </select>
            </div>

            {/* QUANTITY */}
            <div
              style={{
                marginTop: 20,
              }}
            >
              <div className="field">
                <label>Estimated quantity</label>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 190px',
                    gap: 10,
                  }}
                >
                  {/* QUANTITY INPUT */}
                  <input
                    value={qty || ''}
                    onChange={(e) => setQty(e.target.value)}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter quantity"
                    style={{
                      minHeight: 48,
                      fontSize: 15,
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  />

                  {/* UNIT SELECT */}
                  <select
                    value={selectedUnit}
                    onChange={(e) => setQuantityUnit(e.target.value)}
                    style={{
                      minHeight: 48,
                      fontSize: 14,
                      fontWeight: 800,
                      color: '#294a31',
                      background: '#fff',
                      cursor: 'pointer',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="quintals">
                      Quintals (q)
                    </option>

                    <option value="kg">
                      Kilograms (kg)
                    </option>

                    <option value="tonnes">
                      Tonnes (t)
                    </option>
                  </select>
                </div>

                {/* UNIT CONVERSION INFO */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 9,
                    padding: '9px 11px',
                    borderRadius: 8,
                    background: '#f5f8f3',
                    color: '#647268',
                    fontSize: 11,
                  }}
                >
                  <Icon name="scale" size={14} />

                  <span>
                    1 tonne = 10 quintals = 1,000 kg
                  </span>
                </div>
              </div>
            </div>

            {/* DATE */}
            <div
              style={{
                marginTop: 20,
              }}
            >
              <div className="field">
                <label>Preferred procurement date</label>

                <input
                  type="date"
                  value={procurementDate}
                  min={getTodayDate()}
                  onChange={(e) =>
                    setProcurementDate(e.target.value)
                  }
                  style={{
                    minHeight: 48,
                    fontSize: 15,
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* LOCATION */}
            <div
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 12,
                background: '#f6f8f4',
                border: '1px solid #e5eae3',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  display: 'grid',
                  placeItems: 'center',
                  background: '#e6f0e4',
                  color: '#397242',
                  flexShrink: 0,
                }}
              >
                <Icon name="location" size={18} />
              </div>

              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: 0.8,
                    color: '#77827a',
                  }}
                >
                  PROCUREMENT CENTRE
                </div>

                <strong
                  style={{
                    display: 'block',
                    marginTop: 3,
                    color: '#23472c',
                  }}
                >
                  Kolkata Central Mandi
                </strong>
              </div>
            </div>
          </Card>

          {/* TIME SELECTION */}
          <div style={{ marginTop: 20 }}>
            <Card>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 13,
                  marginBottom: 22,
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    display: 'grid',
                    placeItems: 'center',
                    background: '#f5f0dc',
                    color: '#8b7027',
                  }}
                >
                  <Icon name="clock" size={22} />
                </div>

                <div>
                  <h3 style={{ margin: 0 }}>
                    Choose your arrival time
                  </h3>

                  <p
                    style={{
                      margin: '4px 0 0',
                      color: '#718078',
                      fontSize: 13,
                    }}
                  >
                    Select the window that works best for you.
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(125px, 1fr))',
                  gap: 10,
                }}
              >
                {slots.map((time) => {
                  const active = slot === time

                  return (
                    <motion.button
                      key={time}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSlot(time)}
                      style={{
                        minHeight: 62,
                        borderRadius: 12,
                        border: active
                          ? '2px solid #286b38'
                          : '1px solid #dfe5dd',
                        background: active ? '#edf6e9' : '#fff',
                        color: active ? '#205b2e' : '#56645b',
                        cursor: 'pointer',
                        fontWeight: 800,
                        fontSize: 14,
                        position: 'relative',
                      }}
                    >
                      {active && (
                        <span
                          style={{
                            position: 'absolute',
                            top: 7,
                            right: 7,
                            color: '#2c733c',
                          }}
                        >
                          <Icon name="check" size={14} />
                        </span>
                      )}

                      {time}
                    </motion.button>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
              
              {/* RECOMMENDED MANDIS */}
        <div style={{ marginTop: 20 }}>
          <Card>
            <div style={{ padding: 20 }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#24352a',
                  marginBottom: 10,
                }}
              >
                Select Mandi
              </div>

              {mandiLoading ? (
                <div
                  style={{
                    color: '#6b756e',
                    fontSize: 14,
                  }}
                >
                  Finding nearby mandis...
                </div>
              ) : mandiError ? (
                <div
                  style={{
                    color: '#c0392b',
                    fontSize: 14,
                  }}
                >
                  {mandiError}
                </div>
              ) : (
                <select
                  value={selectedMandi}
                  onChange={(e) => setSelectedMandi(e.target.value)}
                  disabled={!mandiOptions.length}
                  style={{
                    width: '100%',
                    minHeight: 48,
                    borderRadius: 10,
                    border: '1px solid #dfe5dd',
                    padding: '0 12px',
                    fontSize: 14,
                    fontWeight: 600,
                    background: '#fff',
                    color: '#344238',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">
                    Select a recommended mandi
                  </option>

                  {mandiOptions.map((mandi) => (
                    <option
                      key={mandi.mandi_id}
                      value={mandi.mandi_id}
                    >
                      {mandi.mandi_name} — {mandi.distance_km} km — Waiting: {mandi.estimated_waiting_time ?? '--'}
                    </option>
                  ))}
                </select>
              )}

              {selectedMandi && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    color: '#647067',
                  }}
                >
                  Mandi selected successfully.
                </div>
              )}
            </div>
          </Card>
        </div>
        {/* RIGHT SUMMARY */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            position: 'sticky',
            top: 20,
          }}
        >
          <div
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              background: '#173e25',
              color: '#fff',
              boxShadow:
                '0 15px 40px rgba(23,62,37,0.16)',
            }}
          >
            {/* SUMMARY HEADER */}
            <div
              style={{
                padding: '25px 25px 21px',
                borderBottom:
                  '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 1.3,
                  color: '#9bc18d',
                }}
              >
                BOOKING SUMMARY
              </div>

              <motion.h2
                key={canConfirm ? 'ready' : 'not-ready'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  margin: '8px 0 0',
                  fontSize: 25,
                  letterSpacing: -0.5,
                }}
              >
                {canConfirm
                  ? 'Ready to confirm!'
                  : 'Complete your booking'}
              </motion.h2>
            </div>

            {/* SUMMARY DETAILS */}
            <div
              style={{
                padding: 25,
              }}
            >
              <SummaryRow
                icon="wheat"
                label="Crop"
                value={crop || 'Not selected'}
              />

              <SummaryRow
                icon="scale"
                label="Estimated quantity"
                value={displayQuantity}
              />

              <SummaryRow
                icon="calendar"
                label="Date"
                value={formatDate(procurementDate)}
              />

              <SummaryRow
                icon="clock"
                label="Arrival"
                value={slot || 'Select a time'}
              />

              {/* SELECTED UNIT BADGE */}
              <motion.div
                key={selectedUnit}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  marginTop: 4,
                  marginBottom: 5,
                  padding: '11px 13px',
                  borderRadius: 10,
                  background:
                    'rgba(255,255,255,0.07)',
                  border:
                    '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    color: '#91ae96',
                    fontSize: 11,
                  }}
                >
                  SELECTED UNIT
                </span>

                <strong
                  style={{
                    color: '#d8e9b9',
                    fontSize: 12,
                  }}
                >
                  {unitLabels[selectedUnit]} (
                  {unitShort[selectedUnit]})
                </strong>
              </motion.div>

              <div
                style={{
                  height: 1,
                  background:
                    'rgba(255,255,255,0.12)',
                  margin: '21px 0',
                }}
              />

              {/* STATUS */}
              <motion.div
                key={canConfirm ? 'complete' : 'pending'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 18,
                  color: canConfirm
                    ? '#bfe1b2'
                    : '#d8c98f',
                  fontSize: 12,
                  lineHeight: 1.5,
                }}
              >
                <Icon
                  name="check"
                  size={18}
                />

                <span>
                  {canConfirm
                    ? 'All booking details are ready.'
                    : 'Enter quantity and select an arrival time.'}
                </span>
              </motion.div>

              {/* CONFIRM BUTTON */}
              <motion.button
                type="button"
                whileHover={{
                  y: -2,
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={handleBooking}
                style={{
                  width: '100%',
                  minHeight: 52,
                  border: 0,
                  borderRadius: 12,
                  background: canConfirm
                    ? '#d8e9b9'
                    : '#8da184',
                  color: '#183d24',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 9,
                  transition:
                    'background .2s ease',
                }}
              >
                {bookingLoading
                  ? 'Booking...'
                  : canConfirm
                    ? 'Confirm & Generate Token'
                  : 'Complete Details First'}

                <Icon name="arrow" size={17} />
              </motion.button>
            </div>
          </div>

          {/* HELPFUL NOTE */}
          <div
            style={{
              marginTop: 14,
              padding: 16,
              borderRadius: 14,
              background: '#f5f1df',
              border: '1px solid #e9dfba',
            }}
          >
            <strong
              style={{
                display: 'block',
                color: '#5e512f',
                fontSize: 13,
                marginBottom: 5,
              }}
            >
              Before you arrive
            </strong>

            <p
              style={{
                margin: 0,
                color: '#766d50',
                fontSize: 12,
                lineHeight: 1.6,
              }}
            >
              Keep your produce ready and bring the required
              procurement documents with you.
            </p>
          </div>
        </motion.div>
      </div>

      {/* RESPONSIVE */}
      <style>
        {`
          @media (max-width: 900px) {
            .book-slot-main {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 600px) {
            .quantity-main {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </motion.div>
  )
}

function SummaryRow({ icon, label, value }) {
  return (
    <motion.div
      layout
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 18,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          display: 'grid',
          placeItems: 'center',
          background:
            'rgba(255,255,255,0.09)',
          color: '#b9d5ae',
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={17} />
      </div>

      <div
        style={{
          minWidth: 0,
          flex: 1,
        }}
      >
        <div
          style={{
            color: '#94b39a',
            fontSize: 11,
            marginBottom: 2,
          }}
        >
          {label}
        </div>

        <motion.strong
          key={value}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'block',
            color: '#fff',
            fontSize: 14,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {value}
        </motion.strong>
      </div>
    </motion.div>
  )
}

function formatDate(date) {
  if (!date) return 'Select a date'

  const parsed = new Date(`${date}T00:00:00`)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return parsed.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}