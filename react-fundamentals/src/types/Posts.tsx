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
  removePost: (postId: number) => void;
};
