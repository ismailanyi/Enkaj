import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../schema/index";

import { DB_CREDS } from "../constants";

const poolConnection = mysql.createPool({
  ...DB_CREDS,
});

export const db = drizzle(poolConnection, { mode: "default", schema });
