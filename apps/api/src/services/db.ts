import { drizzle } from 'drizzle-orm/libsql'

export const db = drizzle(process.env.LOCAL_DB_FILE_NAME!)
