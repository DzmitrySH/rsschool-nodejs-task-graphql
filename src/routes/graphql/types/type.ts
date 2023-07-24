export type User = {
  id: string;
  name: string;
  balance: number;
  userSubscribedTo?: {
    subscriberId: string;
    authorId: string;
  }[];
  subscribedToUser?: {
    subscriberId: string;
    authorId: string;
  }[];
};

export type Profile = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export type MemberType = {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
};