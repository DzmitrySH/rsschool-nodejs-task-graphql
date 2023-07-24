import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLInputObjectType, GraphQLList } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profileType.js';
import { User } from '@prisma/client';
import { Context } from './context.js';
import { PostType } from './postType.js';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async ({ id }: User, args, { prisma }: Context) => {
        return  await prisma.profile.findUnique({ where: { userId: id } });
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, args, { prisma }: Context) => {
        return await prisma.post.findMany({ where: { authorId: id } });
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, args, { prisma }: Context) => {
        return await prisma.user.findMany({
          where: {userSubscribedTo: {some: {authorId: id }}},
        });
      },
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, args, { prisma }: Context) => {
        return  await prisma.user.findMany({
          where: {userSubscribedTo: {some: {authorId: id}}},
        });
      },
    }
  })
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }
})

export const changeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});