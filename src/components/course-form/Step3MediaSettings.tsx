import React from "react";
import { CourseFormData, CourseFormErrors } from "@/types/course";
import { DIFFICULTY_LEVELS } from "@/constants/courseCnts";

interface Props {
  form: CourseFormData;
  setForm: React.Dispatch<React.SetStateAction<CourseFormData>>;
  errors: CourseFormErrors;
}

const Step3MediaSettings: React.FC<Props> = ({ form, setForm, errors }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      // Ensure duration is stored as a number
      [name]: name === "estimatedDuration" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCloudinaryUpload = () => {
    // This Cloudinary logic is good, assuming it's set up correctly.
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: "dxwea1hku", // Replace with your cloud name
        uploadPreset: "skillup", // Replace with your preset
        multiple: false,
        sources: ["local", "url", "camera"],
        cropping: true, // Enable cropping for consistent aspect ratio
        croppingAspectRatio: 16 / 9,
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
    // The main container for this step
    <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
      {/* Cover Image */}
      <div>
        <label className="block mb-1 text-sm font-medium">
          Cover Image* (Recommended: 16:9 ratio)
        </label>
        {form.coverImage ? (
          <div className="relative w-full max-w-lg">
            <img
              src={form.coverImage}
              alt="Cover"
              className="w-full rounded shadow"
            />
            <button
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 leading-none hover:bg-red-700"
              onClick={() => setForm((f) => ({ ...f, coverImage: "" }))}
            >
              &#x2715;
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
          Intro Video (e.g., YouTube, Vimeo)
        </label>
        <input
          type="url"
          name="introVideo"
          value={form.introVideo || ""}
          onChange={handleChange}
          className="w-full rounded border p-2 dark:bg-gray-800 dark:border-gray-600"
          placeholder="https://youtube.com/watch?v=..."
        />
        {errors.introVideo && (
          <p className="text-xs text-red-500 mt-1">{errors.introVideo}</p>
        )}
      </div>

      {/* Difficulty Level */}
      <div>
        <label className="block mb-1 text-sm font-medium">
          Difficulty Level
        </label>
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
        >
          {DIFFICULTY_LEVELS.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      {/* Estimated Duration */}
      <div>
        <label className="block mb-1 text-sm font-medium">
          Estimated Duration (in hours)
        </label>
        <input
          type="number"
          name="estimatedDuration"
          value={form.estimatedDuration}
          min={0}
          step={0.5}
          onChange={handleChange}
          className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
        />
        {errors.estimatedDuration && (
          <p className="text-xs text-red-500 mt-1">
            {errors.estimatedDuration}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step3MediaSettings;
