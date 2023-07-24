import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';
import { Context } from '../types/context.js';
import { ProfileType } from './profileType.js';
import { Profile } from '@prisma/client';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: 'basic' },
    business: { value: 'business' },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields:() => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async ({ id }: Profile, _args, { prisma}: Context) => {
        return await prisma.profile.findMany({
          where: { memberTypeId: id },
        });
      },
    },
  }),
});
