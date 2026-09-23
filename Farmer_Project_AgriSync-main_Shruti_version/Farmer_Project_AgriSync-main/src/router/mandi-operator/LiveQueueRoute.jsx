import { useEffect } from 'react'
import LiveQueue from '../../pages/mandi_operator/Live Queue.jsx'
import { useMandiOperator } from './state/MandiOperatorContext'

export default function LiveQueueRoute({ onAction, onToast }) {
  const { state, actions } = useMandiOperator()
  useEffect(() => { actions.loadQueue().catch(() => {}) }, [actions])

  const rows = (state.queue?.queue || []).map((item) => [
    item.id,
    item.farmerName,
    item.cropType,
    item.quantity,
    item.status,
  ])

  return <LiveQueue rows={rows} onAction={onAction} onToast={onToast} onRefresh={() => actions.loadQueue().catch(() => {})} />
}
