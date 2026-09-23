import GovernmentPortal from '../../pages/government/GovernmentPortal.jsx'
import { GovernmentState } from './state/GovernmentContext'

export default function GovernmentRouter() {
  return (
    <GovernmentState>
      <GovernmentPortal />
    </GovernmentState>
  )
}
