import { users, emailSubscribers, type User, type InsertUser, type EmailSubscriber, type InsertEmailSubscriber } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createEmailSubscriber(subscriber: InsertEmailSubscriber): Promise<EmailSubscriber>;
  getEmailSubscriberByEmail(email: string): Promise<EmailSubscriber | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private emailSubscribers: Map<number, EmailSubscriber>;
  private userIdCounter: number;
  private subscriberIdCounter: number;

  constructor() {
    this.users = new Map();
    this.emailSubscribers = new Map();
    this.userIdCounter = 1;
    this.subscriberIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEmailSubscriber(insertSubscriber: InsertEmailSubscriber): Promise<EmailSubscriber> {
    // Check if email already exists
    const existing = await this.getEmailSubscriberByEmail(insertSubscriber.email);
    if (existing) {
      throw new Error("Email already subscribed");
    }

    const id = this.subscriberIdCounter++;
    const subscriber: EmailSubscriber = { 
      ...insertSubscriber, 
      id,
      subscribedAt: new Date(),
      source: insertSubscriber.source || "landing_page"
    };
    this.emailSubscribers.set(id, subscriber);
    return subscriber;
  }

  async getEmailSubscriberByEmail(email: string): Promise<EmailSubscriber | undefined> {
    return Array.from(this.emailSubscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }
}

export const storage = new MemStorage();
