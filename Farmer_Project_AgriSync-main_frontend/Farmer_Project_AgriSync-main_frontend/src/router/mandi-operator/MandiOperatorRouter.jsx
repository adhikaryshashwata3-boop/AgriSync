import MandiOperatorPortal from '../../pages/mandi_operator/MandiOperatorPortal.jsx'
import { MandiOperatorState } from './state/MandiOperatorContext'

export default function MandiOperatorRouter() {
  return (
    <MandiOperatorState>
      <MandiOperatorPortal />
    </MandiOperatorState>
  )
}
