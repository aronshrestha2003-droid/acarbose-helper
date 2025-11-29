import { useState } from "react";
import { AssessmentData, TriageResponse } from "@/types/assessment";
import { performTriage } from "@/lib/triageLogic";
import { ProgressSteps } from "@/components/ProgressSteps";
import { WelcomeStep } from "@/components/steps/WelcomeStep";
import { SymptomsStep } from "@/components/steps/SymptomsStep";
import { GlucoseStep } from "@/components/steps/GlucoseStep";
import { RedFlagsStep } from "@/components/steps/RedFlagsStep";
import { ResultStep } from "@/components/steps/ResultStep";

type Step = "welcome" | "symptoms" | "glucose" | "redflags" | "result";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    symptoms: [],
    otherMedications: [],
    hasRedFlags: false,
    redFlags: [],
    canSwallow: true,
    mentalStatus: "alert",
    previousEpisodes: 0,
  });
  const [triageResult, setTriageResult] = useState<TriageResponse | null>(null);

  const steps = [
    { label: "Symptoms", completed: currentStep !== "welcome" && currentStep !== "symptoms", current: currentStep === "symptoms" },
    { label: "Glucose", completed: ["redflags", "result"].includes(currentStep), current: currentStep === "glucose" },
    { label: "Safety", completed: currentStep === "result", current: currentStep === "redflags" },
    { label: "Result", completed: false, current: currentStep === "result" },
  ];

  const handleStart = () => setCurrentStep("symptoms");

  const handleSymptomToggle = (symptomId: string) => {
    setAssessmentData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(s => s !== symptomId)
        : [...prev.symptoms, symptomId],
    }));
  };

  const handleRedFlagToggle = (flag: string) => {
    setAssessmentData(prev => {
      const newRedFlags = prev.redFlags.includes(flag)
        ? prev.redFlags.filter(f => f !== flag)
        : [...prev.redFlags, flag];
      return {
        ...prev,
        redFlags: newRedFlags,
        hasRedFlags: newRedFlags.length > 0,
      };
    });
  };

  const handleGetResults = () => {
    const result = performTriage(assessmentData);
    setTriageResult(result);
    setCurrentStep("result");
  };

  const handleRestart = () => {
    setCurrentStep("welcome");
    setAssessmentData({
      symptoms: [],
      otherMedications: [],
      hasRedFlags: false,
      redFlags: [],
      canSwallow: true,
      mentalStatus: "alert",
      previousEpisodes: 0,
    });
    setTriageResult(null);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        {currentStep !== "welcome" && currentStep !== "result" && (
          <ProgressSteps steps={steps} />
        )}

        <div className="mt-8">
          {currentStep === "welcome" && <WelcomeStep onStart={handleStart} />}

          {currentStep === "symptoms" && (
            <SymptomsStep
              selectedSymptoms={assessmentData.symptoms}
              onToggleSymptom={handleSymptomToggle}
              onNext={() => setCurrentStep("glucose")}
              onBack={() => setCurrentStep("welcome")}
            />
          )}

          {currentStep === "glucose" && (
            <GlucoseStep
              glucoseReading={assessmentData.glucoseReading}
              lastMealTime={assessmentData.lastMealTime}
              onGlucoseChange={(value) => setAssessmentData(prev => ({ ...prev, glucoseReading: value }))}
              onMealTimeChange={(value) => setAssessmentData(prev => ({ ...prev, lastMealTime: value }))}
              onNext={() => setCurrentStep("redflags")}
              onBack={() => setCurrentStep("symptoms")}
            />
          )}

          {currentStep === "redflags" && (
            <RedFlagsStep
              canSwallow={assessmentData.canSwallow}
              mentalStatus={assessmentData.mentalStatus}
              redFlags={assessmentData.redFlags}
              onCanSwallowChange={(value) => setAssessmentData(prev => ({ ...prev, canSwallow: value }))}
              onMentalStatusChange={(value) => setAssessmentData(prev => ({ ...prev, mentalStatus: value }))}
              onRedFlagToggle={handleRedFlagToggle}
              onNext={handleGetResults}
              onBack={() => setCurrentStep("glucose")}
            />
          )}

          {currentStep === "result" && triageResult && (
            <ResultStep result={triageResult} onRestart={handleRestart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
