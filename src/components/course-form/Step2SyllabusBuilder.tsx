import React, { useState } from "react";
import { CourseFormData, Module, Lesson, Resource } from "@/types/course";
import { Button } from "@/components/ui/button";
// import { v4 as uuid } from "uuid";

interface Props {
  form: CourseFormData;
  setForm: React.Dispatch<React.SetStateAction<CourseFormData>>;
}

// A sub-component for managing lessons within a module
const LessonBuilder = ({
  lesson,
  moduleIndex,
  lessonIndex,
  updateLesson,
  removeLesson,
}: {
  lesson: Lesson;
  moduleIndex: number;
  lessonIndex: number;
  updateLesson: (
    moduleIdx: number,
    lessonIdx: number,
    updatedLesson: Lesson
  ) => void;
  removeLesson: (moduleIdx: number, lessonIdx: number) => void;
}) => {
  const [showResources, setShowResources] = useState(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateLesson(moduleIndex, lessonIndex, {
      ...lesson,
      [e.target.name]: e.target.value,
    });
  };

  const addResource = () => {
    const newResource: Resource = {
      title: "",
      url: "",
      resourceType: "video",
      duration: 0,
    };
    updateLesson(moduleIndex, lessonIndex, {
      ...lesson,
      resources: [...lesson.resources, newResource],
    });
  };

  const updateResource = (resourceIndex: number, updatedResource: Resource) => {
    const updatedResources = [...lesson.resources];
    updatedResources[resourceIndex] = updatedResource;
    updateLesson(moduleIndex, lessonIndex, {
      ...lesson,
      resources: updatedResources,
    });
  };

  const removeResource = (resourceIndex: number) => {
    const updatedResources = lesson.resources.filter(
      (_, idx) => idx !== resourceIndex
    );
    updateLesson(moduleIndex, lessonIndex, {
      ...lesson,
      resources: updatedResources,
    });
  };

  return (
    <div className="ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-3">
      <input
        type="text"
        name="title"
        value={lesson.title}
        onChange={handleInputChange}
        placeholder="Lesson Title (e.g., Introduction to React Hooks)"
        className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
      />
      <textarea
        name="description"
        value={lesson.description || ""}
        onChange={handleInputChange}
        placeholder="Lesson Description (optional)"
        rows={2}
        className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-600 text-sm"
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isFreePreview"
          checked={lesson.isFreePreview}
          onChange={(e) =>
            updateLesson(moduleIndex, lessonIndex, {
              ...lesson,
              isFreePreview: e.target.checked,
            })
          }
        />
        Make this lesson a free preview
      </label>

      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-sm">Resources</h4>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowResources(!showResources)}
        >
          {showResources ? "Hide" : "Show"}
        </Button>
      </div>

      {showResources && (
        <div className="space-y-2 pl-4">
          {lesson.resources.map((resource, resIndex) => (
            <ResourceBuilder
              key={resource.id}
              resource={resource}
              resourceIndex={resIndex}
              updateResource={updateResource}
              removeResource={removeResource}
            />
          ))}
          <Button variant="secondary" size="sm" onClick={addResource}>
            + Add Resource
          </Button>
        </div>
      )}
      <Button
        variant="destructive"
        size="sm"
        onClick={() => removeLesson(moduleIndex, lessonIndex)}
      >
        Remove Lesson
      </Button>
    </div>
  );
};

// A sub-component for managing individual resources
const ResourceBuilder = ({
  resource,
  resourceIndex,
  updateResource,
  removeResource,
}) => {
  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    updateResource(resourceIndex, {
      ...resource,
      [name]: name === "duration" ? parseInt(value) || 0 : value,
    });
  };

  return (
    <div className="p-2 border rounded dark:border-gray-600 space-y-2 bg-gray-50 dark:bg-gray-800/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input
          name="title"
          value={resource.title}
          onChange={handleResourceChange}
          placeholder="Resource Title"
          className="p-2 rounded border dark:bg-gray-700 w-full"
        />
        <select
          name="resourceType"
          value={resource.resourceType}
          onChange={handleResourceChange}
          className="p-2 rounded border dark:bg-gray-700 w-full"
        >
          <option value="video">Video</option>
          <option value="article">Article</option>
          <option value="exercise">Exercise</option>
        </select>
      </div>
      <input
        name="url"
        value={resource.url}
        onChange={handleResourceChange}
        placeholder="Resource URL (e.g., YouTube link)"
        className="p-2 rounded border dark:bg-gray-700 w-full"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm">Duration (min):</label>
          <input
            type="number"
            name="duration"
            value={resource.duration}
            onChange={handleResourceChange}
            className="p-2 w-20 rounded border dark:bg-gray-700"
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500"
          onClick={() => removeResource(resourceIndex)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

// The main component for Step 2
const Step2SyllabusBuilder: React.FC<Props> = ({ form, setForm }) => {
  const addModule = () => {
    const newModule: Module = {
      title: `Module ${form.modules.length + 1}: New Module`,
      description: "",
      lessons: [],
    };
    setForm((prev) => ({ ...prev, modules: [...prev.modules, newModule] }));
  };

  const updateModule = (index: number, updatedModule: Module) => {
    const updatedModules = [...form.modules];
    updatedModules[index] = updatedModule;
    setForm((prev) => ({ ...prev, modules: updatedModules }));
  };

  const removeModule = (index: number) => {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index),
    }));
  };

  const addLesson = (moduleIndex: number) => {
    const newLesson: Lesson = {
      title: `New Lesson`,
      description: "",
      resources: [],
      isFreePreview: false,
    };
    const updatedModule = { ...form.modules[moduleIndex] };
    updatedModule.lessons.push(newLesson);
    updateModule(moduleIndex, updatedModule);
  };

  const updateLesson = (
    moduleIndex: number,
    lessonIndex: number,
    updatedLesson: Lesson
  ) => {
    const updatedModule = { ...form.modules[moduleIndex] };
    updatedModule.lessons[lessonIndex] = updatedLesson;
    updateModule(moduleIndex, updatedModule);
  };

  const removeLesson = (moduleIndex: number, lessonIndex: number) => {
    const updatedModule = { ...form.modules[moduleIndex] };
    updatedModule.lessons = updatedModule.lessons.filter(
      (_, i) => i !== lessonIndex
    );
    updateModule(moduleIndex, updatedModule);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Syllabus Builder</h3>
        <Button onClick={addModule}>+ Add Module</Button>
      </div>

      <div className="space-y-4">
        {form.modules.map((module, modIndex) => (
          <div
            key={module.id}
            className="p-4 border-2 rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800/30"
          >
            <input
              type="text"
              value={module.title}
              onChange={(e) =>
                updateModule(modIndex, { ...module, title: e.target.value })
              }
              placeholder="Module Title (e.g., Section 1: Introduction)"
              className="w-full mb-2 p-2 text-lg font-semibold rounded border dark:bg-gray-800 dark:border-gray-600"
            />
            <textarea
              value={module.description || ""}
              onChange={(e) =>
                updateModule(modIndex, {
                  ...module,
                  description: e.target.value,
                })
              }
              placeholder="Module Description (optional)"
              rows={2}
              className="w-full mb-4 p-2 text-sm rounded border dark:bg-gray-800 dark:border-gray-600"
            />

            <div className="space-y-4">
              {module.lessons.map((lesson, lesIndex) => (
                <LessonBuilder
                  key={lesson.id}
                  lesson={lesson}
                  moduleIndex={modIndex}
                  lessonIndex={lesIndex}
                  updateLesson={updateLesson}
                  removeLesson={removeLesson}
                />
              ))}
            </div>

            <div className="mt-4 flex justify-between">
              <Button variant="secondary" onClick={() => addLesson(modIndex)}>
                + Add Lesson
              </Button>
              <Button
                variant="destructive"
                onClick={() => removeModule(modIndex)}
              >
                Remove Module
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step2SyllabusBuilder;
