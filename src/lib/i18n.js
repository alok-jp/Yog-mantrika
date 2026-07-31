import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const hiTranslations = {
  // Primary UI strings
  "form.eyebrow": "पंजीकरण एवं स्वास्थ्य आकलन",
  "form.title": "योग क्लाइंट पंजीकरण फ़ॉर्म",
  "form.personal": "व्यक्तिगत विवरण",
  "form.fullName": "पूरा नाम",
  "form.fullNamePh": "उदा., प्रिया शर्मा",
  "form.age": "उम्र",
  "form.agePh": "उदा., 30",
  "form.gender": "लिंग",
  "form.genderFemale": "महिला",
  "form.genderMale": "पुरुष",
  "form.genderOther": "अन्य",
  "form.contact": "संपर्क",
  "form.email": "ईमेल पता",
  "form.emailPh": "उदा., priya@email.com",
  "form.phone": "फ़ोन",
  "form.phonePh": "उदा., 9876543210",
  "form.dob": "जन्म तिथि",
  "form.mobile": "मोबाइल नंबर",
  "form.mobilePh": "उदा., 98765 43210",
  "form.optional": "वैकल्पिक",
  "form.city": "शहर / स्थान",
  "form.cityPh": "उदा., लखनऊ",
  "form.occupation": "व्यवसाय",
  "form.occupationPh": "उदा., शिक्षक, वास्तुकार",
  "form.health": "स्वास्थ्य आकलन",
  "form.healthQuestion":
    "किसी भी पहले से मौजूद स्वास्थ्य स्थितियों या चिंताओं का चयन करें।",
  "form.healthOther": "अन्य स्वास्थ्य स्थितियां",
  "form.goalOther": "अन्य लक्ष्य",
  "form.pleaseSpecify": "कृपया विवरण दें",
  "form.medications": "दवाएं",
  "form.medicationsQuestion": "क्या आप नियमित रूप से कोई दवाएं ले रहे हैं?",
  "form.medicationDetails": "दवाओं का विवरण",
  "form.medicationDetailsPh": "दवाओं के नाम और उद्देश्य का उल्लेख करें",
  "form.yes": "हां",
  "form.no": "नहीं",
  "form.injuries": "पिछले चोट या सर्जरी",
  "form.injuriesQuestion": "क्या पहले कभी कोई चोट लगी है या सर्जरी हुई है?",
  "form.injuryDetails": "चोट/सर्जरी का विवरण",
  "form.injuryDetailsPh": "चोट और समय का विवरण दें",
  "form.experience": "अभ्यास और फिटनेस स्तर",
  "form.practicedBefore": "पूर्व योग अनुभव",
  "form.beginner": "शुरुआती",
  "form.intermediate": "मध्यम",
  "form.advanced": "उन्नत",
  "form.exerciseFrequency": "शारीरिक व्यायाम की आवृत्ति",
  "form.never": "कभी नहीं",
  "form.freq12": "सप्ताह में 1-2 दिन",
  "form.freq35": "सप्ताह में 3-5 दिन",
  "form.daily": "रोजाना",
  "form.goal": "आपके लक्ष्य",
  "form.goalQuestion": "आप योग अभ्यास के माध्यम से क्या प्राप्त करने की आशा रखते हैं?",
  "form.sleep": "औसत नींद (घंटे/दिन)",
  "form.sleepPh": "उदा., 7",
  "form.water": "पानी सेवन (लीटर/दिन)",
  "form.waterPh": "उदा., 2.5",
  "form.foodPreference": "आहार पसंद",
  "form.vegetarian": "शाकाहारी",
  "form.eggetarian": "अंडा शाकाहारी",
  "form.nonVegetarian": "मांसाहारी",
  "form.smoke": "क्या आप धूम्रपान करते हैं?",
  "form.alcohol": "क्या आप शराब पीते हैं?",
  "form.lifestyle": "जीवनशैली की आदतें",
  "form.consent": "सहमति और घोषणा",
  "form.consentText":
    "मैं पुष्टि करता/करती हूँ कि ऊपर दी गई सभी जानकारी मेरे सर्वोत्तम ज्ञान के अनुसार सत्य है। मैं समझता/समझती हूँ कि योग चिकित्सा निदान या उपचार का विकल्प नहीं है। मैं किसी भी स्वास्थ्य परिवर्तन के बारे में कक्षा से पहले अपने प्रशिक्षक को सूचित करूँगा/करूँगी।",
  "form.consentAgree": "मैं ऊपर दी गई घोषणा से सहमत हूँ",
  "form.signature": "डिजिटल हस्ताक्षर (पूरा नाम)",
  "form.signaturePh": "हस्ताक्षर के रूप में पूरा नाम टाइप करें",
  "form.date": "तारीख",
  "form.submit": "फॉर्म सबमिट करें",
  "form.submitting": "सबमिट हो रहा है…",
  "form.success": "धन्यवाद! आपका आकलन प्राप्त हो गया है।",
  "form.errors.required": "यह फ़ील्ड आवश्यक है।",
  "form.errors.consent": "जारी रखने के लिए कृपया सहमति स्वीकार करें।",
  "form.errors.server": "कुछ गड़बड़ हुई। कृपया पुनः प्रयास करें।",
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: { translation: {} },
      hi: { translation: hiTranslations },
    },
    interpolation: { escapeValue: false },
  });
}

// Guarantee resource bundle is attached even if i18n was pre-initialized
i18n.addResourceBundle("hi", "translation", hiTranslations, true, true);

export default i18n;
