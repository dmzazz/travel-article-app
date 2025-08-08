export type RegisterType = {
  username: string;
  email: string;
  password: string;
};

export type LoginType = {
  identifier: string;
  password: string;
};

export type UserType = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ArticleType = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  category?: CategoryType;
  comments?: CommentsType[];
  user?: UserType;
};

export type UpdatePayloadArticleType = {
  data: {
    title: string;
    description: string;
    cover_image_url: string;
    category: number | undefined;
  };
};

export type CategoryType = {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
};

export type CommentsType = {
  id: number;
  documentId: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  article?: ArticleType;
  user?: UserType;
};

export type CreateCommentsType = {
  data: {
    content: string;
    article: number;
  };
};

export type UpdateCommentsType = {
  data: {
    content: string;
  };
};
