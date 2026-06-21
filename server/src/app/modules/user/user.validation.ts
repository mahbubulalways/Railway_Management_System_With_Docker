import { z } from "zod";

const CREATE_ADMIN_VALIDATION = z.object({
  data: z.object({
    password: z.string({ error: "Password is required" }).min(8, {
      abort: true,
      message: "Password must be at least 8 characters",
    }),

    data: z.object({
      email: z.string({ error: "Email is required" }).email({
        message: "Invalid email address",
      }),

      phone: z.string({ error: "Phone is required" }).regex(/^01[3-9]\d{8}$/, {
        message: "Invalid Bangladesh phone number",
      }),

      roleId: z.string().optional(),

      name: z
        .string({ error: "Name is required" })
        .min(3, {
          message: "Name must be at least 3 characters",
        })
        .regex(/^[a-zA-Z\s]+$/, {
          message: "Name must contain only letters",
        }),

      joiningDate: z
        .string({ error: "Joining date is required" })
        .or(z.string()),
    }),
  }),
});

// VERIFY USER
const VERIFY_USER_VALIDATION = z.object({
  data: z.object({
    email: z.string({ error: "Email is required" }).email({
      message: "Invalid email address",
    }),

    code: z
      .string({ error: "Verification code is required" })
      .regex(/^\d{6}$/, {
        message: "Verification code must be 6 digits.",
      }),
  }),
});

// VERIFY USER
const RESEND_VERIFICATION_CODE_VALIDATION = z.object({
  data: z.object({
    email: z.string({ error: "Email is required" }).email({
      message: "Invalid email address",
    }),
  }),
});

export const USER_VALIDATION = {
  CREATE_ADMIN_VALIDATION,
  VERIFY_USER_VALIDATION,
  RESEND_VERIFICATION_CODE_VALIDATION,
};
