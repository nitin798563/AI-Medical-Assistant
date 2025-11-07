// import { drizzle } from 'drizzle-orm/neon-http';

// const db = drizzle(process.env.DATABASE_URL);

// for typescript add exlamation marks at the end of DATABASE_URL
// const db = drizzle(process.env.DATABASE_URL!);

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
// const db = drizzle({ client: sql });
export const db = drizzle({ client: sql });
 