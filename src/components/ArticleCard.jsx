import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = (props) => {
  const { article } = props;
  return (
    <Link to={`/articles/${article.article_id}`}>
      <div className=" bg-[#faf8f6] border-4 border-[#4c7666] rounded-lg p-6 text-[#4c7666]">
        <h3>{article.title}</h3>
        <img
          src={article.article_img_url}
          className="rounded-xl"
          alt="image of the article"
        />

        <p className="text-xs">Votes: {article.votes}</p>
        <div className="flex justify-between">
          <p className="text-xs">By: {article.author}</p>
          <p className="text-xs">Created at: {article.created_at}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
