import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./User";
import { relations } from "drizzle-orm";

export const PostTable = pgTable("posts",{
    id:uuid("id").defaultRandom().primaryKey(),
    title:varchar("title").notNull(),
    content:varchar("content").notNull(),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updatedAt:timestamp("updated_at").defaultNow().$onUpdate(()=>new Date()).notNull(),
    author:uuid("author").notNull().references(() => UserTable.id),
    tags:varchar("tags").array().notNull().default([])
})


export const UserPostRelation = relations(UserTable,({one,many})=>({
    posts:many(PostTable)
}))