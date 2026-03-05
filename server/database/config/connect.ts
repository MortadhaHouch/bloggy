// Make sure to install the 'pg' package 
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "../models"
// Create the connection
const client = postgres(process.env.DATABASE_URL as string);

// Create the drizzle instance
export const db = drizzle(client, { logger: true ,schema});
// Export the raw client for migrations
export { client };

export default db;