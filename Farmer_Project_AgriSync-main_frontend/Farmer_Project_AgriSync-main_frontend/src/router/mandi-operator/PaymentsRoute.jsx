import Payments from '../../pages/mandi_operator/Payments.jsx'
import { useMandiOperator } from './state/MandiOperatorContext'

export default function PaymentsRoute({ quantity = 0, tokenId, onToast }) {
  const { actions } = useMandiOperator()
  const handleReceipt = async ({ tokenId: requestedTokenId, netWeightQuintal }) => {
    try {
      const result = await actions.generateReceipt({
        tokenId: requestedTokenId || tokenId,
        netWeightQuintal,
        moistureContentPercent: 12.4,
      })
      onToast?.(result?.message || 'Settlement receipt generated successfully.')
      return result
    } catch (error) {
      onToast?.(error.message || 'Unable to generate settlement receipt.')
      throw error
    }
  }
  return <Payments quantity={quantity} tokenId={tokenId} onToast={onToast} onGenerateReceipt={handleReceipt} />
}
