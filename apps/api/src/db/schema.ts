import { int, sqliteTable } from 'drizzle-orm/sqlite-core'

export const exampleTable = sqliteTable('examples', {
  id: int().primaryKey({ autoIncrement: true }),
})
