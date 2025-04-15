import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("member"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  ipAddress: varchar("ip_address", { length: 45 }),
});

export const models = pgTable("models", {
  id: serial("id").primaryKey(),
  userId: integer("users_id").references(() => users.id),
  fileUrl: varchar("file_url").notNull(),
  fileSize: integer("file_size").notNull().default(10),
  fileType: varchar("file_type", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  modelId: integer("model_id").references(() => models.id),
  quantity: integer("quantity").notNull().default(1),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Model = typeof models.$inferSelect;
export type Order = typeof orders.$inferSelect;

const userRelations = relations(users, ({ many }) => ({
  activityLogs: many(activityLogs),
  models: many(models),
  orders: many(orders),
}));

const modelRelations = relations(models, ({ one, many }) => ({
  user: one(users, {
    fields: [models.userId],
    references: [users.id],
  }),
  orders: many(orders),
}));

const orderRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  model: one(models, {
    fields: [orders.modelId],
    references: [models.id],
  }),
}));

export enum ActivityType {
  SIGN_UP = "SIGN_UP",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
  UPDATE_PASSWORD = "UPDATE_PASSWORD",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
  UPDATE_ACCOUNT = "UPDATE_ACCOUNT",
}
