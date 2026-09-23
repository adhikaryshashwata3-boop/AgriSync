import { useMandiOperator } from './state/MandiOperatorContext'
import GateScan from '../../pages/mandi_operator/Gate Scan.jsx'

export default function GateScanRoute({ onProceed, onToast }) {
  const { state, actions } = useMandiOperator()
  const candidate = (state.queue?.queue || []).find((item) => !item.gateCheckedIn) || state.queue?.queue?.[0]

  const handleProceed = async () => {
    if (!candidate?.id) {
      onToast?.('No active token is available in the mandi queue.')
      return
    }
    try {
      const result = await actions.scanQrPass({ tokenId: candidate.id })
      onToast?.(result?.message || 'Gate check-in completed.')
      await actions.loadQueue()
      onProceed?.()
    } catch (error) {
      onToast?.(error.message || 'Unable to verify the QR pass.')
    }
  }

  return <GateScan tokenId={candidate?.id || '—'} onProceed={handleProceed} />
}
