import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profileType.js';
import { User as Us } from './type.js';
import { Context } from './context.js';
import { PostType } from './postType.js';
import { User } from '@prisma/client';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async ({ id }: User, _args, { loader }: Context) => {
        return await loader.profile.load(id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, _args, { loader }: Context) => {
        return await loader.post.load(id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ userSubscribedTo }: Us, _args, { loader }: Context) => {
        if (Array.isArray(userSubscribedTo)) {
          const authorIdList = userSubscribedTo.map(({ authorId }) => authorId);
          return await loader.user.loadMany(authorIdList);
        }
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ subscribedToUser }: Us, _args, { loader }: Context) => {
        if (Array.isArray(subscribedToUser)) {
          const subIdList = subscribedToUser.map(({ subscriberId }) => subscriberId);
          return loader.user.loadMany(subIdList);
        }
      },
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
