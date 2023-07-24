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
import { UserType } from './userType.js';
import { Profile, User } from '@prisma/client';

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
      resolve: async ({ userId }: Profile, args, { prisma}: Context) => {
        return prisma.user.findFirst({ where: { id: userId }});
      },
    },

    memberType: {
      type: MemberType,
      resolve: async ({memberTypeId}: Profile, args, { prisma}: Context) => {
        return await prisma.memberType.findMany({ where: { id: memberTypeId } });
      },
    },
  }),
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    userId: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    yearOfBirth: { type: GraphQLInt },
  }),
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    memberTypeId: { type: MemberTypeId },
    yearOfBirth: { type: GraphQLInt },
  }),
});
