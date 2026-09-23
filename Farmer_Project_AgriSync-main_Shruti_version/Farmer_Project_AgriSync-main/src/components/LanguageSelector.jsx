import { useLanguage } from '../context/LanguageContext'

export default function LanguageSelector({ disabled = false }) {
  const { language, setLanguage, t } = useLanguage()
  return (
    <label className="language-control">
      <span>{t('language')}</span>
      <select value={language} onChange={e => setLanguage(e.target.value)} disabled={disabled}>
        <option value="en">English</option>
        <option value="bn">বাংলা</option>
        <option value="hi">हिन्दी</option>
      </select>
    </label>
  )
}
