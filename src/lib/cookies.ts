import Cookies from "js-cookie";

/**
 * Utility functions for managing authentication tokens in cookies.
 * These functions allow setting, getting, removing, and checking the validity of tokens.
 */

// Set the token in cookies with a 7-day expiration, secure and httpOnly flags
export const setToken = (token: string) => {
  Cookies.set("token", token, { expires: 7, secure: true });
};

// Get the token from cookies
export const getToken = () => {
  return Cookies.get("token");
};

// Remove the token from cookies
export const removeToken = () => {
  Cookies.remove("token");
};

// Check if token exists in cookies
export const hasToken = (): boolean => {
  const token = Cookies.get("token");
  return !!token; // Returns true if token exists, false otherwise
};

// Check if token exists and is not empty
export const isTokenValid = (): boolean => {
  const token = Cookies.get("token");
  // Check if the token exists and is not just whitespace
  return !!(token && token.trim().length > 0);
};

// Set the user data in cookies
export const setUser = (user: any) => {
  Cookies.set("user", JSON.stringify(user), { expires: 7, secure: true });
};

// Get the user data from cookies
export const getUser = () => {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
};

// Remove the user data from cookies
export const removeUser = () => {
  Cookies.remove("user");
};
