import { valentineWishes, type InsertValentineWish, type ValentineWish } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createWish(wish: InsertValentineWish): Promise<ValentineWish>;
}

export class DatabaseStorage implements IStorage {
  async createWish(insertWish: InsertValentineWish): Promise<ValentineWish> {
    const [wish] = await db
      .insert(valentineWishes)
      .values(insertWish)
      .returning();
    return wish;
  }
}

export const storage = new DatabaseStorage();
