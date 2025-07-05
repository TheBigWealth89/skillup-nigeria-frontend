import React from "react";
import { CourseFormData, CourseFormErrors } from "@/types/course";
import { CATEGORIES } from "@/constants/courseCnts";
import Select from "react-select";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface Props {
  form: CourseFormData;
  setForm: React.Dispatch<React.SetStateAction<CourseFormData>>;
  errors: CourseFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<CourseFormErrors>>;
}

const Step1CourseDetails: React.FC<Props> = ({ form, setForm, errors }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value?: string) => {
    setForm((prev) => ({ ...prev, description: value || "" }));
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value.trim();
    if ((e.key === "Enter" || e.key === ",") && val) {
      e.preventDefault();
      if (!form.tags.includes(val) && form.tags.length < 5) {
        setForm((prev) => ({ ...prev, tags: [...prev.tags, val] }));
        (e.target as HTMLInputElement).value = "";
      }
    }
  };

  const handleTagRemove = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handlePrerequisiteAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value.trim();
    if (e.key === "Enter" && val) {
      e.preventDefault();
      if (!form.prerequisites.includes(val)) {
        setForm((prev) => ({
          ...prev,
          prerequisites: [...prev.prerequisites, val],
        }));
        (e.target as HTMLInputElement).value = "";
      }
    }
  };

  const handlePrerequisiteRemove = (prereq: string) => {
    setForm((prev) => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((p) => p !== prereq),
    }));
  };

  const categoryOptions = CATEGORIES.map((category) => ({
    label: category.charAt(0).toUpperCase() + category.slice(1), // e.g., "Programming"
    value: category, // e.g., "programming" (all lowercase)
  }));

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block mb-1 font-medium text-sm">
          Course Title<span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder="e.g., Advanced JavaScript Patterns"
            className={`w-full rounded border px-3 py-2 pr-16 dark:bg-gray-800 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            maxLength={100}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
            {form.title.length}/100
          </span>
        </div>
        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium text-sm">
          Category<span className="text-red-500">*</span>
        </label>
        <Select
          options={categoryOptions}
          value={
            categoryOptions.find((opt) => opt.value === form.category) || null
          }
          onChange={(opt) =>
            // Set the form's category to the selected value or undefined
            setForm((prev) => ({
              ...prev,
              category: opt?.value as typeof prev.category | undefined,
            }))
          }
          isClearable
          className="text-sm"
        />
        {errors.category && (
          <p className="text-xs text-red-500 mt-1">{errors.category}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium text-sm">
          Description<span className="text-red-500">*</span>
        </label>
        <RichTextEditor
          value={form.description}
          onChange={handleDescriptionChange}
        />
        <div className="text-xs text-gray-500 text-right mt-1">
          {form.description.length}/2000
        </div>
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description}</p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block mb-1 font-medium text-sm">
          Tags <span className="text-xs text-gray-500">(Max 5)</span>
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {form.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center gap-1"
            >
              {tag}
              <button
                onClick={() => handleTagRemove(tag)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          onKeyDown={handleTagAdd}
          className="w-full rounded border px-3 py-2 dark:bg-gray-800"
          placeholder="Add tag and press Enter..."
        />
        {errors.tags && <p className="text-xs text-red-500">{errors.tags}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">
          Prerequisites{" "}
          <span className="text-xs text-gray-500">
            (What should students know beforehand?)
          </span>
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {form.prerequisites.map((prereq, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs flex items-center gap-1"
            >
              {prereq}
              <button
                onClick={() => handlePrerequisiteRemove(prereq)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          onKeyDown={handlePrerequisiteAdd}
          className="w-full rounded border px-3 py-2 dark:bg-gray-800"
          placeholder="Add prerequisite and press Enter..."
        />
        {/* You can add error display here if you implement validation for prerequisites */}
      </div>
    </div>
  );
};

export default Step1CourseDetails;
