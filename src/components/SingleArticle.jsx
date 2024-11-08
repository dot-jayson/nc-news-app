import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, voteOnArticle } from "../../api";
import Comments from "./Comments";
import AddComment from "./AddComment";

const SingleArticle = () => {
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();
  const [isVoting, setIsVoting] = useState(false);
  const [voted, setIsVoted] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false);
  const [badRequestError, setBadRequestError] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then((data) => {
        if (data.status === 404) {
          setNotFoundError(true);
          setIsLoading(false);
        } else if (data.status === 400) {
          setBadRequestError(true);
          setIsLoading(false);
        } else {
          setArticle(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  function handleLike() {
    const like = {
      inc_votes: 1,
    };

    setIsVoting(true);

    setArticle((currentArticle) => ({
      ...currentArticle,
      votes: currentArticle.votes + 1,
    }));

    voteOnArticle(article.article_id, like)
      .then((data) => {
        setArticle((currentArticle) => ({
          ...currentArticle,
          votes: data.updatedArticle.votes,
        }));
        setIsVoting(false);
        setIsVoted(true);
      })
      .catch((error) => {
        console.log(error);
        setArticle((currentArticle) => ({
          ...currentArticle,
          votes: currentArticle.votes - 1,
        }));
        setIsVoting(false);
      });
  }

  function handleDislike() {
    const dislike = {
      inc_votes: -1,
    };
    setIsVoting(true);

    setArticle((currentArticle) => ({
      ...currentArticle,
      votes: currentArticle.votes - 1,
    }));
    voteOnArticle(article.article_id, dislike)
      .then((data) => {
        setArticle((currentArticle) => ({
          ...currentArticle,
          votes: data.updatedArticle.votes,
        }));
        setIsVoting(false);
        setIsVoted(true);
      })
      .catch((error) => {
        console.log(error);
        setArticle((currentArticle) => ({
          ...currentArticle,
          votes: currentArticle.votes + 1,
        }));
        setIsVoting(false);
      });
  }

  if (isLoading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <p className="text-4xl">Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <p className="text-4xl">An error has occured</p>
      </div>
    );
  }
  if (badRequestError) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <p className="text-4xl">Bad request</p>
      </div>
    );
  }
  if (notFoundError) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <p className="text-4xl">Article not found</p>
      </div>
    );
  }
  return (
    <div className="max-w-lg m-auto md:max-w-3xl text-[#4c7666] pb-10">
      <div className="m-10 flex flex-col justify-between gap-5 border-4 border-[#4c7666] p-5 rounded-md bg-[#faf8f6]">
        <h1 className="text-3xl">{article.title}</h1>
        <p>Topic: {article.topic}</p>
        <img
          src={article.article_img_url}
          className="rounded-xl"
          alt="image of the article"
        />
        <p>{article.body}</p>
        <p>By: {article.author}</p>
        <p>Created at: {article.created_at}</p>
        <p>Comments: {article.comment_count}</p>
        <p>Votes: {article.votes}</p>
        {voted ? <p className="text-green-600">Vote gone through</p> : ""}
        {isError ? <p>Error: your vote did not go through</p> : ""}
        <div className="flex flex-start gap-5">
          <button
            onClick={handleLike}
            disabled={isVoting || voted}
            className="bg-green-300 font-medium py-2 px-4 rounded disabled:bg-gray-300"
          >
            Like
          </button>
          <button
            onClick={handleDislike}
            disabled={isVoting || voted}
            className="bg-red-300 font-medium py-2 px-4 rounded disabled:bg-gray-300"
          >
            Dislike
          </button>
        </div>
      </div>
      <AddComment article_id={article.article_id} setComments={setComments} />
      <Comments
        article_id={article.article_id}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
};

export default SingleArticle;
