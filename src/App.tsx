import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import LearnerDashboard from "./pages/LearnerDashboard";
import DashboardRouter from "./components/common/DashboardRouter";
import NotFound from "./pages/NotFound";
import { ROUTES } from "./constants";
import PrivateRoute from "./auth/PrivateRoute";
import RoleBasedRoute from "./auth/RoleBasedRoute";
import { USER_ROLES } from "./constants";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />

            <Route element={<PrivateRoute />}>
              {/* <Route path={ROUTES.DASHBOARD} element={<DashboardRouter />} /> */}
              <Route
                element={<RoleBasedRoute allowedRoles={[USER_ROLES.ADMIN]} />}
              >
                <Route
                  path={ROUTES.ADMIN_DASHBOARD}
                  element={<AdminDashboard />}
                />
              </Route>

              <Route
                element={
                  <RoleBasedRoute allowedRoles={[USER_ROLES.INSTRUCTOR]} />
                }
              >
                <Route
                  path={ROUTES.INSTRUCTOR_DASHBOARD}
                  element={<InstructorDashboard />}
                />
              </Route>

              <Route
                element={<RoleBasedRoute allowedRoles={[USER_ROLES.LEARNER]} />}
              >
                <Route
                  path={ROUTES.LEARNER_DASHBOARD}
                  element={<LearnerDashboard />}
                />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
