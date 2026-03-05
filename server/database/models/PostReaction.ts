import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./User";
import { PostTable } from "./Post";

export const ReactionEnum = pgEnum("reaction_enum",[
    "like",
    "dislike",
    "love",
    "haha",
    "wow",
    "sad",
    "angry",
    "care",
    "support",
    "confused"
])
export const PostReactionTable = pgTable("reaction",{
    id:uuid("id").defaultRandom().primaryKey(),
    reaction:ReactionEnum("reaction").default("like").notNull(),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updatedAt:timestamp("updated_at").defaultNow().$onUpdate(()=>new Date()).notNull(),
    author:uuid("author").notNull().references(() => UserTable.id),
    post:uuid("post").notNull().references(() => PostTable.id)
})