
import React from "react";
import { CourseFormData } from "@/types/course";

interface Props {
  form: CourseFormData;
}

const Step4ReviewSubmit: React.FC<Props> = ({ form }) => {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <h3 className="font-semibold mb-1">Course Title</h3>
        <p>{form.title}</p>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Category</h3>
        <p>{form.category}</p>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Description</h3>
        <div
          className="prose prose-sm dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: form.description }}
        />
      </div>
      <div>
        <h3 className="font-semibold mb-1">Tags</h3>
        <p>{form.tags.join(", ")}</p>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Cover Image</h3>
        {form.coverImage && (
          <img
            src={form.coverImage}
            alt="Cover"
            className="rounded shadow w-full max-w-sm"
          />
        )}
      </div>
      <div>
        <h3 className="font-semibold mb-1">Duration</h3>
        <p>{form.estimatedDuration} hour(s)</p>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Level</h3>
        <p>{form.level}</p>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => alert("Draft saved")}
        >
          Save Draft
        </button>
        
      </div>
    </div>
  );
};

export default Step4ReviewSubmit;
