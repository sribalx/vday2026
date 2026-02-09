import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const valentineWishes = pgTable("valentine_wishes", {
  id: serial("id").primaryKey(),
  wishes: text("wishes").notNull(), // The "things she'd like"
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertValentineWishSchema = createInsertSchema(valentineWishes).pick({
  wishes: true,
});

export type InsertValentineWish = z.infer<typeof insertValentineWishSchema>;
export type ValentineWish = typeof valentineWishes.$inferSelect;
