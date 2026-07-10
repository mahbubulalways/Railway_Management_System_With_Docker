import { z } from "zod";

const coachLayoutSchema = z.object({
  leftSeats: z
    .number()
    .int("Left seats must be an integer")
    .min(0, "Left seats cannot be negative"),

  rightSeats: z
    .number()
    .int("Right seats must be an integer")
    .min(0, "Right seats cannot be negative"),
});

export const CREATE_COACH_MODEL_SCHEMA = z.object({
  data: z
    .object({
      name: z.string().trim().min(1, "Coach model name is required"),

      type: z.enum([
        "AC_CHAIR",
        "SHOVON_CHAIR",
        "AC_CABIN",
        "CABIN",
        "SLEEPER",
      ]),

      totalSeats: z
        .number()
        .int("Total seats must be an integer")
        .positive("Total seats must be greater than 0"),

      layout: z
        .array(coachLayoutSchema)
        .min(1, "At least one row configuration is required"),
    })
    .superRefine((data, ctx) => {
      const configuredSeats = data.layout.reduce(
        (sum, row) => sum + row.leftSeats + row.rightSeats,
        0,
      );

      if (configuredSeats !== data.totalSeats) {
        ctx.addIssue({
          code: "custom",
          path: ["layout"],
          message: `Configured seats (${configuredSeats}) must equal total seats (${data.totalSeats}).`,
        });
      }
    }),
});
