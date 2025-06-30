// components/course-form/validation.ts

import { CourseForm, CourseFormErrors } from "@/types/course";

export const validateStep1 = (form: CourseForm): CourseFormErrors => {
  const errors: CourseFormErrors = {};

  if (!form.title.trim()) {
    errors.title = "Course title is required.";
  } else if (form.title.length > 100) {
    errors.title = "Title must be at most 100 characters.";
  }

  if (!form.category.trim()) {
    errors.category = "Category is required.";
  }

  if (!form.description.trim() || form.description.length < 20) {
    errors.description = "Description must be at least 20 characters.";
  } else if (form.description.length > 2000) {
    errors.description = "Description must be at most 2000 characters.";
  }

  if (form.tags.length > 5) {
    errors.tags = "You can add up to 5 tags.";
  }

  return errors;
};

export const validateStep3 = (form: CourseForm): CourseFormErrors => {
  const errors: CourseFormErrors = {};

  if (!form.coverImage) {
    errors.coverImage = "Cover image is required.";
  }

  if (
    form.introVideo &&
    !/^https:\/\/(www\.)?youtube\.com\/watch\?v=/.test(form.introVideo)
  ) {
    errors.introVideo = "Invalid YouTube URL.";
  }

  if (form.duration <= 0) {
    errors.duration = "Duration must be greater than 0.";
  }

  return errors;
};
