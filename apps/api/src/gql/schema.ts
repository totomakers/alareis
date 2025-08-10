import { lexicographicSortSchema, printSchema } from 'graphql'
import { writeFileSync } from 'node:fs'
import { builder } from './builder.js'

import './schema/user.js'
import { logger } from '../lib/logger.js'

export const schema = builder.toSchema()

function doPrintSchema() {
  logger.info('Printing Gql schema...')
  const schemaAsString = printSchema(lexicographicSortSchema(schema))
  writeFileSync('./schema.gql', schemaAsString)
}

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'prod') doPrintSchema()
