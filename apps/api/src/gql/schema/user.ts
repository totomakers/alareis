import { user } from '../../db/schema/auth.js'
import { db } from '../../lib/db.js'
import { builder } from '../builder.js'
import { GraphQLError } from 'graphql'

export const UserRef = builder
  .objectRef<typeof user.$inferSelect>('User')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id', {}),
      name: t.exposeString('name', {}),
      email: t.exposeString('email', {}),
      emailVerified: t.exposeBoolean('emailVerified', {}),
      image: t.exposeString('image', {
        nullable: true,
      }),
      createdAt: t.expose('createdAt', {
        type: 'Date',
      }),
      updatedAt: t.expose('updatedAt', {
        type: 'Date',
      }),
    }),
  })

builder.queryType({
  fields: (t) => ({
    user: t.field({
      type: UserRef,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (root, args) => {
        const _user = await db.query.user.findFirst({
          where: (user, { eq }) => eq(user.id, args.id),
        })

        if (!_user) {
          throw new GraphQLError('User not found', {
            extensions: {
              code: 'NOT_FOUND',
            },
          })
        }

        return _user
      },
    }),
    // users: t.field({
    //   type: t.listRef(UserRef),
    // }),
  }),
})
