import { FastifyPluginCallback } from 'fastify'
import { createYoga } from 'graphql-yoga'
import { FastifyReply, FastifyRequest } from 'fastify'
import { schema } from '../gql/schema.js'

export const gqlRoutes: FastifyPluginCallback = (fastify) => {
  const yoga = createYoga<{
    req: FastifyRequest
    reply: FastifyReply
  }>({
    schema,
    // Integrate Fastify logger
    logging: {
      debug: (...args) => args.forEach((arg) => fastify.log.debug(arg)),
      info: (...args) => args.forEach((arg) => fastify.log.info(arg)),
      warn: (...args) => args.forEach((arg) => fastify.log.warn(arg)),
      error: (...args) => args.forEach((arg) => fastify.log.error(arg)),
    },
  })

  fastify.route({
    // Bind to the Yoga's endpoint to avoid rendering on any path
    url: yoga.graphqlEndpoint,
    method: ['GET', 'POST', 'OPTIONS'],
    handler: (req, reply) =>
      yoga.handleNodeRequestAndResponse(req, reply, {
        req,
        reply,
      }),
  })
}
