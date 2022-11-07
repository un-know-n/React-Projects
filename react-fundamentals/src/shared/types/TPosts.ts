export type Post = {
  userId?: number;
  id: number;
  title: string;
  body: string;
};

export type TPostsList = {
  posts: Post[];
  title: string;
  error?: string;
  removePost: (postId: number) => void;
};
