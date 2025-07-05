import React, { useState } from "react";
import Step1CourseDetails from "./Step1CourseDetails";
import Step2SyllabusBuilder from "./Step2SyllabusBuilder";
import Step3MediaSettings from "./Step3MediaSettings";
import Step4ReviewSubmit from "./Step4ReviewSubmit";
import { Button } from "@/components/ui/button";
import { CourseFormData, CourseFormErrors } from "@/types/course"; // Use your improved types
import { useToast } from "@/hooks/use-toast";
import courseService from "@/services/courseService";
// Assume you have validation functions for the new structure
import { validateStep1, validateStep3 } from "./courseValidate";

// Updated default form state to match the new structure
const defaultForm: CourseFormData = {
  title: "",
  category: "programming",
  description: "",
  tags: [],
  modules: [], // Changed from syllabus to modules
  prerequisites: [],
  coverImage: "",
  introVideo: "",
  level: "beginner",
  estimatedDuration: 1,
};

const CourseFormModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CourseFormData>(defaultForm);
  const [errors, setErrors] = useState<CourseFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validate = () => {
    // Validation logic for each step
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
    // For steps without validation, clear errors
    setErrors({});
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

  const handleSubmit = async () => {
    if (!validate()) return;

    console.log(
      "Submitting form data to backend:",
      JSON.stringify(form, null, 2)
    );

    setIsSubmitting(true);
    try {
      // The 'form' object now matches the payload expected by courseService.create
      await courseService.create(
        form as Omit<import("@/types/course").Course, "id" | "createdBy">
      );
      toast({
        title: "Course Submitted!",
        description: "Your course has been sent for admin approval.",
        variant: "success",
      });
      // Reset form and close modal on success
      setForm(defaultForm);
      onClose();
    } catch (error: any) {
      let errorMessage = "Invalid credentials or server error.";
      const errors = error?.response?.data?.errors;
      if (typeof errors === "string") {
        errorMessage = errors;
      } else if (typeof errors === "object" && errors !== null) {
        // Try to join all error messages from the object
        errorMessage = Object.values(errors).flat().join("; ");
      }
      console.error(errorMessage);
      toast({
        title: "Submission Error",
        description: `❌ ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create New Course</h2>
          <button
            className="text-3xl text-gray-500 hover:text-red-500 transition-colors"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Stepper */}
        <div className="p-6">
          <div className="flex items-center gap-2 w-full">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-all ${
                  step >= s ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          {step === 1 && (
            <Step1CourseDetails
              form={form}
              setForm={setForm}
              errors={errors}
              setErrors={setErrors}
            />
          )}
          {step === 2 && <Step2SyllabusBuilder form={form} setForm={setForm} />}
          {step === 3 && (
            <Step3MediaSettings form={form} setForm={setForm} errors={errors} />
          )}
          {step === 4 && <Step4ReviewSubmit form={form} />}
        </div>

        {/* Navigation */}
        <div className="p-6 border-t dark:border-gray-700 flex justify-between mt-auto">
          <Button variant="outline" disabled={step === 1} onClick={handleBack}>
            Back
          </Button>
          {step < 4 ? (
            <Button onClick={handleNext}>
              {step === 3 ? "Review & Submit" : "Next"}
            </Button>
          ) : (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit for Approval"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseFormModal;
