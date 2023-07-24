import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { Context } from '../types/context.js';
import { CreateUserInputType, UserType, ChangeUserInputType } from '../types/userType.js';
import { Post, Profile, User } from '@prisma/client';
import { PostType, ChangePostType, CreatePostType } from '../types/postType.js';
import { ProfileType, ChangeProfileType, CreateProfileType } from '../types/profileType.js';
import { UUIDType } from '../types/uuid.js';

export const rootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  fields: {
    createUser: {
      type: UserType as GraphQLObjectType,
      args: {
        dto: { type: CreateUserInputType }
      },
      resolve(source, args: { dto: User }, { prisma }: Context) {
      const { dto } = args;
        return prisma.user.create({
          data: dto
        });
      }
    },
    createPost: {
      type: PostType as GraphQLObjectType,
      args: {
        dto: { type: CreatePostType }
      },
      resolve(source, args: { dto: Post }, { prisma }: Context) {
        const { dto } = args;
        return prisma.post.create({
          data: dto,
        });
      }
    },
    createProfile: {
      type: ProfileType as GraphQLObjectType,
      args: {
        dto: { type: CreateProfileType }
      },
      resolve(source, args: { dto: Profile }, { prisma }: Context) {
        const { dto } = args;
        return prisma.profile.create({
          data: dto,
        });
      }
    },
    deletePost: {
      type: UUIDType,
      args: {
        id: { type: UUIDType }
      },
      resolve: async (source, { id }: Post, { prisma }: Context) => {
        await prisma.post.delete({ where: { id } });
        return id;
      }
    },
    deleteUser: {
      type: UUIDType,
      args: {
        id: { type: UUIDType }
      },
      resolve: async (source, { id }: Post, { prisma }: Context) => {
        await prisma.user.delete({ where: { id } });
        return id;
      }
    },
    deleteProfile: {
      type: UUIDType,
      args: {
        id: { type: UUIDType }
      },
      resolve: async (source, { id }: Post, { prisma }: Context) => {
        await prisma.profile.delete({ where: { id } });
        return id;
      }
    },
    changeProfile: {
      type: ProfileType as GraphQLObjectType,
      args: {
        id: { type: UUIDType },
        dto: { type: ChangeProfileType }
      },
      resolve: async (source, args: { id: string, dto: Profile }, { prisma }: Context) => {
        const { dto, id } = args;
        return await prisma.profile.update({
          where: { id },
          data: dto
        });
      }
    },
    changePost: {
      type: PostType as GraphQLObjectType,
      args: {
        id: { type: UUIDType },
        dto: { type: ChangePostType }
      },
      resolve: async (source, args: { id: string, dto: Post }, { prisma }: Context) => {
        const { dto, id } = args;
        return await prisma.post.update({
          where: { id },
          data: dto
        });
      }
    },
    changeUser: {
      type: UserType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: ChangeUserInputType }
      },
      resolve: async (source, args: { id: string, dto: User }, { prisma }: Context) => {
        const { dto, id } = args;
        return await prisma.user.update({
          where: { id },
          data: dto
        });
      }
    },
    subscribeTo: {
      type: UserType as GraphQLObjectType,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType }
      },
      resolve: async (source, args: { userId: string, authorId: string }, { prisma }: Context) => {
        const { userId, authorId} = args;
        return await prisma.user.update({
          where: { id: userId },
          data: { userSubscribedTo: { create: { authorId } } },
        });
      }
    },
    unsubscribeFrom: {
      type: UUIDType,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType }
      },
      resolve: async (source, args: { userId: string, authorId: string }, { prisma }: Context) => {
        const { userId, authorId} = args;
        await prisma.subscribersOnAuthors.deleteMany({
          where: {
              subscriberId: userId,
              authorId
          },
        });
        return userId;
      }
    }
  }
})