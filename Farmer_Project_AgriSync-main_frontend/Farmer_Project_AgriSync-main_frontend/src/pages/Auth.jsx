import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
import heroBg from '../assets/hero.png';
import { apiLogin, apiSignupFarmer, saveSession } from '../api/client'; 

const Auth = ({ onAuthSuccess }) => {
  const langContext = useContext(LanguageContext);
  const currentLang = langContext?.language || 'en';

  const [role, setRole] = useState('Farmer');
  const [farmerTab, setFarmerTab] = useState('signin');
  // MANDI OPERATOR AUTHENTICATION
  const [mandiTab, setMandiTab] = useState('id');
  const [showMandiPassword, setShowMandiPassword] = useState(false);
  const [captcha, setCaptcha] = useState({ num1: 7, num2: 5 });
  const [otpSent, setOtpSent] = useState(false);

  // GOVERNMENT OFFICER / ADMIN AUTHENTICATION
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const [formData, setFormData] = useState({
    identifier: '', 
    password: '',
    fullName: '',
    mobile: '',
    email: '',
    state: '',
    address: '',
    district: '',
    pinCode: '',
    latitude: '',
    longitude: '',
    confirmPassword: '',
    mandiId: '',
    mandiPassword: '',
    mandiMobile: '',
    mandiOtp: '',
    captchaAnswer: '',
    adminId: '',
    adminPassword: '',
    adminMfa: '',
  });

  const fetchLocationFromPincode = async (pincode) => {
    try {
        const response = await fetch(
            `http://localhost:5000/api/location?pincode=${pincode}`
        );

        if (!response.ok) {
            throw new Error('Location not found');
        }

        const data = await response.json();
        console.log("LOCATION RESPONSE FROM API:", data);
        setFormData(prev => ({
            ...prev,
            state: data.state ?? '',
            district: data.district ?? '',
            latitude: data.latitude ?? '',
            longitude: data.longitude ?? ''
        }));

    } catch (error) {
        console.error('Error fetching location:', error);

        setFormData(prev => ({
            ...prev,
            state: '',
            district: '',
            latitude: '',
            longitude: ''
        }));
    }
};

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const t = {
    en: {
      empowering: "Empowering Farmers, Strengthening Agriculture",
      description: "AGRISync is a unified platform for farmers, mandi operators, and government officials to make agricultural procurement simpler, faster, and more transparent.",
      welcome: "Welcome to AGRISync",
      continueText: "Sign in or create an account to continue",
      selectRole: "Select Role / Category",
      roles: { "Farmer": "Farmer", "Mandi Operator": "Mandi Operator", "Government Officer": "Government Officer" },
      signIn: "Sign In",
      signUp: "Sign Up",
      mobileEmail: "Mobile Number / Gmail",
      password: "Password",
      forgotPass: "Forgot your password?",
      fullName: "Full Name",
      mobile: "Mobile Number",
      email: "Gmail / Email",
      address: "Full Address",
      district: "District",
      pinCode: "Postal PIN Code",
      state: "State",
      setPass: "Set Password",
      confirmPass: "Confirm Password",
      createAccount: "Create Account",
      newToAgrisync: "New to AGRISync?",
      alreadyHaveAccount: "Already have an account?",
      farmerIdNote: "* Your unique Farmer ID will be automatically generated upon successful registration.",
      adminAccess: "Administrator Access",
      adminDesc: "Mandi Operator authentication is restricted. Credentials will be provided separately by the system administrators.",
      govAccess: "Official Gateway",
      govDesc: "Government Officer authentication via official credentials will be configured through the central secure gateway.",
      signInDisabled: "Sign In Restricted",
      reqIdentifier: "Mobile Number / Gmail is required.",
      reqPass: "Password is required.",
      reqName: "Full Name is required.",
      reqMobile: "Mobile Number is required.",
      errMobileInvalid: "Enter a valid 10-digit Indian mobile number.",
      reqEmail: "Email is required.",
      errEmailInvalid: "Enter a valid email address.",
      reqAddress: "Address is required.",
      reqDistrict: "District is required.",
      reqPin: "PIN Code is required.",
      errPinInvalid: "Enter a valid 6-digit PIN code.",
      reqConfirm: "Confirm Password is required.",
      errMismatch: "Passwords do not match."
    },
    bn: {
      empowering: "কৃষকদের ক্ষমতায়ন, কৃষিকে শক্তিশালী করা",
      description: "এগ্রিসিঙ্ক (AGRISync) হলো কৃষক, মান্ডি অপারেটর এবং সরকারি কর্মকর্তাদের জন্য একটি সমন্বিত প্ল্যাটফর্ম।",
      welcome: "এগ্রিসিঙ্ক-এ স্বাগতম",
      continueText: "চালিয়ে যেতে লগ ইন বা অ্যাকাউন্ট তৈরি করুন",
      selectRole: "ভূমিকা / বিভাগ নির্বাচন করুন",
      roles: { "Farmer": "কৃষক", "Mandi Operator": "মান্ডি অপারেটর", "Government Officer": "সরকারি কর্মকর্তা" },
      signIn: "লগ ইন",
      signUp: "নিবন্ধন করুন",
      mobileEmail: "মোবাইল নম্বর / জিমেইল",
      password: "পাসওয়ার্ড",
      forgotPass: "পাসওয়ার্ড ভুলে গেছেন?",
      fullName: "সম্পূর্ণ নাম",
      mobile: "মোবাইল নম্বর",
      email: "জিমেইল / ইমেইল",
      address: "সম্পূর্ণ ঠিকানা",
      district: "জেলা",
      pinCode: "পিন কোড",
      state: "রাজ্য",
      setPass: "পাসওয়ার্ড সেট করুন",
      confirmPass: "পাসওয়ার্ড নিশ্চিত করুন",
      createAccount: "অ্যাকাউন্ট তৈরি করুন",
      newToAgrisync: "এগ্রিসিঙ্ক-এ নতুন?",
      alreadyHaveAccount: "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?",
      farmerIdNote: "* সফল নিবন্ধনের পরে আপনার অনন্য কৃষক আইডি স্বয়ংক্রিয়ভাবে তৈরি হবে।",
      adminAccess: "অ্যাডমিনিস্ট্রেটর অ্যাক্সেস",
      adminDesc: "মান্ডি অপারেটর প্রমাণীকরণ সীমাবদ্ধ। অ্যাডমিনিস্ট্রেটর দ্বারা আলাদাভাবে শংসাপত্র প্রদান করা হবে।",
      govAccess: "অফিসিয়াল গেটওয়ে",
      govDesc: "সরকারি কর্মকর্তা প্রমাণীকরণ কেন্দ্রীয় সুরক্ষিত গেটওয়ের মাধ্যমে কনফিগার করা হবে।",
      signInDisabled: "লগ ইন সীমাবদ্ধ",
      reqIdentifier: "মোবাইল নম্বর / জিমেইল আবশ্যক।",
      reqPass: "পাসওয়ার্ড আবশ্যক।",
      reqName: "সম্পূর্ণ নাম আবশ্যক।",
      reqMobile: "মোবাইল নম্বর আবশ্যক।",
      errMobileInvalid: "একটি বৈধ ১০-অঙ্কের ভারতীয় মোবাইল নম্বর লিখুন।",
      reqEmail: "ইমেইল আবশ্যক।",
      errEmailInvalid: "একটি বৈধ ইমেইল ঠিকানা লিখুন।",
      reqAddress: "ঠিকানা আবশ্যক।",
      reqDistrict: "জেলা আবশ্যক।",
      reqPin: "পিন কোড আবশ্যক।",
      errPinInvalid: "একটি বৈধ ৬-সংখ্যার পিন কোড লিখুন।",
      reqConfirm: "পাসওয়ার্ড নিশ্চিতকরণ আবশ্যক।",
      errMismatch: "পাসওয়ার্ড মিলছে না।"
    },
    hi: {
      empowering: "किसानों का सशक्तिकरण, कृषि को मजबूती",
      description: "AGRISync किसानों, मंडी ऑपरेटरों और सरकारी अधिकारियों के लिए एक एकीकृत मंच है।",
      welcome: "AGRISync में आपका स्वागत है",
      continueText: "जारी रखने के लिए साइन इन करें या खाता बनाएं",
      selectRole: "भूमिका / श्रेणी चुनें",
      roles: { "Farmer": "किसान", "Mandi Operator": "मंडी ऑपरेटर", "Government Officer": "सरकारी अधिकारी" },
      signIn: "साइन इन",
      signUp: "साइन अप",
      mobileEmail: "मोबाइल नंबर / जीमेल",
      password: "पासवर्ड",
      forgotPass: "क्या आप पासवर्ड भूल गए?",
      fullName: "पूरा नाम",
      mobile: "मोबाइल नंबर",
      email: "जीमेल / ईमेल",
      address: "पूरा पता",
      district: "ज़िला",
      pinCode: "पिन कोड",
      setPass: "पासवर्ड सेट करें",
      confirmPass: "पासवर्ड कन्फर्म करें",
      createAccount: "खाता बनाएं",
      newToAgrisync: "AGRISync में नए हैं?",
      alreadyHaveAccount: "क्या आपके पास पहले से खाता है?",
      farmerIdNote: "* सफल पंजीकरण के बाद आपकी किसान आईडी स्वचालित रूप से उत्पन्न हो जाएगी।",
      adminAccess: "व्यवस्थापक पहुँच",
      adminDesc: "मंडी ऑपरेटर प्रमाणीकरण प्रतिबंधित है। क्रेडेंशियल अलग से प्रदान किए जाएंगे।",
      govAccess: "आधिकारिक गेटवे",
      govDesc: "सरकारी अधिकारी प्रमाणीकरण केंद्रीय सुरक्षित गेटवे के माध्यम से कॉन्फ़िगर किया जाएगा।",
      signInDisabled: "साइन इन प्रतिबंधित",
      reqIdentifier: "मोबाइल नंबर / जीमेल आवश्यक है।",
      reqPass: "पासवर्ड आवश्यक है।",
      reqName: "पूरा नाम आवश्यक है।",
      reqMobile: "मोबाइल नंबर आवश्यक है।",
      errMobileInvalid: "कृपया एक वैध 10-अंकीय भारतीय मोबाइल नंबर दर्ज करें।",
      reqEmail: "ईमेल आवश्यक है।",
      errEmailInvalid: "कृपया एक वैध ईमेल पता दर्ज करें।",
      reqAddress: "पता आवश्यक है।",
      reqDistrict: "ज़िला आवश्यक है।",
      reqPin: "पिन कोड आवश्यक है।",
      errPinInvalid: "कृपया एक वैध 6-अंकीय पिन कोड दर्ज करें।",
      reqConfirm: "पासवर्ड कन्फर्म करना आवश्यक है।",
      errMismatch: "पासवर्ड मेल नहीं खाते।"
    }
  };

  const texts = t[currentLang] || t.en;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const refreshCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 9) + 1,
      num2: Math.floor(Math.random() * 9) + 1,
    });
    setFormData((prev) => ({ ...prev, captchaAnswer: '' }));
  };

  const handleSendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(formData.mandiMobile)) {
      setErrors((prev) => ({ ...prev, mandiMobile: 'Enter a valid 10-digit Indian mobile number.' }));
      return;
    }
    setErrors((prev) => ({ ...prev, mandiMobile: '' }));
    setOtpSent(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (role === 'Farmer') {
      if (farmerTab === 'signin') {
        if (!formData.identifier.trim()) newErrors.identifier = texts.reqIdentifier;
        if (!formData.password) newErrors.password = texts.reqPass;
      } else {
        if (!formData.fullName.trim()) newErrors.fullName = texts.reqName;
        
        if (!formData.mobile.trim()) {
          newErrors.mobile = texts.reqMobile;
        } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
          newErrors.mobile = texts.errMobileInvalid;
        }

        if (!formData.email.trim()) {
          newErrors.email = texts.reqEmail;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = texts.errEmailInvalid;
        }

        if (!formData.address.trim()) newErrors.address = texts.reqAddress;
        if (!formData.district.trim()) newErrors.district = texts.reqDistrict;

        if (!formData.pinCode.trim()) {
          newErrors.pinCode = texts.reqPin;
        } else if (!/^\d{6}$/.test(formData.pinCode)) {
          newErrors.pinCode = texts.errPinInvalid;
        }

        if (!formData.password) newErrors.password = texts.reqPass;
        if (!formData.confirmPassword) newErrors.confirmPassword = texts.reqConfirm;
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = texts.errMismatch;
        }
      }
    } else if (role === 'Mandi Operator') {
      if (mandiTab === 'id') {
        if (!formData.mandiId.trim()) newErrors.mandiId = 'Operator ID / Email is required.';
        if (!formData.mandiPassword) newErrors.mandiPassword = 'Password is required.';
        const expectedCaptcha = captcha.num1 + captcha.num2;
        if (String(formData.captchaAnswer).trim() !== String(expectedCaptcha)) {
          newErrors.captchaAnswer = 'Incorrect CAPTCHA answer.';
        }
      } else {
        if (!/^[6-9]\d{9}$/.test(formData.mandiMobile)) {
          newErrors.mandiMobile = 'Enter a valid 10-digit Indian mobile number.';
        }
        if (!/^\d{6}$/.test(formData.mandiOtp)) {
          newErrors.mandiOtp = 'Enter a valid 6-digit OTP.';
        }
      }
    } else if (role === 'Government Officer') {
      if (!formData.adminId.trim()) newErrors.adminId = 'Admin Email / Official ID is required.';
      if (!formData.adminPassword) newErrors.adminPassword = 'Master Password is required.';
      if (!/^\d{6}$/.test(formData.adminMfa)) newErrors.adminMfa = 'MFA code must contain exactly 6 digits.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || submitting) return;

    setSubmitting(true);
    console.log("SUBMIT STARTED");

    try {
      let result;
      if (role === 'Farmer' && farmerTab === 'signup') {

    result = await apiSignupFarmer({
      name: formData.fullName,
      phone: formData.mobile,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      state: formData.state,
      district: formData.district,
      pincode: formData.pinCode,
      latitude: formData.latitude,
      longitude: formData.longitude,
      mandi: 'Smart Mandi',
    });

    // Signup successful → switch to Sign In
    setFormData((prev) => ({
      ...prev,
      identifier: prev.mobile,
    }));

    setFarmerTab('signin');
    setErrors({});

    return;

} else {
        const identifier =
          role === 'Farmer'
            ? formData.identifier
            : role === 'Mandi Operator'
              ? (mandiTab === 'otp' ? formData.mandiMobile : formData.mandiId)
              : formData.adminId;

        if (role === 'Farmer') {
            console.log("FARMER LOGIN START");
            console.log("PHONE:", identifier);
            console.log("PASSWORD EXISTS:", !!formData.password);

            result = await apiLogin(identifier, formData.password);
        } else {
            result = await apiLogin(identifier);
        }
      }

      saveSession({ accessToken: result.accessToken, user: result.user });
      setErrors({});
      onAuthSuccess(role, result);
    } catch (error) {
      setErrors((prev) => ({ ...prev, submit: error.message || 'Unable to connect to the AGRISync server.' }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full font-sans bg-gray-900 selection:bg-green-200 selection:text-green-900 overflow-hidden flex flex-col lg:flex-row">
      
      {/* FIXED NATURAL BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Agriculture Background" 
          className="w-full h-full object-cover" 
        />
        {/* Subtle neutral overlay just for text readability, removing heavy green tint */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* SCROLLABLE MAIN CONTENT AREA */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row overflow-y-auto">
        
        {/* LEFT COLUMN: Branding & Text */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 lg:py-0 min-h-[30vh] lg:min-h-screen">
          <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            
            {/* Minimal Typographic Logo */}
            <div className="mb-6 inline-block">
              <span className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                AGRI<span className="text-green-400">Sync</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
              {texts.empowering}
            </h1>
            <p className="text-base sm:text-lg text-gray-100 font-medium leading-relaxed drop-shadow-md max-w-md mx-auto lg:mx-0">
              {texts.description}
            </p>
            <div className="hidden lg:block text-gray-300 text-sm font-medium mt-12">
              © {new Date().getFullYear()} AGRISync. Digital India.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Authentication Card */}
        <div className="w-full lg:w-7/12 flex items-center justify-center px-4 py-8 sm:p-8 lg:p-12 lg:min-h-screen">
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/50">
            
            {/* Card Header: Language Selector */}
            <div className="flex justify-end items-center mb-6">
              <LanguageSelector />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">{texts.welcome}</h2>
              <p className="text-sm text-gray-500 font-medium">{texts.continueText}</p>
            </div>

            {/* ROLE SELECTION */}
            <div className="mb-6">
              <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-2">
                {texts.selectRole}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3.5 text-base border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-xl bg-white border transition-all cursor-pointer font-medium text-gray-800 appearance-none shadow-sm"
                >
                  <option value="Farmer">{texts.roles["Farmer"]}</option>
                  <option value="Mandi Operator">{texts.roles["Mandi Operator"]}</option>
                  <option value="Government Officer">{texts.roles["Government Officer"]}</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                      {errors.submit && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errors.submit}</div>}
              
              {/* FARMER FLOW */}
              {role === 'Farmer' && (
                <>
                  {/* TAB SWITCHER */}
                  <div className="flex border-b border-gray-200 mb-8">
                    <button
                      type="button"
                      onClick={() => setFarmerTab('signin')}
                      className={`flex-1 py-3 px-1 text-center border-b-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                        farmerTab === 'signin' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {texts.signIn}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFarmerTab('signup')}
                      className={`flex-1 py-3 px-1 text-center border-b-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                        farmerTab === 'signup' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {texts.signUp}
                    </button>
                  </div>

                  {/* FARMER SIGN IN */}
                  {farmerTab === 'signin' && (
                    <div className="space-y-5 animate-fadeIn">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">{texts.mobileEmail}</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          </div>
                          <input
                            name="identifier"
                            type="text"
                            value={formData.identifier}
                            onChange={handleInputChange}
                            placeholder="6XXXXXXXXX or email@example.com"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all shadow-sm"
                          />
                        </div>
                        {errors.identifier && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.identifier}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">{texts.password}</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                          </div>
                          <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all shadow-sm"
                          />
                        </div>
                        {errors.password && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.password}</p>}
                      </div>

                      <div className="flex items-center justify-end">
                        <a href="#" className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors">
                          {texts.forgotPass}
                        </a>
                      </div>

                      <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all mt-2">
                        {submitting ? 'Connecting...' : texts.signIn}
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>

                      <div className="text-center mt-6">
                        <span className="text-sm text-gray-500">{texts.newToAgrisync} </span>
                        <button type="button" onClick={() => setFarmerTab('signup')} className="text-sm font-bold text-green-600 hover:underline">
                          {texts.createAccount}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FARMER SIGN UP */}
                  {farmerTab === 'signup' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">{texts.fullName}</label>
                          <input name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm" />
                          {errors.fullName && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.fullName}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">{texts.mobile}</label>
                          <input name="mobile" type="tel" value={formData.mobile} onChange={handleInputChange} placeholder="10-digit number" className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm" />
                          {errors.mobile && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.mobile}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">{texts.email}</label>
                        <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="email@example.com" className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm" />
                        {errors.email && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">{texts.address}</label>
                        <textarea name="address" rows="2" value={formData.address} onChange={handleInputChange} placeholder="Village/Town address" className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all resize-none shadow-sm"></textarea>
                        {errors.address && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.address}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">{texts.pinCode}</label>
                          <input name="pinCode" type="text" value={formData.pinCode}  onChange={(e) => {
                                  // Call your existing handler if you still want it
                                  handleInputChange(e);

                                  const pin = e.target.value;

                                  // setFormData((prev) => ({
                                  //   ...prev,
                                  //   pinCode: pin,
                                  // }));

                                  if (/^\d{6}$/.test(pin)) {
                                    fetchLocationFromPincode(pin);
                                  }
                                }}  placeholder="6-digits" maxLength={6} className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm" />
                          {errors.pinCode && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.pinCode}</p>}
                        </div>
                        {/* <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">{texts.state}</label>
                          <input type="text" name="state" value={formData.state} readOnly placeholder="State"/>
                        </div> */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              {texts.state}
                            </label>
                            <input type="text" name="state" value={formData.state} readOnly placeholder="State" className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm"/>
                          </div>
                          
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">{texts.district}</label>
                          <input name="district" type="text" value={formData.district ?? ''} readOnly placeholder="District" className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm" />
                          {errors.district && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.district}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Latitude
                          </label>
                          <input type="text" name="latitude" value={formData.latitude ?? ''} readOnly placeholder="Latitude" className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm"/>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Longitude
                          </label>
                          <input type="text" name="longitude" value={formData.longitude ?? ''} readOnly placeholder="Longitude" className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm"/>
                        </div>
                      </div>


                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">{texts.setPass}</label>
                          <input name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm" />
                          {errors.password && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.password}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">{texts.confirmPass}</label>
                          <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm" />
                          {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.confirmPassword}</p>}
                        </div>
                      </div>

                      <p className="text-xs text-blue-800 bg-blue-50 p-3.5 rounded-xl border border-blue-100 font-medium shadow-sm">
                        {texts.farmerIdNote}
                      </p>

                      <button type="submit" className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all mt-6">
                        {submitting ? 'Creating...' : texts.createAccount}
                      </button>
                      
                      <div className="text-center mt-4">
                        <span className="text-sm text-gray-500">{texts.alreadyHaveAccount} </span>
                        <button type="button" onClick={() => setFarmerTab('signin')} className="text-sm font-bold text-green-600 hover:underline">
                          {texts.signIn}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* MANDI OPERATOR AUTHENTICATION */}
              {role === 'Mandi Operator' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="text-center">
                    <h3 className="text-xl font-extrabold text-gray-900">Mandi Operator Authentication</h3>
                    <p className="text-sm text-gray-500 mt-1">Secure access for authorized mandi personnel</p>
                  </div>

                  <div className="flex border-b border-gray-200">
                    <button type="button" onClick={() => { setMandiTab('id'); setErrors({}); }}
                      className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${mandiTab === 'id' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-400 hover:text-gray-700'}`}>
                      Operator ID / Email
                    </button>
                    <button type="button" onClick={() => { setMandiTab('otp'); setErrors({}); }}
                      className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${mandiTab === 'otp' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-400 hover:text-gray-700'}`}>
                      Mobile OTP (For Emergency Login)
                    </button>
                  </div>

                  {mandiTab === 'id' ? (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Operator ID / Email</label>
                        <input name="mandiId" type="text" value={formData.mandiId} onChange={handleInputChange}
                          placeholder="OP-WB-101 or rajesh.mandi@gov.in"
                          className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm" />
                        {errors.mandiId && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.mandiId}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                        <div className="relative">
                          <input name="mandiPassword" type={showMandiPassword ? 'text' : 'password'} value={formData.mandiPassword} onChange={handleInputChange}
                            placeholder="••••••••" className="block w-full px-3 py-3 pr-20 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm" />
                          <button type="button" onClick={() => setShowMandiPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 hover:text-gray-800">
                            {showMandiPassword ? 'Hide' : 'Show'}
                          </button>
                        </div>
                        {errors.mandiPassword && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.mandiPassword}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assigned Mandi</label>
                        <select disabled value="" onChange={() => {}} className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-gray-100 text-sm text-gray-500 cursor-not-allowed shadow-sm">
                          <option value="">Auto-populated from operator credentials</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">CAPTCHA</label>
                        <div className="flex gap-2 items-center">
                          <div className="min-w-[110px] px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-center font-extrabold text-gray-800 tracking-wider">{captcha.num1} + {captcha.num2} = ?</div>
                          <input name="captchaAnswer" type="text" inputMode="numeric" value={formData.captchaAnswer} onChange={handleInputChange} placeholder="Answer"
                            className="flex-1 min-w-0 px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm" />
                          <button type="button" onClick={refreshCaptcha} className="px-3 py-3 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50">Refresh</button>
                        </div>
                        {errors.captchaAnswer && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.captchaAnswer}</p>}
                      </div>

                      <button type="submit" className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all">
                        Login to Mandi Dashboard
                      </button>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number</label>
                        <div className="flex gap-2">
                          <input name="mandiMobile" type="tel" inputMode="numeric" maxLength="10" value={formData.mandiMobile} onChange={handleInputChange} placeholder="10-digit mobile number"
                            className="flex-1 min-w-0 px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm" />
                          <button type="button" onClick={handleSendOtp} className="px-4 py-3 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black whitespace-nowrap">Send OTP</button>
                        </div>
                        {errors.mandiMobile && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.mandiMobile}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">6-Digit OTP</label>
                        <input name="mandiOtp" type="text" inputMode="numeric" maxLength="6" value={formData.mandiOtp} onChange={handleInputChange} placeholder={otpSent ? 'Enter OTP' : 'Send OTP first'}
                          className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm" />
                        {errors.mandiOtp && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.mandiOtp}</p>}
                      </div>

                      <button type="submit" className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all">
                        Verify & Login to Mandi Dashboard
                      </button>
                    </>
                  )}

                  <div className="border-t border-gray-200 pt-5 text-center">
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">Authorized Personnel Only. Operator credentials are generated exclusively by the Central Procurement Admin. Self-registration is restricted.</p>
                    <a href="#" onClick={(e) => e.preventDefault()} className="inline-block mt-3 text-xs font-bold text-green-600 hover:underline">Need Help / Forgot Password? Contact District Admin Support.</a>
                  </div>
                </div>
              )}

              {/* GOVERNMENT OFFICER / ADMIN AUTHENTICATION */}
              {role === 'Government Officer' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="text-center">
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gray-500">Government of India</p>
                    <h3 className="text-xl font-extrabold text-gray-900 mt-2">Ministry Administration</h3>
                    <span className="inline-flex mt-3 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-[10px] font-extrabold tracking-wider text-red-700">RESTRICTED ACCESS / LEVEL-3 ADMIN</span>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-600">
                    Your IP <span className="font-extrabold text-gray-900">[192.168.1.1]</span> is logged for security monitoring
                    <span className="block mt-1 text-[10px] text-gray-400">Demo/placeholder IP for frontend presentation.</span>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Admin Email / Official ID</label>
                    <input name="adminId" type="text" value={formData.adminId} onChange={handleInputChange} placeholder="admin.central@gov.in"
                      className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-700 text-sm shadow-sm" />
                    {errors.adminId && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.adminId}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Master Password</label>
                    <div className="relative">
                      <input name="adminPassword" type={showAdminPassword ? 'text' : 'password'} value={formData.adminPassword} onChange={handleInputChange} placeholder="••••••••"
                        className="block w-full px-3 py-3 pr-20 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-700 text-sm shadow-sm" />
                      <button type="button" onClick={() => setShowAdminPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 hover:text-gray-800">
                        {showAdminPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {errors.adminPassword && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.adminPassword}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">MFA / TOTP Security Token</label>
                    <input name="adminMfa" type="text" inputMode="numeric" maxLength="6" value={formData.adminMfa} onChange={handleInputChange} placeholder="Enter 6-digit code"
                      className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-700 text-sm tracking-[0.35em] shadow-sm" />
                    {errors.adminMfa && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.adminMfa}</p>}
                  </div>

                  <button type="submit" className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-all">
                    Authenticate & Enter Portal
                  </button>

                  <div className="border-t border-gray-200 pt-5 text-center space-y-3">
                    <p className="text-xs font-bold text-red-700 leading-relaxed uppercase tracking-wide">Unauthorised access attempts to government servers trigger automated IP security logging under the IT Act.</p>
                    <a href="#" onClick={(e) => e.preventDefault()} className="inline-block text-xs font-bold text-gray-500 hover:text-gray-900 underline decoration-gray-300 underline-offset-4">Internal IT Support / System Recovery</a>
                  </div>
                </div>
              )}
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
