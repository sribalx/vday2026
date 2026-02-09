import { z } from "zod";
import { insertValentineWishSchema, valentineWishes } from "./schema";

export const api = {
  wishes: {
    create: {
      method: "POST" as const,
      path: "/api/wishes" as const,
      input: insertValentineWishSchema,
      responses: {
        201: z.custom<typeof valentineWishes.$inferSelect>(),
        400: z.object({ message: z.string() }),
        500: z.object({ message: z.string() }),
      },
    },
  },
};
