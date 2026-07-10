import { z } from "zod";

export const CREATE_TRAIN_SCHEMA = z.object({
  data: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Train name is required")
      .max(100, "Train name cannot exceed 100 characters"),

    type: z.enum(
      ["INTERCITY", "MAIL", "EXPRESS", "LOCAL", "COMMUTER", "SPECIAL", "GOODS"],
      { error: "Train type is required" },
    ),

    status: z.string().trim().min(1, "Status is required"),

    maxSpeed: z.coerce
      .number()
      .int("Max speed must be an integer")
      .positive("Max speed must be greater than 0")
      .optional(),

    manufactureYear: z.coerce
      .number()
      .int("Manufacture year must be an integer")
      .min(1800, "Invalid manufacture year")
      .max(new Date().getFullYear(), "Manufacture year cannot be in the future")
      .optional(),

    notes: z
      .string()
      .trim()
      .max(500, "Notes cannot exceed 500 characters")
      .optional(),
  }),
});
