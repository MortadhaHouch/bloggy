import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./User";
import { PostTable } from "./Post";

export const CommentTable = pgTable("comments",{
    id:uuid("id").defaultRandom().primaryKey(),
    content:varchar("content").notNull(),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updatedAt:timestamp("updated_at").defaultNow().$onUpdate(()=>new Date()).notNull(),
    author:uuid("author").notNull().references(() => UserTable.id),
    post:uuid("post").notNull().references(() => PostTable.id)
})