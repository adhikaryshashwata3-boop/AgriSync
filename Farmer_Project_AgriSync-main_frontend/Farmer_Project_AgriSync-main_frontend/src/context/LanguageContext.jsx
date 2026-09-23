import { createContext, useContext, useState } from 'react'
// 

export const LanguageContext = createContext(null)
// const LanguageContext = createContext(null)

const dictionaries = {
  en: {
    language: 'Language', dashboard: 'Dashboard', book: 'Book Slot', queue: 'Live Queue', history: 'History', msp: 'MSP Prices', support: 'Support',
    liveQueue: 'Live Queue', gate: 'Gate Scan', quality: 'Quality Check', weighbridge: 'Weighbridge', payments: 'Payments', analytics: 'Analytics', helpGovt: 'Help for Government',
    government: 'Government', mandis: 'Mandi Monitoring', procurement: 'Procurement', mspMonitoring: 'MSP Monitoring', reports: 'Reports', alerts: 'Alerts',
    farmer: 'Farmer', operator: 'Mandi Operator', department: 'Government', light: 'Light', dark: 'Dark', systemOnline: 'System online',
    needHelp: 'Need help?', call: 'Call 1800-000-2026',
  },
  bn: {
    language: 'ভাষা', dashboard: 'ড্যাশবোর্ড', book: 'স্লট বুক করুন', queue: 'লাইভ কিউ', history: 'ইতিহাস', msp: 'এমএসপি মূল্য', support: 'সহায়তা',
    liveQueue: 'লাইভ কিউ', gate: 'গেট স্ক্যান', quality: 'গুণমান পরীক্ষা', weighbridge: 'ওয়েইব্রিজ', payments: 'পেমেন্ট', analytics: 'বিশ্লেষণ', helpGovt: 'সরকারের জন্য সহায়তা',
    government: 'সরকার', mandis: 'মন্ডি পর্যবেক্ষণ', procurement: 'ক্রয়', mspMonitoring: 'এমএসপি পর্যবেক্ষণ', reports: 'রিপোর্ট', alerts: 'সতর্কতা',
    farmer: 'কৃষক', operator: 'মন্ডি অপারেটর', department: 'সরকার', light: 'লাইট', dark: 'ডার্ক', systemOnline: 'সিস্টেম অনলাইন',
    needHelp: 'সাহায্য দরকার?', call: 'কল 1800-000-2026',
  },
  hi: {
    language: 'भाषा', dashboard: 'डैशबोर्ड', book: 'स्लॉट बुक करें', queue: 'लाइव कतार', history: 'इतिहास', msp: 'एमएसपी मूल्य', support: 'सहायता',
    liveQueue: 'लाइव कतार', gate: 'गेट स्कैन', quality: 'गुणवत्ता जांच', weighbridge: 'वेटब्रिज', payments: 'भुगतान', analytics: 'विश्लेषण', helpGovt: 'सरकार के लिए सहायता',
    government: 'सरकार', mandis: 'मंडी निगरानी', procurement: 'खरीद', mspMonitoring: 'एमएसपी निगरानी', reports: 'रिपोर्ट', alerts: 'अलर्ट',
    farmer: 'किसान', operator: 'मंडी ऑपरेटर', department: 'सरकार', light: 'लाइट', dark: 'डार्क', systemOnline: 'सिस्टम ऑनलाइन',
    needHelp: 'मदद चाहिए?', call: 'कॉल 1800-000-2026',
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('agrisync-language') || 'en')
  const changeLanguage = value => { setLanguage(value); localStorage.setItem('agrisync-language', value) }
  const t = key => dictionaries[language]?.[key] || dictionaries.en[key] || key
  return <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() { return useContext(LanguageContext) }
