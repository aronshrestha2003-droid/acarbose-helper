export type TriageResult = "GP" | "ED";

export interface Symptom {
  id: string;
  label: string;
  severity: "mild" | "moderate" | "severe";
  icon: string;
}

export interface AssessmentData {
  symptoms: string[];
  glucoseReading?: number;
  lastMealTime?: string;
  acarboseDosage?: string;
  acarboseTiming?: string;
  otherMedications: string[];
  hasRedFlags: boolean;
  redFlags: string[];
  canSwallow: boolean;
  mentalStatus: "alert" | "confused" | "unresponsive";
  previousEpisodes: number;
}

export interface TriageResponse {
  result: TriageResult;
  reasoning: string;
  nextSteps: string[];
  urgencyLevel: "low" | "medium" | "high" | "critical";
}
