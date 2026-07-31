"use client";

import React, { useState } from "react";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// ---------- static option data ----------
const healthOptions = [
  { key: "highBP", en: "High Blood Pressure", hi: "उच्च रक्तचाप" },
  { key: "lowBP", en: "Low Blood Pressure", hi: "निम्न रक्तचाप" },
  { key: "diabetes", en: "Diabetes", hi: "मधुमेह" },
  { key: "thyroid", en: "Thyroid", hi: "थायरॉइड" },
  { key: "pcos", en: "PCOS/PCOD", hi: "पीसीओएस/पीसीओडी" },
  { key: "cervical", en: "Cervical Pain", hi: "गर्दन दर्द" },
  { key: "slipDisc", en: "Slip Disc", hi: "स्लिप डिस्क" },
  { key: "kneePain", en: "Knee Pain", hi: "घुटने का दर्द" },
  { key: "backPain", en: "Back Pain", hi: "पीठ दर्द" },
  { key: "arthritis", en: "Arthritis", hi: "गठिया" },
  { key: "asthma", en: "Asthma", hi: "दमा" },
  { key: "migraine", en: "Migraine", hi: "माइग्रेन" },
  { key: "heartDisease", en: "Heart Disease", hi: "हृदय रोग" },
  { key: "anxiety", en: "Anxiety", hi: "चिंता" },
  { key: "depression", en: "Depression", hi: "अवसाद" },
  { key: "epilepsy", en: "Epilepsy/Seizures", hi: "मिर्गी/दौरे" },
  { key: "recentSurgery", en: "Recent Surgery", hi: "हाल की सर्जरी" },
];

const goalOptions = [
  { key: "weightLoss", en: "Weight Loss", hi: "वजन घटाना" },
  { key: "weightGain", en: "Weight Gain", hi: "वजन बढ़ाना" },
  { key: "flexibility", en: "Flexibility", hi: "लचीलापन" },
  { key: "strength", en: "Strength", hi: "शक्ति" },
  { key: "stressRelief", en: "Stress Relief", hi: "तनाव मुक्ति" },
  { key: "anxietyMgmt", en: "Anxiety Management", hi: "चिंता प्रबंधन" },
  { key: "betterSleep", en: "Better Sleep", hi: "बेहतर नींद" },
  { key: "painRelief", en: "Pain Relief", hi: "दर्द निवारण" },
  { key: "pcosMgmt", en: "PCOS Management", hi: "पीसीओएस प्रबंधन" },
  { key: "generalFitness", en: "General Fitness", hi: "सामान्य फिटनेस" },
  { key: "meditation", en: "Meditation", hi: "ध्यान" },
];

// Elegant radio button pill selector
function PillRadio({ name, value, label, register }) {
  return (
    <label className="relative flex-1 sm:flex-initial cursor-pointer">
      <input
        type="radio"
        value={value}
        className="peer sr-only"
        {...register(name)}
      />
      <span className="flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-medium border border-stone-200 bg-stone-50/50 text-stone-700 transition-all duration-200 hover:bg-stone-100/80 peer-checked:bg-amber-700 peer-checked:text-white peer-checked:border-amber-700 peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-amber-600 peer-focus-visible:ring-offset-2">
        {label}
      </span>
    </label>
  );
}

// Elegant Grid Checkbox Chip
function ChipCheckbox({ control, name, label }) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      render={({ field }) => (
        <label className="relative cursor-pointer group">
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            className="peer sr-only"
          />
          <span className="flex items-center justify-center min-h-10.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-stone-200/80 bg-white/70 text-stone-700 text-center leading-snug transition-all duration-200 group-hover:border-stone-300 group-hover:bg-white peer-data-[checked]:bg-emerald-900 peer-data-[checked]:text-amber-100 peer-data-[checked]:border-emerald-900 peer-data-[checked]:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-800">
            {label}
          </span>
        </label>
      )}
    />
  );
}

export default function Home() {
  const { t } = useTranslation("translation", { i18n });
  const todayDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      signDate: todayDate,
      consent: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  React.useEffect(() => {
    const handleLangChange = (l) => {
      setCurrentLang(l);
    };
    i18n.on("languageChanged", handleLangChange);
    return () => {
      i18n.off("languageChanged", handleLangChange);
    };
  }, []);

  const lang = currentLang.startsWith("hi") ? "hi" : "en";
  const changeLang = (l) => {
    i18n.changeLanguage(l);
    document.documentElement.lang = l;
    setCurrentLang(l);
  };

  const showMedication = watch("takesMedication") === "yes";
  const showInjuries = watch("hadInjuries") === "yes";

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);

    const formattedData = {
      ...data,
      health: data.health
        ? Object.keys(data.health).filter((key) => data.health[key])
        : [],
      goal: data.goal
        ? Object.keys(data.goal).filter((key) => data.goal[key])
        : [],
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });
      const json = await res.json();
      if (json.success) {
        setMessage({
          type: "success",
          text: t(
            "form.success",
            "Thank you! Your intake assessment has been received.",
          ),
        });
        reset({ signDate: todayDate, consent: false });
      } else {
        setMessage({
          type: "error",
          text:
            json.error ||
            t(
              "form.errors.server",
              "Unable to process submission. Please check your network.",
            ),
        });
      }
    } catch (e) {
      setMessage({
        type: "error",
        text: t(
          "form.errors.server",
          "Unable to process submission. Please check your network.",
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Top Header Card */}
        <header className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200/80 pb-6 gap-4">
          <div>
            <span className="inline-block text-[11px] font-semibold tracking-[0.25em] text-amber-800 uppercase mb-2">
              {t("form.eyebrow", "Holistic Health Assessment")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-medium text-emerald-950 tracking-tight">
              {t("form.title", "Yoga Client Intake")}
            </h1>
          </div>

          {/* Language Toggle Switch */}
          <div className="self-center sm:self-auto">
            <button
              type="button"
              onClick={() => changeLang(lang === "en" ? "hi" : "en")}
              className="group relative flex items-center bg-stone-200/80 p-1 rounded-full w-24 h-9 transition-colors hover:bg-stone-300/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
              aria-label="Toggle language"
            >
              <span className="absolute left-3.5 text-[11px] font-bold text-stone-500">
                EN
              </span>
              <span className="absolute right-3.5 text-[11px] font-bold text-stone-500">
                हिं
              </span>
              <span
                className={`relative z-10 flex items-center justify-center w-11 h-7 rounded-full bg-amber-700 text-white text-[11px] font-bold shadow-sm transition-transform duration-300 ease-out ${
                  lang === "hi"
                    ? "translate-x-11 bg-emerald-900"
                    : "translate-x-0"
                }`}
              >
                {lang === "hi" ? "हिं" : "EN"}
              </span>
            </button>
          </div>
        </header>

        {/* Success/Error Feedback Message */}
        {message && (
          <div
            className={`mb-8 p-4 rounded-xl text-sm font-medium flex items-center gap-3 border ${
              message.type === "error"
                ? "bg-rose-50/80 text-rose-900 border-rose-200/80"
                : "bg-emerald-50/80 text-emerald-900 border-emerald-200/80"
            }`}
          >
            <span className="text-lg">
              {message.type === "error" ? "⚠️" : "✨"}
            </span>
            <p>{message.text}</p>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 01: Personal Details */}
          <section className="bg-white/80 backdrop-blur-sm border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-100/60 text-amber-900 font-serif text-xs font-semibold">
                01
              </span>
              <h2 className="text-lg font-serif font-semibold text-emerald-950">
                {t("form.personal", "Personal Details")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label
                  className="block text-xs font-medium text-stone-600 mb-1.5"
                  htmlFor="fullName"
                >
                  {t("form.fullName", "Full Name")}{" "}
                  <span className="text-amber-700">*</span>
                </label>
                <Input
                  id="fullName"
                  {...register("fullName", { required: true })}
                  placeholder={t("form.fullNamePh", "e.g., Priya Sharma")}
                  className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-sm transition-all"
                />
                {errors.fullName && (
                  <p className="text-rose-600 text-xs mt-1.5">
                    {t("form.errors.required", "This field is required.")}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-stone-600 mb-1.5"
                  htmlFor="age"
                >
                  {t("form.age", "Age")}{" "}
                  <span className="text-amber-700">*</span>
                </label>
                <Input
                  id="age"
                  type="number"
                  {...register("age", { required: true, min: 1, max: 120 })}
                  placeholder={t("form.agePh", "e.g., 32")}
                  className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-sm transition-all"
                />
                {errors.age && (
                  <p className="text-rose-600 text-xs mt-1.5">
                    {t("form.errors.required", "This field is required.")}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-2">
                  {t("form.gender", "Gender")}{" "}
                  <span className="text-amber-700">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  <PillRadio
                    name="gender"
                    value="female"
                    label={t("form.genderFemale", "Female")}
                    register={register}
                  />
                  <PillRadio
                    name="gender"
                    value="male"
                    label={t("form.genderMale", "Male")}
                    register={register}
                  />
                  <PillRadio
                    name="gender"
                    value="other"
                    label={t("form.genderOther", "Other")}
                    register={register}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-stone-600 mb-1.5"
                  htmlFor="dob"
                >
                  {t("form.dob", "Date of Birth")}
                </label>
                <Input
                  id="dob"
                  type="date"
                  {...register("dob")}
                  className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-sm transition-all"
                />
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-stone-600 mb-1.5"
                  htmlFor="mobile"
                >
                  {t("form.mobile", "Mobile Number")}{" "}
                  <span className="text-amber-700">*</span>
                </label>
                <Input
                  id="mobile"
                  type="tel"
                  {...register("mobile", { required: true })}
                  placeholder={t("form.mobilePh", "e.g., 98765 43210")}
                  className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-sm transition-all"
                />
                {errors.mobile && (
                  <p className="text-rose-600 text-xs mt-1.5">
                    {t("form.errors.required", "This field is required.")}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-stone-600 mb-1.5"
                  htmlFor="email"
                >
                  {t("form.email", "Email")}{" "}
                  <span className="text-stone-400 font-normal">
                    ({t("form.optional", "optional")})
                  </span>
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder={t("form.emailPh", "e.g., priya@email.com")}
                  className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-sm transition-all"
                />
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-stone-600 mb-1.5"
                  htmlFor="city"
                >
                  {t("form.city", "City / Location")}
                </label>
                <Input
                  id="city"
                  {...register("city")}
                  placeholder={t("form.cityPh", "e.g., Lucknow")}
                  className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-sm transition-all"
                />
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-stone-600 mb-1.5"
                  htmlFor="occupation"
                >
                  {t("form.occupation", "Occupation")}
                </label>
                <Input
                  id="occupation"
                  {...register("occupation")}
                  placeholder={t(
                    "form.occupationPh",
                    "e.g., Teacher, Architect",
                  )}
                  className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-sm transition-all"
                />
              </div>
            </div>
          </section>

          {/* Section 02: Health Profile */}
          <section className="bg-white/80 backdrop-blur-sm border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-100/60 text-amber-900 font-serif text-xs font-semibold">
                02
              </span>
              <h2 className="text-lg font-serif font-semibold text-emerald-950">
                {t("form.health", "Health Assessment")}
              </h2>
            </div>
            <p className="text-xs text-stone-500 mb-6 pl-10">
              {t(
                "form.healthQuestion",
                "Select any pre-existing health conditions or concerns.",
              )}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {healthOptions.map((opt) => (
                <ChipCheckbox
                  key={opt.key}
                  control={control}
                  name={`health.${opt.key}`}
                  label={t(`form.healthOptions.${opt.key}`, opt[lang])}
                />
              ))}
            </div>

            <div className="mt-5">
              <label
                className="block text-xs font-medium text-stone-600 mb-1.5"
                htmlFor="healthOther"
              >
                {t("form.healthOther", "Other Conditions")}
              </label>
              <Input
                id="healthOther"
                {...register("healthOther")}
                placeholder={t(
                  "form.pleaseSpecify",
                  "Please specify if unlisted above",
                )}
                className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-sm"
              />
            </div>
          </section>

          {/* Section 03 & 04: Medical History */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Medications */}
            <section className="bg-white/80 backdrop-blur-sm border border-stone-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-100/60 text-amber-900 font-serif text-xs font-semibold">
                    03
                  </span>
                  <h2 className="text-base font-serif font-semibold text-emerald-950">
                    {t("form.medications", "Medications")}
                  </h2>
                </div>
                <p className="text-xs text-stone-500 mb-4 pl-10">
                  {t(
                    "form.medicationsQuestion",
                    "Are you taking any regular medications?",
                  )}
                </p>
                <div className="flex gap-2 pl-10 mb-4">
                  <PillRadio
                    name="takesMedication"
                    value="yes"
                    label={t("form.yes", "Yes")}
                    register={register}
                  />
                  <PillRadio
                    name="takesMedication"
                    value="no"
                    label={t("form.no", "No")}
                    register={register}
                  />
                </div>
              </div>

              {showMedication && (
                <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <label
                    className="block text-xs font-medium text-stone-600 mb-1.5"
                    htmlFor="medicationDetails"
                  >
                    {t("form.medicationDetails", "Medication Details")}
                  </label>
                  <Textarea
                    id="medicationDetails"
                    rows={2}
                    {...register("medicationDetails")}
                    placeholder={t(
                      "form.medicationDetailsPh",
                      "Mention medicine names & purpose",
                    )}
                    className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-xs"
                  />
                </div>
              )}
            </section>

            {/* Injuries */}
            <section className="bg-white/80 backdrop-blur-sm border border-stone-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-100/60 text-amber-900 font-serif text-xs font-semibold">
                    04
                  </span>
                  <h2 className="text-base font-serif font-semibold text-emerald-950">
                    {t("form.injuries", "Injuries & Surgeries")}
                  </h2>
                </div>
                <p className="text-xs text-stone-500 mb-4 pl-10">
                  {t(
                    "form.injuriesQuestion",
                    "Any past injuries or physical surgeries?",
                  )}
                </p>
                <div className="flex gap-2 pl-10 mb-4">
                  <PillRadio
                    name="hadInjuries"
                    value="yes"
                    label={t("form.yes", "Yes")}
                    register={register}
                  />
                  <PillRadio
                    name="hadInjuries"
                    value="no"
                    label={t("form.no", "No")}
                    register={register}
                  />
                </div>
              </div>

              {showInjuries && (
                <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <label
                    className="block text-xs font-medium text-stone-600 mb-1.5"
                    htmlFor="injuryDetails"
                  >
                    {t("form.injuryDetails", "Injury/Surgery Details")}
                  </label>
                  <Textarea
                    id="injuryDetails"
                    rows={2}
                    {...register("injuryDetails")}
                    placeholder={t(
                      "form.injuryDetailsPh",
                      "Describe injury and timeframe",
                    )}
                    className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-xs"
                  />
                </div>
              )}
            </section>
          </div>

          {/* Section 05: Practice Background */}
          <section className="bg-white/80 backdrop-blur-sm border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-100/60 text-amber-900 font-serif text-xs font-semibold">
                05
              </span>
              <h2 className="text-lg font-serif font-semibold text-emerald-950">
                {t("form.experience", "Practice & Fitness Level")}
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-2">
                  {t("form.practicedBefore", "Previous Yoga Experience")}
                </label>
                <div className="flex flex-wrap gap-2">
                  <PillRadio
                    name="yogaLevel"
                    value="beginner"
                    label={t("form.beginner", "Beginner")}
                    register={register}
                  />
                  <PillRadio
                    name="yogaLevel"
                    value="intermediate"
                    label={t("form.intermediate", "Intermediate")}
                    register={register}
                  />
                  <PillRadio
                    name="yogaLevel"
                    value="advanced"
                    label={t("form.advanced", "Advanced")}
                    register={register}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-2">
                  {t("form.exerciseFrequency", "Physical Exercise Frequency")}
                </label>
                <div className="flex flex-wrap gap-2">
                  <PillRadio
                    name="exerciseFrequency"
                    value="never"
                    label={t("form.never", "Never")}
                    register={register}
                  />
                  <PillRadio
                    name="exerciseFrequency"
                    value="1-2"
                    label={t("form.freq12", "1–2 days/week")}
                    register={register}
                  />
                  <PillRadio
                    name="exerciseFrequency"
                    value="3-5"
                    label={t("form.freq35", "3–5 days/week")}
                    register={register}
                  />
                  <PillRadio
                    name="exerciseFrequency"
                    value="daily"
                    label={t("form.daily", "Daily")}
                    register={register}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 06: Primary Goals */}
          <section className="bg-white/80 backdrop-blur-sm border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-100/60 text-amber-900 font-serif text-xs font-semibold">
                06
              </span>
              <h2 className="text-lg font-serif font-semibold text-emerald-950">
                {t("form.goal", "Your Goals")}
              </h2>
            </div>
            <p className="text-xs text-stone-500 mb-6 pl-10">
              {t(
                "form.goalQuestion",
                "What do you hope to achieve through yoga practice?",
              )}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {goalOptions.map((opt) => (
                <ChipCheckbox
                  key={opt.key}
                  control={control}
                  name={`goal.${opt.key}`}
                  label={t(`form.goalOptions.${opt.key}`, opt[lang])}
                />
              ))}
            </div>

            <div className="mt-5">
              <label
                className="block text-xs font-medium text-stone-600 mb-1.5"
                htmlFor="goalOther"
              >
                {t("form.goalOther", "Other Goals")}
              </label>
              <Input
                id="goalOther"
                {...register("goalOther")}
                placeholder={t("form.pleaseSpecify", "Please specify")}
                className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-sm"
              />
            </div>
          </section>

          {/* Section 07: Lifestyle Routine */}
          <section className="bg-white/80 backdrop-blur-sm border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-100/60 text-amber-900 font-serif text-xs font-semibold">
                07
              </span>
              <h2 className="text-lg font-serif font-semibold text-emerald-950">
                {t("form.lifestyle", "Lifestyle Habits")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6">
              <div>
                <label
                  className="block text-xs font-medium text-stone-600 mb-1.5"
                  htmlFor="sleepHours"
                >
                  {t("form.sleep", "Average Sleep (hrs/day)")}
                </label>
                <Input
                  id="sleepHours"
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  {...register("sleepHours")}
                  placeholder={t("form.sleepPh", "e.g., 7")}
                  className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-sm"
                />
              </div>
              <div>
                <label
                  className="block text-xs font-medium text-stone-600 mb-1.5"
                  htmlFor="waterIntake"
                >
                  {t("form.water", "Water Intake (litres/day)")}
                </label>
                <Input
                  id="waterIntake"
                  type="number"
                  step="0.5"
                  min="0"
                  max="15"
                  {...register("waterIntake")}
                  placeholder={t("form.waterPh", "e.g., 2.5")}
                  className="bg-stone-50/40 border-stone-200 focus:bg-white rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-2">
                  {t("form.foodPreference", "Dietary Preference")}
                </label>
                <div className="flex flex-wrap gap-2">
                  <PillRadio
                    name="foodPreference"
                    value="vegetarian"
                    label={t("form.vegetarian", "Vegetarian")}
                    register={register}
                  />
                  <PillRadio
                    name="foodPreference"
                    value="eggetarian"
                    label={t("form.eggetarian", "Eggetarian")}
                    register={register}
                  />
                  <PillRadio
                    name="foodPreference"
                    value="nonVegetarian"
                    label={t("form.nonVegetarian", "Non-Vegetarian")}
                    register={register}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-2">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-2">
                    {t("form.smoke", "Do you smoke?")}
                  </label>
                  <div className="flex gap-2">
                    <PillRadio
                      name="smokes"
                      value="yes"
                      label={t("form.yes", "Yes")}
                      register={register}
                    />
                    <PillRadio
                      name="smokes"
                      value="no"
                      label={t("form.no", "No")}
                      register={register}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-2">
                    {t("form.alcohol", "Do you consume alcohol?")}
                  </label>
                  <div className="flex gap-2">
                    <PillRadio
                      name="drinksAlcohol"
                      value="yes"
                      label={t("form.yes", "Yes")}
                      register={register}
                    />
                    <PillRadio
                      name="drinksAlcohol"
                      value="no"
                      label={t("form.no", "No")}
                      register={register}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 08: Consent Panel */}
          <section className="bg-emerald-950 text-amber-50 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 font-serif text-xs font-semibold">
                08
              </span>
              <h2 className="text-lg font-serif font-semibold text-white">
                {t("form.consent", "Client Declaration & Consent")}
              </h2>
            </div>

            <p className="text-xs text-emerald-100/80 leading-relaxed mb-6 font-light">
              {t(
                "form.consentText",
                "I confirm that all the information provided above is true to the best of my knowledge. I understand that Yoga is not a substitute for medical diagnosis or treatment. I will inform my instructor of any health changes prior to class.",
              )}
            </p>

            <Controller
              control={control}
              name="consent"
              rules={{ required: true }}
              render={({ field }) => (
                <label className="flex items-start gap-3 mb-6 cursor-pointer group">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5 border-emerald-700 data-[checked]:bg-amber-600 data-[checked]:border-amber-600"
                  />
                  <span className="text-xs text-emerald-100 group-hover:text-white transition-colors">
                    {t(
                      "form.consentAgree",
                      "I agree to the declaration statement above",
                    )}{" "}
                    <span className="text-amber-400">*</span>
                  </span>
                </label>
              )}
            />

            {errors.consent && (
              <p className="text-rose-300 text-xs -mt-4 mb-6">
                {t(
                  "form.errors.consent",
                  "Please accept the consent statement to continue.",
                )}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div>
                <label
                  className="block text-xs font-medium text-emerald-200/90 mb-1.5"
                  htmlFor="signature"
                >
                  {t("form.signature", "Digital Signature (Full Name)")}{" "}
                  <span className="text-amber-400">*</span>
                </label>
                <Input
                  id="signature"
                  {...register("signature", { required: true })}
                  placeholder={t("form.signaturePh", "Type full legal name")}
                  className="bg-emerald-900/60 border-emerald-800 text-amber-50 placeholder:text-emerald-700/80 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl text-sm"
                />
                {errors.signature && (
                  <p className="text-rose-300 text-xs mt-1.5">
                    {t("form.errors.required", "Signature is required.")}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-emerald-200/90 mb-1.5"
                  htmlFor="signDate"
                >
                  {t("form.date", "Date")}
                </label>
                <Input
                  id="signDate"
                  type="date"
                  readOnly
                  {...register("signDate")}
                  className="bg-emerald-900/60 border-emerald-800 text-amber-50/70 focus:outline-none rounded-xl text-sm cursor-not-allowed opacity-90"
                />
              </div>
            </div>
          </section>

          {/* Submit Action */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-13 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm rounded-full shadow-lg shadow-amber-900/10 hover:shadow-xl transition-all duration-200 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t("form.submitting", "Submitting assessment…")}
                </span>
              ) : (
                t("form.submit", "Submit Intake Form")
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
