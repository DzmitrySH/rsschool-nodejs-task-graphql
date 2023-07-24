import { PrismaClient } from '@prisma/client';
import { userLoader, profileLoader, postLoader, memberLoader } from './loader/dataLoader.js';

export default function loaders(prisma: PrismaClient) {
  return {
      user: userLoader(prisma),
      profile: profileLoader(prisma),
      post: postLoader(prisma),
      member: memberLoader(prisma),
  };
}