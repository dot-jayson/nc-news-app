import React, { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../../api";

const Comments = (props) => {
  const { article_id, comments, setComments } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((data) => {
        setComments(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  if (isError) {
    return <p>An error has occured</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="m-10">
      {comments.map((comment) => {
        return (
          <div
            className="border rounded-md border-gray-600 mb-5 p-4 flex flex-col gap-3"
            key={comment.comment_id}
          >
            <h2 className="font-medium">{comment.author}</h2>
            <p className="text-sm">{comment.body}</p>
            <p className="text-xs">Posted on: {comment.created_at}</p>
            <p>Votes: {comment.votes}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
