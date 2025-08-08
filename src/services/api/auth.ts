import { toast } from "react-toastify";

// Import from types
import type { LoginType, RegisterType, UserType } from "@/types";

// Import from lib
import { apiUrl } from "@/lib/config";
import { getToken, removeToken } from "@/lib/cookies";

export const register = async (values: RegisterType): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Register error:", data.error?.message);
    } else {
      console.log("Register successful:", data);
    }
  } catch (error) {
    console.error("An error occurred during Register:", error);
  }
};

export const login = async (
  values: LoginType,
): Promise<{ response: Response; result: any } | undefined> => {
  try {
    const response = await fetch(`${apiUrl}/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const result = await response.json();

    return { response, result };
  } catch (error) {
    console.error("An error occurred during login:", error);
    toast.error("Login error!");
    return undefined;
  }
};

export const logout = () => {
  removeToken();
};

export const getUser = async (): Promise<UserType | null> => {
  const token = getToken();
  try {
    const response = await fetch(`${apiUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Get user error:", data.error?.message);
      return null;
    }

    return data as UserType;
  } catch (error) {
    console.error("An error occurred while fetching user data:", error);
    return null;
  }
};
