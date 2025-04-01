import { defineConfig } from "drizzle-kit";
import { DATABASE_URL, MIGRATIONS_OUTPUT } from "../constants";

export default defineConfig({
  schema: "./schema/index.ts",
  out: MIGRATIONS_OUTPUT,
  dialect: "mysql",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: DATABASE_URL as string,
  },
});
