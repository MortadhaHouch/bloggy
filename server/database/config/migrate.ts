import { migrate } from 'drizzle-orm/postgres-js/migrator';
import db, { client } from './connect';

const runMigrations = async () => {
  
  try {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './database/migrations' });
    console.log('✅ Migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
    process.exit(0);
  }
};

runMigrations();