import { create } from "zustand";
import { persist } from "zustand/middleware";
import authService from "@/services/auth";
import { decodeToken } from "@/utils/authUtils";
import auth from "@/services/auth";

interface User {
  email: string;
  username: string;
  name: {
    firstName: string;
    lastName: string;
  };
  role: "learner" | "instructor" | "admin";
  avatar?: string;
}

interface signupData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  roles: "learner" | "instructor";
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  getRole: () => string[] | null;
  login: (identifier: string, password: string) => Promise<any>;
  signUp: (data: signupData) => Promise<any>;
  logout: () => void;
  setAccessToken: (token: string) => void;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isLoading: false,
      error: null,

      login: async (identifier, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(identifier, password);
          console.log("Full Login response: ", response);
          set({
            user: response?.user ?? null,
            accessToken: response?.accessToken ?? null,
            isLoading: false,
            error: null,
          });
          return response.user;
        } catch (err: any) {
          let errorMessage = "Invalid credentials or server error.";
          const errors = err?.response?.data?.errors;
          if (typeof errors === "string") {
            errorMessage = errors;
          } else if (typeof errors === "object" && errors !== null) {
            // Try to join all error messages from the object
            errorMessage = Object.values(errors).flat().join("; ");
          }

          set({
            error: errorMessage,
            isLoading: false, // Stop loading on error
          });

          throw new Error(errorMessage);
        }
      },

      signUp: async (data: signupData) => {
        set({ isLoading: true, error: null });
        try {
          await authService.signup(
            data.firstName,
            data.lastName,
            data.email,
            data.username,
            data.password,
            data.avatar,
            [data.roles] // roles as array of string
          );
          set({ isLoading: false });
        } catch (err: any) {
          // Try to extract a string error message, even if errors is an object
          let errorMessage = "Signup failed. Please check your details.";
          const errors = err?.response?.data?.errors;
          if (typeof errors === "string") {
            errorMessage = errors;
          } else if (typeof errors === "object" && errors !== null) {
            // Try to join all error messages from the object
            errorMessage = Object.values(errors).flat().join("; ");
          }

          set({
            error: errorMessage,
            isLoading: false, // Stop loading on error
          });

          throw new Error(errorMessage); // Throw error so caller can handle it
        }
      },

      logout: async () => {
        try {
          await authService.logout();
          set({ user: null, error: null, isLoading: false });
        } catch (err: any) {
          console.error("Logout failed on the server:", err);
          set({
            error: "Logout failed. Please try again.",
          });
        }
      },
      setAccessToken: (token: string) => {
        set({ accessToken: token });
      },
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      clearError: () => {
        set({ error: null });
      },

      getRole: () => {
        const token = get().accessToken;
        if (!token) return null;
        const decoded = decodeToken(token);
        console.log("Decoded payload", decoded);
        return decoded?.roles || decoded?.role || [];
      },
    }),

    {
      name: "skillup-auth",

      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);

export const useIsAuthenticated = () => {
  const user = useAuthStore((state) => state.user);
  return !!user;
};
