import axios from "axios";
const authAxios = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});

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
      const response = await authAxios.post("signup", {
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
      const response = await authAxios.post("login", {
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
}

export default new authService();
