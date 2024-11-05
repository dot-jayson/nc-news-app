import React, { useState } from "react";

const AddComment = (props) => {
  const [comment, setComment] = useState();
  const { article_id, setComments } = props;

  function handlePostComment() {}

  return (
    <div className="m-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Comment section</h2>
      </div>
      <form>
        <div className="py-2 px-4 bg-gray-400 rounded-lg">
          <label htmlFor="comment">Your Comment</label>
          <textarea
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
