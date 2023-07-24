import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { Context } from '../types/context.js';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../types/userType.js';
import { MemberTypeId, MemberType } from '../types/memeberType.js';
import { PostType } from '../types/postType.js';
import { ProfileType } from '../types/profileType.js';
import { Post, Profile } from '@prisma/client';
import { MemberTypeId as PrismaTypeId } from '../../member-types/schemas.js';

export const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: {
    user: {
      type: UserType as GraphQLObjectType,
      args: {id: { type: UUIDType } },
      resolve: async (source, args: { id: string }, { prisma }: Context) => {
        const { id } = args;
        return await prisma.user.findUnique({ where: {id},});
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (source, args, { prisma }: Context) => {
        return await prisma.user.findMany();
      }
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (source, args, { prisma }: Context) => {
        return await prisma.memberType.findMany();
      }
    },
    memberType: {
      type: MemberType as GraphQLObjectType,
      args: {id: { type: new GraphQLNonNull(MemberTypeId) }},
      resolve: async (source, args: { id: PrismaTypeId }, { prisma }: Context) => {
        const { id } = args;
        return await prisma.memberType.findUnique({ where: { id } });
      }
    },
    post: {
      type: PostType as GraphQLObjectType,
      args: {id: { type: UUIDType } },
      resolve: async (source, { id }: Post, { prisma }: Context) => {
        return await prisma.post.findUnique({ where: { id } });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (source, args, { prisma }: Context) => {
        return await prisma.post.findMany();
      },
    },
    profile: {
      type: ProfileType as GraphQLObjectType,
      args: {id: { type: UUIDType }},
      resolve: async (source, { id }: Profile, { prisma }: Context) => {
        return await prisma.profile.findUnique({ where: { id } });
      },
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (source, args, { prisma }: Context) => {
        return await prisma.profile.findMany();
      },
    }
  },
})