import z from "zod";

export const AUTH_LOGIN_VALIDATION = z.object({
  data: z.object({
    auth: z.string({ error: "Email or phone number is required" }),

    password: z.string({ error: "Password is required" }).min(8, {
      abort: true,
      message: "Password must be at least 8 characters",
    }),
  }),
});
