import { z } from "zod";
import { Request } from "express";

const querySchema = z
  .object({
    page: z.coerce
      .number({ error: "Page must be a number" })
      .int({ message: "Page must be an integer" })
      .positive({ message: "Page must be greater than 0" })
      .default(1),

    limit: z.coerce
      .number({ error: "Limit must be a number" })
      .int({ message: "Limit must be an integer" })
      .positive({ message: "Limit must be greater than 0" })
      .default(10),

    search: z.string({ error: "Search must be a string" }).default(""),
  })
  .strict();

export async function parseListQuery(query: Request["query"]) {
  const allowedKeys = ["page", "limit", "search"];
  const invalidKeys = Object.keys(query).filter(
    (key) => !allowedKeys.includes(key),
  );
  if (invalidKeys.length > 0) {
    throw new Error(`'${invalidKeys[0]}' query is not valid`);
  }

  return querySchema.parseAsync(query);
}
