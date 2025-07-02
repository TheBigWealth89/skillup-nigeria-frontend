import React from "react";
import { CourseForm, CourseFormErrors } from "@/types/course";
import { DIFFICULTY_LEVELS } from "@/constants/courseCnts";

interface Props {
  form: CourseForm;
  setForm: React.Dispatch<React.SetStateAction<CourseForm>>;
  errors: CourseFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<CourseFormErrors>>;
}

const Step3MediaSettings: React.FC<Props> = ({ form, setForm, errors }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "duration" ? parseFloat(value) : value,
    }));
  };

  const handleCloudinaryUpload = () => {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: "dxwea1hku",
        uploadPreset: "skillup",
        multiple: false,
        sources: ["local", "url", "camera"],
        cropping: false,
      },
      (error: any, result: any) => {
        if (!error && result.event === "success") {
          setForm((prev) => ({ ...prev, coverImage: result.info.secure_url }));
        }
      }
    );
    widget.open();
  };

  return (
    <div className="space-y-5">
      {/* Cover Image */}
      <div>
        <label className="block mb-1 text-sm font-medium">
          Cover Image* (1200x600px)
        </label>
        {form.coverImage ? (
          <div className="relative w-full">
            <img
              src={form.coverImage}
              alt="Cover"
              className="w-full rounded shadow"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded px-2 py-1 text-xs"
              onClick={() => setForm((f) => ({ ...f, coverImage: "" }))}
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            onClick={handleCloudinaryUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload Image
          </button>
        )}
        {errors.coverImage && (
          <p className="text-xs text-red-500 mt-1">{errors.coverImage}</p>
        )}
      </div>

      {/* Intro Video */}
      <div>
        <label className="block mb-1 text-sm font-medium">
          Intro Video (YouTube)
        </label>
        <input
          type="url"
          name="introVideo"
          value={form.introVideo}
          onChange={handleChange}
          className="w-full rounded border p-2 dark:bg-gray-800"
          placeholder="https://youtube.com/watch?v=..."
        />
        {errors.introVideo && (
          <p className="text-xs text-red-500 mt-1">{errors.introVideo}</p>
        )}
      </div>

      {/* Difficulty */}
      <div>
        <label className="block mb-1 text-sm font-medium">
          Difficulty Level
        </label>
        <div className="flex items-center gap-4">
          {DIFFICULTY_LEVELS.map((level) => (
            <label
              key={level.value}
              className="flex items-center gap-1 text-sm"
            >
              <input
                type="radio"
                name="difficulty"
                value={level.value}
                checked={form.level === level.value}
                onChange={handleChange}
              />
              {level.label}
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block mb-1 text-sm font-medium">
          Estimated Duration (hours)
        </label>
        <input
          type="number"
          name="duration"
          value={form.estimatedDuration}
          min={0}
          step={0.5}
          onChange={handleChange}
          className="w-full p-2 rounded border dark:bg-gray-800"
        />
        {errors.estimatedDuration && (
          <p className="text-xs text-red-500 mt-1">{errors.estimatedDuration}</p>
        )}
      </div>
    </div>
  );
};

export default Step3MediaSettings;
