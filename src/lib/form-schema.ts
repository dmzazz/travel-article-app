import { z } from "zod";

export const registerFormSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  username: z
    .string()
    .min(2)
    .max(10)
    .nonempty({ message: "Username is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const loginFormSchema = z.object({
  identifier: z
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const createArticleFormSchema = z.object({
  title: z.string().min(1).min(3).max(200).trim(),
  description: z.string().min(1).min(10).max(1000).trim(),
  cover_image_url: z.union([
    z
      .string()
      .url()
      .refine((url) => {
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
        return (
          imageExtensions.test(url) ||
          url.includes("cloudinary") ||
          url.includes("unsplash")
        );
      }, "Please provide a valid image URL"),
    z.instanceof(File),
  ]),
  category: z.string(),
});

export const updateArticleFormSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(200, "Title must be less than 200 characters")
      .trim()
      .optional(),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description must be less than 1000 characters")
      .trim()
      .optional(),

    cover_image_url: z
      .string()
      .url("Please enter a valid URL")
      .refine((url) => {
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
        return (
          imageExtensions.test(url) ||
          url.includes("cloudinary") ||
          url.includes("unsplash")
        );
      }, "Please provide a valid image URL")
      .optional(),

    category: z
      .number()
      .int("Category must be an integer")
      .positive("Category must be a positive number")
      .min(1, "Please select a valid category")
      .optional(),
  })
  .refine(
    (data) => {
      // At least one field must be provided for update
      return Object.values(data).some(
        (value) => value !== undefined && value !== "",
      );
    },
    {
      message: "At least one field must be provided for update",
      path: ["root"],
    },
  );

export const createCommentFormSchema = z.object({
  content: z
    .string()
    .min(1, "Comment content is required")
    .min(3, "Comment must be at least 3 characters")
    .max(500, "Comment must be less than 500 characters")
    .trim(),

  article: z
    .number()
    .int("Article ID must be an integer")
    .positive("Article ID must be a positive number")
    .min(1, "Please provide a valid article ID"),
});

export const updateCommentFormSchema = z
  .object({
    content: z
      .string()
      .min(3, "Comment must be at least 3 characters")
      .max(500, "Comment must be less than 500 characters")
      .trim()
      .optional(),

    article: z
      .number()
      .int("Article ID must be an integer")
      .positive("Article ID must be a positive number")
      .min(1, "Please provide a valid article ID")
      .optional(),
  })
  .refine(
    (data) => {
      // Minimal satu field harus diisi
      return Object.values(data).some(
        (value) => value !== undefined && value !== "",
      );
    },
    {
      message: "At least one field must be provided for update",
      path: ["root"],
    },
  );

export const createCategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .min(3, "Category name must be at least 3 characters")
    .max(100, "Category name must be less than 100 characters")
    .trim(),
});

export const updateCategoryFormSchema = z
  .object({
    name: z
      .string()
      .min(3, "Category name must be at least 3 characters")
      .max(100, "Category name must be less than 100 characters")
      .trim()
      .optional(),
  })
  .refine(
    (data) => {
      return Object.values(data).some(
        (value) => value !== undefined && value !== "",
      );
    },
    {
      message: "At least one field must be provided for update",
      path: ["root"],
    },
  );
