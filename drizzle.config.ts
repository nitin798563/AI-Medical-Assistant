import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  
   schema: './config/schema.ts', //schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});