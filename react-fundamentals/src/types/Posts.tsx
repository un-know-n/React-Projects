export type TPostProps = {
  id: number;
  title: string;
  body: string;
  postNumber: number;
  removePost: (postId: number) => void;
};

export type TPostsList = {
  posts: TPostProps[];
  title: string;
  error?: string;
  removePost: (postId: number) => void;
};
