"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/services/api/auth";
import type { UserType } from "@/types";

export const Profile = () => {
  // State to hold user data
  const [user, setUser] = useState<UserType | null>();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  // If user data is not yet available, show a loading message
  if (!user) {
    return (
      <div className="flex h-40 items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="h-[90vh] pt-24">
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-md dark:bg-gray-900 dark:text-white">
        <div className="flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-xl font-bold text-white">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{user.username}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {user.email}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-lg font-medium">Account Info</h3>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <strong>User ID:</strong> {user.id}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
