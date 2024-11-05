import React, { useEffect, useState } from "react";
import { deleteComment, getCommentsByArticleId } from "../../api";
import { useContext } from "react";
import { UserContext } from "../context/User";

const Comments = (props) => {
  const { signedInUser } = useContext(UserContext);
  const { article_id } = props;
  const [comments, setComments] = useState([]);
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
  }, [comments]);

  function handleDeleteComment(comment_id) {
    deleteComment(comment_id)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }

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
            <div className="flex justify-between">
              <h2 className="font-medium">{comment.author}</h2>
              {signedInUser === comment.author ? (
                <button
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  className="bg-red-500 px-2 rounded-full"
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
