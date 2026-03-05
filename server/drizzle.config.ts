import { defineConfig } from "drizzle-kit";
import "dotenv/config"
export default defineConfig({
    dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
    schema: './database/models',
    out: './database/migrations',
    dbCredentials:{
        password:"root",
        user:"postgres",
        url:process.env.DATABASE_URL as string
    }
})
