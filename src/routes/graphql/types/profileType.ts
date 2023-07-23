import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeId, MemberType } from './memeberType.js';
import { Context } from '../types/context.js';

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: async ({ userId }, args, { prisma}: Context) => {
        return prisma.user.findFirst({
          where: {
            id: userId,
          },
        });
      },
    },

    memberType: {
      type: MemberType,
      resolve: async (_, args, { prisma}: Context) => {
        return await prisma.memberType.findMany(id: memberTypeId);
      },
    },
  }),
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  }),
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
  }),
});
