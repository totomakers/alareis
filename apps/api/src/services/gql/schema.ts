import { lexicographicSortSchema, printSchema } from 'graphql'
import { writeFileSync } from 'node:fs'
import { builder } from './builder.js'

import '../../modules/example.js'

export const schema = builder.toSchema()
const schemaAsString = printSchema(lexicographicSortSchema(schema))

writeFileSync('./schema.gql', schemaAsString)
