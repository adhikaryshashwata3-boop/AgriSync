import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

// Open Indian state boundaries. The map is a presentation surface for procurement monitoring data.
const geoUrl = 'https://raw.githubusercontent.com/india-in-data/india-states-2019/master/india_states.geojson'

const stateStats = {
  'Andhra Pradesh': { markets: 9, intensity: 68, procurement: '2.7 L MT' },
  'Arunachal Pradesh': { markets: 3, intensity: 34, procurement: '0.6 L MT' },
  Assam: { markets: 7, intensity: 52, procurement: '1.8 L MT' },
  Bihar: { markets: 11, intensity: 76, procurement: '3.9 L MT' },
  Chhattisgarh: { markets: 8, intensity: 63, procurement: '2.5 L MT' },
  Delhi: { markets: 2, intensity: 42, procurement: '0.4 L MT' },
  Goa: { markets: 2, intensity: 28, procurement: '0.2 L MT' },
  Gujarat: { markets: 14, intensity: 82, procurement: '4.6 L MT' },
  Haryana: { markets: 12, intensity: 88, procurement: '4.9 L MT' },
  'Himachal Pradesh': { markets: 5, intensity: 46, procurement: '1.0 L MT' },
  'Jammu & Kashmir': { markets: 5, intensity: 44, procurement: '0.9 L MT' },
  Jharkhand: { markets: 6, intensity: 58, procurement: '2.1 L MT' },
  Karnataka: { markets: 15, intensity: 79, procurement: '4.7 L MT' },
  Kerala: { markets: 7, intensity: 55, procurement: '1.5 L MT' },
  Ladakh: { markets: 2, intensity: 25, procurement: '0.2 L MT' },
  'Madhya Pradesh': { markets: 18, intensity: 91, procurement: '7.2 L MT' },
  Maharashtra: { markets: 20, intensity: 86, procurement: '6.8 L MT' },
  Manipur: { markets: 3, intensity: 39, procurement: '0.5 L MT' },
  Meghalaya: { markets: 3, intensity: 35, procurement: '0.4 L MT' },
  Mizoram: { markets: 2, intensity: 29, procurement: '0.2 L MT' },
  Nagaland: { markets: 3, intensity: 33, procurement: '0.3 L MT' },
  Odisha: { markets: 10, intensity: 67, procurement: '3.2 L MT' },
  Punjab: { markets: 16, intensity: 94, procurement: '5.9 L MT' },
  Rajasthan: { markets: 14, intensity: 78, procurement: '4.4 L MT' },
  Sikkim: { markets: 2, intensity: 27, procurement: '0.2 L MT' },
  'Tamil Nadu': { markets: 16, intensity: 73, procurement: '4.0 L MT' },
  Telangana: { markets: 10, intensity: 69, procurement: '2.9 L MT' },
  Tripura: { markets: 3, intensity: 38, procurement: '0.5 L MT' },
  'Uttar Pradesh': { markets: 26, intensity: 92, procurement: '8.9 L MT' },
  Uttarakhand: { markets: 5, intensity: 48, procurement: '1.0 L MT' },
  'West Bengal': { markets: 4, intensity: 88, procurement: '4.8 L MT' },
}

const normalizeStateName = (name = '') => {
  const aliases = {
    'Uttar Pradesh': 'Uttar Pradesh',
    UttarPradesh: 'Uttar Pradesh',
    'Telengana': 'Telangana',
    'Jammu and Kashmir': 'Jammu & Kashmir',
  }
  return aliases[name] || name
}

// Palette matched to the reference screenshot: warm mustard mid-range,
// fresh agricultural green, deep forest green, and a soft ivory low range.
const colorForIntensity = (value) => {
  if (value >= 90) return '#1e552e'
  if (value >= 80) return '#207030'
  if (value >= 70) return '#5aa553'
  if (value >= 55) return '#dba539'
  if (value >= 40) return '#c0a850'
  return '#e7e4d6'
}

export default function IndiaProcurementMap({ mandis = [] }) {
  const [activeState, setActiveState] = useState(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  const marketCounts = useMemo(() => {
    const counts = {}
    mandis.forEach((mandi) => {
      const state = mandi?.[1]
      if (state) counts[state] = (counts[state] || 0) + 1
    })
    return counts
  }, [mandis])

  const getStats = (rawName) => {
    const name = normalizeStateName(rawName)
    const base = stateStats[name] || { markets: 3, intensity: 40, procurement: '0.8 L MT' }
    return {
      ...base,
      markets: marketCounts[rawName] || marketCounts[name] || base.markets,
    }
  }

  return (
    <motion.div
      className="india-procurement-map"
      initial={{ opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top })
      }}
    >
      <div className="map-titlebar">
        <div>
          <small>PROCUREMENT INTENSITY</small>
          <h2>India Heatmap</h2>
          <p>Hover a state to inspect active market capacity.</p>
        </div>
        <motion.span
          className="map-live-pill"
          animate={{ boxShadow: ['0 0 0 rgba(34,197,94,0)', '0 0 18px rgba(34,197,94,.24)', '0 0 0 rgba(34,197,94,0)'] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          <i /> Live network
        </motion.span>
      </div>

      <div className="map-stage">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [82.8, 22.5], scale: 1030 }}
          width={760}
          height={545}
          style={{ width: '100%', height: '100%' }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const rawName = geo.properties?.ST_NM || geo.properties?.NAME_1 || geo.properties?.name || 'Unknown state'
                const stateName = normalizeStateName(rawName)
                const stats = getStats(rawName)
                const isActive = activeState?.name === stateName

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorForIntensity(stats.intensity)}
                    stroke="#26372b"
                    strokeWidth={isActive ? 1.7 : 0.65}
                    onMouseEnter={() => setActiveState({ name: stateName, ...stats })}
                    onMouseLeave={() => setActiveState(null)}
                    style={{
                      default: {
                        fill: colorForIntensity(stats.intensity),
                        outline: 'none',
                        transition: 'fill .2s ease, stroke-width .2s ease, filter .2s ease',
                      },
                      hover: {
                        fill: '#e0ad3c',
                        stroke: '#17251b',
                        strokeWidth: 1.8,
                        outline: 'none',
                        cursor: 'pointer',
                        transform: 'translateY(-3px) scale(1.012)',
                        transformOrigin: 'center',
                        filter: 'drop-shadow(0 5px 4px rgba(0,0,0,.24))',
                      },
                      pressed: {
                        fill: '#174b28',
                        outline: 'none',
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>

        <AnimatePresence>
          {activeState && (
            <motion.div
              className="state-hover-card"
              initial={{ opacity: 0, scale: 0.86, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.86, y: 10 }}
              transition={{ duration: 0.16 }}
              style={{
                left: Math.min(cursor.x + 18, 520),
                top: Math.max(cursor.y - 55, 80),
              }}
            >
              <div className="state-hover-heading">
                <span className="state-pin">⌖</span>
                <div>
                  <strong>{activeState.name}</strong>
                  <small>State procurement network</small>
                </div>
              </div>

              <div className="state-hover-metrics">
                <div>
                  <small>Markets</small>
                  <strong>{activeState.markets}</strong>
                </div>
                <div>
                  <small>Intensity</small>
                  <strong>{activeState.intensity}%</strong>
                </div>
                <div>
                  <small>Procured</small>
                  <strong>{activeState.procurement}</strong>
                </div>
              </div>

              <div className="state-hover-progress">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: `${activeState.intensity}%` }}
                  transition={{ duration: 0.45 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="map-legend-card">
          <strong>Procurement Intensity</strong>
          <div className="map-gradient" />
          <div><span>Low</span><span>High</span></div>
        </div>
      </div>
    </motion.div>
  )
}
