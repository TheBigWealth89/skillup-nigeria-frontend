import apiClient from "./api";

class adminService {
  async getAllUsers() {
    try {
      const response = await apiClient.post("/admin/Dashboard");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }

  async suspendUser(targetedUserId: string) {
    try {
      const response = await apiClient.patch(`/admin/suspend/${targetedUserId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default new adminService();
