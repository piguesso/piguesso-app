import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres(process.env.DB_CONNECTION_STRING!, {});
const db = drizzle(client);

export { db };
