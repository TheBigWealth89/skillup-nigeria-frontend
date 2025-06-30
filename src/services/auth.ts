import axios from "axios";
import { useAuthStore } from "@/store/authStore";
const authAxios = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});

// --- Interceptor to attach the token to every request ---
authAxios.interceptors.request.use(
  (config) => {
    // Get the token from the Zustand store
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      // If the token exists, add it to the Authorization header
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// --- Interceptor to handle token refresh on 401 errors ---
let isRefreshing = false;
let failedQueue: {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("[Token Refresh] Interceptor caught 401 error", error);

    // Check if the error is a 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        console.log(
          "[Token Refresh] Refresh already in progress, queuing request"
        );
        // If we are already refreshing, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            console.log(
              "[Token Refresh] Retrying original request with new token",
              token
            );
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return authAxios(originalRequest);
          })
          .catch((err) => {
            console.log("[Token Refresh] Error retrying queued request", err);
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      console.log("[Token Refresh] Starting token refresh process");

      try {
        // Call the refresh token endpoint
        const { data } = await authAxios.post("/refresh");
        const newAccessToken = data.accessToken;
        console.log(
          "[Token Refresh] New access token generated:",
          newAccessToken
        );

        // Update the token in the Zustand store
        useAuthStore.getState().setAccessToken(newAccessToken);
        console.log(
          "[Token Refresh] Updated Zustand store with new access token"
        );

        // Update the header of the original request
        authAxios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        console.log(
          "[Token Refresh] Updated Authorization headers with new token"
        );

        // Process the queue with the new token
        processQueue(null, newAccessToken);
        console.log("[Token Refresh] Processed queued requests with new token");

        // Retry the original request
        console.log("[Token Refresh] Retrying original request after refresh");
        return authAxios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout the user and reject all queued requests
        console.log(
          "[Token Refresh] Refresh failed, logging out user",
          refreshError
        );
        processQueue(refreshError, null);
        useAuthStore.getState().logout();

        // Redirect to login page - you might do this in a useEffect in your App component
        // window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        console.log("[Token Refresh] Token refresh process complete");
      }
    }

    return Promise.reject(error);
  }
);

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

  async logout() {
    try {
      await authAxios.post("/logout", {});
    } catch (error) {
      throw error;
    }
  }
}

export default new authService();
