import QualityCheck from '../../pages/mandi_operator/Quality Check.jsx'

export default function QualityCheckRoute({ grade, setGrade, onProceed }) {
  return <QualityCheck grade={grade} setGrade={setGrade} onProceed={onProceed} />
}
