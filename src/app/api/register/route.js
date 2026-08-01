import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const healthLabelMap = {
  highBP: "High Blood Pressure (उच्च रक्तचाप)",
  lowBP: "Low Blood Pressure (निम्न रक्तचाप)",
  diabetes: "Diabetes (मधुमेह)",
  thyroid: "Thyroid (थायरॉइड)",
  pcos: "PCOS/PCOD (पीसीओएस/पीसीओडी)",
  cervical: "Cervical Pain (गर्दन दर्द)",
  kneePain: "Knee Pain (घुटने का दर्द)",
  backPain: "Back Pain (पीठ दर्द)",
  arthritis: "Arthritis (गठिया)",
  asthma: "Asthma (दमा)",
  migraine: "Migraine (माइग्रेन)",
  anxiety: "Anxiety (चिंता)",
  depression: "Depression (अवसाद)",
  recentSurgery: "Recent Surgery (हाल की सर्जरी)",
};

const goalLabelMap = {
  weightLoss: "Weight Loss (वजन घटाना)",
  weightGain: "Weight Gain (वजन बढ़ाना)",
  flexibility: "Flexibility (लचीलापन)",
  strength: "Strength (शक्ति)",
  stressRelief: "Stress Relief (तनाव मुक्ति)",
  anxietyMgmt: "Anxiety Management (चिंता प्रबंधन)",
  betterSleep: "Better Sleep (बेहतर नींद)",
  painRelief: "Pain Relief (दर्द निवारण)",
  pcosMgmt: "PCOS Management (पीसीओएस प्रबंधन)",
  generalFitness: "General Fitness (सामान्य फिटनेस)",
  meditation: "Meditation (ध्यान)",
};

const genderMap = {
  female: "Female (महिला)",
  male: "Male (पुरुष)",
  other: "Other (अन्य)",
};

const experienceMap = {
  beginner: "Beginner (शुरुआती)",
  intermediate: "Intermediate (मध्यम)",
  advanced: "Advanced (उन्नत)",
};

const freqMap = {
  never: "Never (कभी नहीं)",
  "1-2": "1–2 days/week (सप्ताह में 1-2 दिन)",
  "3-5": "3–5 days/week (सप्ताह में 3-5 दिन)",
  daily: "Daily (रोजाना)",
};

const dietMap = {
  vegetarian: "Vegetarian (शाकाहारी)",
  eggetarian: "Eggetarian (अंडा शाकाहारी)",
  nonVegetarian: "Non-Vegetarian (मांसाहारी)",
};

export async function POST(request) {
  try {
    const data = await request.json();

    const fullName = data.fullName || "N/A";
    const age = data.age || "N/A";
    const gender = genderMap[data.gender] || data.gender || "N/A";
    const dob = data.dob || "Not specified";
    const mobile = data.mobile || "N/A";
    const email = data.email || "Not provided";
    const city = data.city || "Not specified";
    const occupation = data.occupation || "Not specified";

    const selectedHealth = Array.isArray(data.health)
      ? data.health.map((k) => healthLabelMap[k] || k)
      : [];
    const healthOther = data.healthOther || "None";

    const takesMedication = data.takesMedication === "yes" ? "Yes" : "No";
    const medicationDetails = data.medicationDetails || "N/A";

    const hadInjuries = data.hadInjuries === "yes" ? "Yes" : "No";
    const injuryDetails = data.injuryDetails || "N/A";

    const yogaLevel =
      experienceMap[data.yogaLevel] || data.yogaLevel || "Not specified";
    const exerciseFrequency =
      freqMap[data.exerciseFrequency] ||
      data.exerciseFrequency ||
      "Not specified";

    const selectedGoals = Array.isArray(data.goal)
      ? data.goal.map((k) => goalLabelMap[k] || k)
      : [];
    const goalOther = data.goalOther || "None";

    const sleepHours = data.sleepHours
      ? `${data.sleepHours} hours`
      : "Not specified";
    const waterIntake = data.waterIntake
      ? `${data.waterIntake} litres`
      : "Not specified";
    const foodPreference =
      dietMap[data.foodPreference] || data.foodPreference || "Not specified";
    const smokes = data.smokes === "yes" ? "Yes" : "No";
    const drinksAlcohol = data.drinksAlcohol === "yes" ? "Yes" : "No";

    const signature = data.signature || "N/A";
    const signDate =
      data.signDate ||
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
      }).format(new Date());

    // Plain Text email body
    const textBody = `
==================================================
YOG MANTRIKA - CLIENT INTAKE ASSESSMENT SUBMISSION
==================================================

1. PERSONAL DETAILS
-------------------
• Full Name: ${fullName}
• Age: ${age}
• Gender: ${gender}
• Date of Birth: ${dob}
• Mobile Number: ${mobile}
• Email: ${email}
• City / Location: ${city}
• Occupation: ${occupation}

2. HEALTH PROFILE & CONDITIONS
-------------------------------
• Selected Conditions: ${selectedHealth.length > 0 ? selectedHealth.join(", ") : "None reported"}
• Other Conditions / Notes: ${healthOther}

3. MEDICAL HISTORY
-------------------
• Takes Regular Medications: ${takesMedication}
  Details: ${medicationDetails}
• Past Injuries / Surgeries: ${hadInjuries}
  Details: ${injuryDetails}

4. FITNESS & YOGA EXPERIENCE
-----------------------------
• Previous Yoga Experience: ${yogaLevel}
• Physical Exercise Frequency: ${exerciseFrequency}

5. PRIMARY GOALS
----------------
• Selected Goals: ${selectedGoals.length > 0 ? selectedGoals.join(", ") : "None selected"}
• Other Goals / Notes: ${goalOther}

6. LIFESTYLE HABITS
-------------------
• Average Sleep: ${sleepHours}
• Water Intake: ${waterIntake}
• Dietary Preference: ${foodPreference}
• Smokes: ${smokes}
• Consumes Alcohol: ${drinksAlcohol}

7. DECLARATION & SIGNATURE
---------------------------
• Digital Signature: ${signature}
• Date of Submission: ${signDate}
• Declaration Consent: Agreed & Confirmed
==================================================
`;

    // HTML email body
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f5f0; color: #2d3748; margin: 0; padding: 20px; }
    .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
    .header { background-color: #064e3b; color: #fef3c7; padding: 28px 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px; }
    .header p { margin: 6px 0 0 0; font-size: 13px; color: #d1fae5; text-transform: uppercase; letter-spacing: 2px; }
    .content { padding: 28px 32px; }
    .section { margin-bottom: 24px; background: #faf8f5; border: 1px solid #e9e5dd; border-radius: 12px; padding: 20px; }
    .section-title { font-size: 15px; font-weight: 700; color: #064e3b; margin: 0 0 14px 0; border-bottom: 1px dashed #cbd5e1; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .field { font-size: 13px; margin-bottom: 8px; }
    .label { font-weight: 600; color: #475569; }
    .value { color: #0f172a; font-weight: 500; }
    .badge { display: inline-block; background: #064e3b; color: #ecfdf5; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; margin: 3px 2px; }
    .footer { background: #064e3b; color: #ecfdf5; text-align: center; padding: 16px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p>Yog Mantrika</p>
      <h1>Client Intake Assessment</h1>
    </div>
    <div class="content">
      
      <!-- 01 Personal Details -->
      <div class="section">
        <div class="section-title">👤 Personal Details</div>
        <div class="field"><span class="label">Full Name:</span> <span class="value">${fullName}</span></div>
        <div class="field"><span class="label">Age & Gender:</span> <span class="value">${age} years | ${gender}</span></div>
        <div class="field"><span class="label">Date of Birth:</span> <span class="value">${dob}</span></div>
        <div class="field"><span class="label">Mobile Number:</span> <span class="value">${mobile}</span></div>
        <div class="field"><span class="label">Email Address:</span> <span class="value">${email}</span></div>
        <div class="field"><span class="label">City / Location:</span> <span class="value">${city}</span></div>
        <div class="field"><span class="label">Occupation:</span> <span class="value">${occupation}</span></div>
      </div>

      <!-- 02 Health Assessment -->
      <div class="section">
        <div class="section-title">🩺 Health Profile & Assessment</div>
        <div class="field"><span class="label">Selected Conditions:</span></div>
        <div style="margin-top: 6px; margin-bottom: 12px;">
          ${
            selectedHealth.length > 0
              ? selectedHealth
                  .map((c) => `<span class="badge">${c}</span>`)
                  .join(" ")
              : '<span class="value">No pre-existing conditions selected</span>'
          }
        </div>
        <div class="field"><span class="label">Other Health Notes:</span> <span class="value">${healthOther}</span></div>
      </div>

      <!-- 03 & 04 Medical History -->
      <div class="section">
        <div class="section-title">💊 Medical History & Injuries</div>
        <div class="field"><span class="label">Takes Regular Medications:</span> <span class="value">${takesMedication}</span></div>
        ${takesMedication === "Yes" ? `<div class="field"><span class="label">Medication Details:</span> <span class="value">${medicationDetails}</span></div>` : ""}
        <div class="field" style="margin-top: 10px;"><span class="label">Past Injuries / Surgeries:</span> <span class="value">${hadInjuries}</span></div>
        ${hadInjuries === "Yes" ? `<div class="field"><span class="label">Injury Details:</span> <span class="value">${injuryDetails}</span></div>` : ""}
      </div>

      <!-- 05 Fitness & Yoga Background -->
      <div class="section">
        <div class="section-title">🧘 Fitness & Yoga Background</div>
        <div class="field"><span class="label">Previous Yoga Experience:</span> <span class="value">${yogaLevel}</span></div>
        <div class="field"><span class="label">Physical Exercise Frequency:</span> <span class="value">${exerciseFrequency}</span></div>
      </div>

      <!-- 06 Primary Goals -->
      <div class="section">
        <div class="section-title">🎯 Primary Fitness & Wellness Goals</div>
        <div class="field"><span class="label">Selected Goals:</span></div>
        <div style="margin-top: 6px; margin-bottom: 12px;">
          ${
            selectedGoals.length > 0
              ? selectedGoals
                  .map(
                    (g) =>
                      `<span class="badge" style="background:#b45309;">${g}</span>`,
                  )
                  .join(" ")
              : '<span class="value">No specific goals selected</span>'
          }
        </div>
        <div class="field"><span class="label">Other Goals / Notes:</span> <span class="value">${goalOther}</span></div>
      </div>

      <!-- 07 Lifestyle Habits -->
      <div class="section">
        <div class="section-title">🌿 Lifestyle Routine</div>
        <div class="field"><span class="label">Average Sleep:</span> <span class="value">${sleepHours}</span></div>
        <div class="field"><span class="label">Water Intake:</span> <span class="value">${waterIntake}</span></div>
        <div class="field"><span class="label">Dietary Preference:</span> <span class="value">${foodPreference}</span></div>
        <div class="field"><span class="label">Smoking Habit:</span> <span class="value">${smokes}</span></div>
        <div class="field"><span class="label">Alcohol Consumption:</span> <span class="value">${drinksAlcohol}</span></div>
      </div>

      <!-- 08 Declaration -->
      <div class="section" style="background: #ecfdf5; border-color: #a7f3d0;">
        <div class="section-title" style="color: #047857;">✍️ Declaration & Signature</div>
        <div class="field"><span class="label">Digital Signature:</span> <span class="value" style="font-size: 15px; font-weight: 700; color: #065f46;">${signature}</span></div>
        <div class="field"><span class="label">Submission Date:</span> <span class="value">${signDate}</span></div>
        <div class="field"><span class="label">Declaration Consent:</span> <span class="value" style="color: #047857;">✅ Confirmed & Agreed</span></div>
      </div>

    </div>
    <div class="footer">
      Automated Intake Notification • Yog Mantrika
    </div>
  </div>
</body>
</html>
`;

    // Attempt SMTP email delivery if credentials are ready
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const ownerEmail = process.env.OWNER_EMAIL || smtpUser;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Yog Mantrika Intake" <${smtpUser}>`,
          to: ownerEmail,
          subject: `🧘 New Client Intake Assessment: ${fullName}`,
          text: textBody,
          html: htmlBody,
        });
        console.log("--------------------------------------------------");
        console.log(
          `✅ SUCCESS: Intake assessment email sent to ${ownerEmail}`,
        );
        console.log("--------------------------------------------------");
      } catch (sendErr) {
        console.log("--------------------------------------------------");
        console.error("❌ SMTP Delivery Error:", sendErr.message);
        console.log("Fallback summary output:");
        console.log(textBody);
        console.log("--------------------------------------------------");
      }
    } else {
      console.log("--------------------------------------------------");
      console.log(
        "📧 [DEV MODE] .env.local file missing or SMTP_USER / SMTP_PASS not set.",
      );
      console.log("Formatted Intake Assessment Summary:");
      console.log(textBody);
      console.log("--------------------------------------------------");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing registration intake:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error processing registration.",
      },
      { status: 500 },
    );
  }
}
