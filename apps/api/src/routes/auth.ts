import { betterAuth } from 'better-auth'
import { FastifyPluginCallback } from 'fastify'
import Database from 'libsql'

export const auth = betterAuth({
  database: new Database('./alareis.db'),
})

export const authRoutes: FastifyPluginCallback = (server) => {
  server.route({
    method: ['GET', 'POST'],
    url: '/api/auth/*',
    async handler(request, reply) {
      try {
        // Construct request URL
        const url = new URL(request.url, `http://${request.headers.host}`)

        // Convert Fastify headers to standard Headers object
        const headers = new Headers()
        Object.entries(request.headers).forEach(([key, value]) => {
          if (value) headers.append(key, value.toString())
        })

        // Create Fetch API-compatible request
        const req = new Request(url.toString(), {
          method: request.method,
          headers,
          body: request.body ? JSON.stringify(request.body) : undefined,
        })

        // Process authentication request
        const response = await auth.handler(req)

        // Forward response to client
        reply.status(response.status)
        response.headers.forEach((value, key) => {
          reply.header(key, value)
        })

        reply.send(response.body ? await response.text() : null)
      } catch (error) {
        server.log.error('Authentication Error:', error)
        reply.status(500).send({
          error: 'Internal authentication error',
          code: 'AUTH_FAILURE',
        })
      }
    },
  })
}
