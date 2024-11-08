import React, { useState, useContext } from "react";
import { UserContext } from "../context/User";
import { postComment } from "../../api";

const AddComment = (props) => {
  const { article_id, setComments } = props;
  const { signedInUser } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  function handlePostComment(event) {
    event.preventDefault();
    setCommentError(false);

    if (commentInput.trim() === "") {
      setCommentError(true);
      return;
    }

    const newComment = {
      username: signedInUser,
      body: commentInput,
    };

    setIsCommenting(true);

    postComment(article_id, newComment)
      .then((data) => {
        setCommentInput("");
        setIsCommenting(false);
        setComments((currentComments) => [data, ...currentComments]);
      })

      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsCommenting(false);
      });
  }

  return (
    <div className="m-10">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Comment section</h2>
      </div>
      {isError ? <p className="mb-3">Hi</p> : ""}
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
        {commentError ? <p>Cannot post empty comment</p> : ""}
        <button
          disabled={isCommenting}
          onClick={handlePostComment}
          className="bg-[#4c7666] text-sm mt-4 py-2 px-2.5 rounded-lg disabled:bg-gray-300 text-[#faf8f6]"
        >
          {isCommenting ? "Posting comment..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default AddComment;
