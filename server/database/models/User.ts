import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users",{
    id:uuid("id").defaultRandom().primaryKey(),
    firstName:varchar("firstName",{length:20}).notNull(),
    lastName:varchar("lastName",{length:20}).notNull(),
    email:varchar("email").notNull(),
    password:varchar("password").notNull(),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updatedAt:timestamp("updated_at").defaultNow().$onUpdate(()=>new Date()).notNull(),
    isLoggedIn:boolean("is_logged_in").default(false).notNull(),
    sessions:varchar("sessions").array().notNull().default([])
})