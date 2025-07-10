import { Navigate } from "react-router-dom";
import type { ProtectRoutes } from "@types";

function LogOutProtect({ children }: ProtectRoutes) {
  const isAtuhToken = localStorage.getItem("access_token");

  if (!isAtuhToken) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export default LogOutProtect;
