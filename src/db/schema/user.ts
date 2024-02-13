import { pgTable, varchar } from "drizzle-orm/pg-core";

const users = pgTable("users", {
  clerkId: varchar("clerk_id").unique().notNull(),
  biography: varchar("biography", { length: 1000 }),
});

export { users };
