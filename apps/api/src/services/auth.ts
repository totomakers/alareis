import { betterAuth } from 'better-auth'
import Database from 'libsql'

export const auth = betterAuth({
  database: new Database(process.env.LOCAL_DB_FILE_NAME!),
})
