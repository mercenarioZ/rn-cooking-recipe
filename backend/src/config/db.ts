import { neon } from "@neondatabase/serverless";
import { ENV } from "./env";
import { drizzle } from "drizzle-orm/singlestore/driver";
import * as schema from "../db/schema";

const sql = neon(ENV.DB_URL);

export const db = drizzle(sql, { schema });