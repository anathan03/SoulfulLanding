import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriberSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriberSchema.parse(req.body);
      const subscriber = await storage.createEmailSubscriber(validatedData);
      res.json({ success: true, subscriber });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to subscribe email" });
      }
    }
  });

  // Analytics tracking endpoint
  app.post("/api/analytics", async (req, res) => {
    try {
      const { eventName, eventData } = req.body;
      // Mock analytics tracking - in production, this would send to Google Analytics, etc.
      console.log(`Analytics Event: ${eventName}`, eventData);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to track event" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
