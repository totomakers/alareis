import fastify from 'fastify'
import { authRoutes } from './routes/auth.js'
import 'dotenv/config'
import { logger } from './services/logger.js'
import { gqlRoutes } from './routes/gql.js'

const server = fastify()

server.get('/', () => {
  return 'Hello world'
})

server.register(authRoutes)
server.register(gqlRoutes)

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    logger.error(err)
    process.exit(1)
  }
  logger.info(`Server listening at ${address}`)
})
