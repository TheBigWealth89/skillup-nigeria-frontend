import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const API_URL = " https://skill-up-api.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Allows cookies (for refresh token) to be sent
});

// This runs BEFORE every request is sent.
apiClient.interceptors.request.use(
  (config) => {
    // Get the access token from your Zustand store
    const token = useAuthStore.getState().accessToken;
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Define the Response Interceptor (with Token Refresh Logic)
// This runs AFTER a response is received.
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

apiClient.interceptors.response.use(
  (response) => response, // For successful responses, do nothing.
  async (error) => {
    const originalRequest = error.config;
    console.log("[Token Refresh] Interceptor caught 401 error", error);

    // Check if the error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        console.log(
          "[Token Refresh] Refresh already in progress, queuing request"
        );
        // If a refresh is already happening, add this request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            console.log(
              "[Token Refresh] Retrying original request with new token",
              token
            );
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return apiClient(originalRequest);
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
        // Attempt to get a new access token from the /refresh endpoint
        const { data } = await apiClient.post("/auth/refresh");
        const newAccessToken = data.accessToken;
        console.log(
          "[Token Refresh] New access token generated:",
          newAccessToken
        );
        // Update the store and default headers with the new token
        useAuthStore.getState().setAccessToken(newAccessToken);

        console.log(
          "[Token Refresh] Updated Zustand store with new access token"
        );

        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        console.log(
          "[Token Refresh] Updated Authorization headers with new token"
        );

        // Process any queued requests
        processQueue(null, newAccessToken);
        console.log("[Token Refresh] Processed queued requests with new token");

        // Retry the original request
        console.log("[Token Refresh] Retrying original request after refresh");
        // Retry the original failed request
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.log(
          "[Token Refresh] Refresh failed, logging out user",
          refreshError
        );

        // If refreshing fails, log the user out and reject all requests
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        console.log("[Token Refresh] Token refresh process complete");
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
