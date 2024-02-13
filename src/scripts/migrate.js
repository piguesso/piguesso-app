const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");

require("dotenv").config({ path: ".env.local" });

if (!process.env.DB_CONNECTION_STRING) {
  console.error("DB_CONNECTION_STRING is not set");
  process.exit(1);
} else {
  const client = postgres(process.env.DB_CONNECTION_STRING);
  const db = drizzle(client);

  migrate(db, { migrationsFolder: "./src/db/migrations" })
    .then(() => {
      console.log("Migrations complete.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error running migrations:", err);
      process.exit(1);
    });
}
