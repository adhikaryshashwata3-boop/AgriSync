import FarmerPortal from '../../pages/farmer/FarmerPortal.jsx'
import { FarmerState } from './state/FarmerContext'
import { clearSession } from '../../api/client'

// export default function FarmerRouter() {
//   return (
//     <FarmerState>
//       <FarmerPortal />
//     </FarmerState>
//   )
// }
export default function FarmerRouter({ onLogout }) {
  return (
    <FarmerState>
      <FarmerPortal onLogout={onLogout} />
    </FarmerState>
  )
}