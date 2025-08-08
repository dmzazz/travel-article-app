import { isTokenValid } from "@/lib/cookies";
import { Navigate } from "react-router-dom";

interface AuthenticatedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

// This component checks if the user is authenticated
export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children, redirectTo = "/login" }) => {
  const isUserAuthenticated = isTokenValid();

  // If route requires auth but user is not authenticated
  if (!isUserAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

// This component checks if the user is not authenticated
export const UnauthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children, redirectTo = "/" }) => {
  const isUserAuthenticated = isTokenValid();

  // If route does not require auth but user is authenticated
  if (isUserAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
