import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PostService from '../api/PostService';
import { Comment } from '../components/UI/Comment/Comment';
import { Loader } from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { Comments } from '../shared/types/TComments';
import { Post } from '../shared/types/TPosts';

export const CurrentPost: FC = () => {
  const params = useParams();
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comments[]>();

  const [takePost, isLoading, error] = useFetching(async () => {
    const response = await PostService.getPostById(params.id as string);
    setPost(response.data);
  });

  const [takeComments, isCommentsLoading, commentsError] = useFetching(
    async () => {
      const response = await PostService.getCommentsByPostId(
        params.id as string
      );
      setComments(response.data);
    }
  );

  useEffect(() => {
    takePost();
    takeComments();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="postWrapper">
          <div>You have clicked to the post with id: {params.id}</div>
          <h3>{post?.title}</h3>
          <p>{post?.body}</p>
        </div>
      )}
      {isCommentsLoading ? (
        <Loader />
      ) : (
        <div className="commentsWrapper">
          <div>Comments for the current post:</div>
          {comments?.map((comment) => (
            <Comment
              key={comment.id}
              body={comment.body}
              title={comment.name}
            />
          ))}
        </div>
      )}
    </>
  );
};
