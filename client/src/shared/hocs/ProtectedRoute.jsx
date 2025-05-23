import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute({
  children,
  isAllowed,
  // redirectTo = "/themes", 
  redirectTo = "/signup", // по умолчанию всегда на страницу с регой
}) {
  console.log('ClgFrom ProtectedRoute: isAllowed=', isAllowed, 'redirectTo=', redirectTo);
  if (!isAllowed) return <Navigate to={redirectTo} replace/>; // replace не добавляет лишние записы в  браузере
  return children || <Outlet />;
}
