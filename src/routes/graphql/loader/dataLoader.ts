import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { User, Profile, Post, MemberType } from '../types/type.js';

export const userLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: Readonly<string[]>) => {
    const users: User[] = await prisma.user.findMany({
      where: { id: { in: ids as string[] } },
      include: { subscribedToUser: true, userSubscribedTo: true },
    });

    const sortUsers = ids.map((id) => users.find((user) => user.id === id));
    return sortUsers;
  });
};

export const profileLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: Readonly<string[]>) => {
    const profiles: Profile[] = await prisma.profile.findMany({
      where: { userId: { in: ids as string[] } },
    });

    const sortProfiles = ids.map((id) =>
      profiles.find((profile) => profile.userId === id),
    );
    return sortProfiles;
  });
};

export const postLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: Readonly<string[]>) => {
    const posts: Post[] = await prisma.post.findMany({
      where: { authorId: { in: ids as string[] } },
    });
    const postsByAuthorId = new Map<string, Post[]>();

    posts.forEach((post) => {
      const authorPosts = postsByAuthorId.get(post.authorId) || [];
      authorPosts.push(post);
      postsByAuthorId.set(post.authorId, authorPosts);
    });

    const mappedPosts = ids.map((id) => postsByAuthorId.get(id));
    return mappedPosts;
  });
};

export const memberLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: Readonly<string[]>) => {
    const members: MemberType[] = await prisma.memberType.findMany({
      where: { id: { in: ids as string[] } },
    });

    const sortMemberTypes = ids.map((id) => members.find((member) => member.id === id));
    return sortMemberTypes;
  });
};