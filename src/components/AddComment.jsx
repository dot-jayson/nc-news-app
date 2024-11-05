import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/User";
import { postComment } from "../../api";

const AddComment = (props) => {
  const { article_id } = props;
  const { signedInUser } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  function handlePostComment(event) {
    event.preventDefault();

    const newComment = {
      username: signedInUser,
      body: commentInput,
    };

    postComment(article_id, newComment)
      .then(() => {
        setCommentInput("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }

  return (
    <div className="m-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Comment section</h2>
      </div>
      <form>
        <div className="py-2 px-4 bg-gray-400 rounded-lg">
          <label htmlFor="comment">Your Comment</label>
          <textarea
            value={commentInput}
            onChange={(event) => {
              setCommentInput(event.target.value);
            }}
            id="comment"
            rows="6"
            className="px-0 w-full text-sm border-0"
            placeholder="Write a comment..."
          ></textarea>
        </div>
        <button
          onClick={handlePostComment}
          className="bg-blue-400 text-sm mt-4 py-2 px-2.5 rounded-lg disabled:bg-gray-300"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;
