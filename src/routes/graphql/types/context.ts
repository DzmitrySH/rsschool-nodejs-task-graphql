import { PrismaClient, Profile } from '@prisma/client';
import DataLoader from 'dataloader';
import { User, Post, MemberType } from '../types/type.js';

export type Context = {
  prisma: PrismaClient,
  loader: Loader;
};

type Loader = {
  user: DataLoader<string, User | undefined, string>;
  profile: DataLoader<string, Profile | undefined, string>;
  post: DataLoader<string, Post | undefined, string>;
  member: DataLoader<string, MemberType | undefined, string>;
};