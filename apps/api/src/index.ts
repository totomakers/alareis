import fastify from 'fastify'

const server = fastify()

server.get('/', () => {
  return 'Hello world'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
