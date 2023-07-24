import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeId, MemberType } from './memeberType.js';
import { Context } from '../types/context.js';
import { UserType } from './userType.js';
import { Profile } from '@prisma/client';

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    user: {
      type: UserType as GraphQLObjectType,
      resolve: async ({ userId }: Profile, _args, { loader}: Context) => {
        return loader.user.load(userId);
      },
    },
    userId: { type: UUIDType },
    memberType: {
      type: MemberType as GraphQLObjectType,
      resolve: async ({memberTypeId}: Profile, _args, { loader}: Context) => {
        return await loader.member.load(memberTypeId);
      },
    },
    memberTypeId: {type: MemberTypeId},
  }),
});

export const CreateProfileType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
  }),
});

export const ChangeProfileType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  }),
});
