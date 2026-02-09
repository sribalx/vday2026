import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.wishes.create.path, async (req, res) => {
    try {
      const wishData = api.wishes.create.input.parse(req.body);
      const wish = await storage.createWish(wishData);
      res.status(201).json(wish);
    } catch (e) {
      if (e instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
