// components/course-form/Step2SyllabusBuilder.tsx

import React from "react";
import { CourseForm, SyllabusWeek, SyllabusResource } from "@/types/course";
import { RESOURCE_TYPES } from "@/constants/courseCnts";
import { v4 as uuid } from "uuid";

interface Props {
  form: CourseForm;
  setForm: React.Dispatch<React.SetStateAction<CourseForm>>;
}

const Step2SyllabusBuilder: React.FC<Props> = ({ form, setForm }) => {
  const addWeek = () => {
    const newWeek: SyllabusWeek = {
      _id: uuid(),
      week: form.syllabus.length + 1,
      title: `Week ${form.syllabus.length + 1}:`,
      topics: [],
      resources: [],
    };
    setForm((prev) => ({ ...prev, syllabus: [...prev.syllabus, newWeek] }));
  };

  const addTopic = (weekId: string, topic: string) => {
    setForm((prev) => ({
      ...prev,
      syllabus: prev.syllabus.map((w) =>
        w._id === weekId ? { ...w, topics: [...w.topics, topic] } : w
      ),
    }));
  };

  const addResource = (weekId: string, resource: SyllabusResource) => {
    setForm((prev) => ({
      ...prev,
      syllabus: prev.syllabus.map((w) =>
        w._id === weekId ? { ...w, resources: [...w.resources, resource] } : w
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <button
        onClick={addWeek}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        + Add Week
      </button>

      {form.syllabus.map((week, i) => (
        <div key={week._id} className="p-4 border rounded dark:border-gray-700">
          <input
            type="text"
            value={week.title}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                syllabus: prev.syllabus.map((w) =>
                  w._id === week._id ? { ...w, title: e.target.value } : w
                ),
              }))
            }
            className="w-full mb-2 p-2 rounded border dark:bg-gray-800"
            placeholder="Week title"
          />

          {/* Topics */}
          <div className="mb-3">
            <label className="text-sm font-medium">Topics</label>
            <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc ml-4">
              {week.topics.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
            <input
              type="text"
              className="w-full mt-2 p-2 border rounded dark:bg-gray-800"
              placeholder="Add topic and press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val) {
                    addTopic(week._id, val);
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }}
            />
          </div>

          {/* Resources */}
          <div>
            <label className="text-sm font-medium">Resources</label>
            <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc ml-4">
              {week.resources.map((res, i) => (
                <li key={i}>
                  {res.type}: {res.title}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <select
                className="p-2 rounded border dark:bg-gray-800"
                id={`res-type-${week._id}`}
              >
                {RESOURCE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                id={`res-title-${week._id}`}
                className="p-2 rounded border dark:bg-gray-800"
                placeholder="Resource Title"
              />
              <input
                id={`res-url-${week._id}`}
                className="p-2 rounded border dark:bg-gray-800"
                placeholder="Resource URL"
              />
            </div>
            <button
              onClick={() => {
                const type = (
                  document.getElementById(
                    `res-type-${week._id}`
                  ) as HTMLSelectElement
                ).value;
                const title = (
                  document.getElementById(
                    `res-title-${week._id}`
                  ) as HTMLInputElement
                ).value;
                const url = (
                  document.getElementById(
                    `res-url-${week._id}`
                  ) as HTMLInputElement
                ).value;
                if (title && url) {
                  addResource(week._id, {
                    _id: uuid(),
                    type: type as "video" | "article" | "exercise",
                    title,
                    url,
                  });
                  (
                    document.getElementById(
                      `res-title-${week._id}`
                    ) as HTMLInputElement
                  ).value = "";
                  (
                    document.getElementById(
                      `res-url-${week._id}`
                    ) as HTMLInputElement
                  ).value = "";
                }
              }}
              className="mt-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Add Resource
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Step2SyllabusBuilder;
