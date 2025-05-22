import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute({
  children,
  isAllowed,
  redirectTo = "/themes",
}) {
  if (!isAllowed) return <Navigate to={redirectTo} />;
  return children || <Outlet />;
}
