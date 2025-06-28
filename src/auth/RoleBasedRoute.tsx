import React from "react";
import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";
interface RoleBasedRouteProps {
  allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
  const { getRole } = useAuthStore();
  const roles = getRole();
  const userRole = Array.isArray(roles) ? roles[0] : roles;

  if (!userRole) {
    return <Navigate to="/auth" replace />;
  }

  const isAuthorized = allowedRoles.includes(userRole);

  if (isAuthorized) {
    return <Outlet />;
  }

  switch (userRole) {
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    case "instructor":
      return <Navigate to="/instructor/dashboard" replace />;
    case "learner":
    default:
      return <Navigate to="/learner/dashboard" replace />;
  }
};

export default RoleBasedRoute;
