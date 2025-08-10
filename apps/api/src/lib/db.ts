import { drizzle } from 'drizzle-orm/libsql'
import * as auth from '../db/schema/auth.js'

export const db = drizzle({
  connection: {
    url: process.env.DB_CONNECTION_URL!,
    authToken: process.env.DB_AUTH_TOKEN ?? undefined,
  },
  schema: {
    ...auth,
  },
})
