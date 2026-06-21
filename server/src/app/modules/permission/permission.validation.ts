import { z } from "zod";

export const PERMISSION_VALIDATION = z.object({
  data: z.object({
    permission: z
      .string({ error: "Permission is required" })
      .min(5, {
        abort: true,
        message: "Permission must be at least 5 characters",
      })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Permission must contain only letters",
      }),
  }),
});
