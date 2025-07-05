import apiClient from "./api";
import { Course } from "@/types/course";

import { CourseFilters } from "@/types/course";

class CourseService {
  /**
   * Corresponds to: createCourse
   * @route POST /course
   */
  async create(courseData: Omit<Course, "id" | "createdBy">): Promise<Course> {
    const response = await apiClient.post("/course", courseData);
    return response.data.data;
  }

  /**
   * Corresponds to: getCourses
   * @route GET /course
   */
  async getAll(
    filters: CourseFilters = {}
  ): Promise<{ data: Course[]; total: number; pages: number }> {
    const response = await apiClient.get("/course", { params: filters });
    return response.data;
  }

  /**
   * Corresponds to: getPendingCourses
   * @route GET /course/pending
   */
  async getPending(
    filters: CourseFilters = {}
  ): Promise<{ data: Course[]; total: number; pages: number }> {
    const response = await apiClient.get("/course/pending", {
      params: filters,
    });
    return response.data;
  }

  /**
   * Corresponds to: getCourse
   * @route GET /course/:id
   */
  async getById(id: string): Promise<Course> {
    const response = await apiClient.get(`/course/${id}`);
    return response.data.data;
  }

  /**
   * Corresponds to: updateCourse
   * @route PUT /course/:id
   */
  async update(id: string, courseUpdateData: Partial<Course>): Promise<Course> {
    const response = await apiClient.put(`/course/${id}`, courseUpdateData);
    return response.data.data;
  }

  /**
   * Corresponds to: deleteCourse
   * @route DELETE /course/:id
   */
  async delete(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/course/${id}`);
    return response.data;
  }

  /**
   * Corresponds to: approveCourse
   * @route PATCH /course/:id/approve
   */
  async approve(id: string): Promise<Course> {
    // PATCH is often used for partial updates like this, but POST would also work.
    const response = await apiClient.patch(`/course/${id}/approve`);
    return response.data.data;
  }

  /**
   * Corresponds to: getInstructorCourses
   * @route GET /course/instructor/my-courses
   */
  async getMyCourses(): Promise<{ data: Course[]; count: number }> {
    // This is a protected route. The interceptor will handle attaching the token.
    const response = await apiClient.get("/course/instructor/my-courses");
    return response.data;
  }
}

export default new CourseService();
