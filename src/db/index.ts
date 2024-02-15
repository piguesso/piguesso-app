import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import schema from "./schema";
import env from "@/env";

const client = postgres(env.DB_CONNECTION_STRING, {});
const db = drizzle(client, { schema });

const migrationClient = postgres(env.DB_CONNECTION_STRING, { max: 1 });
const migrationDb = drizzle(migrationClient);
// migrate(migrationDb, { migrationsFolder: "./migrations" });

export { db };
