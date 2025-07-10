import { Navigate } from "react-router-dom";
import { type ProtectRoutes } from "@types";

function LoginProtect({ children }: ProtectRoutes) {
  const isAtuhToken = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (isAtuhToken) {
    return <Navigate to={`${role}`} />;
  }
  return <>{children}</>;
}

export default LoginProtect;
