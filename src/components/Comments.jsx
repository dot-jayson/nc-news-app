import React, { useEffect, useState } from "react";
import { deleteComment, getCommentsByArticleId } from "../../api";
import { useContext } from "react";
import { UserContext } from "../context/User";

const Comments = (props) => {
  const { signedInUser } = useContext(UserContext);
  const { article_id, comments, setComments } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

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

  function handleDeleteComment(comment_id) {
    setDeletingCommentId(comment_id);
    deleteComment(comment_id)
      .then(() => {
        setComments((currentComments) =>
          currentComments.filter((comment) => {
            return comment.comment_id !== comment_id;
          })
        );
        setDeletingCommentId(null);
      })
      .catch((error) => {
        console.log(error);
        setDeletingCommentId(null);
      });
  }

  if (isError) {
    return <p>An error has occured</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mt-10 ml-10 mr-10 flex flex-col gap-5 ">
      {comments.map((comment) => {
        return (
          <div
            className="border rounded-md border-gray-600  p-4 flex flex-col gap-3 bg-[#faf8f6]"
            key={comment.comment_id}
          >
            <div className="flex justify-between">
              <h2 className="font-medium">{comment.author}</h2>
              {signedInUser === comment.author ? (
                <button
                  disabled={deletingCommentId === comment.comment_id}
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  className="bg-red-500 px-2 rounded-full disabled:bg-gray-300"
                >
                  x
                </button>
              ) : (
                ""
              )}
            </div>
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
