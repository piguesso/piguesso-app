import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const client = postgres(process.env.DB_CONNECTION_STRING!, {});
const db = drizzle(client);

const migrationClient = postgres(process.env.DB_CONNECTION_STRING!, { max: 1 });
const migrationDb = drizzle(migrationClient);
migrate(migrationDb, { migrationsFolder: "./migrations" });

export { db };
