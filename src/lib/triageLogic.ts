import { AssessmentData, TriageResponse } from "@/types/assessment";

export function performTriage(data: AssessmentData): TriageResponse {
  // ED criteria - any of these trigger immediate ED referral
  const edCriteria = [
    // Critical glucose levels
    data.glucoseReading !== undefined && data.glucoseReading < 70,
    
    // Red flags present
    data.hasRedFlags,
    
    // Mental status changes
    data.mentalStatus === "confused" || data.mentalStatus === "unresponsive",
    
    // Unable to take oral glucose
    !data.canSwallow,
    
    // Severe symptoms present
    data.symptoms.some(s => 
      ["seizure", "lossOfConsciousness", "severeConfusion", "slurredSpeech"].includes(s)
    ),
    
    // Multiple episodes in short period
    data.previousEpisodes > 2,
    
    // Taking sulfonylureas with acarbose (high risk combination)
    data.otherMedications.some(med => 
      med.toLowerCase().includes("glipizide") || 
      med.toLowerCase().includes("glyburide") ||
      med.toLowerCase().includes("glimepiride")
    ),
  ];

  const requiresED = edCriteria.some(criterion => criterion === true);

  if (requiresED) {
    return {
      result: "ED",
      reasoning: generateEDReasoning(data),
      nextSteps: [
        "Go to the Emergency Department immediately",
        "If possible, take pure glucose or dextrose (NOT table sugar)",
        "Bring your medication list and glucose meter readings",
        "Have someone accompany you if possible",
        "Do not drive yourself - call for help or ambulance",
      ],
      urgencyLevel: data.mentalStatus === "unresponsive" || 
                    data.symptoms.includes("seizure") ? "critical" : "high",
    };
  }

  // GP criteria - manageable, stable symptoms
  return {
    result: "GP",
    reasoning: generateGPReasoning(data),
    nextSteps: [
      "Schedule an appointment with your GP today or tomorrow",
      "Take pure glucose tablets (NOT table sugar) if symptoms persist",
      "Monitor your blood sugar regularly",
      "Bring your medication list and glucose readings to the appointment",
      "If symptoms worsen, go to ED immediately",
    ],
    urgencyLevel: data.glucoseReading && data.glucoseReading < 80 ? "medium" : "low",
  };
}

function generateEDReasoning(data: AssessmentData): string {
  const reasons: string[] = [];

  if (data.glucoseReading !== undefined && data.glucoseReading < 70) {
    reasons.push("Your blood sugar is dangerously low");
  }

  if (data.mentalStatus !== "alert") {
    reasons.push("You're showing signs of confusion or altered awareness");
  }

  if (!data.canSwallow) {
    reasons.push("You're unable to safely take oral glucose");
  }

  if (data.hasRedFlags) {
    reasons.push("You have warning signs that need immediate medical attention");
  }

  if (data.symptoms.some(s => ["seizure", "lossOfConsciousness"].includes(s))) {
    reasons.push("You've experienced severe symptoms like seizures or loss of consciousness");
  }

  if (reasons.length === 0) {
    return "Your symptoms require immediate medical evaluation at an Emergency Department.";
  }

  return reasons.join(". ") + ". These require immediate emergency care.";
}

function generateGPReasoning(data: AssessmentData): string {
  return "Your symptoms appear manageable and stable. However, you should see your GP soon to review your acarbose dosage and prevent future episodes. Remember: acarbose blocks table sugar breakdown, so you must use pure glucose or dextrose tablets if symptoms occur.";
}
