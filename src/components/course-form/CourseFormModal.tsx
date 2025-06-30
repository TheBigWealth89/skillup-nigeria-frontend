// components/course-form/CourseFormModal.tsx

import React, { useState } from "react";
import Step1CourseDetails from "./Step1CourseDetails";
import Step2SyllabusBuilder from "./Step2SyllabusBuilder";
import Step3MediaSettings from "./Step3MediaSettings";
import Step4ReviewSubmit from "./Step4ReviewSubmit";
import { Button } from "@/components/ui/button";
import { CourseForm } from "@/types/course";
import { validateStep1, validateStep3 } from "./courseValidate"; 

const defaultForm: CourseForm = {
  title: "",
  category: "",
  description: "",
  tags: [],
  syllabus: [],
  prerequisites: [],
  coverImage: "",
  introVideo: "",
  difficulty: "Beginner",
  duration: 1,
};

const CourseFormModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CourseForm>(defaultForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    if (step === 1) {
      const stepErrors = validateStep1(form);
      setErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    }

    if (step === 3) {
      const stepErrors = validateStep3(form);
      setErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    }

    return true;
  };

  const handleNext = () => {
    if (validate()) {
      setStep((s) => Math.min(s + 1, 4));
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-3xl mx-auto p-6 relative">
        <button
          className="absolute top-2 right-10 text-3xl text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          ×
        </button>

        {/* Stepper */}
        <div className="flex items-center gap-2 w-11/12 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1  h-2 rounded-full transition-all ${
                step >= s ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {step === 1 && (
            <Step1CourseDetails
              form={form}
              setForm={setForm}
              errors={errors}
              setErrors={setErrors}
            />
          )}
          {step === 2 && (
            <Step2SyllabusBuilder form={form} setForm={setForm} />
          )}
          {step === 3 && (
            <Step3MediaSettings
              form={form}
              setForm={setForm}
              errors={errors}
              setErrors={setErrors}
            />
          )}
          {step === 4 && (
            <Step4ReviewSubmit
              form={form}
              onSubmit={() => {
                alert("✅ Course submitted for admin approval!");
                onClose();
              }}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button variant="outline" disabled={step === 1} onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={step === 4}>
            {step === 3 ? "Review" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseFormModal;
