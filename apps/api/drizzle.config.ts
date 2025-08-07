import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema',
  dialect: process.env.NODE_ENV === 'prod' ? 'turso' : 'sqlite',
  dbCredentials: {
    url: process.env.DB_CONNECTION_URL!,
    authToken: process.env.DB_AUTH_TOKEN ?? undefined,
  },
})
