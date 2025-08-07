import 'dotenv/config'

import fastify from 'fastify'
import { authRoutes } from './routes/auth.js'
import { logger } from './lib/logger.js'
import { gqlRoutes } from './routes/gql.js'
import fastifyCors from '@fastify/cors'

const server = fastify()

server.get('/', () => {
  return 'Hello world'
})

server.register(authRoutes)
server.register(gqlRoutes)

// Configure CORS policies
server.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400,
})

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    logger.error(err)
    process.exit(1)
  }
  logger.info(`Server listening at ${address}`)
})
