import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date
export const formatDate = (dateString: Date | undefined) => {
  if (!dateString) return "Invalid Date";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Time ago
export const timeAgo = (date: Date) => {
  const commentTime = new Date(date);
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - commentTime.getTime();

  // Calc time
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};

// Build page
export const buildPageHref = (
  page: number,
  title?: string,
  category?: string,
) => {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (title) params.set("title", title);
  params.set("page", page.toString());
  return `?${params.toString()}`;
};
