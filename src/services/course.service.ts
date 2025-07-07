import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import type { CourseFormValues } from "../types/course";
export const courseService = {
  async getCourses() {
    const res = await apiConfig().getRequest(ApiUrls.COURSES);
    return res;
  },
  async createGroup(model: CourseFormValues): Promise<any> {
    const res = await apiConfig().postRequest(ApiUrls.COURSES, model);
    return res;
  },
  async updateGroup(model: CourseFormValues, id: number) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.COURSES}/${id}`,
      model
    );
    return res;
  },
  async deleteGroup(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.COURSES}/${id}`);
    return res;
  },
};
