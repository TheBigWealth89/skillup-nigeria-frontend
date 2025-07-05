import apiClient from "./api";

class authService {
  async signup(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    avatar: string,
    roles: string[]
  ) {
    try {
      const response = await apiClient.post("/auth/signup", {
        firstName,
        lastName,
        username,
        email,
        password,
        avatar,
        roles,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login(identifier: string, password: string) {
    try {
      const response = await apiClient.post("/auth/login", {
        identifier,
        password,
      });

      if (!response.data.accessToken) {
        throw new Error("No access token received from server");
      }
      return {
        user: response.data.user,
        accessToken: response.data.accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(email: string) {
    try {
      const response = await apiClient.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await apiClient.post("/auth/logout", {});
    } catch (error) {
      throw error;
    }
  }
}

export default new authService();
